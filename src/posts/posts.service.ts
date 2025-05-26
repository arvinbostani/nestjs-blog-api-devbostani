import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: number): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  }

  async findAll(published?: boolean): Promise<Post[]> {
    const where = published !== undefined ? { published } : {};
    return this.prisma.post.findMany({
      where,
      include: { author: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    authorId: number,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== authorId) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  }

  async remove(id: number, authorId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    if (post.authorId !== authorId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }

    return this.prisma.post.delete({
      where: { id },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  }
}
