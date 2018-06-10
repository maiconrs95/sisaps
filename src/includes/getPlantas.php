<?php

    session_start();
    if(!isset($_SESSION['usuario'])){
        header('Location: index.html?msg=efetuarlogin');
    } 

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $sql = "SELECT id_plantas, nome_cientifico, nome_popular, nome_user FROM tb_plantas tp JOIN tb_user ts ON ts.id_user = tp.id_user";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $plantas = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $plantas[] = $linha;
        }

        echo json_encode($plantas, JSON_PRETTY_PRINT);
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>