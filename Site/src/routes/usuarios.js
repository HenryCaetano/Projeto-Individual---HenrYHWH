var express = require("express");
var router = express.Router();
var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
  usuarioController.listar(req, res);
});

router.get("/acertos", usuarioController.listarAcertos);

router.get("/religioes", usuarioController.listarReligioes);

router.get("/maiorReligiao", usuarioController.maiorReligiao);

module.exports = router;