import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class OtpService {
  private twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio('ACfe3d4792344ce6e3872638236cb84c5b', '253bad47024835dc075d95136db92e60');
  }

  async generateOtpCode(length: number): Promise<string> {
    const code = Math.floor(Math.random() * (10 ** length)).toString().padStart(length, '0');
    return code;
  }

  async sendOtpToPhone(phoneNumber: string, otpCode: string): Promise<void> {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your OTP code is: ${otpCode}`,
        from: '+84816936978', // Twilio phone number
        to: phoneNumber,
      });

      console.log(`OTP sent to ${phoneNumber}: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending OTP to ${phoneNumber}: ${error.message}`);
      throw new Error(`Error sending OTP`);
    }
  }
}
