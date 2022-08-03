import { isValidObjectId } from 'mongoose';
import { IAuthorPost } from './../posts/interfaces/posts.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NotFoundException } from '../exceptions/not-found.exception';

export const AuthorPost = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IAuthorPost => {
    const { params } = ctx.switchToHttp().getRequest();
    if (!isValidObjectId(params.author)) {
      throw new NotFoundException('Такого пользователя не существует!');
    }
    return {
      author: params.author,
      title: params.title,
    } as IAuthorPost;
  },
);
