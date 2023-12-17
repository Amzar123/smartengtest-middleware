import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { users as UserModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  async getUsers(): Promise<UserModel[]>  {
    return this.appService.users({});
  }
}
