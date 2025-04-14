import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolService } from './rol.service';
import { PositionsController } from './rol.controller';
import { Rol } from './entities/rol.entity';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PositionsController],
  providers: [RolService],
  imports: [ 
    TypeOrmModule.forFeature([ Rol ]),
    forwardRef(() => AuthModule),
    CommonModule
  ],
  exports:[RolService]
})
export class RolModule {}
