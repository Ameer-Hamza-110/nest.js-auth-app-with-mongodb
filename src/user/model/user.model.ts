import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;


@Schema({
    timestamps: true, versionKey: false,
})
export class User {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop()
    avatar?: string;
}


export const UserSchema = SchemaFactory.createForClass(User);

