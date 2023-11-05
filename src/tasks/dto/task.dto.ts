import { TaskStatus } from "../taskstatus.enum";
import { IsNotEmpty, IsEnum, MinLength,IsOptional } from 'class-validator';

export class TaskDto {
    @IsNotEmpty()
    @MinLength(3)
    title: string;
    
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}
export class UpdateTaskDto{
    
    @IsOptional()
    title?: string;
    
    @IsOptional()
    description?: string;
    
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}