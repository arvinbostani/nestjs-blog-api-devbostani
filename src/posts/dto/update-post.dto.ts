import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({
    example: 'عنوان به‌روز شده',
    description: 'عنوان جدید برای پست وبلاگ',
  }) // New title for the blog post
  @IsOptional()
  @IsString({ message: 'عنوان باید رشته باشد' }) // Title must be a string
  @MinLength(3, { message: 'عنوان باید حداقل 3 کاراکتر باشد' }) // Title must be at least 3 characters long
  @MaxLength(255, { message: 'عنوان نمی‌تواند از 255 کاراکتر بیشتر باشد' }) // Title cannot exceed 255 characters
  title?: string;

  @ApiPropertyOptional({
    example: 'این محتوای به‌روز شده است.',
    description: 'محتوای جدید برای پست وبلاگ',
  }) // New content for the blog post
  @IsOptional()
  @IsString({ message: 'محتوا باید رشته باشد' }) // Content must be a string
  @MinLength(10, { message: 'محتوا باید حداقل 10 کاراکتر باشد' }) // Content must be at least 10 characters long
  content?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'آیا پست باید منتشر یا از حالت انتشار خارج شود',
  }) // Whether the post should be published or unpublished
  @IsOptional()
  @IsBoolean({ message: 'منتشر شده باید مقدار بولی باشد' }) // Published must be a boolean value
  published?: boolean;
}
