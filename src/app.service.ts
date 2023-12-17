import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { users as UserModel } from '@prisma/client';


@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async users(params: {
    skip?: number;
    take?: number;
  }): Promise<UserModel[]> {
    const { skip, take } = params;
    return this.prisma.users.findMany({
      skip,
      take,
    });
  }

}
