import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import { AuthGuard } from '../common/guards/auth.guard.js';
import { RolesGuard } from '../common/guards/roles/roles.guard.js';
import { Roles } from '../common/guards/roles/roles.decorator.js';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
@Roles("admin")
export class UserController {
    constructor(private readonly userService: UserService){}
    @Get()
    findAllUsers(){
        return this.userService.getAllUsers()
    }
}
