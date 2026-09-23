const express = require('express');
const router = express.Router();

const conexionController = require('../controllers/conexion.controller');
const validate = require('../middlewares/validate');
const { crearConexionSchema } = require('../dto/conexion.schema');

/**
 * @openapi
 * /conexiones:
 *   post:
 *     summary: Registrar una conexión (trasbordo entre dos viajes)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [viaje_origen_id, viaje_destino_id, paradero_id]
 *             properties:
 *               viaje_origen_id: { type: integer, example: 1 }
 *               viaje_destino_id: { type: integer, example: 2 }
 *               paradero_id: { type: string, example: "par_a1b2c3d4" }
 *     responses:
 *       201: { description: Conexión creada }
 *       400: { description: Trasbordo inválido (paradero no coincide o ruta no pasa por ahí) }
 *       404: { description: Alguno de los viajes o el paradero no existe }
 */
router.post('/', validate(crearConexionSchema), conexionController.crearConexion);

/**
 * @openapi
 * /conexiones/viaje/{viajeId}:
 *   get:
 *     summary: Listar conexiones donde participa un viaje (como origen o destino)
 *     parameters:
 *       - in: path
 *         name: viajeId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de conexiones }
 */
router.get('/viaje/:viajeId', conexionController.listarPorViaje);

/**
 * @openapi
 * /conexiones/pasajero/{pasajeroId}:
 *   get:
 *     summary: Listar todas las conexiones de un pasajero, con ambos viajes incluidos
 *     parameters:
 *       - in: path
 *         name: pasajeroId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de conexiones con viajeOrigen y viajeDestino }
 */
router.get('/pasajero/:pasajeroId', conexionController.listarPorPasajero);

module.exports = router;