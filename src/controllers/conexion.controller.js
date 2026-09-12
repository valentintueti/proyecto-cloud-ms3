const conexionService = require('../services/conexion.service');

async function crearConexion(req, res, next) {
  try {
    const conexion = await conexionService.crearConexion(req.body);
    res.status(201).json(conexion);
  } catch (err) {
    next(err);
  }
}

async function listarPorViaje(req, res, next) {
  try {
    const conexiones = await conexionService.listarPorViaje(req.params.viajeId);
    res.json(conexiones);
  } catch (err) {
    next(err);
  }
}

async function listarPorPasajero(req, res, next) {
  try {
    const conexiones = await conexionService.listarPorPasajero(req.params.pasajeroId);
    res.json(conexiones);
  } catch (err) {
    next(err);
  }
}

module.exports = { crearConexion, listarPorViaje, listarPorPasajero };