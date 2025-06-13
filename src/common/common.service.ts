import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository, DataSource } from 'typeorm';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { envs } from 'src/config';

@Injectable()
export class CommonService implements OnModuleInit {
  private readonly algorithm = 'aes-256-cbc';
  private key: Buffer;
  private readonly oldKey?: Buffer;
  private readonly newKey?: Buffer;
  private readonly logger = new Logger("CommonService");

  constructor(private dataSource: DataSource) {


    this.key = createHash('sha256').update(envs.secretKey).digest().slice(0, 32);
    this.oldKey = envs.oldSecretKey ? createHash('sha256').update(envs.oldSecretKey).digest().slice(0, 32) : undefined;
    this.newKey = envs.newSecretKey ? createHash('sha256').update(envs.newSecretKey).digest().slice(0, 32) : undefined;
  }

  async onModuleInit() {

    if (this.oldKey && this.newKey && this.key.toString('hex') !== this.newKey.toString('hex')) {
      this.key = this.oldKey;
      await this.reEncryptAllEntities();
      this.key = this.newKey;
      this.updateEnvVariable('SECRET_KEY', envs.newSecretKey || '');
    }
  }

  encrypt(text: string): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  encryptNewKey(text: string, key: Buffer): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  decryptWithKey(encryptedText: string, key: Buffer): string {

    if (!encryptedText.includes(':')) {
      return encryptedText;
    }
  
    try {
      const [ivHex, encrypted] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const decipher = createDecipheriv(this.algorithm, key, iv);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (err) {

      return encryptedText;
    }
  }
  

  decrypt(encryptedText: string): string {
    return this.decryptWithKey(encryptedText, this.key);
  }

  async reEncryptAllEntities(): Promise<void> {
    const entities = this.dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      const records = await repository.find();

      for (const record of records) {
        let updated = false;
        for (const column of entity.columns) {
          const columnName = column.propertyName;
          const columnValue = record[columnName];
          if (typeof columnValue === 'string' && columnValue.includes(':')) {
            const decryptedData = this.decryptWithKey(columnValue, this.oldKey);
            if (decryptedData !== columnValue) {
              const reEncryptedData = this.encryptNewKey(decryptedData, this.newKey);
              record[columnName] = reEncryptedData;
              updated = true;
            }
          }
        }
        if (updated) {
          await repository.save(record);
        }
      }
    }
  }

  private updateEnvVariable(key: string, value: string) {
    const envPaths = [
      '/sysx/dev/rvia/cnf/dev.ini',  // Ruta completa del archivo mon.env
      path.join(process.cwd(), '.env'),
      path.join(process.cwd(), 'config', '.env'),
      path.join(__dirname, '../../.env'),
    ];

    const envPath = envPaths.find((filePath) => fs.existsSync(filePath));

    if (!envPath) {
      // console.warn('⚠️ No se encontró el archivo .env para actualizar.');
      return;
    }

    let envContent = fs.readFileSync(envPath, 'utf-8');
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
    fs.writeFileSync(envPath, envContent);
    // console.log(`✅ Se actualizó ${key} en: ${envPath}`);
  }


  handleDBExceptions(error: any): never {
    if (error.code === '23505' || error.code === '42703') {
      if (error.detail?.includes('num_empleado')) {
        throw new BadRequestException('El número de empleado ya existe');
      }
      if (error.detail?.includes('num_centro')) {
        throw new BadRequestException('El número de centro ya existe');
      }
      throw new BadRequestException(error.detail || 'Error de base de datos');
    }

    if (error.code === '23502') {
      throw new BadRequestException(`El campo '${error.column}' no puede ser nulo.`);
    }

    if (error.code === '23503') {
      throw new BadRequestException('Referencia inválida: entidad relacionada no existe.');
    }

    if (error.code === '23514') {
      throw new BadRequestException('Violación de restricción CHECK.');
    }

    if (error.code === '22P02') {
      throw new BadRequestException('Formato de dato inválido.');
    }

    if (error instanceof NotFoundException) {
      throw error;
    }

    if (error.status && error.status === 400) {
      throw new BadRequestException(error.response || 'Solicitud incorrecta.');
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Ocurrió un error inesperado. Revisa los logs del servidor.');
  }


}
