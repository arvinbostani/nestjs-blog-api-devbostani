import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'آدرس ایمیل کاربر',
  })
  @IsEmail({}, { message: 'فرمت ایمیل نامعتبر است' })
  @IsNotEmpty({ message: 'ایمیل الزامی است' })
  email: string;

  @ApiProperty({ example: 'Password123!', description: 'رمز عبور کاربر' })
  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  password: string;
}
