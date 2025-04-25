import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat_puestos')
export class Position {
    
    @PrimaryGeneratedColumn('identity')
    idu_puesto: number;
    
    @Column({type: 'int'})
    num_puesto: number;

    @Column({type: 'varchar', length:255})
    nom_puesto: string;

}
