import { forwardRef, Module } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { LeaderController } from './leader.controller';
import { Leader } from './entities/leader.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from 'src/position/position.module';
import { CentrosModule } from 'src/centros/centros.module';
import { AppAreaModule } from 'src/app-area/app-area.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [LeaderController],
  providers: [LeaderService],
  imports: [TypeOrmModule.forFeature([ Leader ]), PositionModule, CentrosModule, AppAreaModule, forwardRef(() => AuthModule),CommonModule],
  exports: [LeaderService],
})
export class LeaderModule {}
