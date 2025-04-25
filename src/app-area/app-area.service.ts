import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAppAreaDto } from './dto/create-app-area.dto';
import { UpdateAppAreaDto } from './dto/update-app-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppArea } from './entities/app-area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppAreaService {

  private readonly logger = new Logger('AppAreaService');
  @InjectRepository(AppArea)
  private readonly appAreaRepository: Repository<AppArea>

  create(createAppAreaDto: CreateAppAreaDto) {
    return 'This action adds a new appArea';
  }

  async findAll() {
    try {
      const aplicaciones = await this.appAreaRepository
        .createQueryBuilder('app')
        .select([
          'app.idu_aplicacion AS idu_aplicacion',
          'app.nom_aplicacion AS nom_app',
        ])
        .getRawMany(); // <- importante para que respete los alias
  
      return aplicaciones;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appArea`;
  }

  update(id: number, updateAppAreaDto: UpdateAppAreaDto) {
    return `This action updates a #${id} appArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} appArea`;
  }

  private handleDBExceptions( error: any ){
    if( error.code === '23505' ){
      throw new BadRequestException(error.detail);
    }else{
      this.logger.error(error);
      throw new InternalServerErrorException('No se puede procesar la petición');
    }
  }
}
