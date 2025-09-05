import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('ctl_costos_tokens')
export class CostToken {

  @PrimaryGeneratedColumn({ name: 'idu_costos_tokens' })
  id: number;

  @Column({
    name: 'imp_costo_por_consulta',
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: false,
  })
  costoPorConsulta: number;

  @Column({
    name: 'imp_costo_por_consulta_extra',
    type: 'decimal',
    precision: 10,
    scale: 4,
    nullable: true,
  })
  costoPorConsultaExtra?: number;

  @Column({
    name: 'num_consultas_consumidas',
    type: 'int',
    default: 0,
  })
  consultasConsumidas: number;

  @Column({
    name: 'num_consultas_total',
    type: 'int',
    default: 600,
  })
  consultasTotal: number;

  @Column({
    name: 'imp_costo_total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  costoTotal: number;

  @UpdateDateColumn({
    name: 'fec_fecha_actualizacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaActualizacion: Date;

  @Column({
    name: 'des_descripcion',
    type: 'text',
    nullable: true,
  })
  descripcion?: string;

}
