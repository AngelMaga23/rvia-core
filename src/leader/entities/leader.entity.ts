import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat_encargados')
export class Leader {

    @PrimaryGeneratedColumn('identity')
    idu_encargado: number;

    @Column({type: 'int'})
    num_empleado: number; 

    @Column({type: 'varchar', length:255})
    nom_empleado: string; 

    @Column({ type: 'int' })
    num_puesto: number;
}
