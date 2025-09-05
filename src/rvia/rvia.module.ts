import { forwardRef, Module } from '@nestjs/common';
import { RviaService } from './rvia.service';
import { RviaController } from './rvia.controller';
import { ApplicationsModule } from 'src/applications/applications.module';
import { CommonModule } from 'src/common/common.module';
import { CheckmarxModule } from 'src/checkmarx/checkmarx.module';
import { WorkerService } from './worker.service';
import { Cost } from 'src/cost/entities/cost.entity';
import { CostModule } from 'src/cost/cost.module';

@Module({
  controllers: [RviaController],
  providers: [RviaService, WorkerService],
  imports:[
    forwardRef(() => ApplicationsModule),
    CommonModule,
    forwardRef(() => CheckmarxModule),
    CostModule
  ],
  exports:[ RviaService ]
})
export class RviaModule {}
