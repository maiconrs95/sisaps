<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_sintoma = (isset($_GET['id_sintoma'])) ? $_GET['id_sintoma'] : '' ;

    $sql = "SELECT * FROM tb_sintomas where id_sintomas = $id_sintoma";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $sintoma = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $sintoma[] = $linha;
        }

        echo json_encode($sintoma, JSON_PRETTY_PRINT);
        
    } else{
        echo $result;
    }
?>