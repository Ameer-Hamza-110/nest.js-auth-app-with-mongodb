import { IsEmail, IsString, Length, } from "class-validator";


export class LoginUserDto {
    @IsEmail({}, { message: "please enter a valid email address" })
    email: string;

    @IsString()
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
    password: string;
}