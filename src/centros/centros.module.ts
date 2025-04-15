import { Module } from '@nestjs/common';
import { CentrosService } from './centros.service';
import { CentrosController } from './centros.controller';
import { Centro } from './entities/centro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CentrosController],
  providers: [CentrosService],
  imports: [
    TypeOrmModule.forFeature([ Centro ]),
  ],
})
export class CentrosModule {}
