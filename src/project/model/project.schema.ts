import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
  })
  title: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  })
  slug: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  shortDescription: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    trim: true,
  })
  coverImage: string;

  @Prop({
    type: [String],
    default: [],
  })
  gallery: string[];

  @Prop({
    type: [String],
    required: true,
  })
  technologies: string[];

  @Prop({
    trim: true,
    default: null,
  })
  liveUrl: string | null;

  @Prop({
    trim: true,
    default: null,
  })
  githubUrl: string | null;

  @Prop({
    type: Types.ObjectId,
    ref: "User",
    required: true,
  })
  createdBy: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
