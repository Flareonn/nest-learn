import { IUser } from './../interfaces/user.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User implements IUser {
  @Prop({ required: true, immutable: true })
  login: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
