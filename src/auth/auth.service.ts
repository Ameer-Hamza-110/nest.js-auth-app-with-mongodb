import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/model/user.model.js';
import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.input.js';
import { LoginUserDto } from './dto/login-user.input.js';
import jwt from "jsonwebtoken"

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
        await newUser.save()
        return { name: newUser.name, email: newUser.email, id: newUser._id, role: newUser.role }
    }


    async login(userData: LoginUserDto) {
        try {

            const user = await this.userModel.findOne({ email: userData.email }).select("+password")
           
            if (!user) {
                throw new NotFoundException("Invalid Email or Password")
            }
            const isMatch = await bcrypt.compare(userData.password, user.password)
            if (!isMatch) {
                throw new NotFoundException("Invalid Email or Password")
            }

            const token = jwt.sign({ sub: user._id.toString(), email: user.email }, process.env.JWT_SECRET!)

            return { access_token: token, user: { name: user.name, email: user.email, id: user._id } }

        } catch (error) {
            throw error
        }
    }
}
