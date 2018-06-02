<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $sql = "SELECT id_sintomas, nome_cientifico, nome_popular, causas, tratamentos, pc.parte_corpo from tb_sintomas s join tb_parte_corpo pc ON pc.id_parte_corpo = s.id_parte_corpo";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $sintomas = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $sintomas[] = $linha;
        }

        echo json_encode($sintomas, JSON_PRETTY_PRINT);
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>