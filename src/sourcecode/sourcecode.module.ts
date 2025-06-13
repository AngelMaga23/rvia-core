import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SourcecodeService } from './sourcecode.service';
import { SourcecodeController } from './sourcecode.controller';
import { Sourcecode } from './entities/sourcecode.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SourcecodeController],
  providers: [SourcecodeService],
  imports: [
    TypeOrmModule.forFeature([ Sourcecode ]),
    CommonModule
  ],
  exports:[
    SourcecodeService
  ]
})
export class SourcecodeModule {}
