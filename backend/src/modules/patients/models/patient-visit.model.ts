import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import type { Patient } from '../../patients/models/patient.model';
import type { AutomationRun } from '@/modules/automate/models/automation-run.model';
import type { WhatsappMessage } from '@/modules/automate/models/whatsapp-message.model';
import type { FeedbackRequest } from '@/modules/automate/models/feedback-request.model';

export enum VisitType {
  NEW = 'NEW',
  FOLLOW_UP = 'FOLLOW_UP',
}

export enum FeedbackStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  RESPONDED = 'RESPONDED',
}

@Table({
  tableName: 'patient_visits',
  timestamps: false,
})
export class PatientVisit extends Model<PatientVisit> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: string;

  @ForeignKey(() => require('./patient.model').Patient)
  @Column(DataType.CHAR(36))
  declare patient_id: string;

  @Column(DataType.STRING(120))
  declare doctor_name: string | null;

  @Column(DataType.STRING(120))
  declare coordinator_name: string | null;

  @Column(DataType.ENUM(...Object.values(VisitType)))
  declare visit_type: VisitType | null;

  @Column(DataType.DATEONLY)
  declare visit_date: string | null;

  @Column(DataType.TIME)
  declare visit_time: string | null;

  @Column(DataType.STRING(120))
  declare opd_location: string | null;

  @Default(FeedbackStatus.PENDING)
  @Column(DataType.ENUM(...Object.values(FeedbackStatus)))
  declare feedback_status: FeedbackStatus;

  @BelongsTo(() => require('./patient.model').Patient)
  declare patient: Patient;

  @HasMany(
    () =>
      require('@/modules/automate/models/automation-run.model').AutomationRun,
  )
  declare automationRuns: AutomationRun[];

  @HasMany(
    () =>
      require('@/modules/automate/models/whatsapp-message.model')
        .WhatsappMessage,
  )
  declare messages: WhatsappMessage[];

  @HasMany(
    () =>
      require('@/modules/automate/models/feedback-request.model')
        .FeedbackRequest,
  )
  declare feedbacks: FeedbackRequest[];
}
