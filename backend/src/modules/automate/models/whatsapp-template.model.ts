import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
} from 'sequelize-typescript';

import type { Automation } from './automation.model';
import type { WhatsappMessage } from './whatsapp-message.model';

@Table({
  tableName: 'whatsapp_templates',
  timestamps: false,
})
export class WhatsappTemplate extends Model<WhatsappTemplate> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: string;

  @Column(DataType.STRING(100))
  declare name: string | null;

  /**
   * Exact template name registered in Meta WhatsApp Manager
   */
  @Column(DataType.STRING(120))
  declare meta_template_name: string | null;

  @Column(DataType.STRING(20))
  declare language: string | null;

  @Column(DataType.STRING(50))
  declare category: string | null;

  @Column(DataType.TEXT)
  declare body: string | null;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @HasMany(() => require('./automation.model').Automation)
  declare automations: Automation[];

  @HasMany(() => require('./whatsapp-message.model').WhatsappMessage)
  declare messages: WhatsappMessage[];
}
