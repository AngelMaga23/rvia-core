import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('cat_coordinadores')
export class Coordinador {

    @PrimaryGeneratedColumn('identity')
    sec_consecutivo: number;

    @Column({ type: 'bigint' })
    num_coordinador: string;

    @Column({type: 'varchar', length:255})
    nom_coordinador: string;

}
