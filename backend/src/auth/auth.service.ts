import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService,) {}
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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload), // Sử dụng accessToken thay cho access_token
    };
  }
}
