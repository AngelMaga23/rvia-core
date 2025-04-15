import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat_aplicaciones_ia')
export class AppArea {


    @PrimaryGeneratedColumn('identity')
    idu_aplicacion: number;

    @Column({type: 'varchar', length:255})
    nom_aplicacion: string; 

}
