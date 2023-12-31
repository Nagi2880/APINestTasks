import { Controller, Param, Post, Get, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from '../dto/user.dto';
import { Body as BodyDecorator } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async CreateUser(@BodyDecorator() userDto: UserDto) {
    return this.userService.CreateUser(userDto);
  }
  @Get()
  async GetAllUsers():Promise<User[]>{
    return this.userService.GetAllUsers()
  }
  @Delete('/delete/:uuid')
  async DeleteUser(@Param('uuid') uuid: string){
    return this.userService.DeleteUser(uuid)
  }
  @Patch('/update/:uuid')
  async UpdateUser(@Param('uuid') uuid: string, @BodyDecorator() updateUserDto: UpdateUserDto){
    return this.userService.UpdateUser(uuid, updateUserDto)
  }
}