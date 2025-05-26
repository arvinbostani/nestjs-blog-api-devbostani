import { Controller, Get, Req, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from './users.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@ApiTags('کاربران')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'دریافت پروفایل کاربر احراز هویت شده فعلی' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'پروفایل کاربر احراز هویت شده را بازمی‌گرداند.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'غیرمجاز در صورت عدم ارائه توکن معتبر.',
  })
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
