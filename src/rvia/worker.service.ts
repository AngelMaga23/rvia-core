import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { envs } from 'src/config';
import { Worker, WorkerOptions } from 'worker_threads';

interface InitProcessData {
  obj: any;
  args: any[];
}

@Injectable()
export class WorkerService {


  async runWorker(path: string, args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path, { workerData: { args } });
  
      worker.on('message', (result) => {
        if (result?.error) reject(new Error(`Error en el Worker: ${result.message}`));
        else resolve(result);
      });
  
      worker.on('error', err => reject(new Error(`Error al ejecutar el Worker: ${err.message}`)));
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`El Worker terminó con código ${code}`));
      });
    });
  }


  runInitSanProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerSanPath), args);
  }

  runInitActProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerActPath), args);
  }

  runInitDimProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerDimPath), args);
  }

  runInitDocProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerDocPath), args);
  }

  runInitDofProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerDofPath), args);
  }

  runInitCapProcess(args: any[]): Promise<any> {
    return this.runWorker(path.resolve(__dirname, 'workerProcess', envs.workerCapPath), args);
  }
}
