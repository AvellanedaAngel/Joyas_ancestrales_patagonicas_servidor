const path = require("path");

module.exports = {
  puerto: process.env.PORT || 3000,
  carpetaPublica: path.join(__dirname, "..", "..", "public"),
  cantidadPorDefecto: 10,
  cantidadMaxima: 50
};
