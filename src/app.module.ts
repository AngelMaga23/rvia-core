import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolModule } from './rol/rol.module';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { SourcecodeModule } from './sourcecode/sourcecode.module';
import { ScansModule } from './scans/scans.module';
import { ApplicationstatusModule } from './applicationstatus/applicationstatus.module';
import { CommonModule } from './common/common.module';
import { UsersApplicationsModule } from './users-applications/users-applications.module';
import { RviaModule } from './rvia/rvia.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { LanguagesModule } from './languages/languages.module';
import { CheckmarxModule } from './checkmarx/checkmarx.module';
import { CostModule } from './cost/cost.module';
import { envs } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: envs.dbHost,
      port: envs.dbPort,
      database: envs.dbName,
      username: envs.dbUsername,
      password: envs.dbPassword,
      autoLoadEntities: true,
      synchronize:false
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'..','public'), 
    // }),


    RolModule,
    ApplicationsModule,
    AuthModule,
    SourcecodeModule,
    ScansModule,
    ApplicationstatusModule,
    CommonModule,
    UsersApplicationsModule,
    RviaModule,
    SeguimientoModule,
    // ConfigurationModule,
    LanguagesModule,
    CheckmarxModule,
    CostModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
