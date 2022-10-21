import { CoreService } from '@core/core';
import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly coreService: CoreService) {}

  @Get()
  getHello(): string {
    return this.coreService.sayHello();
    // return this.apiService.getHello();
  }
}
