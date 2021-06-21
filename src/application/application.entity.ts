import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ required: false })
  @Column()
  name: string;

  @ApiProperty({
    required: false,
  })
  @Column()
  creator: string;

  @ApiProperty({
    required: false,
  })
  @Column()
  description: string;

  @ApiProperty({
    default: 0,
    required: false,
  })
  @Column()
  status: number;
}
