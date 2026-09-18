const sequelize = require('../config/db');
const Viaje = require('./viaje.model');
const Conexion = require('./conexion.model');
const Pago = require('./pago.model');

Viaje.hasOne(Pago, { foreignKey: 'viaje_id' });
Pago.belongsTo(Viaje, { foreignKey: 'viaje_id' });

module.exports = {
  sequelize,
  Viaje,
  Conexion,
  Pago
};
