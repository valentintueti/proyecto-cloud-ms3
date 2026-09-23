const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MS3 - Viajes y Conexiones',
      version: '1.0.0'
    },
    servers: [{ url: process.env.ROOT_PATH || '/' }]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);