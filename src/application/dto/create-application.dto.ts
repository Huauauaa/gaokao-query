import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDTO {
  @ApiProperty()
  name: string;

  @ApiProperty({
    required: false,
  })
  creator: string;

  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty({
    default: 0,
    required: false,
  })
  status: number;
}
