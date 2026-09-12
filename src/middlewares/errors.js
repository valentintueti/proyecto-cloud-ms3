class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class ExternalServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExternalServiceError';
    this.statusCode = 502;   // Bad Gateway: falló la llamada a MS1 o MS2
  }
}

module.exports = { NotFoundError, ValidationError, ExternalServiceError };