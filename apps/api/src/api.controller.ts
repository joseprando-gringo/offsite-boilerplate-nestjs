import {Controller, Get, Param} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('vehicle')
export class ApiController {
  constructor(
    private readonly apiService: ApiService
  ) {}

  @Get('plate/:plateNumber')
  async getHello(@Param() params: { plateNumber: string }): Promise<any> {
    const plateNumber = params.plateNumber
    return this.apiService.getVehicle({ plate: plateNumber});

  }
}
