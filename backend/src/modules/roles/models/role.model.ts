import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';

import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { RolePermission } from './role-permission.model';
import { Permission } from './permission.model';
import { UserRole } from '@/modules/users/models/user-role.model';
import { User } from '../../users/models/user.model';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(80))
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: CreationOptional<string | null>;

  @BelongsToMany(() => Permission, () => RolePermission)
  declare permissions?: Permission[];

  @BelongsToMany(() => User, () => UserRole)
  declare users?: User[];
}
