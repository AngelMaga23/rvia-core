import { Injectable } from '@nestjs/common';
import { CreateCentroDto } from './dto/create-centro.dto';
import { UpdateCentroDto } from './dto/update-centro.dto';

@Injectable()
export class CentrosService {
  create(createCentroDto: CreateCentroDto) {
    return 'This action adds a new centro';
  }

  findAll() {
    return `This action returns all centros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} centro`;
  }

  update(id: number, updateCentroDto: UpdateCentroDto) {
    return `This action updates a #${id} centro`;
  }

  remove(id: number) {
    return `This action removes a #${id} centro`;
  }
}
