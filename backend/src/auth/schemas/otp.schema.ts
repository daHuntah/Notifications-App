import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema()
export class Otp {
  @Prop()
  phoneNumber: string;

  @Prop()
  otp: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
