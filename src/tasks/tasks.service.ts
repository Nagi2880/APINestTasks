import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {Task, TaskDocument} from '../schemas/task.schema'
import { TaskDto, UpdateTaskDto } from '../dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStatus } from './taskstatus.enum';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

  async CreateTask(createTaskDto: TaskDto, userId: string): Promise<Task> {
    const { title, description } = createTaskDto;
    
    // Find the user in the database
    const user = await this.userModel.findOne({ uuid: userId });
    if (!user) {
      throw new Error('No se encontro el usuario');
    }

    // Create a new instance of Task with the data from the DTO
    const task = new this.taskModel();
    task.title = title;
    task.description = description;

    // give the initial status, the creation date and the id
    task.status = TaskStatus.PENDING;
    task.creationdate = new Date();
    task.uuid = uuidv4() //Generate a UUID from the id 

    // Assign the user to the task
    task.user = user;

    // Save the task in the data base
    await task.save();
      
    // Log to console when a new data is saved
    console.log(`Un nuevo dato fue guardado con el id: ${task.id}`);

    return task;
  }
  
    // GetAllTaks Route
  async GetAllTasksByUser(userId: string): Promise<Task[]>{
      return this.taskModel.find().populate('user','username uuid' ).exec();
  }

  // Delete Route by uuid
  async DeleteTask(taskUuid: string): Promise<any>{
    try {
      const deletedTask = await this.taskModel.findOneAndDelete({ uuid: taskUuid });
      if (!deletedTask) {
        throw new Error('No se encontró ninguna tarea con el UUID proporcionado');
      }
      return { message: 'Tarea eliminada exitosamente' };
    } catch (error) {
      throw new Error('Hubo un error al intentar eliminar la tarea');
    }
  }
  // Delete Route using the title 
  async deleteTaskByText(taskTitle: string): Promise<any> {
    try {
      const deletedTask = await this.taskModel.findOneAndDelete({ title: taskTitle });
      if (!deletedTask) {
        throw new Error('No se encontró ninguna tarea con el título proporcionado');
      }
      return { message: 'Tarea eliminada exitosamente' };
    } catch (error) {
      throw new Error('Hubo un error al intentar eliminar la tarea');
    }
  }
  //Update Patch Route
  async UpdateTask(taskuuid: string, updateTaskDto: UpdateTaskDto): Promise<any>{
    try{
      const updatedTask = await this.taskModel.findOneAndUpdate(
        {uuid: taskuuid}, // Find the task by the uuid
        updateTaskDto, //update the task with the DTO data
        {new: true}
        );
        console.log('La tarea fue modificada correctamente') //The task has been successfully  updated
        return updatedTask;
        
      }catch(error){
        throw new Error('No se encontro la tarea con el uuid dado') // Task with that uuid not found
    }
  }
}
