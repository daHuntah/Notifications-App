import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
@Injectable()
export class OtpService {
  private twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio('ACd9f30ed1cbd7a882b82cf9ed5672fe9e', '56ed2f07c9c4a08443e9736b81319382');
    
  }



  async generateOtpCode(length: number): Promise<string> {
    const code = Math.floor(Math.random() * (10 ** length)).toString().padStart(length, '0');
 
    return code;
  }

  async sendOtpToPhone(phoneNumber: string, otpCode: string): Promise<void> {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your OTP code is: ${otpCode}`,
        from: '+17076796458',
        to: phoneNumber,
      });

      console.log(`OTP sent to ${phoneNumber}: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending OTP to ${phoneNumber}: ${error.message}`);
      throw new Error(`Error sending OTP`);
    }
  }
}
