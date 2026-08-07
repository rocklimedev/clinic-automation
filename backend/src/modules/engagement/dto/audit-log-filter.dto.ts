import { IsOptional, IsString } from 'class-validator';

export class AuditLogFilterDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  entity?: string;

  @IsOptional()
  @IsString()
  user_id?: string;
}
