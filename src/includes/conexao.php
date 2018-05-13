<?php

    class db{
        //host
        private $host = '50.62.209.79';

        //user
        private $user = 'sisapsadmin';

        //senha
        private $senha = 'Root_123';

        //banco_dados
        private $database = 'db_sisaps';

        public function conn_mysql(){
            //criar conexao
            $conn = mysqli_connect($this->host, $this->user, $this->senha, $this->database);
            
            //ajustar o charset de comunicação da aplicação e o bd
            mysqli_set_charset($conn, 'utf8');

            //verificando erros de conexão
            if(mysqli_connect_errno()){
                echo 'Houve um erro ao se conectar  com o Bando de Dados MySql: ' . mysqli_connect_error(); 
            }

            return $conn;

        }
    }

?>