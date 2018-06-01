<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $sql = "SELECT * FROM tb_parte_corpo";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $corpo = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $corpo[] = $linha;
        }

        echo json_encode($corpo, JSON_PRETTY_PRINT);
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>