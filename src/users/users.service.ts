import { PostsService } from './../posts/posts.service';
import { User, UserDocument } from './schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly postsService: PostsService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(login: string): Promise<User> {
    return await this.userModel.findOne({ login });
  }

  async update(login: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ login }, { $set: updateUserDto });
  }

  async remove(id: ObjectId) {
    await this.userModel.deleteOne({ _id: id });
    await this.postsService.removeAllByUserId(id);
  }
}
