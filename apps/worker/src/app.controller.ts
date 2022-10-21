import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {RabbitmqService} from "@core/rabbitmq";
import {Ctx, EventPattern, Payload, RmqContext} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly rmqService: RabbitmqService) {}

  @EventPattern('vai_filhao')
  async handleEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('chegou aqui ', data);
    this.rmqService.ack(context);
  }
}
