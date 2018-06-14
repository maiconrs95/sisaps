<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_sintoma = (isset($_GET['id_sintoma'])) ? $_GET['id_sintoma'] : '' ; 

    $sql = "UPDATE tb_sintomas SET id_status = 3, comentarios = 'Aprovado' WHERE id_sintomas = $id_sintoma";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        
        $retorno = array('codigo' => 0,'mensagem' => 'Planta aprovada.', 'id' => $id_sintoma);
        echo json_encode($retorno);
        exit();
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>