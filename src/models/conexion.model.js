const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Viaje = require('./viaje.model');

const Conexion = sequelize.define('Conexion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  viaje_origen_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  viaje_destino_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  paradero_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'conexion',
  timestamps: false
});

// Una conexión enlaza dos viajes distintos: el que termina y el que empieza
Conexion.belongsTo(Viaje, { as: 'viajeOrigen', foreignKey: 'viaje_origen_id' });
Conexion.belongsTo(Viaje, { as: 'viajeDestino', foreignKey: 'viaje_destino_id' });
Viaje.hasMany(Conexion, { as: 'conexionesComoOrigen', foreignKey: 'viaje_origen_id' });
Viaje.hasMany(Conexion, { as: 'conexionesComoDestino', foreignKey: 'viaje_destino_id' });

module.exports = Conexion;