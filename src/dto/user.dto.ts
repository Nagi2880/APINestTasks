import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}

export class UpdateUserDto{
  
  @IsOptional()
  username?: string;

  @IsOptional()
  password?:string;

  @IsOptional()
  mail?:string;
}