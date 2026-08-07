import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { RbacService } from './rbac.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';

@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  // Roles

  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.rbacService.createRole(dto);
  }

  @Get('roles')
  getRoles() {
    return this.rbacService.getRoles();
  }

  @Get('roles/:id')
  getRole(@Param('id') id: string) {
    return this.rbacService.getRole(id);
  }

  // Permissions

  @Post('permissions')
  createPermission(@Body() dto: CreatePermissionDto) {
    return this.rbacService.createPermission(dto);
  }

  @Get('permissions')
  getPermissions() {
    return this.rbacService.getPermissions();
  }

  // Assign Permissions

  @Post('roles/:id/permissions')
  assignPermissions(
    @Param('id') roleId: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.rbacService.assignPermissions(roleId, dto);
  }
}
