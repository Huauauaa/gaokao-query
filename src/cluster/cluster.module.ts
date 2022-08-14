import { Module } from '@nestjs/common';
import { ClusterController } from './cluster.controller';

@Module({
  controllers: [ClusterController],
})
export class ClusterModule {}
