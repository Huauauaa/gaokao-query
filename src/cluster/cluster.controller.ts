import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('cluster')
@Controller('cluster')
export class ClusterController {
  @ApiOperation({ summary: '所有集群' })
  @Get()
  getAll() {
    return [{ name: 'cluster' }];
  }
}
