import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leader } from './entities/leader.entity';
import { Repository } from 'typeorm';
import { PositionService } from 'src/position/position.service';
import { Position } from 'src/position/entities/position.entity';
import { CentrosService } from 'src/centros/centros.service';
import { AppAreaService } from 'src/app-area/app-area.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class LeaderService {

  private readonly logger = new Logger('EncargadosService');

  constructor(
    @InjectRepository(Leader)
    private readonly leaderRepository: Repository<Leader>,
    private readonly puestosService: PositionService,
    private readonly centrosService: CentrosService,
    private readonly appAreaService: AppAreaService,
    private readonly commonService: CommonService,
  ){} 

  async create(createLeaderDto: CreateLeaderDto) {

    try {

      const encargado= this.leaderRepository.create(createLeaderDto);

      await this.leaderRepository.save(encargado);

      return encargado;
    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }

  }

  findAll() {
    try {

      const encargado = this.leaderRepository.find();
      return encargado;

    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }
  }

  async findOne(id: string) {
    try {

      const encargado = await this.leaderRepository.findOne({
        where: { num_empleado: +id },
        select: ['idu_encargado','nom_empleado', 'num_empleado']
      });

      return encargado;

    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }
  }

  async findByLevel(id: number) {
    const puesto = await this.puestosService.findOne(id);
  
    if (!puesto) {
      throw new Error(`Puesto con ID ${id} no encontrado`);
    }
  
    const nivel = (puesto as Position).num_puesto;
    let encargados = [];
  
    if (nivel != 1) {
      const nivelSuperior = nivel - 1;
      const puestoSuperior = await this.puestosService.findByLevel(nivelSuperior);
  
      if (puestoSuperior) {
        encargados = await this.leaderRepository.find({
          where: { num_puesto: puestoSuperior.idu_puesto },
          select: ['idu_encargado', 'num_empleado', 'nom_empleado']
        });
      }
    }
  
    const [centros, aplicaciones] = await Promise.all([
      this.centrosService.findAll(),
      this.appAreaService.findAll()
    ]);
  
    return {
      aplicaciones,
      centros,
      superiores: encargados
    };
  }
  
  async findByPosition(id: number) {
    try {

      const puesto = await this.puestosService.findOne(id);
  
  
      if (!puesto) {
        throw new Error(`Puesto con ID ${id} no encontrado`);
      }

      const nivel = (puesto as Position).num_puesto;
      let encargados = [];
      if (nivel !== 1) {
        const nivelSuperior = nivel - 1;
        const puestoSuperior = await this.puestosService.findByLevel(nivelSuperior);
    
        if (puestoSuperior) {
          encargados = await this.leaderRepository.find({
            where: { num_puesto: puestoSuperior.idu_puesto },
            // select: ['idu_encargado', 'num_empleado', 'nom_empleado']
          });
        }
      }
      return {encargados};

    } catch (error) {
      this.commonService.handleDBExceptions( error );
    }
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
      this.commonService.handleDBExceptions( error );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} leader`;
  }

  
}
