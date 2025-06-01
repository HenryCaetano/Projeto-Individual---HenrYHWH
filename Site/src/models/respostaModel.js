var database = require("../database/config");

function registrarResposta(idUsuario, idQuestao, respostaDada, respostaCorreta) {
    var respostaCerta = respostaCorreta ? 1 : 0;

    var query = `
        insert into respostas_usuario 
        (fkusuario_respostas, fkquestao_respostas, resposta_dada, resposta_correta)
        values (${idUsuario}, ${idQuestao}, '${respostaDada}', ${respostaCerta});
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


function obterQuestaoMaisAcertada(){
    var query = `
        select res.fkquestao_respostas, sum(res.resposta_correta) as totalAcerto
	    from respostas_usuario  res
	    group by res.fkquestao_respostas
        order by totalAcerto desc limit 1;
    `;
    return database.executar(query);

}

module.exports = { registrarResposta , obterEstatisticasQuestoes, obterQuestaoMaisAcertada};