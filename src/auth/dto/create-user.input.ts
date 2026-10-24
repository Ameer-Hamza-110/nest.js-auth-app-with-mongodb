import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";


export class CreateUserDto  {
    @IsString()
    @IsNotEmpty({ message: 'Name should not be empty' })
    @MinLength(3, { message: "name must me min 3 characters" })
    @MaxLength(20, { message: "name must be max 20 characters" })
    name: string;

    @IsEmail({}, { message: "please enter a valid email address" })
    email: string;

    @IsString()
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters long' })
    password: string;

    @IsString()
    @IsOptional() 
    avatar?: string;
}