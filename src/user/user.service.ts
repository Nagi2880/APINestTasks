import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async CreateUser(UserDto: UserDto): Promise<User> {
    const user = new this.userModel(UserDto);
    user.creationdate = new Date();
    user.uuid = uuidv4();
    return user.save();
    }
}
