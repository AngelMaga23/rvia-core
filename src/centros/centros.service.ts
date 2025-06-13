import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';
import { Centro } from './entities/centro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CentrosService {

  private readonly logger = new Logger('CentrosService');

  constructor(
    @InjectRepository(Centro)
    private readonly centroRepository: Repository<Centro>,
    private readonly commonService: CommonService,

  ){}

  async create(createCentroDto: CreateCentroDto) {
    try {
        

      const centro = this.centroRepository.create(createCentroDto);
      await this.centroRepository.save(centro);

      return centro;

   } catch (error) {

      this.commonService.handleDBExceptions( error );
   }
  }

  async findAll() {

    try {

      const centros = await this.centroRepository.find({
        select: ['num_centro', 'nom_centro'],
      });

      return centros;

    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }

  }

  async findOne(id: number) {
    try {
      const centro = await this.centroRepository.findOne({
        where: { num_centro: id },
        select: ['num_centro', 'nom_centro'],
      });
   
      return {
        num_centro: centro.num_centro,
        nom_centro: centro.nom_centro,
      };
    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }
  }
  

  update(id: number, updateCentroDto: UpdateCentroDto) {
    return `This action updates a #${id} centro`;
  }

  remove(id: number) {
    return `This action removes a #${id} centro`;
  }
}
