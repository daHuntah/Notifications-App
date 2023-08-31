import {Module} from "@nestjs/common";
import { MyGateway } from "./gateway"; 
import { NotificationModule } from "src/notification/notification.module"; 
@Module({
    imports: [NotificationModule],
    providers: [MyGateway],
  })
  export class GatewayModule {}