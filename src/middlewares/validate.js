function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const mensaje = error.details.map(d => d.message).join('; ');
      return res.status(400).json({ detail: mensaje });
    }

    next();
  };
}

module.exports = validate;