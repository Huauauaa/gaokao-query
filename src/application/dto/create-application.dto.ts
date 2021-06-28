import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateApplicationDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString({
    message: '必须是字符串',
  })
  @ApiProperty({
    required: false,
  })
  creator: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty({
    default: 0,
    required: false,
  })
  @IsInt()
  @IsOptional()
  status: number;
}
