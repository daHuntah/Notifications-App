import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

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
}
