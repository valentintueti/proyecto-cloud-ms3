const viajeService = require('../services/viaje.service');

async function crearViaje(req, res, next) {
  try {
    const viaje = await viajeService.crearViaje(req.body);
    res.status(201).json(viaje);
  } catch (err) {
    next(err);
  }
}

async function obtenerViaje(req, res, next) {
  try {
    const viaje = await viajeService.obtenerViaje(req.params.id);
    res.json(viaje);
  } catch (err) {
    next(err);
  }
}

async function listarPorPasajero(req, res, next) {
  try {
    const { pasajero_id } = req.query;
    const viajes = await viajeService.listarPorPasajero(pasajero_id);
    res.json(viajes);
  } catch (err) {
    next(err);
  }
}

async function obtenerViajesBatch(req, res, next) {
  try {
    const ids = req.query.ids.split(',').map(Number);
    const viajes = await viajeService.obtenerViajesBatch(ids);
    res.json(viajes);
  } catch (err) {
    next(err);
  }
}

async function finalizarViaje(req, res, next) {
  try {
    const viaje = await viajeService.finalizarViaje(req.params.id, req.body.paradero_final_id);
    res.json(viaje);
  }