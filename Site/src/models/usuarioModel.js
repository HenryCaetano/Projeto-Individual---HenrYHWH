var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, religiao, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function verificarExistente(email, senha) {
    var instrucaoSql = `
        SELECT id FROM usuario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `
    SELECT id, nome, religiao, email FROM usuario;
  `;
  return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, religiao, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, religiao, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, religiao, email, senha) VALUES ('${nome}', '${religiao}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function obterAcertosPorUsuario() {
    var query = `
        SELECT u.nome, COUNT(*) AS acertos
        FROM respostas_usuario ru
        JOIN usuario u ON ru.fkusuario_respostas = u.id
        WHERE ru.resposta_correta = 1
        GROUP BY u.nome
        ORDER BY acertos DESC
        LIMIT 5;
    `;
    return database.executar(query);
}

function obterReligioes() {
    var query = `
        SELECT religiao, COUNT(*) AS quantidade
        FROM usuario
        GROUP BY religiao;
    `;
    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrar,
    verificarExistente,
    listar,
    obterAcertosPorUsuario,
    obterReligioes
    
};