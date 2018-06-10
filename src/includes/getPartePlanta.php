<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $sql = "SELECT * FROM tb_parte_planta";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $parte = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $parte[] = $linha;
        }

        echo json_encode($parte, JSON_PRETTY_PRINT);
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>