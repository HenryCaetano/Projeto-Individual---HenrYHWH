var express = require("express");
var router = express.Router();
var respostaController = require("../controllers/respostaController");

router.post("/registrar", respostaController.registrarResposta);
router.get("/estatisticas", respostaController.estatisticasQuestoes);
router.get("/maiorQuestao", respostaController.questaoMaisAcertada);

module.exports = router;