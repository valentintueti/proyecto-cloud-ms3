const sequelize = require('../config/db');
const Viaje = require('./viaje.model');
const Conexion = require('./conexion.model');

module.exports = {
  sequelize,
  Viaje,
  Conexion
};