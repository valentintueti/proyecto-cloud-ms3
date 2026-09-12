const Joi = require('joi');

const crearViajeSchema = Joi.object({
  pasajero_id: Joi.number().integer().positive().required(),
  servicio_id: Joi.string().required(),
  tarjeta_id: Joi.number().integer().positive().required(),
  paradero_origen_id: Joi.string().required()
  // paradero_final_id: no se pide al crear, se setea al finalizar
  // estado: nace como 'en_curso'
});

const finalizarViajeSchema = Joi.object({
  paradero_final_id: Joi.string().required()
  // el service, al recibir esto, además pone estado = 'finalizado'
});

module.exports = { crearViajeSchema, finalizarViajeSchema };