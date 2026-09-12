const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Viaje = sequelize.define('Viaje', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pasajero_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  servicio_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tarjeta_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  paradero_origen_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paradero_final_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('en_curso', 'finalizado'),
    allowNull: false,
    defaultValue: 'en_curso'
  }
}, {
  tableName: 'viaje',
  timestamps: false
});

module.exports = Viaje;