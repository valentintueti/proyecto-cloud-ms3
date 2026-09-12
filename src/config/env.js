require('dotenv').config();

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Falta la variable de entorno requerida: ${varName}`);
  }
}

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  ms1BaseUrl: process.env.MS1_BASE_URL || 'http://localhost:8081',
  ms2BaseUrl: process.env.MS2_BASE_URL || 'http://localhost:8000'
};