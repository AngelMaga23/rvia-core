import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tbl_registra_totales')
export class RegistraTotales {

    @PrimaryGeneratedColumn('identity')
    keyx: number;

    @Column({ type: 'bigint' })
    id_proyecto: string;

    @Column({type: 'varchar', length:255})
    nom_proyecto: string;

    @Column({type: 'varchar', length:255})
    nom_language: string;


    @Column({type: 'varchar', length:255})
    num_files: string;

    @Column({type: 'varchar', length:255})
    num_blank: string;

    @Column({type: 'varchar', length:255})
    num_comment: string;


    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    fec_movto: Date;

}
