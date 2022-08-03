import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export default class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['login'] as const),
) {
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsString()
  name?: string;
}
