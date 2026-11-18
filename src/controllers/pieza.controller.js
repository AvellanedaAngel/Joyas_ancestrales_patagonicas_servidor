const servicio = require("../services/piezas.service");
const { crearError } = require("../middlewares/errores");

const listar = (req, res) => res.json(servicio.listar(req.consulta.from, req.consulta.cantidad));

function obtener(req, res, next) {
  const pieza = servicio.obtener(req.idPieza);
  if (pieza) res.json(pieza);
  else next(crearError(404, `No existe una pieza con id ${req.idPieza}.`));
}

const crear = (req, res) => res.status(201).json(servicio.crear(req.datosPieza));

function actualizar(req, res, next) {
  const pieza = servicio.actualizar(req.idPieza, req.datosPieza);
  if (pieza) res.json(pieza);
  else next(crearError(404, `No existe una pieza con id ${req.idPieza}.`));
}

module.exports = { listar, obtener, crear, actualizar };
