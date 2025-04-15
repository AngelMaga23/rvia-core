import { Injectable } from '@nestjs/common';
import { CreateAppAreaDto } from './dto/create-app-area.dto';
import { UpdateAppAreaDto } from './dto/update-app-area.dto';

@Injectable()
export class AppAreaService {
  create(createAppAreaDto: CreateAppAreaDto) {
    return 'This action adds a new appArea';
  }

  findAll() {
    return `This action returns all appArea`;
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
}
