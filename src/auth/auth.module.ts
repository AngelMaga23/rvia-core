import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { RolModule } from '../rol/rol.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SeguimientoModule } from 'src/seguimiento/seguimiento.module';
import { CommonModule } from 'src/common/common.module';
import { envs } from 'src/config';
import { LeaderModule } from 'src/leader/leader.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    SeguimientoModule,
    CommonModule,
    LeaderModule,

    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => {
        return {
          secret: envs.jwtSecret,
          signOptions: {
            expiresIn:'24h'
          }
        }
      }
    }),
    forwardRef(() => RolModule)
  ],
  exports: [ TypeOrmModule, JwtStrategy, PassportModule, JwtModule ]
})
export class AuthModule {}
