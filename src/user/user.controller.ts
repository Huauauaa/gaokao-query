import {
  Controller,
  Get,
  Query,
  Param,
  Delete,
  Post,
  Body,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  getAll(@Query('page') page, @Query('size') size): Promise<User[]> {
    return this.service.getAll(page, size);
  }

  @Get(':id')
  async getOne(@Param('id') id): Promise<User> {
    const result = await this.service.getOne(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: User) {
    return this.service.update(id, payload);
  }
}
