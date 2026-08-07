import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { PatientVisit } from './models/patient-visit.model';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { AutomationsModule } from '../automate/automations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient, PatientVisit]),
    AutomationsModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
