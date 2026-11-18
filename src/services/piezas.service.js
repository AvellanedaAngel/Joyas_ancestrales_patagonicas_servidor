const piezas = require("../data/pieza.data");

function listar(from, cantidad) {
  const pagina = piezas.slice(from, from + cantidad);
  return { total: piezas.length, from, cantidad: pagina.length, piezas: pagina };
}

const obtener = (id) => piezas.find((pieza) => pieza.id === id) || null;

function crear(datos) {
  const nueva = { id: Math.max(0, ...piezas.map((pieza) => pieza.id)) + 1, ...datos };
  piezas.push(nueva);
  return nueva;
}

function actualizar(id, datos) {
  const indice = piezas.findIndex((pieza) => pieza.id === id);
  if (indice !== -1) piezas[indice] = { id, ...datos };
  return indice !== -1 ? piezas[indice] : null;
}

module.exports = { listar, obtener, crear, actualizar };