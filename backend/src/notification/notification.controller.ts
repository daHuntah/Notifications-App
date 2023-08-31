import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAllNotifications() {
    return this.notificationService.findAll();
  }
}