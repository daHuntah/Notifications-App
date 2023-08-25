import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
        statusCode: 1,
        message: 'Login successful',
        data: result, // Trả về dữ liệu phản hồi từ AuthService
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return {
          statusCode: 2,
          message: 'Invalid credentials',
        };
      }
      throw error;
    }
  }
}
