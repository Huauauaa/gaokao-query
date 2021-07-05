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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { DeleteResult } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { QueryUserDTO } from './dto/query-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: '获取用户列表' })
  @Get()
  @Roles('admin')
  getAll(@Query() query: QueryUserDTO): Promise<User[]> {
    const { page, size } = query;
    return this.service.getAll(page, size);
  }

  @ApiOperation({ summary: '按ID获取用户' })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<User> {
    const result = await this.service.getOne(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @ApiOperation({ summary: '按ID删除用户' })
  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: '添加用户' })
  @Post()
  @SetMetadata('roles', ['admin'])
  create(@Body() user: CreateUserDTO) {
    return this.service.create(user);
  }

  @ApiOperation({ summary: '修改用户' })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: User) {
    return this.service.update(id, payload);
  }
}
