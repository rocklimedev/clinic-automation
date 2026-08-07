import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import * as bcrypt from 'bcrypt';

import { User } from './models/user.model';
import { Role } from '../roles/models/role.model';
import { UserRole } from './models/user-role.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(Role)
    private readonly roleModel: typeof Role,

    @InjectModel(UserRole)
    private readonly userRoleModel: typeof UserRole,
  ) {}

  async create(dto: CreateUserDto) {
    const exists = await this.userModel.findOne({
      where: { email: dto.email },
    });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
      ...dto,
      password,
    });

    if (dto.roleIds?.length) {
      const roles = await this.roleModel.findAll({
        where: {
          id: dto.roleIds,
        },
      });

      await user.$set('roles', roles);
    }

    return this.findOne(user.id);
  }

  async findAll() {
    return this.userModel.findAll({
      include: [Role],
      attributes: {
        exclude: ['password'],
      },
    });
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id, {
      include: [Role],
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    await user.update(dto);

    if (dto.roleIds) {
      const roles = await this.roleModel.findAll({
        where: {
          id: dto.roleIds,
        },
      });

      await user.$set('roles', roles);
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();

    return {
      message: 'User deleted successfully',
    };
  }
}
