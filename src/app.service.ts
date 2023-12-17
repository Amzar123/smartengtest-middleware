import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

import { users as UserModel } from '@prisma/client';
import { TestData } from './utils';


@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async users(params: {
    skip?: number;
    take?: number;
    order?: string;
  }, payload : TestData[]): Promise<UserModel[]> {
    const { skip, take, order } = params;

    const conditions = payload.map(item => {
      return {
        id: parseInt(item.userId),
        test_results: {
          some: {
            test_code: item.testCode
          }
        }
      }
    })
  
    const orderBy = order && {
      [order.replace('-', '')]: order.includes('-') ? 'desc' : 'asc'
    };

    return this.prisma.users.findMany({
      where: {
        OR: conditions
      },
      include: {
        test_results: {
          include: {
            result_details: {
              include: {
                question: true
              }
            }
          }
        }
      },
      take,
      skip,
      orderBy
    });
  }

}
