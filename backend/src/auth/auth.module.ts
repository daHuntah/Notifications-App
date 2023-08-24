import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Thay bằng secret key của bạn
      signOptions: { expiresIn: '1h' }, // Tuỳ chọn thời hạn của token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
