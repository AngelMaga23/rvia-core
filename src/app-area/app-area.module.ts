import { Module } from '@nestjs/common';
import { AppAreaService } from './app-area.service';
import { AppAreaController } from './app-area.controller';

@Module({
  controllers: [AppAreaController],
  providers: [AppAreaService],
})
export class AppAreaModule {}
