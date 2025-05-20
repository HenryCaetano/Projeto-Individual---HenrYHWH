-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
-- drop database Jesus;
CREATE DATABASE Jesus;

USE Jesus;

create table usuario(
	id						int primary key auto_increment,
	nome 					varchar(40),
	religiao 				varchar(40),
	email 					varchar(50),
	senha 					varchar(50)
);


CREATE TABLE aviso (
	id 						INT PRIMARY KEY AUTO_INCREMENT,
	titulo 					VARCHAR(100),
	descricao 				VARCHAR(150),
	fk_usuario 				INT,
	CONSTRAINT chk_aviso FOREIGN KEY fk_usuario_(fk_usuario) REFERENCES usuario(id)
);


create table quiz (
	id 						int primary key auto_increment,
	titulo					varchar(100)
);


create table questao (
	id 						int primary key auto_increment,
	enunciado 				varchar(100),
    alternativa_a 			varchar(100),
    alternativa_b 			varchar(100),
    alternativa_c 			varchar(100),
    alternativa_d 			varchar(100),
    alternativa_correta 	char(1),
    fkquiz_questao 			int,
    constraint chk_questao foreign key fk_quiz_questao(fkquiz_questao) references quiz(id)
)auto_increment = 1;


create table respostas_usuario (
	fkusuario_respostas 	int,
	fkquestao_respostas 	int,
	resposta_dada 			char(1),
    resposta_correta 		boolean,
	dataHora				datetime,
    primary key(fkusuario_respostas, fkquestao_respostas),
    constraint chk_respostas_usuario foreign key fk_usuario_respostas(fkusuario_respostas) references usuario(id),
    constraint chk_respostas_questao foreign key fk_questao_respostas(fkquestao_respostas) references questao(id)
);


INSERT INTO quiz (titulo) VALUES ('Quiz de Exemplo');

INSERT INTO questao (enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, fkquiz_questao)
VALUES 
('Qual mês tem 30 dias?', 'Janeiro', 'Dezembro', 'Junho', 'Agosto', 'C', 1),
('Quantas horas tem em um dia?', '30 horas', '38 horas', '48 horas', '24 horas', 'D', 1),
('Qual destes números é ímpar?', 'Dez', 'Doze', 'Oito', 'Onze', 'D', 1);



-- leitura da dashboard para gráfico de barras quanto as questões
select res.fkquestao_respostas, count(*) as "Total Realizado", sum(res.resposta_correta) as "Total de Acerto"
from respostas_usuario  res
group by res.fkquestao_respostas;

-- leitura da dashboard para gráfico de nuvem de palavras
SELECT religiao, COUNT(*) AS quantidade
        FROM usuario
        GROUP BY religiao;

-- selecionar o cadastro
select * from usuario;

-- selecionar os avisos
select * from aviso;

select * from quiz;
select * from questao;
select * from respostas_usuario;

  SELECT u.nome, COUNT(*) AS acertos
        FROM respostas_usuario ru
        JOIN usuario u ON ru.fkusuario_respostas = u.id
        WHERE ru.resposta_correta = 1
        GROUP BY u.nome
        ORDER BY acertos DESC
        LIMIT 5;

-- truncate table respostas_usuario;

