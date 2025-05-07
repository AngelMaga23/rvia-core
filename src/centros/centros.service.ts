import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';
import { Centro } from './entities/centro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CentrosService {

  private readonly logger = new Logger('CentrosService');

  constructor(
    @InjectRepository(Centro)
    private readonly centroRepository: Repository<Centro>,

  ){}

  create(createCentroDto: CreateCentroDto) {
    return 'This action adds a new centro';
  }

  async findAll() {

    try {

      const centros = await this.centroRepository.find({
        select: ['num_centro', 'nom_centro'],
      });

      return centros;

    } catch (error) {
      this.handleDBExceptions( error );
    }

  }

  async findOne(id: number) {
    try {
      const centro = await this.centroRepository.findOne({
        where: { num_centro: id },
        select: ['num_centro', 'nom_centro'],
      });
   
      return {
        numero: centro.num_centro,
        nombre: centro.nom_centro,
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  

  update(id: number, updateCentroDto: UpdateCentroDto) {
    return `This action updates a #${id} centro`;
  }

  remove(id: number) {
    return `This action removes a #${id} centro`;
  }

    private handleDBExceptions( error:any ){
      if( error.code === '23505' )
        throw new BadRequestException(error.detail);
  
      this.logger.error(error);
      throw new InternalServerErrorException("Unexpected error, check server logs");
    }
}
