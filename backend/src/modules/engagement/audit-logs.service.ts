import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { AuditLog } from './models/audit-log.model';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { AuditLogFilterDto } from './dto/audit-log-filter.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectModel(AuditLog)
    private readonly auditLogModel: typeof AuditLog,
  ) {}

  async create(dto: CreateAuditLogDto) {
    return this.auditLogModel.create(dto);
  }

  async findAll(filter: AuditLogFilterDto) {
    const where: any = {};

    if (filter.action) {
      where.action = {
        [Op.like]: `%${filter.action}%`,
      };
    }

    if (filter.entity) {
      where.entity = filter.entity;
    }

    if (filter.user_id) {
      where.user_id = filter.user_id;
    }

    return this.auditLogModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string) {
    const log = await this.auditLogModel.findByPk(id);

    if (!log) {
      throw new NotFoundException('Audit log not found');
    }

    return log;
  }

  async remove(id: string) {
    const log = await this.auditLogModel.findByPk(id);

    if (!log) {
      throw new NotFoundException('Audit log not found');
    }

    await log.destroy();

    return {
      message: 'Audit log deleted successfully',
    };
  }
}
