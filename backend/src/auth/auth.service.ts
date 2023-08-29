import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { UnauthorizedException } from '@nestjs/common';
import { Otp, OtpDocument } from './schemas/otp.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService,@InjectModel(Otp.name) private otpModel: Model<OtpDocument>,) {}
  async register(
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
  ): Promise<{ status: number; message: string }> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      return { status: 2, message: 'Username already exists' };
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
        return { status: 1, message: 'User registered successfully' };
      } catch (error) {
        console.error(error);
        return {
          status: 0,
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
      accessToken: this.jwtService.sign(payload), 
    };
  }

  async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
    
    const storedOtp = await this.otpModel.findOne({ phoneNumber });
  
    if (storedOtp && storedOtp.otp === otp) {
      // Xóa mã OTP sau khi xác thực thành công
      await this.otpModel.deleteOne({ phoneNumber });
      return true;
    }
    return false;
  }
  
  async resetPassword(phoneNumber: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findOne({ phoneNumber });
  
    if (user) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
      return true;
    }
    return false;
  }
}
