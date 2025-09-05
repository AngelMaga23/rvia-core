import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { CostToken } from './entities/costToken.entity';
import { RegistraTotales } from 'src/applications/entities/registra-total.entity';
import { Cost } from './entities/cost.entity';

@Injectable()
export class CostService {

  constructor(
    @InjectRepository(Cost)
    private readonly costRepository: Repository<Cost>,
    @InjectRepository(CostToken)
    private readonly costoTokenRepository: Repository<CostToken>,
    @InjectRepository(RegistraTotales)
    private readonly registraTotalesRepository: Repository<RegistraTotales>,
  ) {

  }


  create(createCostDto: CreateCostDto) {
    return 'This action adds a new cost';
  }

  findAll() {
    return `This action returns all cost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cost`;
  }

  update(id: number, updateCostDto: UpdateCostDto) {
    return `This action updates a #${id} cost`;
  }

  remove(id: number) {
    return `This action removes a #${id} cost`;
  }

  async getDataConfig(){
    const costoToken = await this.costoTokenRepository.find({});

    if (costoToken.length === 0) {
      throw new Error('No se encontró la configuración de costos.');
    }

    return costoToken[0];
  }

  async calculoCosto(id_proyecto: string, cant_archivos: number, total_archivos: number, num_empleado: string, nom_proyecto: string) {

    const costoTokens = await this.costoTokenRepository.find({});
    const costoToken = costoTokens[0];
    let totalCosto = 0;

    if (!costoToken) {
      throw new Error('No se encontró la configuración de costos.');
    }


    if ( total_archivos > costoToken.consultasTotal ) {
      totalCosto = parseFloat((cant_archivos * costoToken.costoPorConsultaExtra).toFixed(2));
    }else{
      totalCosto = parseFloat((cant_archivos * costoToken.costoPorConsulta).toFixed(2));
    }

    const costo  = this.costRepository.create({
      num_empleado: BigInt(num_empleado),
      id_proyecto: BigInt(id_proyecto),     
      nom_proyecto: nom_proyecto,
      val_monto: totalCosto.toString(),
      nom_cliente_ia: 'Bito',
      des_descripcion: nom_proyecto,
    });
    await this.costRepository.save(costo);

  }


}
