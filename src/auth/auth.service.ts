import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/model/user.model.js';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.input.js';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


    async create(userData: CreateUserDto) {
        const user = await this.userModel.findOne({ email: userData.email })
        if (user) {
            throw new ConflictException("User already Exists")
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        const newUser = new this.userModel({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        })
        return await newUser.save()
    }
}
