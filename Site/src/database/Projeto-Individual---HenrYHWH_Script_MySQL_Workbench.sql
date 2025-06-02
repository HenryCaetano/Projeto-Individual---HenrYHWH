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

create table quiz (
	id 						int primary key auto_increment,
	titulo					varchar(100)
);

create table questao (
	id 						int primary key auto_increment,
	enunciado 				varchar(500),
    alternativa_a 			varchar(500),
    alternativa_b 			varchar(500),
    alternativa_c 			varchar(500),
    alternativa_d 			varchar(500),
    alternativa_correta 	char(1),
    fkquiz_questao 			int,
    constraint chk_questao foreign key fk_quiz_questao(fkquiz_questao) references quiz(id)
)auto_increment = 1;


create table respostas_usuario (
	fkusuario_respostas 	int,
	fkquestao_respostas 	int,
	resposta_dada 			char(1),
    resposta_correta 		boolean,
    primary key(fkusuario_respostas, fkquestao_respostas),
    constraint chk_respostas_usuario foreign key fk_usuario_respostas(fkusuario_respostas) references usuario(id),
    constraint chk_respostas_questao foreign key fk_questao_respostas(fkquestao_respostas) references questao(id)
);


INSERT INTO quiz (titulo) VALUES ('Jesus Cristo -> A Historicidade Comprovada');

INSERT INTO questao (enunciado, alternativa_a, alternativa_b, alternativa_c, alternativa_d, alternativa_correta, fkquiz_questao)
VALUES 
('Qual é a fonte não-cristã mais antiga que menciona Jesus?', 'Flávio Josefo (Antiguidades Judaicas)', 'Tácito (Anais)', 'Plínio, o Jovem (Cartas)', 'Suetônio (Vidas dos Césares)', 'B', 1),
('Qual destes historiadores judeus do século I menciona Jesus?', 'Fílon de Alexandria', 'Justo de Tiberíades', 'Flávio Josefo', 'Nenhum dos acima', 'C', 1),
('Qual destes é um argumento usado por estudiosos para afirmar a historicidade de Jesus?', 'Existência de relatos de milagres', 'Múltiplas fontes independentes', 'Artefatos arqueológicos com seu nome', 'Registros oficiais romanos detalhados', 'B', 1),
('Qual destes eventos da vida de Jesus é considerado historicamente mais provável pela maioria dos estudiosos?', 'Nascimento virginal', 'Batismo por João Batista', 'Transfiguração', 'Ressurreição física', 'B', 1),
('O que o "critério da dissimilaridade" sugere sobre Jesus?', 'Que ele era diferente de outros líderes religiosos', 'Que elementos que não podem ser derivados do judaísmo ou do cristianismo primitivo provavelmente são históricos', 'Que os evangelhos são completamente diferentes entre s', 'Que não há similaridade entre as fontes cristãs e não-cristãs', 'B', 1),
('Qual destes títulos atribuídos a Jesus é considerado pelo consenso acadêmico como provavelmente usado por ele mesmo?', 'Cristo (Messias)', 'Filho de Deus', 'Filho do Homem', 'Senhor (Kyrios)', 'C', 1),
('Qual é a posição do consenso acadêmico sobre a existência histórica de Jesus?', 'Jesus é uma figura completamente mítica', 'Há dúvidas significativas sobre sua existência', 'Ele existiu, mas quase nada pode ser conhecido sobre ele', 'Ele existiu como um pregador judeu do século I', 'D', 1),
('Qual destes elementos da narrativa da paixão é considerado historicamente mais confiável?', 'A última ceia como uma refeição pascal', 'O julgamento perante o Sinédrio', 'A libertação de Barrabás', 'As palavras exatas de Jesus na cruz', 'C', 1),
('Qual destas características do Jesus histórico é mais amplamente aceita?', 'Ele era um carpinteiro de Nazaré', 'Ele falava fluentemente grego', 'Ele era um zelota revolucionário', 'Ele era essênio ou tinha ligações com Qumran', 'A', 1),
('Qual destes eventos é considerado o mais seguro historicamente?', 'A crucificação sob Pôncio Pilatos', 'Os detalhes do nascimento em Belém', 'A tentação no deserto', 'A ascensão aos céus', 'A', 1);


-- selects gerais
	select * from usuario;
	select * from quiz;
	select * from questao;
	select * from respostas_usuario;


-- leitura da dashboard para gráfico de barras quanto as questões
	select res.fkquestao_respostas, count(*) as "Total Realizado", sum(res.resposta_correta) as "Total de Acerto"
	from respostas_usuario  res
	group by res.fkquestao_respostas;


-- select para saber os acertos de cada usuário
	select u.nome, COUNT(*) as acertos
	from respostas_usuario ru
	join usuario u ON ru.fkusuario_respostas = u.id
	where ru.resposta_correta = 1
	group by u.nome
	order by acertos desc;
        
        
-- leitura da dashboard para gráfico de nuvem de palavras
	select religiao, COUNT(*) AS quantidade
	from usuario
	group by religiao;
        
        
-- select para saber a religião mais escolhida
	select u.religiao, count(*) total
	from usuario u
	group by u.religiao
	order by total desc limit 1;


--  select para saber a questão mais acertada
	select res.fkquestao_respostas, sum(res.resposta_correta) as totalAcerto
	from respostas_usuario  res
	group by res.fkquestao_respostas
    order by totalAcerto desc limit 1;

