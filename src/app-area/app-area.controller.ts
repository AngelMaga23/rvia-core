import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppAreaService } from './app-area.service';
import { CreateAppAreaDto } from './dto/create-app-area.dto';
import { UpdateAppAreaDto } from './dto/update-app-area.dto';

@Controller('apps-area')
export class AppAreaController {
  constructor(private readonly appAreaService: AppAreaService) {}

  @Post()
  create(@Body() createAppAreaDto: CreateAppAreaDto) {
    return this.appAreaService.create(createAppAreaDto);
  }

  @Get()
  findAll() {
    return this.appAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppAreaDto: UpdateAppAreaDto) {
    return this.appAreaService.update(+id, updateAppAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appAreaService.remove(+id);
  }
}
