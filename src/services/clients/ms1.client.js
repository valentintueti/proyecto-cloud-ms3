const axios = require('axios');
const env = require('../../config/env');
const { ExternalServiceError, NotFoundError } = require('../../middlewares/errors');

async function obtenerTarjeta(tarjetaId) {
  try {
    const response = await axios.get(`${env.ms1BaseUrl}/tarjetas/${tarjetaId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new NotFoundError(`Tarjeta ${tarjetaId} no encontrada en MS1`);
    }
    throw new ExternalServiceError(`No se pudo consultar MS1: ${error.message}`);
  }
}

module.exports = { obtenerTarjeta };