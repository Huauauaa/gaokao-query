import { ApiProperty } from '@nestjs/swagger';

export class QueryApplicationDTO {
  @ApiProperty({
    required: false,
  })
  readonly page: number;

  @ApiProperty({
    required: false,
  })
  readonly size: number;

  @ApiProperty({
    required: false,
  })
  readonly creator: string;

  @ApiProperty({
    required: false,
  })
  readonly status: number;

  [Symbol.iterator]() {}
}
