import { TaskStatus } from "../taskstatus.enum";
import { IsNotEmpty, IsEnum } from 'class-validator';

export class TaskDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}