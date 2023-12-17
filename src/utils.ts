import { ApiProperty } from "@nestjs/swagger";

export class TestData {
  @ApiProperty({ example: 12, description: 'User ID' })
  userId: string;

  @ApiProperty({ example: 'JE2NIX', description: 'Test Code' })
  testCode: string;
}

  
  export class GetDataDto {
    body: TestData[];
  }
  
  export class QueryParams {
    skip?: string;
    take?: string;
    order?: string;
  }
  