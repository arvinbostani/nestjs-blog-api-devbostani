import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'اولین پست وبلاگ من',
    description: 'عنوان پست وبلاگ',
  }) // Title of the blog post
  @IsString({ message: 'عنوان باید رشته باشد' }) // Title must be a string
  @IsNotEmpty({ message: 'عنوان الزامی است' }) // Title is required
  @MinLength(3, { message: 'عنوان باید حداقل 3 کاراکتر باشد' }) // Title must be at least 3 characters long
  @MaxLength(255, { message: 'عنوان نمی‌تواند از 255 کاراکتر بیشتر باشد' }) // Title cannot exceed 255 characters
  title: string;

  @ApiProperty({
    example: 'این محتوای شگفت‌انگیز اولین پست من است.',
    description: 'محتوای پست وبلاگ',
  }) // Content of the blog post
  @IsString({ message: 'محتوا باید رشته باشد' }) // Content must be a string
  @IsNotEmpty({ message: 'محتوا الزامی است' }) // Content is required
  @MinLength(10, { message: 'محتوا باید حداقل 10 کاراکتر باشد' }) // Content must be at least 10 characters long
  content: string;

  @ApiProperty({
    example: true,
    description: 'آیا پست باید بلافاصله منتشر شود',
    required: false,
    default: false,
  }) // Whether the post should be published immediately
  @IsOptional()
  @IsBoolean({ message: 'منتشر شده باید مقدار بولی باشد' }) // Published must be a boolean value
  published?: boolean;
}
