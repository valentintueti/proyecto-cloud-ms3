const viajeRepository = require('../repositories/viaje.repository');
const ms1Client = require('./clients/ms1.client');
const ms2Client = require('./clients/ms2.client');
const { NotFoundError, ValidationError } = require('../middlewares/errors');

async function crearViaje(data) {
  await ms1Client.obtenerTarjeta(data.tarjeta_id);

  await ms2Client.obtenerServicio(data.servicio_id);

  return viajeRepository.crear({
    pasajero_id: data.pasajero_id,
    servicio_id: data.servicio_id,
    tarjeta_id: data.tarjeta_id,
    paradero_origen_id: data.paradero_origen_id,
    fecha_hora: new Date(),
    estado: 'en_curso'
  });
}

async function obtenerViaje(id) {
  const viaje = await viajeRepository.obtenerPorId(id);
  if (!viaje) {
    throw new NotFoundError(`Viaje ${id} no encontrado`);
  }
  return viaje;
}

async function listarPorPasajero(pasajeroId) {
  return viajeRepository.listarPorPasajero(pasajeroId);
}

async function obtenerViajesBatch(ids) {
  return viajeRepository.findByIds(ids);
}

async function finalizarViaje(id, paraderoFinalId) {
  const viaje = await obtenerViaje(id);

  if (viaje.estado === 'finalizado') {
    throw new ValidationError(`El viaje ${id} ya está finalizado`);
  }

  return viajeRepository.actualizar(id, {
    paradero_final_id: paraderoFinalId,
    estado: 'finalizado'
  });
}

module.exports = {
  crearViaje,
  obtenerViaje,
  listarPorPasajero,
  obtenerViajesBatch,
  finalizarViaje
};