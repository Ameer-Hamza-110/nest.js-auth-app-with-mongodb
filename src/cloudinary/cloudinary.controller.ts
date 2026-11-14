
import {
  Controller,
  Get,
  UseGuards,
} from "@nestjs/common";

import { CloudinaryService } from "./cloudinary.service.js";
import { AuthGuard } from "../common/guards/auth.guard.js";
import { RolesGuard } from "../common/guards/roles/roles.guard.js";
import { Roles } from "../common/guards/roles/roles.decorator.js";


@Controller("cloudinary")
@UseGuards(AuthGuard, RolesGuard)
@Roles("admin")
export class CloudinaryController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get("signature")
  getUploadSignature() {
    return this.cloudinaryService.generateUploadSignature();
  }
}
