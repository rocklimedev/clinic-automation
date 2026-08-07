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

import type { WhatsappTemplate } from './whatsapp-template.model';
import type { AutomationRun } from './automation-run.model';

export enum AutomationStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
}

@Table({
  tableName: 'automations',
  timestamps: false,
})
export class Automation extends Model<Automation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: string;

  @Column(DataType.STRING(150))
  declare name: string | null;

  @Column(DataType.TEXT)
  declare description: string | null;

  /**
   * VISIT_COMPLETED
   * FEEDBACK_REMINDER
   */
  @Column(DataType.STRING(50))
  declare trigger_type: string | null;

  @Column(DataType.INTEGER)
  declare wait_hours: number | null;

  @ForeignKey(() => require('./whatsapp-template.model').WhatsappTemplate)
  @Column(DataType.CHAR(36))
  declare template_id: string | null;

  @Default(AutomationStatus.ACTIVE)
  @Column(DataType.ENUM(...Object.values(AutomationStatus)))
  declare status: AutomationStatus;

  @BelongsTo(() => require('./whatsapp-template.model').WhatsappTemplate)
  declare template: WhatsappTemplate;

  @HasMany(() => require('./automation-run.model').AutomationRun)
  declare runs: AutomationRun[];
}
