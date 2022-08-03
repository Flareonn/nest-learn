import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends Post {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @Type(() => User)
  author: User;
}
