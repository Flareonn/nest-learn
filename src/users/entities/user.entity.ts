import { IUser } from './../interfaces/user.interface';
export class User implements IUser {
  name: string;
  login: string;
  password: string;
}
