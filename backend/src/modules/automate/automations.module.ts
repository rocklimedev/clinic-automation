import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Automation } from './models/automation.model';
import { AutomationRun } from '@/modules/automate/models/automation-run.model';
import { PatientVisit } from '@/modules/patients/models/patient-visit.model';
import { FeedbackRequest } from './models/feedback-request.model';
import { WhatsappTemplate } from './models/whatsapp-template.model';
import { WhatsappModule } from './whatsapp.module';
import { AutomationRunnerService } from './automation-runner.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Automation,
      AutomationRun,
      PatientVisit,
      FeedbackRequest,
      WhatsappTemplate,
    ]),
    WhatsappModule,
  ],
  providers: [AutomationRunnerService],
  exports: [AutomationRunnerService],
})
export class AutomationsModule {}
