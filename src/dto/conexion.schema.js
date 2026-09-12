const Joi = require('joi');

const crearConexionSchema = Joi.object({
  viaje_origen_id: Joi.number().integer().positive().required(),
  viaje_destino_id: Joi.number().integer().positive().required(),
  paradero_id: Joi.string().required()
});

module.exports = { crearConexionSchema };