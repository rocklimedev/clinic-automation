import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { RolePermission } from './role-permission.model';
import { Role } from '../../roles/models/role.model';

@Table({
  tableName: 'permissions',
  timestamps: false,
})
export class Permission extends Model<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  declare module: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
  })
  declare action: string;

  @Unique
  @Column({
    type: DataType.STRING(120),
    allowNull: false,
  })
  declare code: string;

  @BelongsToMany(() => Role, () => RolePermission)
  declare roles?: Role[];
}
