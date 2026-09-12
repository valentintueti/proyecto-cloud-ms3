const { Conexion, Viaje } = require('../models');

async function crear(data) {
  return Conexion.create(data);
}

async function obtenerPorId(id) {
  return Conexion.findByPk(id);
}

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