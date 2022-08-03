import { ObjectId } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export interface IPost {
  title: string;
  content: string;
  author: User;
}

export interface IAuthorPost {
  author: ObjectId;
  title: string;
}
