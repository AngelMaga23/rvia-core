import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class RolService {

  private readonly logger = new Logger('RolService');

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    private readonly encryptionService: CommonService
  ){}

  async create(createPositionDto: CreateRolDto) {
    
     try {
        
        createPositionDto.nom_rol = this.encryptionService.encrypt(createPositionDto.nom_rol);
        const position = this.rolRepository.create(createPositionDto);
        await this.rolRepository.save(position);

        return position;

     } catch (error) {

        this.encryptionService.handleDBExceptions( error );
     }

  }

  async findAll() {

    try {
      const puestos = await this.rolRepository.find();

      const decryptedStatuses = puestos.map(puesto => {
        puesto.nom_rol = this.encryptionService.decrypt(puesto.nom_rol);
        return puestos;
      });
  
      return puestos;
    } catch (error) {
      this.encryptionService.handleDBExceptions( error ); 
    }

    // return this.positionRepository.find();
  }

  async findOne(id: number) {

    const position = await this.rolRepository.findOneBy({ idu_rol:id });

    if( !position )
      throw new NotFoundException(`Rol con ${id} no encontrado `);
    position.nom_rol = this.encryptionService.decrypt(position.nom_rol);
    return position; 
  }

  async update(id: number, updatePositionDto: UpdateRolDto) {

    const position = await this.rolRepository.preload({
      idu_rol: id,
      ...updatePositionDto
    });

    if( !position ) throw new NotFoundException(`Rol con ${id} no encontrado `);

    try {
      position.nom_rol = this.encryptionService.encrypt(position.nom_rol);
      await this.rolRepository.save( position );
      return position;

    } catch (error) {
      this.encryptionService.handleDBExceptions(error);
    }
  }

  async remove(id: number) {

    const position = await this.findOne( id );
    await this.rolRepository.remove( position );

    // return `This action removes a #${id} position`;
  }

}
