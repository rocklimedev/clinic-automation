import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { Patient } from '../../patients/models/patient.model';
import { PatientVisit } from '@/modules/patients/models/patient-visit.model';
import { AutomationRun } from './automation-run.model';

@Table({
  tableName: 'feedback_requests',
  timestamps: false,
})
export class FeedbackRequest extends Model<
  InferAttributes<FeedbackRequest>,
  InferCreationAttributes<FeedbackRequest>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare patient_id: string;

  @ForeignKey(() => PatientVisit)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare visit_id: string;

  @ForeignKey(() => AutomationRun)
  @Column({
    type: DataType.CHAR(36),
    allowNull: true,
  })
  declare automation_run_id: CreationOptional<string | null>;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare rating: CreationOptional<number | null>;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare feedback: CreationOptional<string | null>;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare google_review_clicked: CreationOptional<boolean>;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  declare google_review_posted: CreationOptional<boolean>;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare submitted_at: CreationOptional<Date | null>;

  @BelongsTo(() => Patient)
  declare patient?: Patient;

  @BelongsTo(() => PatientVisit)
  declare visit?: PatientVisit;

  @BelongsTo(() => AutomationRun)
  declare automationRun?: AutomationRun;
}
