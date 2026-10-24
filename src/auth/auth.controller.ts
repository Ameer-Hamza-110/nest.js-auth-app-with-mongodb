import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.input.js';
import { LoginUserDto } from './dto/login-user.input.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async signup(@Body() data: CreateUserDto) {
        return await this.authService.create(data)
    }


    @Post('login')
    async login(@Body() data: LoginUserDto) {
        return await this.authService.login(data)
    }
}
