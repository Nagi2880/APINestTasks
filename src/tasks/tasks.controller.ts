import { Controller, Get, Post, Put } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task} from './schemas/task.schema'
import { TaskDto } from './dto/task.dto';
import { Body as BodyDecorator } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}
  
  @Get()
  async GetAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks()
  }

  @Post()
  async CreateTask(@BodyDecorator() createTaskDto: TaskDto): Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  @Put()
  async EditTask(){
    
  }
}
