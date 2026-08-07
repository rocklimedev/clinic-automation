import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuditLogDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsString()
  action!: string;

  @IsString()
  entity!: string;

  @IsOptional()
  @IsUUID()
  entity_id?: string;

  @IsOptional()
  @IsObject()
  old_data?: object;

  @IsOptional()
  @IsObject()
  new_data?: object;

  @IsOptional()
  @IsString()
  ip?: string;
}
