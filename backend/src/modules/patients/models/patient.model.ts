import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';

import type { PatientVisit } from './patient-visit.model';
import type { WhatsappMessage } from '@/modules/automate/models/whatsapp-message.model';
import type { FeedbackRequest } from '@/modules/automate/models/feedback-request.model';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

@Table({
  tableName: 'patients',
  timestamps: true,
})
export class Patient extends Model<Patient> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare full_name: string;

  @AllowNull(false)
  @Column(DataType.STRING(20))
  declare mobile: string;

  @Column(DataType.STRING(20))
  declare whatsapp_number: string | null;

  @Column(DataType.STRING(150))
  declare email: string | null;

  @Column(DataType.ENUM(...Object.values(Gender)))
  declare gender: Gender | null;

  @Column(DataType.DATEONLY)
  declare dob: string | null;

  @Column(DataType.INTEGER)
  declare age: number | null;

  @Column(DataType.TEXT)
  declare address: string | null;

  @HasMany(() => require('./patient-visit.model').PatientVisit)
  declare visits: PatientVisit[];

  @HasMany(
    () =>
      require('../../automate/models/whatsapp-message.model').WhatsappMessage,
  )
  declare messages: WhatsappMessage[];

  @HasMany(
    () =>
      require('../../automate/models/feedback-request.model').FeedbackRequest,
  )
  declare feedbacks: FeedbackRequest[];
}
