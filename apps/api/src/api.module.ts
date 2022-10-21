import { CoreModule } from '@core/core';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {PrismaModule} from "@core/prisma";
import {RabbitmqModule} from "@core/rabbitmq";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
      CoreModule,
      PrismaModule,
      RabbitmqModule.register({
        name: 'WORKER'
      }),
      ConfigModule.forRoot({ isGlobal: true})
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
