const express = require('express');
const router = express.Router();

const viajeController = require('../controllers/viaje.controller');
const validate = require('../middlewares/validate');
const { crearViajeSchema, finalizarViajeSchema } = require('../dto/viaje.schema');

/**
 * @openapi
 * /viajes:
 *   post:
 *     summary: Crear un viaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pasajero_id, servicio_id, tarjeta_id, paradero_origen_id]
 *             properties:
 *               pasajero_id: { type: integer, example: 1 }
 *               servicio_id: { type: string, example: "srv_a1b2c3d4" }
 *               tarjeta_id: { type: integer, example: 1 }
 *               paradero_origen_id: { type: string, example: "par_a1b2c3d4" }
 *     responses:
 *       201: { description: Viaje creado }
 *       400: { description: Error de validación }
 *       404: { description: Tarjeta o servicio no encontrado }
 */
router.post('/', validate(crearViajeSchema), viajeController.crearViaje);

/**
 * @openapi
 * /viajes:
 *   get:
 *     summary: Listar viajes de un pasajero
 *     parameters:
 *       - in: query
 *         name: pasajero_id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Lista de viajes }
 */
router.get('/', viajeController.listarPorPasajero);

/**
 * @openapi
 * /viajes/batch:
 *   get:
 *     summary: Obtener varios viajes por id (batch)
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema: { type: string }
 *         description: Ids separados por coma, ej. 1,2,3
 *     responses:
 *       200: { description: Lista de viajes encontrados }
 */
router.get('/batch', viajeController.obtenerViajesBatch);

/**
 * @openapi
 * /viajes/{id}:
 *   get:
 *     summary: Obtener un viaje por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Viaje encontrado }
 *       404: { description: Viaje no encontrado }
 */
router.get('/:id', viajeController.obtenerViaje);

/**
 * @openapi
 * /viajes/{id}/finalizar:
 *   patch:
 *     summary: Finalizar un viaje (registrar paradero final)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [paradero_final_id]
 *             properties:
 *               paradero_final_id: { type: string, example: "par_x1y2z3" }
 *     responses:
 *       200: { description: Viaje finalizado }
 *       400: { description: El viaje ya estaba finalizado }
 *       404: { description: Viaje no encontrado }
 */
router.patch('/:id/finalizar', validate(finalizarViajeSchema), viajeController.finalizarViaje);

module.exports = router;