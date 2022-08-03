import { User } from 'src/users/entities/user.entity';
import { IPost } from './../interfaces/posts.interface';
export class Post implements IPost {
  title: string;
  content: string;
  author: User;
}
