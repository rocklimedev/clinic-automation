import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { Automation, AutomationStatus } from './models/automation.model';
import {
  AutomationRun,
  AutomationRunStatus,
} from '@/modules/automate/models/automation-run.model';
import {
  PatientVisit,
  FeedbackStatus,
} from '@/modules/patients/models/patient-visit.model';
import { Patient } from '../patients/models/patient.model';
import { WhatsappTemplate } from '@/modules/automate/models/whatsapp-template.model';
import { WhatsappService } from '@/modules/automate/whatsapp.service';
import { FeedbackRequest } from '@/modules/automate/models/feedback-request.model';

@Injectable()
export class AutomationRunnerService {
  private readonly logger = new Logger(AutomationRunnerService.name);
  private isRunning = false;

  constructor(
    @InjectModel(Automation)
    private readonly automationModel: typeof Automation,
    @InjectModel(AutomationRun)
    private readonly runModel: typeof AutomationRun,
    @InjectModel(PatientVisit)
    private readonly visitModel: typeof PatientVisit,
    @InjectModel(FeedbackRequest)
    private readonly feedbackModel: typeof FeedbackRequest,
    private readonly whatsappService: WhatsappService,
  ) {}

  /**
   * Cron job – every 5 minutes by default.
   * Finds PENDING runs whose scheduled_at <= now and executes them.
   */
  @Cron(process.env.AUTOMATION_CRON || CronExpression.EVERY_5_MINUTES)
  async processPendingRuns() {
    if (this.isRunning) {
      this.logger.warn('Previous automation cycle still running – skipping');
      return;
    }

    this.isRunning = true;
    try {
      const now = new Date();
      const pending = await this.runModel.findAll({
        where: {
          status: AutomationRunStatus.PENDING,
          scheduled_at: { [Op.lte]: now },
        },
        include: [
          {
            model: Automation,
            where: { status: AutomationStatus.ACTIVE },
            include: [WhatsappTemplate],
          },
          {
            model: PatientVisit,
            include: [Patient],
          },
        ],
        limit: 50, // batch size
      });

      this.logger.log(`Found ${pending.length} pending automation runs`);

      for (const run of pending) {
        await this.executeRun(run);
      }
    } catch (err) {
      this.logger.error('Automation cycle failed', err);
    } finally {
      this.isRunning = false;
    }
  }

  private async executeRun(run: AutomationRun) {
    await run.update({
      status: AutomationRunStatus.RUNNING,
      executed_at: new Date(),
    });

    try {
      const automation = run.automation;
      const visit = run.patientVisit;
      const patient = visit?.patient;
      const template = automation?.template;

      if (!automation || !visit || !patient || !template) {
        throw new Error('Missing related data for automation run');
      }

      // Build body parameters – customize based on your templates
      const bodyParams = [
        patient.full_name?.split(' ')[0] || 'Patient',
        visit.doctor_name || 'Doctor',
        visit.visit_date || '',
      ];

      await this.whatsappService.sendAutomationTemplate(
        template,
        patient,
        visit,
        bodyParams,
      );

      // Mark visit feedback as SENT
      await visit.update({ feedback_status: FeedbackStatus.SENT });

      // Create a feedback request stub
      await this.feedbackModel.create({
        patient_id: patient.id,
        visit_id: visit.id,
        automation_run_id: run.id,
      });

      await run.update({ status: AutomationRunStatus.COMPLETED });
      this.logger.log(`Automation run ${run.id} completed`);
    } catch (error: any) {
      const msg = error?.message || 'Unknown error';
      await run.update({
        status: AutomationRunStatus.FAILED,
        error: msg,
      });
      this.logger.error(`Automation run ${run.id} failed: ${msg}`);
    }
  }

  /**
   * Schedule a new automation run for a visit.
   * Called when a visit is created / completed.
   */
  async scheduleForVisit(visitId: string, triggerType = 'VISIT_COMPLETED') {
    const visit = await this.visitModel.findByPk(visitId, {
      include: [Patient],
    });
    if (!visit) return;

    const automations = await this.automationModel.findAll({
      where: {
        trigger_type: triggerType,
        status: AutomationStatus.ACTIVE,
      },
      include: [WhatsappTemplate],
    });

    for (const auto of automations) {
      const waitHours = auto.wait_hours ?? 24;
      const scheduledAt = new Date();
      scheduledAt.setHours(scheduledAt.getHours() + waitHours);

      await this.runModel.create({
        automation_id: auto.id,
        patient_visit_id: visit.id,
        scheduled_at: scheduledAt,
        status: AutomationRunStatus.PENDING,
      });

      this.logger.log(
        `Scheduled automation "${auto.name}" for visit ${visitId} at ${scheduledAt.toISOString()}`,
      );
    }
  }
}
