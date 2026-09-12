const { Viaje, Conexion } = require('../models');

async function crear(data) {
  return Viaje.create(data);
}

async function obtenerPorId(id) {
  return Viaje.findByPk(id);
}

async function listarPorPasajero(pasajeroId) {
  return Viaje.findAll({
    where: { pasajero_id: pasajeroId },
    order: [['fecha_hora', 'ASC']]
  });
}

async function findByIds(ids) {
  return Viaje.findAll({ where: { id: ids } });
}

async function actualizar(id, cambios) {
  await Viaje.update(cambios, { where: { id } });
  return obtenerPorId(id);
}

async function eliminar(id) {
  const filasEliminadas = await Viaje.destroy({ where: { id } });
  return filasEliminadas > 0;
}

module.exports = {
  crear,
  obtenerPorId,
  listarPorPasajero,
  findByIds,
  actualizar,
  eliminar
};