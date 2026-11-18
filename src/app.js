const express = require("express");
const { carpetaPublica } = require("./config/config");
const rutasPiezas = require("./routes/piezas.routes");
const { rutaNoEncontrada, manejadorErrores } = require("./middlewares/errores");

const app = express();
app.use(express.json());
app.use("/api/piezas", rutasPiezas);       // API REST
app.use("/api", rutaNoEncontrada);
app.use(express.static(carpetaPublica));   // sitio web (html/css/js)
app.use(manejadorErrores);

module.exports = app;