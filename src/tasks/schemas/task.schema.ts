import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {TaskStatus} from '../taskstatus.enum'
export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop()
  creationdate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
