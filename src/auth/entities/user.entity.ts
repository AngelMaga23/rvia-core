import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Rol } from "../../rol/entities/rol.entity";
import { Application } from '../../applications/entities/application.entity';
import { UsersApplication } from "src/users-applications/entities/users-application.entity";


@Entity('cat_colaboradores')
export class User {

    @PrimaryGeneratedColumn('identity')
    idu_usuario: string;

    @Column({
        type: 'varchar', 
        length:255, 
        unique:true
    })
    num_empleado: string;

    @Column({
        type: 'varchar', 
        length:255, 
        unique:true
    })
    nom_correo: string;

    @Column('text', {
        select: false
    })
    nom_contrasena: string;

    @Column({
        type: 'varchar', 
        length:255,
    })
    nom_usuario: string;

    @Column('bool', {
        default: true
    })
    opc_es_activo: boolean;

    @Column({ type: 'int' })
    num_puesto: number;

    // @Column({ type: 'int' })
    // idu_aplicacion: number;
  
    @Column({ type: 'int' })
    num_centro: number;
  
    @Column({ type: 'varchar', length: 10 })
    num_encargado: string;

    @Column({ type: 'timestamp' })
    fec_creacion: Date;
  
    // @UpdateDateColumn({ type: 'timestamp' })
    // updated_at: Date;

    @ManyToOne(
        () => Rol, rol => rol.user,
        { eager:true }
    )
    @JoinColumn({ name: 'idu_rol' })
    position: Rol;

    @OneToMany(
        () => Application, application => application.applicationstatus,
    )
    application:Application[]

    @OneToMany(() => UsersApplication, usuariosAplicaciones => usuariosAplicaciones.usuario)
    usuariosXAplicaciones: UsersApplication[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.nom_correo = this.nom_correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
