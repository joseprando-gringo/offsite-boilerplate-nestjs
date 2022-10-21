import {DynamicModule, Module} from '@nestjs/common';
import {ConfigService, ConfigModule} from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {RabbitmqService} from './rabbitmq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [RabbitmqService, ConfigService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
          ClientsModule.registerAsync([
            {
              name,
              useFactory: (configService: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                  // url: [configService.get<string>('RABBIT_URI')],
                  urls: ['amqp://admin:admin@localhost:5672'],
                  queue: configService.get<string>(`RABBIT_${name}_QUEUE`),
                },
              }),
              inject: [ConfigService]
            }
          ])
      ],
      exports: [ClientsModule],
    }
  }
}
