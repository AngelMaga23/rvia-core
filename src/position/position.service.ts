import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {

  private readonly logger = new Logger('PuestosService');

  @InjectRepository(Position)
  private readonly puestosRepository: Repository<Position>

  create(createPositionDto: CreatePositionDto) {
    return 'This action adds a new position';
  }

  async findAll() {
    try {

      const puestos = await this.puestosRepository.find();


      return puestos;

    } catch (error) {
      this.handleDBExceptions( error );
     
    }
  }

  async findOne(id: number) {

    try {

      const puesto = await this.puestosRepository.findOneBy({ idu_puesto:id });

      if( !puesto ){
        throw new NotFoundException(`Puesto con ${id} no encontrado `);
      }

      return puesto;

    } catch (error) {
      this.handleDBExceptions( error );
     
    }

    return `This action returns a #${id} position`;
  }

  async findByLevel(num_puesto: number) {

    try {

      const puesto = await this.puestosRepository.findOneBy({ num_puesto:num_puesto });

      if( !puesto ){
        throw new NotFoundException(`Puesto con ${puesto} no encontrado `);
      }

      return puesto;

    } catch (error) {
      this.handleDBExceptions( error );
     
    }
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }


  private handleDBExceptions( error:any ){
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException("Unexpected error, check server logs");
  }

}
