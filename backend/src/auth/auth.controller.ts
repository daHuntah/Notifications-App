import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { OtpService } from './otp.service';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly otpService: OtpService,) {}

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
  @Post('send')
  async sendOtp(@Body() body: { phoneNumber: string }) {
    const { phoneNumber } = body;
    const otpCode = await this.otpService.generateOtpCode(6); // Độ dài mã OTP
    await this.otpService.sendOtpToPhone(phoneNumber, otpCode);

    return {
      message: 'OTP sent successfully',
    };
  }
}
