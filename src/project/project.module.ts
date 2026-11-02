import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller.js';
import { ProjectService } from './project.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './model/project.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
