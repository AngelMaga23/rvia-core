import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateScanDto } from './dto/create-scan.dto';
import { Scan } from './entities/scan.entity';
import { CommonService } from 'src/common/common.service';


@Injectable()
export class ScansService {

  private readonly logger = new Logger('ScansService');

  constructor(
    @InjectRepository(Scan)
    private readonly scanRepository: Repository<Scan>,
    private readonly commonService: CommonService
  ){}

  async create(createScanDto: CreateScanDto) {
    try {
        
      const scan = this.scanRepository.create(createScanDto);
      await this.scanRepository.save(scan);

      return scan;

    } catch (error) {
      this.commonService.handleDBExceptions( error ); 
    }
  }

  findAll() {
    return this.scanRepository.find();
  }

  async findOne(id: number) {
    const scan = await this.scanRepository.findOneBy({ idu_escaneo:id });

    if( !scan )
      throw new NotFoundException(`Escaneo con ${id} no encontrado `);

    return scan; 
  }


}
