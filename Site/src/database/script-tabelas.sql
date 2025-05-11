-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

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




select * from usuario;
select * from aviso;
