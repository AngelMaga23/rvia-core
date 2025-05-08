import { Injectable } from '@nestjs/common';
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
    return this.runWorker('./src/rvia/workerProcess/worker-san.js', args);
  }

  runInitActProcess(args: any[]): Promise<any> {
    return this.runWorker('./src/rvia/workerProcess/worker-act.js', args);
  }

  runInitDimProcess(args: any[]): Promise<any> {
    return this.runWorker('./src/rvia/workerProcess/worker-dim.js', args);
  }

  runInitDocProcess(args: any[]): Promise<any> {
    return this.runWorker('./src/rvia/workerProcess/worker-doc.js', args);
  }

  runInitDofProcess(args: any[]): Promise<any> {
    return this.runWorker('./src/rvia/workerProcess/worker-dof.js', args);
  }

  runInitCapProcess(args: any[]): Promise<any> {
    return this.runWorker('./src/rvia/workerProcess/worker-cap.js', args);
  }
}
