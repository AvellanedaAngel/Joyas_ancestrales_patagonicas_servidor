function crearError(estado, mensaje, detalles) {
  return Object.assign(new Error(mensaje), { estado, detalles });
}

function rutaNoEncontrada(req, res, next) {
  next(crearError(404, `La ruta ${req.method} ${req.originalUrl} no existe.`));
}

function manejadorErrores(err, req, res, next) {
  const estado = err.estado || err.status || 500;
  const mensaje = err.type === "entity.parse.failed" ? "El cuerpo de la petición no es un JSON válido." : estado === 500 ? "Error interno del servidor." : err.message;
  if (estado === 500) console.error(err);
  res.status(estado).json({ error: { estado, mensaje, detalles: err.detalles } });
}

module.exports = { crearError, rutaNoEncontrada, manejadorErrores };

