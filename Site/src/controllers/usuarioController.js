var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        
        usuarioModel.autenticar(email, senha)
            .then(resultadoAutenticar => {
                if (resultadoAutenticar.length === 1) {
                    res.json(resultadoAutenticar[0]);


                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválidos");


                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(erro => {
                console.error("Erro ao autenticar:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}



function listar(req, res) {
  usuarioModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  }).catch((erro) => {
    console.error(erro);
    res.status(500).json(erro.sqlMessage);
  });
}



function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var religiao = req.body.religiaoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (religiao == undefined) {
        res.status(400).send("Sua religião está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        // Verifica se já existe um usuário com o mesmo email ou religiao
        usuarioModel.verificarExistente(email, senha)
            .then(resultado => {
                if (resultado.length > 0) {
                    res.status(409).send("Já existe um usuário com este email ou senha!");
                } else {
                    // Não existe, pode cadastrar
                    usuarioModel.cadastrar(nome, religiao, email, senha)
                        .then(resultadoCadastro => {
                            res.json(resultadoCadastro);
                        })
                        .catch(erro => {
                            console.error("Erro ao cadastrar:", erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            })
            .catch(erro => {
                console.error("Erro ao verificar existência:", erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}


function listarAcertos(req, res) {
    usuarioModel.obterAcertosPorUsuario()
        .then(result => res.json(result))
        .catch(erro => {
            console.error("Erro ao listar acertos por usuário:", erro.sqlMessage || erro);
            res.status(500).json(erro);
        });
}

function listarReligioes(req, res) {
    usuarioModel.obterReligioes()
        .then(result => res.json(result))
        .catch(erro => {
            console.error("Erro ao listar religiões:", erro.sqlMessage || erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    listarAcertos,
    listarReligioes
};