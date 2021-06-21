import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: `first name`,
    required: false,
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: `last name`,
    required: false,
  })
  @Column()
  lastName: string;

  @ApiProperty({
    default: 1,
    required: false,
  })
  @Column()
  age: number;
}
