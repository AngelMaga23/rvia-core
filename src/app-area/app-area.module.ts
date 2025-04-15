import { Module } from '@nestjs/common';
import { AppAreaService } from './app-area.service';
import { AppAreaController } from './app-area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppArea } from './entities/app-area.entity';

@Module({
  controllers: [AppAreaController],
  providers: [AppAreaService],
  imports: [ TypeOrmModule.forFeature([ AppArea ]) ],
  exports: [ AppAreaService ],
})
export class AppAreaModule {}
