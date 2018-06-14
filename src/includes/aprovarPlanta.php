<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_planta = (isset($_GET['id_planta'])) ? $_GET['id_planta'] : '' ; 

    $sql = "UPDATE tb_plantas set id_status = 3 WHERE id_plantas = $id_planta";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        
        $retorno = array('codigo' => 0,'mensagem' => 'Planta aprovada.', 'id' => $id_planta);
        echo json_encode($retorno);
        exit();
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>