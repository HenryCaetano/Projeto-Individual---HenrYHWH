const respostaModel = require("../models/respostaModel");

function registrarResposta(req, res) {
    var { idUsuario, idQuestao, respostaDada, respostaCorreta } = req.body;

    respostaModel.registrarResposta(idUsuario, idQuestao, respostaDada, respostaCorreta)
        .then(() => res.status(201).json({ mensagem: "Resposta registrada com sucesso" }))
        .catch(err => {
            console.error("Erro ao registrar resposta:", err.sqlMessage || err);
            res.status(500).json(err);
        });
}

function estatisticasQuestoes(req, res) {
    respostaModel.obterEstatisticasQuestoes()
        .then(result => res.json(result))
        .catch(err => {
            console.error("Erro ao buscar estatísticas:", err);
            res.status(500).json(err);
        });
}

function questaoMaisAcertada(req, res) {
    respostaModel.obterQuestaoMaisAcertada()
        .then(result => res.json(result))
        .catch(err => {
            console.error("Erro ao buscar estatísticas:", err);
            res.status(500).json(err);
        });
}

module.exports = {registrarResposta, estatisticasQuestoes, questaoMaisAcertada};   