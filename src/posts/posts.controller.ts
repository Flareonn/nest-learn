import { IAuthorPost } from './interfaces/posts.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthorPost } from 'src/decorators/author-post.decorator';
import { NotFoundException } from 'src/exceptions/not-found.exception';
import { ObjectId } from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':author')
  findAllByUserId(@Param('author') author: ObjectId) {
    return this.postsService.findAllByUserId(author);
  }

  @Get(':author/:title')
  async findOne(@AuthorPost() authorPost: IAuthorPost) {
    return this.returnIfExist(await this.postsService.findOne(authorPost));
  }

  @Patch(':author/:title')
  async update(
    @AuthorPost() authorPost: IAuthorPost,
    @Body(new ValidationPipe({ whitelist: true })) updatePostDto: UpdatePostDto,
  ) {
    return this.returnIfExist(
      await this.postsService.update(authorPost, updatePostDto),
    );
  }

  @Delete(':author')
  removeAllByUserId(@Param('author') author: ObjectId) {
    return this.postsService.removeAllByUserId(author);
  }

  @Delete(':author/:title')
  async removeOne(@AuthorPost() authorPost: IAuthorPost) {
    return this.returnIfExist(await this.postsService.removeOne(authorPost));
  }

  @Delete()
  removeAll() {
    return this.postsService.clear();
  }

  private returnIfExist(post: any): void {
    if (!post) {
      throw new NotFoundException('Такого поста не существует!');
    }
    return post;
  }
}
