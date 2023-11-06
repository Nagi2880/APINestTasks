import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TaskStatus } from "../taskstatus.enum";

export type UserDocument = HydratedDocument<User>
@Schema()
export class User {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    mail: string;

    @Prop({ required: true })
    creationdate: Date;

    @Prop({})
    uuid: String
}