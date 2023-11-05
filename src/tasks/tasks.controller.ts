import { Controller, Get, Post,Patch,Delete,Param } from '@nestjs/common';
import { TasksService} from './tasks.service';
import {Task} from './schemas/task.schema'
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { Body as BodyDecorator } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){}
  
  @Get()
    async GetAllTasks(): Promise<Task[]> {
      return this.tasksService.GetAllTasks()
  }

  @Post()
    async CreateTask(@BodyDecorator() createTaskDto: TaskDto): Promise<Task>{
      return this.tasksService.CreateTask(createTaskDto);
  }
  @Delete(':uuid')
    async DeleteTask(@Param('uuid') uuid: string){
      return this.tasksService.DeleteTask(uuid)
  }
  @Delete('/text/:title')
    async deleteTaskByText(@Param('title') title: string) {
      return this.tasksService.deleteTaskByText(title);
  }
  @Patch(':uuid')
  async UpdateTask(@Param('uuid') uuid:string, @BodyDecorator() updateTaskDto: UpdateTaskDto){
    return this.tasksService.UpdateTask(uuid, updateTaskDto)
  }
} 
