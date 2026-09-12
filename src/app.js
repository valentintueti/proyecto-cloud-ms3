const express = require('express');

const viajeRoutes = require('./routes/viaje.routes');
const conexionRoutes = require('./routes/conexion.routes');
const healthRoutes = require('./routes/health.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/viajes', viajeRoutes);
app.use('/conexiones', conexionRoutes);

app.use(errorHandler);

module.exports = app;