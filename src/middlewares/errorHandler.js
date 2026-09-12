function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  console.error(`[${err.name || 'Error'}] ${err.message}`);

  res.status(statusCode).json({
    detail: err.message || 'Error interno del servidor'
  });
}

module.exports = errorHandler;