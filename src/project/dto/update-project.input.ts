import { CreateProjectDto } from "./create-project.input.js";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
