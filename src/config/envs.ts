import * as dotenv from 'dotenv';

import * as joi from 'joi';

dotenv.config({
  path: '/sysx/dev/rvia/cnf/dev.ini',  // Ajusta la ruta según tu estructura
}); 

interface EnvVars {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  PORT: number;
  SECRET_KEY: string;
  JWT_SECRET: string;

  RVIA_ENVIRONMENT: number;

  RVIASAN_PATH: string;
  RVIAACT_PATH: string;
  RVIADOC_PATH: string;
  RVIADOF_PATH: string;
  RVIACAP_PATH: string;
  RVIADIM_PATH: string;

  WORKERS_COUNT: number;  
  PATH_PROJECT: string;

  OLD_SECRET_KEY?: string;  // Opcional
  NEW_SECRET_KEY?: string;  // Opcional

}

const envsSchema = joi.object({
  DB_HOST: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  PORT: joi.number().required(),
  SECRET_KEY: joi.string().required(),
  JWT_SECRET: joi.string().required(),

  RVIA_ENVIRONMENT: joi.number().required(),

  RVIASAN_PATH: joi.string().required(),
  RVIAACT_PATH: joi.string().required(),
  RVIADOC_PATH: joi.string().required(),
  RVIADOF_PATH: joi.string().required(),
  RVIACAP_PATH: joi.string().optional(),
  RVIADIM_PATH: joi.string().optional(),

  WORKERS_COUNT: joi.number().required(),
  PATH_PROJECT: joi.string().required(),

  OLD_SECRET_KEY: joi.string().optional(),
  NEW_SECRET_KEY: joi.string().optional(),
})
.unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  dbHost: envVars.DB_HOST,
  dbUsername: envVars.DB_USERNAME,
  dbPassword: envVars.DB_PASSWORD,
  dbName: envVars.DB_NAME,
  dbPort: envVars.DB_PORT,
  port: envVars.PORT,
  secretKey: envVars.SECRET_KEY,
  jwtSecret: envVars.JWT_SECRET,
  rviaEnv: envVars.RVIA_ENVIRONMENT,

  rviasaPath: envVars.RVIASAN_PATH,
  rviaactPath: envVars.RVIAACT_PATH,
  rviadocPath: envVars.RVIADOC_PATH ,
  rviadofPath: envVars.RVIADOF_PATH,
  rviacapPath: envVars.RVIACAP_PATH,
  rviadimPath: envVars.RVIADIM_PATH,

  workersCount: envVars.WORKERS_COUNT,
  pathProject: envVars.PATH_PROJECT,

  oldSecretKey: envVars.OLD_SECRET_KEY,
  newSecretKey: envVars.NEW_SECRET_KEY,

};