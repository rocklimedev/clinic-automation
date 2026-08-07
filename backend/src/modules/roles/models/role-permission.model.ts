import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import type { Role } from '../../roles/models/role.model';
import type { Permission } from './permission.model';

@Table({
  tableName: 'role_permissions',
  timestamps: false,
})
export class RolePermission extends Model<RolePermission> {
  @PrimaryKey
  @ForeignKey(() => require('./role.model').Role)
  @Column(DataType.CHAR(36))
  declare role_id: string;

  @PrimaryKey
  @ForeignKey(() => require('./permission.model').Permission)
  @Column(DataType.CHAR(36))
  declare permission_id: string;

  @BelongsTo(() => require('./role.model').Role)
  declare role: Role;

  @BelongsTo(() => require('./permission.model').Permission)
  declare permission: Permission;
}
