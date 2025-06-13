import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSourcecodeDto } from './dto/create-sourcecode.dto';
import { Sourcecode } from './entities/sourcecode.entity';
import { CommonService } from 'src/common/common.service';


@Injectable()
export class SourcecodeService {

  private readonly logger = new Logger('SourcecodeService');

  constructor(
    @InjectRepository(Sourcecode)
    private readonly sourceCodeRepository: Repository<Sourcecode>,
    private readonly commonService: CommonService 
  ){}

  async create(createSourcecodeDto: CreateSourcecodeDto) {
    try {
        
      const source = this.sourceCodeRepository.create(createSourcecodeDto);
      await this.sourceCodeRepository.save(source);

      return source;

   } catch (error) {

      this.commonService.handleDBExceptions( error );
   }
  }

  findAll() {
    return this.sourceCodeRepository.find();
  }

  async findOne(id: number) {
    const source = await this.sourceCodeRepository.findOneBy({ idu_codigo_fuente:id });

    if( !source )
      throw new NotFoundException(`Código Fuente ${id} no encontrado `);

    return source; 
  }

}
