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

import { UserRole } from './user-role.model';

import type { Role } from '../../roles/models/role.model';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.CHAR(36))
  declare id: CreationOptional<string>;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare full_name: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(150))
  declare email: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  declare phone: CreationOptional<string | null>;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  declare password: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare avatar: CreationOptional<string | null>;

  @Default(UserStatus.ACTIVE)
  @Column(DataType.ENUM(...Object.values(UserStatus)))
  declare status: CreationOptional<UserStatus>;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare last_login: CreationOptional<Date | null>;

  @BelongsToMany(
    () => require('../../roles/models/role.model').Role,
    () => UserRole,
  )
  declare roles?: Role[];
}
