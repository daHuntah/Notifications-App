import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop()
  title: string;

  @Prop()
  status: string;

  @Prop()
  content: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);