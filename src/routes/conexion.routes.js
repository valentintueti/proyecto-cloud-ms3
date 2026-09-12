const express = require('express');
const router = express.Router();

const conexionController = require('../controllers/conexion.controller');
const validate = require('../middlewares/validate');
const { crearConexionSchema } = require('../dto/conexion.schema');

router.post('/', validate(crearConexionSchema), conexionController.crearConexion);
router.get('/viaje/:viajeId', conexionController.listarPorViaje);
router.get('/pasajero/:pasajeroId', conexionController.listarPorPasajero);

module.exports = router;