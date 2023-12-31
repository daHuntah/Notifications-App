import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
  ) {}

  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      phoneNumber: string;
    },
  ) {
    const { username, password, email, phoneNumber } = body;
    const result = await this.authService.register(
      username,
      password,
      email,
      phoneNumber,
    );

    return {
      status: result.status,
      message: result.message,
    };
  }
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    try {
      const { username, password } = body;
      const result = await this.authService.login(username, password);
      return {
        status: 1,
        message: 'Login successful',
        data: result, // Trả về dữ liệu phản hồi từ AuthService
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return {
          status: 2,
          message: 'Invalid credentials',
        };
      }
      throw error;
    }
  }

  @Post('token')
  authenticateToken(@Req() req: Request) {
    //  xác thực token và xử lý logic xác thực

    const token = req.body.token; // Lấy token từ body của yêu cầu

    if (!token) {
      console.log('Token not provided');
      return { status: 0, message: 'Unauthorized' };
    }

    try {
      // Giải mã token và kiểm tra tính hợp lệ

      const decodedToken = jwt.verify(token, 'your_secret_key');
      console.log('Authentication successful');
      // Xác thực thành công, trả về thông tin người dùng hoặc phản hồi thành công
      return {
        status: 1,
        message: 'OK',
        user: decodedToken,
      };
    } catch (error) {
      console.error('Authentication failed:', error);
      // Xác thực không thành công, trả về phản hồi lỗi
      return {
        status: 2,
        message: 'Unauthorized',
      };
    }
  }

  @Post('send')
  async sendOtp(@Body() body: { phoneNumber: string }) {
    const { phoneNumber } = body;
    const otpCode = await this.otpService.generateOtpCode(6);
    await this.otpService.sendOtpToPhone(phoneNumber, otpCode);
    return {
      message: 'OTP sent successfully',
    };
  }
  @Post('verify-otp')
  async verifyOtp(@Body() body: { phoneNumber: string; otp: string }) {
    const { phoneNumber, otp } = body;

    const isValid = await this.authService.verifyOtp(phoneNumber, otp);

    if (isValid) {
      return {
        statusCode: 200,
        message: 'OTP verified successfully',
      };
    } else {
      return {
        statusCode: 400,
        message: 'Invalid OTP',
      };
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body() body: { phoneNumber: string; newPassword: string },
  ) {
    const success = await this.authService.resetPassword(
      body.phoneNumber,
      body.newPassword,
    );

    if (success) {
      return {
        statusCode: 200,
        message: 'Password reset successful',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Failed to reset password',
      };
    }
  }
}
