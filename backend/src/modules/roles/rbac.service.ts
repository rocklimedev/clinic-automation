import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { Role } from '../roles/models/role.model';
import { Permission } from './models/permission.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';

@Injectable()
export class RbacService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role,

    @InjectModel(Permission)
    private readonly permissionModel: typeof Permission,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const exists = await this.roleModel.findOne({
      where: { name: dto.name },
    });

    if (exists) {
      throw new BadRequestException('Role already exists');
    }

    return this.roleModel.create(dto);
  }

  async getRoles() {
    return this.roleModel.findAll({
      include: [Permission],
    });
  }

  async createPermission(dto: CreatePermissionDto) {
    const exists = await this.permissionModel.findOne({
      where: { code: dto.code },
    });

    if (exists) {
      throw new BadRequestException('Permission already exists');
    }

    return this.permissionModel.create(dto);
  }

  async getPermissions() {
    return this.permissionModel.findAll();
  }

  async assignPermissions(roleId: string, dto: AssignPermissionsDto) {
    const role = await this.roleModel.findByPk(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissions = await this.permissionModel.findAll({
      where: {
        id: dto.permissionIds,
      },
    });

    await role.$set('permissions', permissions);

    return this.getRole(roleId);
  }

  async getRole(id: string) {
    const role = await this.roleModel.findByPk(id, {
      include: [Permission],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
