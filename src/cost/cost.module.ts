import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { Cost } from './entities/cost.entity';
import { CostToken } from './entities/costToken.entity';
import { RegistraTotales } from 'src/applications/entities/registra-total.entity';

@Module({
  controllers: [CostController],
  providers: [CostService],
  imports:[
    TypeOrmModule.forFeature([ Cost, CostToken, RegistraTotales ]),
  ],
  exports:[ CostService, TypeOrmModule ]
})
export class CostModule {}
