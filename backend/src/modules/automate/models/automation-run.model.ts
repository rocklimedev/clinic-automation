import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import type { Automation } from './automation.model';
import type { PatientVisit } from '@/modules/patients/models/patient-visit.model';
import type { FeedbackRequest } from './feedback-request.model';

export enum AutomationRunStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Table({
  tableName: 'automation_runs',
  timestamps: false,
})
export class AutomationRun extends Model<
  InferAttributes<AutomationRun>,
  InferCreationAttributes<AutomationRun>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @ForeignKey(() => require('./automation.model').Automation)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare automation_id: string;

  @ForeignKey(
    () => require('../../patients/models/patient-visit.model').PatientVisit,
  )
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare patient_visit_id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare scheduled_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare executed_at: CreationOptional<Date | null>;

  @Column({
    type: DataType.ENUM(...Object.values(AutomationRunStatus)),
    allowNull: false,
  })
  declare status: AutomationRunStatus;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare error: CreationOptional<string | null>;

  @BelongsTo(() => require('./automation.model').Automation)
  declare automation?: Automation;

  @BelongsTo(
    () => require('../../patients/models/patient-visit.model').PatientVisit,
  )
  declare patientVisit?: PatientVisit;

  @HasOne(() => require('./feedback-request.model').FeedbackRequest)
  declare feedbackRequest?: FeedbackRequest;
}
