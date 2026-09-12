const app = require('./app');
const sequelize = require('./config/db');
const env = require('./config/env');
const { Viaje, Conexion } = require('./models');

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida correctamente.');

    // sync() crea las tablas si no existen, basándose en los modelos definidos
    // (equivalente a spring.jpa.hibernate.ddl-auto=update en MS1)
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

    app.listen(env.port, () => {
      console.log(`MS3 - Viajes corriendo en el puerto ${env.port}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
}

iniciar();