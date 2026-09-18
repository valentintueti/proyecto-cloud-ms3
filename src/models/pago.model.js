const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Pago = sequelize.define('Pago', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  viaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
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
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'pago',
  timestamps: false
});

module.exports = Pago;
