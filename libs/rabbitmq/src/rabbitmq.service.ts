import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {RmqContext, RmqOptions, Transport} from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = false): RmqOptions {
        console.log(this.configService.get<string>('RABBIT_URI'))
        return {
            transport: Transport.RMQ,
            options: {
                // urls: [this.configService.get<string>('RABBIT_URI')],
                urls: ['amqp://admin:admin@localhost:5672'],
                queue: this.configService.get<string>(`RABBIT_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        }
    }

    ack(context: RmqContext) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
}
