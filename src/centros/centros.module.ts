import { forwardRef, Module } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { CentrosController } from './centros.controller';
import { Centro } from './entities/centro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CentrosController],
  providers: [CentrosService],
  imports: [
    TypeOrmModule.forFeature([ Centro ]),
    forwardRef(() => AuthModule),
    CommonModule
  ],
  exports: [
    CentrosService
  ]
})
export class CentrosModule {}
