import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaderService } from './leader.service';
import { CreateLeaderDto } from './dto/create-leader.dto';
import { UpdateLeaderDto } from './dto/update-leader.dto';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces/valid-roles';

@Controller('leader')
export class LeaderController {
  constructor(private readonly leaderService: LeaderService) {}

  @Post()
  @Auth( ValidRoles.admin )
  create(@Body() createLeaderDto: CreateLeaderDto) {
    return this.leaderService.create(createLeaderDto);
  }

  @Get()
  findAll() {
    return this.leaderService.findAll();
  }

  @Get('puesto/:id')
  findLeader(@Param('id') id: string) {
    return this.leaderService.findByPosition(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaderService.findByLevel(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaderDto: UpdateLeaderDto) {
    return this.leaderService.update(+id, updateLeaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaderService.remove(+id);
  }
}
