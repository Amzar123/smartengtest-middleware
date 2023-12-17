import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { users as UserModel } from '@prisma/client';
import { ApiBody, ApiProperty, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { GetDataDto, QueryParams, TestData } from './utils';



@Controller()
@ApiTags()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/users')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        body: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              userId: {
                type: 'string',
                example: '12'
              },
              testCode: {
                type: 'string',
                example: 'JE2NIX'
              }
            }
          }
        }
      }
    }
  })

  @ApiQuery({ name: 'skip', description: 'Number of records to skip', type: String, required: false })
  @ApiQuery({ name: 'take', description: 'Number of records to take', type: String, required: false })
  @ApiQuery({ name: 'order', description: 'Sorting order (e.g., "field1,-field2")', type: String, required: false })
  async getUsers(@Body() getDataDto: GetDataDto, @Query() queryParams: QueryParams): Promise<UserModel[]>  {
    
    const queryParse = {
      skip: queryParams.skip ? parseInt(queryParams.skip) : undefined,
      take: queryParams.take ? parseInt(queryParams.take) : undefined,
      order: queryParams.order ? queryParams.order : undefined,
    }

    return this.appService.users({
      ...queryParse}, getDataDto.body);
  }
}
