import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'آدرس ایمیل کاربر',
  })
  @IsEmail({}, { message: 'فرمت ایمیل نامعتبر است' })
  @IsNotEmpty({ message: 'ایمیل الزامی است' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'رمز عبور کاربر (حداقل 6 کاراکتر)',
  })
  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  @MinLength(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'نام کامل کاربر (اختیاری)',
    required: false,
  })
  @IsString({ message: 'نام باید رشته باشد' })
  @IsNotEmpty({ message: 'نام نمی‌تواند خالی باشد' })
  name?: string;
}
