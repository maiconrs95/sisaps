CREATE DATABASE  IF NOT EXISTS `db_sisaps` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_sisaps`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 50.62.209.79    Database: db_sisaps
-- ------------------------------------------------------
-- Server version	5.5.43-37.2-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_parte_corpo`
--

DROP TABLE IF EXISTS `tb_parte_corpo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_parte_corpo` (
  `id_parte_corpo` int(11) NOT NULL AUTO_INCREMENT,
  `parte_corpo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_parte_corpo`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_parte_corpo`
--

LOCK TABLES `tb_parte_corpo` WRITE;
/*!40000 ALTER TABLE `tb_parte_corpo` DISABLE KEYS */;
INSERT INTO `tb_parte_corpo` VALUES (1,'Cabeça'),(2,'Testa'),(3,'Olho'),(4,'Nariz'),(5,'Boca'),(6,'Dentes'),(7,'Garganta'),(8,'Pescoço'),(9,'Ombros'),(10,'Braço'),(11,'Pulso'),(12,'Dedos'),(13,'Coluna'),(14,'Peito'),(15,'Tórax'),(16,'Abdômen'),(17,'Virilha'),(18,'Glúteos'),(19,'Umbigo'),(20,'Ouvidos'),(21,'Perna'),(22,'Coxa'),(23,'Joelho'),(24,'Tornozelo'),(25,'Pé'),(26,'Corpo Todo'),(27,'Rosto');
/*!40000 ALTER TABLE `tb_parte_corpo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_parte_planta`
--

DROP TABLE IF EXISTS `tb_parte_planta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_parte_planta` (
  `id_parte_planta` int(11) NOT NULL AUTO_INCREMENT,
  `parte_planta` varchar(255) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_parte_planta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_parte_planta`
--

LOCK TABLES `tb_parte_planta` WRITE;
/*!40000 ALTER TABLE `tb_parte_planta` DISABLE KEYS */;
INSERT INTO `tb_parte_planta` VALUES (1,'Folhas','Folhas'),(2,'Raízes','Raízes'),(3,'Caule','Caule '),(4,'Flores','Flores'),(5,'Frutos','Frutos');
/*!40000 ALTER TABLE `tb_parte_planta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_perfil`
--

DROP TABLE IF EXISTS `tb_perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_perfil` (
  `id_perfil` int(11) NOT NULL AUTO_INCREMENT,
  `perfil` varchar(45) NOT NULL,
  `observacao` varchar(255) NOT NULL,
  PRIMARY KEY (`id_perfil`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_perfil`
--

LOCK TABLES `tb_perfil` WRITE;
/*!40000 ALTER TABLE `tb_perfil` DISABLE KEYS */;
INSERT INTO `tb_perfil` VALUES (1,'Administrador','Acesso completo ao sistema'),(2,'Professor','Acesso sem todos os privilegios'),(3,'Assistente','Acesso sem todos os privilegios');
/*!40000 ALTER TABLE `tb_perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_plantas`
--

DROP TABLE IF EXISTS `tb_plantas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_plantas` (
  `id_plantas` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cientifico` varchar(60) NOT NULL,
  `nome_popular` varchar(60) NOT NULL,
  `modo_preparo` varchar(1000) DEFAULT NULL,
  `foto_planta` varchar(1000) DEFAULT NULL,
  `cuidados` varchar(1000) NOT NULL,
  `efeitos_colaterais` varchar(1000) NOT NULL,
  `principio_efeitos` varchar(1000) NOT NULL,
  `bibliografia` varchar(300) DEFAULT NULL,
  `id_parte_planta` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT NULL,
  `regiao` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `id_status` int(11) NOT NULL,
  `comentarios` varchar(600) DEFAULT NULL,
  `nome_cientifico_comp` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_plantas`,`nome_cientifico`),
  KEY `fk_tb_plantas_tb_parte_planta1_idx` (`id_parte_planta`),
  KEY `fk_tb_plantas_tb_user1_idx` (`id_user`),
  KEY `fk_tb_plantas_tb_status1_idx` (`id_status`),
  CONSTRAINT `fk_tb_plantas_tb_parte_planta1` FOREIGN KEY (`id_parte_planta`) REFERENCES `tb_parte_planta` (`id_parte_planta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_plantas_tb_status1` FOREIGN KEY (`id_status`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_plantas_tb_user1` FOREIGN KEY (`id_user`) REFERENCES `tb_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_plantas`
--

LOCK TABLES `tb_plantas` WRITE;
/*!40000 ALTER TABLE `tb_plantas` DISABLE KEYS */;
INSERT INTO `tb_plantas` VALUES (182,'Aloe Vera (L.) Burm.','Babosa','','../img/plantas/babosa-e1463418344794.jpg','Queimaduras da pele','Hemorroidas','Alívio de dores','',2,12,NULL,NULL,'Brasil',NULL,2,'O que é xerelebas?',NULL),(183,'Nasturtium officinalis','Agrião-Aquático ','Corte os talos mais grossos com uma faca.\r\nDeixe de molho em água com hipoclorito de sódio por alguns minutos.\r\nSeque as folhas e separe as amareladas e danificadas.\r\nAgora é só consumir ou guardar na','../img/plantas/wallpaper.wiki-Flat-Design-Backgrounds-Free-Download-PIC-WPB004653.png','O alimento é contraindicado para consumo em qualquer forma para gestantes em início de gravidez.','O Agrião pode provocar aborto, irritações no estômago e em vias urinárias.','De todos os seus princípios ativos, um dos mais importantes é a presença de isotiocianatos. ','https://www.saudedica.com.br/agriao-beneficios-usos-e-efeitos-colaterais/',1,3,NULL,NULL,'',NULL,1,'Planta Pendente de Verificação',NULL),(184,'Bixa orellana L.','Urucum','','../img/plantas/urucum.jpg','asma, bronquite, tosse','diarreia, febre, colesterol','folhas de cor verde-claro e flores rosadas com muitos estames','',5,3,NULL,NULL,'',NULL,1,'Planta Pendente de Verificação',NULL),(185,'tirulipaas','tirulipa','','../img/plantas/tempero_tomilho-088000febf801d36b115121912365478-640-0.jpg','gfdsa','gfcdxsa','iuhgfdsa','',1,3,NULL,NULL,'',NULL,2,'sa',NULL),(186,'Matricaria chamomilla','hahaha','A incorporação do óleo essencial de camomila em soluções tópicas tem sido estudada há décadas devido a sua propriedade bactericida, sobretudo em relação a bactérias gram-positivas como estafilococos. ','../img/plantas/camomila.PNG','A cumarina presente na camomila potencializa o efeito de medicamentos anticoagulantes, como a varfarina, aumentando o risco de hemorragias internas e levando a graves complicações.Além disso, o pólen encontrado em certos preparados de camomila podem desencadear reações alérgicas em alguns indivíduos','A maioria dos especialistas diz que a Camomila é segura. Pode causar sonolência e, em grandes doses, vômitos. Também tem o potencial de desencadear reações alérgicas em pessoas que são alérgicas a plantas relacionadas na família margarida, embora tais reações sejam muito raras. Evite se você é alérgico a estas plantas: Camomila, ambre de amêndoa, margaridas, calêndulas ou crisântemos. Cremes de pele com Camomila podem causar eczema alérgico e irritar os olhos. Os efeitos do uso prolongado de Cam','Óleo essencial (composto de sesquiterpenos etílico como o alfa bisabolol);\r\nPró-camazuleno;\r\nMatricina;\r\nFlavonóide (apigenina);\r\nColina;\r\nTerpeno;\r\nTanino;\r\nCumarinas (como a herniarina e umbeliferona);\r\nMucilagens;\r\nAminoácidos;\r\nÁcidos graxos;\r\nÁcidos orgânicos (como o ácido salicílico);\r\nSais minerais;\r\nVitamina C.','https://pt.wikipedia.org/wiki/Camomila-vulgar#Uso\r\nhttps://www.saudedica.com.br/camomila-beneficios-usos-e-efeitos-colaterais/',1,3,NULL,NULL,'Sul e Leste Europa',NULL,3,'Aprovada',NULL),(187,'Peumus boldus','Boldo','...','../img/sem-foto.jpg','...','...','...','https://pt.wikipedia.org/wiki/Peumus_boldus',1,18,NULL,NULL,'Andes Chilenos',NULL,3,'Aprovada',NULL);
/*!40000 ALTER TABLE `tb_plantas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_plantas_sintomas`
--

DROP TABLE IF EXISTS `tb_plantas_sintomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_plantas_sintomas` (
  `id_planta_sintomas` int(11) NOT NULL AUTO_INCREMENT,
  `id_plantas` int(11) NOT NULL,
  `id_sintomas` int(11) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_planta_sintomas`,`id_plantas`,`id_sintomas`),
  KEY `fk_plantas_tb_has_sintomas_tb_sintomas_tb1_idx` (`id_sintomas`),
  KEY `fk_plantas_tb_has_sintomas_tb_plantas_tb1_idx` (`id_plantas`),
  CONSTRAINT `fk_plantas_tb_has_sintomas_tb_plantas_tb1` FOREIGN KEY (`id_plantas`) REFERENCES `tb_plantas` (`id_plantas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_plantas_tb_has_sintomas_tb_sintomas_tb1` FOREIGN KEY (`id_sintomas`) REFERENCES `tb_sintomas` (`id_sintomas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=786 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_plantas_sintomas`
--

LOCK TABLES `tb_plantas_sintomas` WRITE;
/*!40000 ALTER TABLE `tb_plantas_sintomas` DISABLE KEYS */;
INSERT INTO `tb_plantas_sintomas` VALUES (699,186,19,NULL),(700,185,15,NULL),(701,185,19,NULL),(702,185,22,NULL),(703,185,23,NULL),(764,182,19,NULL),(765,182,26,NULL),(773,187,19,NULL),(774,187,22,NULL),(775,187,23,NULL),(782,183,23,NULL),(783,183,24,NULL),(784,183,25,NULL),(785,184,24,NULL);
/*!40000 ALTER TABLE `tb_plantas_sintomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sintomas`
--

DROP TABLE IF EXISTS `tb_sintomas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_sintomas` (
  `id_sintomas` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cientifico` varchar(60) NOT NULL,
  `nome_popular` varchar(60) NOT NULL,
  `causas` varchar(255) DEFAULT NULL,
  `tratamentos` varchar(255) DEFAULT NULL,
  `id_parte_corpo` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `nome_cientifico_comp` varchar(100) DEFAULT NULL,
  `comentarios` varchar(600) DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_sintomas`),
  KEY `fk_tb_sintomas_tb_parte_corpo1_idx` (`id_parte_corpo`),
  KEY `fk_tb_sintomas_tb_status1_idx` (`id_status`),
  KEY `fk_tb_sintomas_tb_user1_idx` (`id_user`),
  CONSTRAINT `fk_tb_sintomas_tb_parte_corpo1` FOREIGN KEY (`id_parte_corpo`) REFERENCES `tb_parte_corpo` (`id_parte_corpo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_sintomas_tb_status1` FOREIGN KEY (`id_status`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sintomas`
--

LOCK TABLES `tb_sintomas` WRITE;
/*!40000 ALTER TABLE `tb_sintomas` DISABLE KEYS */;
INSERT INTO `tb_sintomas` VALUES (15,'Febre','Febre','Sintomas da Gripe','Para baixar a febre, deve-se tomar medicamentos antitérmicos, tomar um banho levemente frio e colocar panos úmidos na testa e nas axilas, para ajudar a regular a temperatura do corpo.',5,3,'Febre','Aprovado',3),(19,'Dor de Cabeça','Dor de Cabeça','Sintoma de problemas como gripe, estresse e sinusite. ','Para aliviar a dor de cabeça, deve-se ficar descansando em um local calmo e escuro, tomar chá de camomila e colocar um pano úmido na testa.',1,3,'Dor de Cabeça','Aprovado',3),(20,'Tosse','Tosse','Infecções recentes das vias aéreas superiores, como o resfriado comum ou a gripe, podem provocar tosse.','Para melhorar a tosse e a secreção, deve-se beber bastante água e usar remédio caseiros que acalmam a garganta, como mel com limão, chá de canela e cravo-da-índia e chá de urtiga.',8,2,'Tosse','d',3),(21,'Dor Muscular','Dor no Corpo','A dor no corpo todo geralmente está associada à dificuldade para dormir, ao cansaço excessivo e ao estresse.','É importante tentar aliviar o estresse durante o dia participando em atividades relaxantes como meditação, yoga ou até mesmo descansando, para reduzir os níveis de estresse e fortalecer o sistema imune.',26,3,'Dor Muscular','Aprovado',3),(22,'Anemia','Palidez','A anemia surge quando os glóbulos vermelhos não estão funcionando corretamente e, por isso, a diferentes partes do corpo não recebem o oxigênio necessário para funcionar.','Deve-se consultar um clínico geral para fazer um exame de sangue e avaliar a quantidade de hemoglobina no sangue.',27,3,'Anemia','Aprovado',3),(23,'Gonorréia','Xerelebas','Falta de Higiene ','Passar Pomada',18,3,'Gonorréia','Aprovado',12),(24,'Prespecção optica','Dor nos olhos','Falta deHigiene','',3,3,'Prespecção optica','Aprovado',12),(25,'Ardência ','Aderência ','','',4,3,'Ardência ','Aprovado',3),(26,'xerelebas','xerelebas aguda','','',13,2,'xerelebas','x',3),(27,'dfghj','xcvbn','','',9,3,'dfghj','Aprovado',16),(28,'teste1254','sdsdsd','','',5,3,'teste1254','Aprovado',3);
/*!40000 ALTER TABLE `tb_sintomas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_status`
--

DROP TABLE IF EXISTS `tb_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_status` (
  `id_status` int(11) NOT NULL AUTO_INCREMENT,
  `Descricao` varchar(255) DEFAULT NULL,
  `Info` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_status`
--

LOCK TABLES `tb_status` WRITE;
/*!40000 ALTER TABLE `tb_status` DISABLE KEYS */;
INSERT INTO `tb_status` VALUES (1,'Pendente','Planta enviado para aprovação do responsável'),(2,'Reprovado','Aprovação da planta recusado pelo responsável'),(3,'Aprovado','Aprovado pelo responsável'),(4,'Desativada','Planta Desativada');
/*!40000 ALTER TABLE `tb_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `cpf_user` varchar(13) NOT NULL,
  `usuario` varchar(60) NOT NULL,
  `id_perfil` int(11) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `telefone_user` varchar(15) DEFAULT NULL,
  `celular_user` varchar(15) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `cidade` varchar(80) DEFAULT NULL,
  `num_casa` varchar(9) DEFAULT NULL,
  `primeiro_login` tinyint(1) DEFAULT NULL,
  `senha_user` varchar(200) DEFAULT NULL,
  `logradouro` varchar(100) DEFAULT NULL,
  `ativo` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  KEY `fk_user_tb_perfil_tb1_idx` (`id_perfil`),
  CONSTRAINT `fk_user_tb_perfil_tb1` FOREIGN KEY (`id_perfil`) REFERENCES `tb_perfil` (`id_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (3,'admin','admin@outlook.com.br','4481438185','admin',1,'','(41) 9120-3231','(11) 23131-2312','06462-000','Barueri','150',0,'admin','Rua Adoniram Barbosa',1),(12,'Maicon Rocha da Silva','maiconrs95@gmail.com','43038658855','maiconrs95',3,'','(11) 1111-1111','(22) 22222-2222','05164-110','São Paulo','110',0,'1111','Rua Miguel Magno',NULL),(16,'Edgar Lins Lima','edgar.lima10@outlook.com','44814381859','edgar.lima10',3,'','(11) 4191-9613','(11) 99531-5655','06462-090','Barueri','160',0,'123456','Rua Noel Rosa',NULL),(17,'Gustavo Girardi','gustavo_awd@hotmail.com','42249739870','gustavo_awd',1,'','(11) 3920-2020','(11) 98654-7597','05271-060','São Paulo','69',0,'250495','Rua Virgínia Castiglioni',NULL),(18,'Rhamayane Cristine Barbosa Pereira','rhamayane_cristine@hotmail.com','36210428819','rhamayane_cristine',2,'','(11) 9927-7409','(11) 99277-4093','05785-070','São Paulo','72',0,'31121995','Rua Cidreira',NULL);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'db_sisaps'
--
/*!50003 DROP PROCEDURE IF EXISTS `associa_planta_sintoma` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`sisapsadmin`@`%` PROCEDURE `associa_planta_sintoma`(in id_plantas1 int, in id_sintomas1 int)
BEGIN

DECLARE Count1 int;

SET Count1 = (SELECT Count(*) FROM tb_plantas_sintomas Where id_plantas = id_plantas1 and id_sintomas = id_sintomas1);

If (Count1 = 0)
THEN
INSERT INTO tb_plantas_sintomas (id_plantas, id_sintomas) values (id_plantas1, id_sintomas1);
END If;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cadastro_planta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`sisapsadmin`@`%` PROCEDURE `cadastro_planta`(
in nome_cientifico1 varchar(200),
in nome_popular1 varchar(200),
in modo_preparo1 varchar(200),
in foto_planta1 varchar(300),
in cuidados1 varchar(500),
in efeitos_colaterais1 varchar(500),
in principio_efeitos1 varchar(500),
in bibliografia1 varchar(500),
in id_parte_planta1 int,
in id_user1 int,
in regiao1 varchar(300))
BEGIN

DECLARE ultimo_id int;

if(nome_cientifico1 = '' or nome_popular1 = '' or principio_efeitos1 = '' or cuidados1 = '' or efeitos_colaterais1 = '')
	THEN
		SELECT '0';
	ELSE

INSERT INTO tb_plantas  
	(nome_cientifico, nome_popular, modo_preparo, foto_planta, cuidados, efeitos_colaterais, principio_efeitos, bibliografia,
	id_parte_planta, id_user, regiao, id_status, comentarios)
VALUES
	(nome_cientifico1,nome_popular1, modo_preparo1, foto_planta1, cuidados1, efeitos_colaterais1,principio_efeitos1, bibliografia1,
	id_parte_planta1, id_user1,regiao1,1, 'Planta Pendente de Verificação');

SET ultimo_id = LAST_INSERT_ID();

SELECT ultimo_id;
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_associar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`sisapsadmin`@`%` PROCEDURE `delete_associar`(
in id_plantas1 int)
BEGIN

DELETE FROM tb_plantas_sintomas where id_plantas = id_plantas1;
SELECT '0';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_planta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`sisapsadmin`@`%` PROCEDURE `update_planta`(
in id_plantas1 int,
in nome_cientifico1 varchar(200),
in nome_popular1 varchar(200),
in modo_preparo1 varchar(200),
in foto_planta1 varchar(300),
in cuidados1 varchar(500),
in efeitos_colaterais1 varchar(500),
in principio_efeitos1 varchar(500),
in bibliografia1 varchar(500),
in id_parte_planta1 int,
in id_user1 int,
in regiao1 varchar(300))
BEGIN


	IF(nome_cientifico1 = '' or nome_popular1 = '' or principio_efeitos1 = '' or cuidados1 = '' or efeitos_colaterais1 = '')
		THEN
			SELECT '0';
		ELSE IF (foto_planta1 = '5')
		THEN
			UPDATE tb_plantas SET nome_cientifico = nome_cientifico1, nome_popular = nome_popular1, modo_preparo = modo_preparo1 , cuidados = cuidados1, efeitos_colaterais = efeitos_colaterais1,
			principio_efeitos=principio_efeitos1, bibliografia=bibliografia1, id_parte_planta=id_parte_planta1, id_user=id_user1, regiao=regiao1, id_status = 1, comentarios = 'Planta Pendente de Verificação' where id_plantas = id_plantas1;
			SELECT '1';
		ELSE
        
			UPDATE tb_plantas SET nome_cientifico = nome_cientifico1, nome_popular = nome_popular1, modo_preparo = modo_preparo1 , foto_planta = foto_planta1, cuidados = cuidados1, efeitos_colaterais = efeitos_colaterais1,
			principio_efeitos=principio_efeitos1, bibliografia=bibliografia1, id_parte_planta=id_parte_planta1, id_user=id_user1, regiao=regiao1, id_status = 1, comentarios = 'Planta Pendente de Verificação' where id_plantas = id_plantas1;
			SELECT '1';
            
		END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-18 14:50:42
