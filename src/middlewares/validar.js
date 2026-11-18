/* Validación de lo que entra: si algo está mal, se responde 400 explicando qué. */
const { cantidadPorDefecto, cantidadMaxima } = require("../config/config");
const { crearError } = require("./errores");

// Campos obligatorios de una pieza (todos texto): [largo mínimo, largo máximo]
const CAMPOS = { nombre: [3, 120], tipo: [3, 40], material: [3, 80], procedencia: [3, 120], descripcion: [10, 1000], imagen: [5, 200], alt: [5, 200] };

function entero(valor, nombre, minimo, maximo, porDefecto, errores) {
  const valido = typeof valor === "string" && /^\d+$/.test(valor) && Number(valor) >= minimo && Number(valor) <= maximo;
  if (valor !== undefined && !valido) errores.push(`El parámetro "${nombre}" debe ser un número entero entre ${minimo} y ${maximo}.`);
  return valido ? Number(valor) : porDefecto;
}

function validarConsulta(req, res, next) {
  const errores = [];
  req.consulta = {
    cantidad: entero(req.query.cantidad, "cantidad", 1, cantidadMaxima, cantidadPorDefecto, errores),
    from: entero(req.query.from, "from", 0, Number.MAX_SAFE_INTEGER, 0, errores)
  };
  next(errores.length ? crearError(400, "Los parámetros de consulta no son válidos.", errores) : undefined);
}

function validarId(req, res, next) {
  const valido = /^[1-9]\d{0,14}$/.test(req.params.idPieza);
  req.idPieza = Number(req.params.idPieza);
  next(valido ? undefined : crearError(400, `El identificador "${req.params.idPieza}" no es válido: debe ser un número entero positivo.`));
}

function validarPieza(req, res, next) {
  const errores = [];
  const datos = {};

  if (req.body === null || typeof req.body !== "object" || Array.isArray(req.body)) {
    errores.push("El cuerpo de la petición debe ser un objeto JSON (con el encabezado Content-Type: application/json).");
  } else {
    Object.entries(CAMPOS).forEach(([campo, [minimo, maximo]]) => {
      const valor = req.body[campo];
      const largo = typeof valor === "string" ? valor.trim().length : 0;
      if (valor === undefined || valor === null) errores.push(`El campo "${campo}" es obligatorio.`);
      else if (typeof valor !== "string") errores.push(`El campo "${campo}" debe ser de tipo texto (string).`);
      else if (largo < minimo || largo > maximo) errores.push(`El campo "${campo}" debe tener entre ${minimo} y ${maximo} caracteres.`);
      else datos[campo] = valor.trim();
    });
  }
  req.datosPieza = datos;
  next(errores.length ? crearError(400, "Los datos enviados no son válidos.", errores) : undefined);
}

module.exports = { validarConsulta, validarId, validarPieza };