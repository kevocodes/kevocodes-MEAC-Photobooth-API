import { Module } from '@nestjs/common';
import { PhotographiesController } from './photographies.controller';
import { PhotographiesService } from './photographies.service';

@Module({
  controllers: [PhotographiesController],
  providers: [PhotographiesService]
})
export class PhotographiesModule {}
