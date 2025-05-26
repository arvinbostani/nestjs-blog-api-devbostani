import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('احراز هویت') // Auth
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'ثبت نام کاربر جدید' }) // Register a new user
  @ApiResponse({ status: 201, description: 'کاربر با موفقیت ثبت نام شد.' }) // User successfully registered.
  @ApiResponse({
    status: 400,
    description:
      'درخواست نامعتبر (مثلاً ایمیل قبلاً وجود دارد، خطاهای اعتبارسنجی).',
  }) // Bad Request (e.g., email already exists, validation errors).
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ورود کاربر موجود' }) // Log in an existing user
  @ApiResponse({
    status: 200,
    description: 'کاربر با موفقیت وارد شد، توکن دسترسی بازگردانده می‌شود.',
  }) // User successfully logged in, returns access token.
  @ApiResponse({ status: 401, description: 'غیرمجاز (اعتبارنامه نامعتبر).' }) // Unauthorized (invalid credentials).
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
