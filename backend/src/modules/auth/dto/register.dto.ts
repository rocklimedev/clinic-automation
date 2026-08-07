import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

import { UserStatus } from '../../users/models/user.model';

export class RegisterDto {
  @IsString()
  @Length(2, 150)
  full_name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  phone?: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
