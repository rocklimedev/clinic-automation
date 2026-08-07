import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import type { User } from '../../users/models/user.model';
import type { Role } from '@/modules/roles/models/role.model';

@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model<UserRole> {
  @PrimaryKey
  @ForeignKey(() => require('./user.model').User)
  @Column(DataType.CHAR(36))
  declare user_id: string;

  @PrimaryKey
  @ForeignKey(() => require('../../roles/models/role.model').Role)
  @Column(DataType.CHAR(36))
  declare role_id: string;

  @BelongsTo(() => require('../../users/models/user.model').User)
  declare user: User;

  @BelongsTo(() => require('../../roles/models/role.model').Role)
  declare role: Role;
}
