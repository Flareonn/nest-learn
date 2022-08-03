import { IAuthorPost } from './interfaces/posts.interface';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  async create(createPostDto: CreatePostDto) {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async findAllByUserId(author: ObjectId): Promise<Post[]> {
    return await this.postModel.find({ author });
  }

  async findOne(post: IAuthorPost): Promise<Post> {
    return await this.postModel.findOne(post);
  }

  update(post: IAuthorPost, updatePostDto: UpdatePostDto) {
    return this.postModel.findOneAndUpdate(
      post,
      {
        $set: updatePostDto,
      },
      {
        new: true,
      },
    );
  }

  async removeAllByUserId(author: ObjectId) {
    return await this.postModel.deleteMany({ author });
  }

  removeOne(author: IAuthorPost) {
    return this.postModel.findOneAndDelete(author);
  }

  async clear() {
    return await this.postModel.deleteMany();
  }
}
