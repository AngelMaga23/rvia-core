import { Injectable } from '@nestjs/common';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';

@Injectable()
export class LeaderService {
  create(createLeaderDto: CreateLeaderDto) {
    return 'This action adds a new leader';
  }

  findAll() {
    return `This action returns all leader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leader`;
  }

  update(id: number, updateLeaderDto: UpdateLeaderDto) {
    return `This action updates a #${id} leader`;
  }

  remove(id: number) {
    return `This action removes a #${id} leader`;
  }
}
