const Joi = require('joi');

const crearViajeSchema = Joi.object({
  pasajero_id: Joi.number().integer().positive().required(),
  servicio_id: Joi.string().required(),
  tarjeta_id: Joi.number().integer().positive().required(),
  paradero_origen_id: Joi.string().required()
});

const finalizarViajeSchema = Joi.object({
  paradero_final_id: Joi.string().required()
});

module.exports = { crearViajeSchema, finalizarViajeSchema };