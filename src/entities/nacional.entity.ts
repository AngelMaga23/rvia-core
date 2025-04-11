import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('cat_nacionales')
export class Nacional {

    @PrimaryGeneratedColumn('identity')
    sec_consecutivo: number;

    @Column({ type: 'bigint' })
    num_nacional: string;

    @Column({type: 'varchar', length:255})
    nom_nacional: string;

}
