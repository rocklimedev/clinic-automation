import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { PatientVisit } from './models/patient-visit.model';
import { AutomationRunnerService } from '../automate/automation-runner.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    @InjectModel(PatientVisit) private readonly visitModel: typeof PatientVisit,
    private readonly automationRunner: AutomationRunnerService,
  ) {}

  async createPatient(data: Partial<Patient>) {
    return this.patientModel.create(data as any);
  }

  async createVisit(patientId: string, data: Partial<PatientVisit>) {
    const patient = await this.patientModel.findByPk(patientId);
    if (!patient) throw new NotFoundException('Patient not found');

    const visit = await this.visitModel.create({
      ...data,
      patient_id: patientId,
    } as any);

    // Automatically schedule feedback automation
    await this.automationRunner.scheduleForVisit(visit.id, 'VISIT_COMPLETED');

    return visit;
  }

  async findAllPatients() {
    return this.patientModel.findAll({ include: [PatientVisit] });
  }

  async findOne(id: string) {
    const patient = await this.patientModel.findByPk(id, {
      include: [PatientVisit],
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }
}
