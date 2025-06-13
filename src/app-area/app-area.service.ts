import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAppAreaDto } from './dto/create-app-area.dto';
import { UpdateAppAreaDto } from './dto/update-app-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AppArea } from './entities/app-area.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AppAreaService {

  private readonly logger = new Logger('AppAreaService');

  constructor(
    @InjectRepository(AppArea)
    private readonly appAreaRepository: Repository<AppArea>,
    private readonly commonService: CommonService,
  ) {}


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
      this.commonService.handleDBExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const app = await this.appAreaRepository.findOne({
        where: { idu_aplicacion: id },
        select: ['idu_aplicacion', 'nom_aplicacion'],
      });
   
      return {
        idu_aplicacion: app.idu_aplicacion,
        nom_app: app.nom_aplicacion,
      };
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  update(id: number, updateAppAreaDto: UpdateAppAreaDto) {
    return `This action updates a #${id} appArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} appArea`;
  }
}
