<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_sintoma = (isset($_GET['id_sintoma'])) ? $_GET['id_sintoma'] : '' ; 
    $comentario = (isset($_GET['comentario'])) ? $_GET['comentario'] : '' ; 

    $sql = "UPDATE tb_sintomas SET id_status = 2, comentarios = '$comentario' WHERE id_sintomas = $id_sintoma";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        
        $retorno = array('codigo' => 0,'mensagem' => 'Planta enviada para revisão.', 'id' => $id_sintoma);
        echo json_encode($retorno);
        exit();
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>