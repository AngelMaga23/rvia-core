import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat_gerentes')
export class Gerente {

    @PrimaryGeneratedColumn('identity')
    sec_consecutivo: number;

    @Column({ type: 'bigint' })
    num_gerente: string;

    @Column({type: 'varchar', length:255})
    nom_gerente: string;

}
