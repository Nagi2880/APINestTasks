import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {TaskStatus} from '../tasks/taskstatus.enum'
import { User } from './user.schema';
import * as mongoose from 'mongoose';

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

    @Prop()
    uuid: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user:User
}

export const TaskSchema = SchemaFactory.createForClass(Task);
