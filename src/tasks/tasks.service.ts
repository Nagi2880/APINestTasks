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

    // Crear una nueva instancia de Task con los datos del DTO
    const task = new this.taskModel();
    task.title = title;
    task.description = description;

    // Asignar el status inicial y la fecha de creación
    task.status = TaskStatus.PENDING;
    task.creationdate = new Date();

    // Guardar la tarea en la base de datos
    await task.save();

    return task;
  }

  async getAllTasks(): Promise<Task[]>{
      return this.taskModel.find().exec();
  }
}