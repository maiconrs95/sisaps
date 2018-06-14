<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_sintoma = (isset($_GET['id_sintoma'])) ? $_GET['id_sintoma'] : '' ;

    $sql = "SELECT id_sintomas, nome_cientifico, nome_popular, parte_corpo, causas, tratamentos FROM tb_sintomas ts 
    JOIN tb_parte_corpo tpc ON tpc.id_parte_corpo = ts.id_parte_corpo
    WHERE ts.id_status = 1";

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