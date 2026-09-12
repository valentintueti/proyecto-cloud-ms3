const express = require('express');
const router = express.Router();

const viajeController = require('../controllers/viaje.controller');
const validate = require('../middlewares/validate');
const { crearViajeSchema, finalizarViajeSchema } = require('../dto/viaje.schema');

router.post('/', validate(crearViajeSchema), viajeController.crearViaje);
router.get('/', viajeController.listarPorPasajero);          // ?pasajero_id=123
router.get('/batch', viajeController.obtenerViajesBatch);    // ?ids=1,2,3
router.get('/:id', viajeController.obtenerViaje);
router.patch('/:id/finalizar', validate(finalizarViajeSchema), viajeController.finalizarViaje);

module.exports = router;