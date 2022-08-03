import { IPost } from './../interfaces/posts.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from 'src/users/schemas/user.schema';

@Schema({
  timestamps: {
    createdAt: 'date',
    updatedAt: 'update',
  },
})
export class Post implements IPost {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  author: User;
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
