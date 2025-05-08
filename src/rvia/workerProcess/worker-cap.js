const { parentPort, workerData } = require('worker_threads');
const { envs } = require('../../../dist/config/envs.js');

async function runInitProcess() {
  try {
    const { args } = workerData; // Recibimos el objeto y los argumentos del hilo principal
    const addon = require(envs.rviacapPath);
    // Ejecutar el proceso de initProcess con los argumentos proporcionados
    // const result = await obj.initProcess(...args);
    const result = addon.coreIA.initProcess(...args);
    // Mandar el resultado al hilo principal
    parentPort.postMessage(result);
  } catch (error) {
    // Capturar y enviar el error de vuelta al hilo principal
    parentPort.postMessage({
      error: true,
      message: error.message
    });
    console.error("Error en el Worker:", error);
  }
}

runInitProcess();
