import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    description: `名`,
  })
  firstName: string;

  @ApiProperty({
    description: `姓`,
  })
  lastName: string;

  @ApiProperty({ description: `年龄` })
  age: number;
}
