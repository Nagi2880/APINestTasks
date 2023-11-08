import { TaskStatus } from "../tasks/taskstatus.enum";
import { IsNotEmpty, IsEnum, MinLength,IsOptional } from 'class-validator';

export class TaskDto {
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    
    description: string;
}
export class UpdateTaskDto{
    
    @IsOptional()
    title?: string;
    
    @IsOptional()
    description?: string;
    
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}