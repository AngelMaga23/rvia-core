import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BadRequestResponse, ForbiddenResponse, InternalServerErrorResponse, NotFoundExceptionResponse, UnauthorizedResponse } from 'src/common/dto';

import { ValidRoles } from '../auth/interfaces/valid-roles';
import { Auth } from '../auth/decorators';
import { Rol } from './entities/rol.entity';

import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';


@ApiTags('Roles')
@Controller('positions')
@Auth( ValidRoles.admin )
export class PositionsController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  @Auth(ValidRoles.admin)
  @ApiResponse({ status:201, description:'Rol creado correctamente', type: Rol})
  @ApiResponse({ status:400, description:'Bad Request', type: BadRequestResponse })
  @ApiResponse({ status:401, description:'Unauthorized', type: UnauthorizedResponse })
  @ApiResponse({ status:403, description:'Forbidden', type: ForbiddenResponse })
  @ApiResponse({ status:500, description:'Internal server error', type: InternalServerErrorResponse })
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  @ApiResponse({ status:200, description:'Listado de los Roles', type: [Rol]})
  @ApiResponse({ status:400, description:'Bad Request', type: BadRequestResponse })
  @ApiResponse({ status:401, description:'Unauthorized', type: UnauthorizedResponse })
  @ApiResponse({ status:403, description:'Forbidden', type: ForbiddenResponse })
  @ApiResponse({ status:500, description:'Internal server error', type: InternalServerErrorResponse })
  @Auth( ValidRoles.admin )
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status:201, description:'Rol obtenido', type: Rol})
  @ApiResponse({ status:400, description:'Bad Request', type: BadRequestResponse })
  @ApiResponse({ status:401, description:'Unauthorized', type: UnauthorizedResponse })
  @ApiResponse({ status:403, description:'Forbidden', type: ForbiddenResponse })
  @ApiResponse({ status:500, description:'Internal server error', type: InternalServerErrorResponse })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID del lenguaje del rol' })
  @ApiResponse({ status:200, description:'Objeto actualizado', type: Rol })
  @ApiResponse({ status:400, description:'Bad Request', type: BadRequestResponse })
  @ApiResponse({ status:401, description:'Unauthorized', type: UnauthorizedResponse })
  @ApiResponse({ status:403, description:'Forbidden', type: ForbiddenResponse })
  @ApiResponse({ status:404, description:'Ocurre cuándo no existe el dato o archivo', type: NotFoundExceptionResponse })
  @ApiResponse({ status:500, description:'Internal server error', type: InternalServerErrorResponse })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolService.remove(id);
  }
}
