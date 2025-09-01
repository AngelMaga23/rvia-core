import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { Position } from './entities/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  imports: [TypeOrmModule.forFeature([ Position ]), CommonModule],
  exports: [PositionService]
})
export class PositionModule {}
