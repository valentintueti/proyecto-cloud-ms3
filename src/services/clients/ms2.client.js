const axios = require('axios');
const env = require('../../config/env');
const { ExternalServiceError, NotFoundError } = require('../../middlewares/errors');

async function obtenerServicio(servicioId) {
  try {
    const response = await axios.get(`${env.ms2BaseUrl}/servicios/${servicioId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new NotFoundError(`Servicio ${servicioId} no encontrado en MS2`);
    }
    throw new ExternalServiceError(`No se pudo consultar MS2: ${error.message}`);
  }
}

async function validaConexion(paraderoId, rutaId) {
  try {
    const response = await axios.get(
      `${env.ms2BaseUrl}/paraderos/${paraderoId}/valida-conexion`,
      { params: { ruta_id: rutaId } }
    );
    return response.data.es_valida;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new NotFoundError(`Paradero ${paraderoId} no encontrado en MS2`);
    }
    throw new ExternalServiceError(`No se pudo consultar MS2: ${error.message}`);
  }
}

module.exports = { obtenerServicio, validaConexion };