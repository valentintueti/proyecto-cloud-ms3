const { Conexion, Viaje } = require('../models');

async function crear(data) {
  return Conexion.create(data);
}

async function obtenerPorId(id) {
  return Conexion.findByPk(id);
}

// Trae las conexiones donde el viaje participa, ya sea como origen o destino del trasbordo
async function listarPorViaje(viajeId) {
  return Conexion.findAll({
    where: {
      [require('sequelize').Op.or]: [
        { viaje_origen_id: viajeId },
        { viaje_destino_id: viajeId }
      ]
    }
  });
}

// Usado por MS4: todas las conexiones de un pasajero, con los dos viajes ya incluidos
async function listarPorPasajeroConViajes(pasajeroId) {
  return Conexion.findAll({
    include: [
      {
        model: Viaje,
        as: 'viajeOrigen',
        where: { pasajero_id: pasajeroId },
        required: true
      },
      {
        model: Viaje,
        as: 'viajeDestino',
        required: true
      }
    ]
  });
}

module.exports = {
  crear,
  obtenerPorId,
  listarPorViaje,
  listarPorPasajeroConViajes
};