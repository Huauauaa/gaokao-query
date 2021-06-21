import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDTO {
  @ApiProperty({
    description: '页码',
    required: false,
  })
  readonly page: number;

  @ApiProperty({
    description: '条数',
    required: false,
  })
  readonly size: number;
}
