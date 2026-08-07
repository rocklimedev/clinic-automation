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

import type { Patient } from '../../patients/models/patient.model';
import type { PatientVisit } from '@/modules/patients/models/patient-visit.model';
import type { WhatsappTemplate } from './whatsapp-template.model';

@Table({
  tableName: 'whatsapp_messages',
  timestamps: false,
})
export class WhatsappMessage extends Model<
  InferAttributes<WhatsappMessage>,
  InferCreationAttributes<WhatsappMessage>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @ForeignKey(() => require('../../patients/models/patient.model').Patient)
  @Column({
    type: DataType.CHAR(36),
    allowNull: false,
  })
  declare patient_id: string;

  @ForeignKey(
    () => require('../../patients/models/patient-visit.model').PatientVisit,
  )
  @Column({
    type: DataType.CHAR(36),
    allowNull: true,
  })
  declare visit_id: CreationOptional<string | null>;

  @ForeignKey(() => require('./whatsapp-template.model').WhatsappTemplate)
  @Column({
    type: DataType.CHAR(36),
    allowNull: true,
  })
  declare template_id: CreationOptional<string | null>;

  /**
   * Meta's wamid returned after successful send
   */
  @Column({
    type: DataType.STRING(150),
    allowNull: true,
  })
  declare meta_message_id: CreationOptional<string | null>;

  /**
   * sent | delivered | read | failed
   */
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare status: CreationOptional<string | null>;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare sent_at: CreationOptional<Date | null>;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare delivered_at: CreationOptional<Date | null>;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare read_at: CreationOptional<Date | null>;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare failed_reason: CreationOptional<string | null>;

  @BelongsTo(() => require('../../patients/models/patient.model').Patient)
  declare patient?: Patient;

  @BelongsTo(
    () => require('../../patients/models/patient-visit.model').PatientVisit,
  )
  declare visit?: PatientVisit;

  @BelongsTo(() => require('./whatsapp-template.model').WhatsappTemplate)
  declare template?: WhatsappTemplate;
}
