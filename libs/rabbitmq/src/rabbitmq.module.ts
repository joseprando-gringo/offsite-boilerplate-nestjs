import {DynamicModule, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {RabbitmqService} from './rabbitmq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RabbitmqService],
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
                  url: [configService.get<string>('RABBIT_URL')],
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
