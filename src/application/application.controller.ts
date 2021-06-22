import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryListType } from 'src/types/QueryListType';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { QueryApplicationDTO } from './dto/query-application.dto';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @ApiOperation({ summary: '应用列表' })
  @Get()
  getApps(@Query() query: QueryApplicationDTO): Promise<QueryListType> {
    const { page, size, creator, status } = query;
    return this.service.findAll(page, size, creator, status);
  }

  @ApiOperation({ summary: '按ID获取应用' })
  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Application> {
    const result = await this.service.getOne(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @ApiOperation({ summary: '添加应用' })
  @Post()
  create(@Body() payload: CreateApplicationDTO) {
    return this.service.create(payload);
  }

  @ApiOperation({ summary: '删除应用' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @ApiOperation({ summary: '修改应用' })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: Application) {
    return this.service.update(id, payload);
  }
}
