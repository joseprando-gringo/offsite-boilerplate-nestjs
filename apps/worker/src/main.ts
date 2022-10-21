import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RabbitmqService} from "@core/rabbitmq";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RabbitmqService>(RabbitmqService);
  app.connectMicroservice(rmqService.getOptions('WORKER'))
  await app.startAllMicroservices();
}
bootstrap();
