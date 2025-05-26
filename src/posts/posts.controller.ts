import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
    name?: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

@ApiTags('پست‌ها') // Posts
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'ایجاد پست جدید' }) // Create a new post
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'پست با موفقیت ایجاد شد.',
  }) // The post has been successfully created.
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'غیرمجاز در صورت عدم ارائه توکن معتبر.',
  }) // Unauthorized if no valid token is provided.
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'درخواست نامعتبر (خطاهای اعتبارسنجی).',
  }) // Bad Request (validation errors).
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.postsService.create(createPostDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'بازیابی همه پست‌ها' }) // Retrieve all posts
  @ApiQuery({
    name: 'published',
    required: false,
    type: Boolean,
    description: 'فیلتر پست‌ها بر اساس وضعیت انتشار',
  }) // Filter posts by published status
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'آرایه‌ای از پست‌ها را بازمی‌گرداند.',
  }) // Returns an array of posts.
  async findAll(@Query('published') published?: string) {
    const publishedFilter =
      published !== undefined ? published === 'true' : undefined;
    return this.postsService.findAll(publishedFilter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'بازیابی یک پست بر اساس شناسه' }) // Retrieve a single post by ID
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'یک پست را بازمی‌گرداند.',
  }) // Returns a single post.
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'پست یافت نشد.' }) // Post not found.
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'به‌روزرسانی یک پست موجود بر اساس شناسه' }) // Update an existing post by ID
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'پست با موفقیت به‌روزرسانی شد.',
  }) // The post has been successfully updated.
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'غیرمجاز (توکن نامعتبر یا عدم نویسندگی پست).',
  }) // Unauthorized (invalid token or not post author).
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'پست یافت نشد.' }) // Post not found.
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'درخواست نامعتبر (خطاهای اعتبارسنجی).',
  }) // Bad Request (validation errors).
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.postsService.update(+id, updatePostDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'حذف یک پست بر اساس شناسه' }) // Delete a post by ID
  @ApiResponse({ status: HttpStatus.OK, description: 'پست با موفقیت حذف شد.' }) // The post has been successfully deleted.
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'غیرمجاز (توکن نامعتبر یا عدم نویسندگی پست).',
  }) // Unauthorized (invalid token or not post author).
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'پست یافت نشد.' }) // Post not found.
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.postsService.remove(+id, req.user.id);
  }
}
