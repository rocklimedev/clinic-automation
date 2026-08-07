import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../users/models/user.model';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userModel.findOne({
      where: {
        email: dto.email,
      },
    });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.userModel.create({
      full_name: dto.full_name,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user);

    return {
      success: true,
      message: 'Registration successful',
      user: await this.sanitizeUser(user),
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({
      where: {
        email: dto.email,
      },
      include: { all: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    await user.update({
      last_login: new Date(),
    });

    const tokens = await this.generateTokens(user);

    return {
      success: true,
      user: await this.sanitizeUser(user),
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const user = await this.userModel.findByPk(payload.sub, {
        include: { all: true },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async me(id: string) {
    const user = await this.userModel.findByPk(id, {
      include: { all: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.sanitizeUser(user);
  }

  async logout(id: string) {
    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(dto.oldPassword, user.password);

    if (!valid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const password = await bcrypt.hash(dto.newPassword, 12);

    await user.update({
      password,
    });

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles?.map((role) => role.name) || [],
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private sanitizeUser(user: User) {
    const { password, ...data } = user.toJSON();

    return data;
  }
}
