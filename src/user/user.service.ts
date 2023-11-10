import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UserDto, UpdateUserDto } from '../dto/user.dto';
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
    //Delete a user using is Uuid in the delete route
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

  async UpdateUser(userUuid: string, updateUserDto: UpdateUserDto): Promise<any>{
    try{
      const updatedUser = await this.userModel.findOneAndUpdate(
        {uuid: userUuid}, // Find the user by the uuid
        updateUserDto, //update the user with the DTO data
        {new: true}
        );
        console.log('El usuario fue actualizado correctamente') //User has been successfully  updated
        return updatedUser;
        
      }catch(error){
        throw new Error('No se encontro el usuario con el uuid dado') // Task with that uuid not found
    }
  }
}
