-- criando database "Jesus"
create database Jesus;

-- utilizando database "Jesus"
use Jesus;


-- criando as tabelas
create table Usuario(
idUsuario 				int primary key auto_increment,
nome 					varchar(40),
sobrenome 				varchar (40),
religiao 				varchar(40),
email 					varchar(50),
senha 					varchar(50) 
);


create table Quiz(
idQuiz					int primary key auto_increment,
1ªresposta				varchar(40),
2ªresposta				varchar(40),
3ªresposta				varchar(40),
4ªresposta				varchar(40),
5ªresposta				varchar(40),
6ªresposta				varchar(40),
7ªresposta				varchar(40),
8ªresposta				varchar(40),
9ªresposta				varchar(40),
10ªresposta				varchar(40),
fkUsuario				int
);


-- adicionando a foreign key
alter table Quiz add constraint chk_usuario foreign key fk_usuario(fkusuario) references Usuario(idUsuario);


-- visualizando as respostas
select distinct u.nome, q.*
from Quiz q
inner join Usuario u on u.idUsuario = q.fkUsuario; 


















































































