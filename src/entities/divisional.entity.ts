import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('cat_divisionales')
export class Divisional {

    @PrimaryGeneratedColumn('identity')
    sec_consecutivo: number;

    @Column({ type: 'bigint' })
    num_divisional: string;

    @Column({type: 'varchar', length:255})
    nom_divisional: string;

}
