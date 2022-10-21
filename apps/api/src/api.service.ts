import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '@core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

@Injectable()
export class ApiService {
  constructor(private prismaService: PrismaService, @Inject('WORKER') private workerClient: ClientProxy) {}
  async getVehicle(plate: Prisma.VehicleWhereInput) {
    const vehicle = await this.prismaService.vehicle.findFirst({
      where: plate,
    })

    if (!vehicle) {
      await lastValueFrom(
          this.workerClient.emit('vai_filhao', {
            plate
          })
      )
    }

    return vehicle;
  }
}
