import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {Task} from './schemas/task.schema'
import { TaskDto } from './dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStatus } from './taskstatus.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

  async CreateTask(createTaskDto: TaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Create a new instance of Task with the data from the DTO
    const task = new this.taskModel();
    task.title = title;
    task.description = description;

    // give the initial status, the creation date and the id
    task.status = TaskStatus.PENDING;
    task.creationdate = new Date();
    task.uuid = uuidv4() //Generate a UUID from the id 

    // Save the task in the data base
    await task.save();
      
    // Log to console when a new data is saved
    console.log(`Un nuevo dato fue guardado con el id: ${task.id}`);

    return task;
  }
  
    // GetAllTaks Route
  async getAllTasks(): Promise<Task[]>{
      return this.taskModel.find().exec();
  }
}