import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import {Task} from './schemas/task.schema'
import { TaskDto } from './dto/task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaskStatus } from './taskstatus.enum';


@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){}

  async createTask(createTaskDto: TaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    // Create a new instance of Task with the data from the DTO
    const task = new this.taskModel();
    task.title = title;
    task.description = description;

    // give the initial status and the creation date
    task.status = TaskStatus.PENDING;
    task.creationdate = new Date();

    // Save the task in the data base
    await task.save();

    return task;
  }
    // GetAllTaks Route
  async getAllTasks(): Promise<Task[]>{
      return this.taskModel.find().exec();
  }
}