import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leader } from './entities/leader.entity';
import { Repository } from 'typeorm';
import { PositionService } from 'src/position/position.service';
import { Position } from 'src/position/entities/position.entity';

@Injectable()
export class LeaderService {

  private readonly logger = new Logger('EncargadosService');

  constructor(
    @InjectRepository(Leader)
    private readonly leaderRepository: Repository<Leader>,
    private readonly puestosService: PositionService,
  ){} 

  async create(createLeaderDto: CreateLeaderDto) {

    try {

      const encargado= this.leaderRepository.create(createLeaderDto);

      await this.leaderRepository.save(encargado);

      return encargado;
    } catch (error) {
      this.handleDBExceptions( error );
    }

  }

  findAll() {
    try {

      const encargado = this.leaderRepository.find();
      return encargado;

    } catch (error) {
      this.handleDBExceptions( error );
    }
  }

  async findByLevel(id: number) {

    const puestoSelect = await this.puestosService.findOne(id);

    const nivelSuperior = (puestoSelect as Position).num_puesto - 1;

    const puestoSuperior = await this.puestosService.findByLevel(nivelSuperior);

    const encargados = await this.leaderRepository.find({
      where: { num_puesto: puestoSuperior.idu_puesto },
      select: ['idu_encargado', 'num_empleado', 'nom_empleado']
    });

    return encargados;
  }

  async update(id: number, updateLeaderDto: UpdateLeaderDto) {

    const encargado = await this.leaderRepository.preload({
      idu_encargado: id,
      ...updateLeaderDto
    });

    if( !encargado ) throw new NotFoundException(`Encargado con ${id} no encontrado `);

    try {

      await this.leaderRepository.save( encargado );

      return encargado;

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} leader`;
  }

  private handleDBExceptions( error:any ){
    if( error.code === '23505' )
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException("Unexpected error, check server logs");
  }
  
}
