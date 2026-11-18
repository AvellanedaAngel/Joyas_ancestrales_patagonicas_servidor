const router = require("express").Router();
const controlador = require("../controllers/pieza.controller");
const { validarConsulta, validarId, validarPieza } = require("../middlewares/validar");

router.get("/", validarConsulta, controlador.listar);
router.get("/:idPieza", validarId, controlador.obtener);
router.post("/", validarPieza, controlador.crear);
router.put("/:idPieza", validarId, validarPieza, controlador.actualizar);

module.exports = router;