import { Module } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { LeaderController } from './leader.controller';
import { Leader } from './entities/leader.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from 'src/position/position.module';

@Module({
  controllers: [LeaderController],
  providers: [LeaderService],
  imports: [TypeOrmModule.forFeature([ Leader ]), PositionModule],
})
export class LeaderModule {}
