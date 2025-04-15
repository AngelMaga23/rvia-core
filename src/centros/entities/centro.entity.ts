import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat_centros')
export class Centro {

    @PrimaryGeneratedColumn('identity')
    idu_centro: number;

    @Column({type: 'int'})
    num_centro: number; 

    @Column({type: 'varchar', length:255})
    nom_centro: string; 

}
