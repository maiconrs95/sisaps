<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_planta = (isset($_GET['id_planta'])) ? $_GET['id_planta'] : '' ;

    $sql = "SELECT tpp.id_sintomas, tpp.id_plantas, ts.nome_cientifico from tb_plantas_sintomas tpp join tb_plantas tp on tp.id_plantas = tpp.id_plantas join tb_sintomas as ts on ts.id_sintomas = tpp.id_sintomas where tpp.id_plantas = $id_planta";

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
        echo $result;
    }
?>