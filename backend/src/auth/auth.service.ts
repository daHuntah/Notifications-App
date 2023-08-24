import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async register(
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
  ): Promise<{ status: number; message: string }> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      return { status: 409, message: 'Username already exists' };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        username,
        password: hashedPassword,
        email,
        phoneNumber,
      });

      try {
        await newUser.save();
        return { status: 201, message: 'User registered successfully' };
      } catch (error) {
        console.error(error);
        return {
          status: 500,
          message: 'An error occurred while registering user',
        };
      }
    }
  }
}
