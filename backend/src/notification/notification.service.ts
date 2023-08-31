import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
  ) {}

  async create(notification: any) {
    const createdNotification = new this.notificationModel(notification);
    return createdNotification.save();
  }

  async findAll() {
    return this.notificationModel.find().exec();
  }
}