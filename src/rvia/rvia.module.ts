import { forwardRef, Module } from '@nestjs/common';
import { RviaService } from './rvia.service';
import { RviaController } from './rvia.controller';
import { ApplicationsModule } from 'src/applications/applications.module';
import { CommonModule } from 'src/common/common.module';
import { CheckmarxModule } from 'src/checkmarx/checkmarx.module';
import { WorkerService } from './worker.service';

@Module({
  controllers: [RviaController],
  providers: [RviaService, WorkerService],
  imports:[
    forwardRef(() => ApplicationsModule),
    CommonModule,
    forwardRef(() => CheckmarxModule),
  ],
  exports:[ RviaService ]
})
export class RviaModule {}
