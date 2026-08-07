import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

@Table({
  tableName: 'audit_logs',
  timestamps: true,
  updatedAt: false,
})
export class AuditLog extends Model<
  InferAttributes<AuditLog>,
  InferCreationAttributes<AuditLog>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.CHAR(36),
    allowNull: true,
  })
  declare user_id: CreationOptional<string | null>;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare action: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare entity: string;

  @Column({
    type: DataType.CHAR(36),
    allowNull: true,
  })
  declare entity_id: CreationOptional<string | null>;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare old_data: CreationOptional<object | null>;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  declare new_data: CreationOptional<object | null>;

  @Column({
    type: DataType.STRING(60),
    allowNull: true,
  })
  declare ip: CreationOptional<string | null>;
}
