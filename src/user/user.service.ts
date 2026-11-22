import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.model.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    if (users.length === 0) {
      throw new NotFoundException('No user found');
    }

    return users;
  }
}