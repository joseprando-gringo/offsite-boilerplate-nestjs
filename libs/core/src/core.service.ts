import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {

  sayHello() {
    return 'Hello Core';
  }
}
