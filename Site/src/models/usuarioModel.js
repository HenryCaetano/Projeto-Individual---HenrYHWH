var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        select id, nome, religiao, email FROM usuario where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function verificarExistente(email, senha) {
    var instrucaoSql = `
        select id from usuario 
        where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
    select id, nome, religiao, email from usuario;
  `;
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, religiao, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, religiao, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        insert into usuario (nome, religiao, email, senha) values ('${nome}', '${religiao}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterAcertosPorUsuario() {
    var query = `
    select u.nome, COUNT(*) as acertos
    from respostas_usuario ru
    join usuario u ON ru.fkusuario_respostas = u.id
    where ru.resposta_correta = 1
    group by u.nome
    order by acertos desc;
    `;
    return database.executar(query);
}

function obterReligioes() {
    var query = `
    select religiao, COUNT(*) AS quantidade
    from usuario
    group by religiao;
    `;
    return database.executar(query);
}

function obterReligiaoPredominante() {
    var query = `
    select u.religiao, count(*) total
    from usuario u
    group by u.religiao
    order by total desc limit 1;	
    `;
    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarExistente,
    listar,
    obterAcertosPorUsuario,
    obterReligioes,
    obterReligiaoPredominante

};