import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { Body as BodyDecorator } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async CreateUser(@BodyDecorator() userDto: UserDto) {
    return this.userService.CreateUser(userDto);
  }
}