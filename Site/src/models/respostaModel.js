var database = require("../database/config");

function registrarResposta(idUsuario, idQuestao, respostaDada, respostaCorreta) {
    var respostaCerta = respostaCorreta ? 1 : 0;

    var query = `
        INSERT INTO respostas_usuario 
        (fkusuario_respostas, fkquestao_respostas, resposta_dada, resposta_correta)
        VALUES (${idUsuario}, ${idQuestao}, '${respostaDada}', ${respostaCerta});
    `;

    console.log("SQL gerado:", query); // vendo se os dados estão sendo plotados no mysql
    return database.executar(query);
}

function obterEstatisticasQuestoes() {
    var query = `
        select res.fkquestao_respostas, count(*) as "Total Realizado", sum(res.resposta_correta) as "Total de Acerto"
        from respostas_usuario  res
        group by res.fkquestao_respostas;
    `;
    return database.executar(query);

    
}

module.exports = { registrarResposta , obterEstatisticasQuestoes};