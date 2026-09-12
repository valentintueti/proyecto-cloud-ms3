const conexionRepository = require('../repositories/conexion.repository');
const viajeService = require('./viaje.service');
const ms2Client = require('./clients/ms2.client');
const { ValidationError } = require('../middlewares/errors');

async function crearConexion(data) {
  // 1. Ambos viajes deben existir (lanza NotFoundError si no)
  const viajeOrigen = await viajeService.obtenerViaje(data.viaje_origen_id);
  const viajeDestino = await viajeService.obtenerViaje(data.viaje_destino_id);

  // 2. El viaje de origen debe estar finalizado en ese paradero (es donde ocurrió el trasbordo)
  if (viajeOrigen.paradero_final_id !== data.paradero_id) {
    throw new ValidationError(
      `El viaje ${data.viaje_origen_id} no finalizó en el paradero ${data.paradero_id}`
    );
  }

  // 3. Validar contra MS2 que la ruta del viaje_destino realmente pasa por ese paradero
  const servicioDestino = await ms2Client.obtenerServicio(viajeDestino.servicio_id);
  const esValida = await ms2Client.validaConexion(data.paradero_id, servicioDestino.ruta_id);

  if (!esValida) {
    throw new ValidationError(
      `La ruta del servicio ${viajeDestino.servicio_id} no pasa por el paradero ${data.paradero_id}`
    );
  }

  return conexionRepository.crear({
    viaje_origen_id: data.viaje_origen_id,
    viaje_destino_id: data.viaje_destino_id,
    paradero_id: data.paradero_id,
    fecha_hora: new Date()
  });
}

async function listarPorViaje(viajeId) {
  return conexionRepository.listarPorViaje(viajeId);
}

async function listarPorPasajero(pasajeroId) {
  return conexionRepository.listarPorPasajeroConViajes(pasajeroId);
}

module.exports = {
  crearConexion,
  listarPorViaje,
  listarPorPasajero
};