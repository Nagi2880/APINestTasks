import { Controller, Get } from '@nestjs/common';
import { TasksService} from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService){

  }
  @Get()
  GetAllTasks() {
    return this.tasksService.getAllTasks
  }
}
