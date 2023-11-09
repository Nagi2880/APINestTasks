import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    //Create and set the uuid and the creationdate of the user
  async CreateUser(UserDto: UserDto): Promise<User> {
    const user = new this.userModel(UserDto);
    user.creationdate = new Date();
    user.uuid = uuidv4();
    return user.save();
    }

    //Get all users
  async GetAllUsers():Promise<User[]>{
    return this.userModel.find().exec();
  }

  async DeleteUser(userUuid: string): Promise<any>{
    try {
      const deleteUser = await this.userModel.findOneAndDelete({ uuid: userUuid });
      if (!deleteUser) {
        throw new Error('No se encontró ningun usuario con el UUID proporcionado');
      }
      return { message: 'Usuerio eliminada exitosamente' };
    } catch (error) {
      throw new Error('Hubo un error al intentar eliminar el usuario');
    }
  }
}
