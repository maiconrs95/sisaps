<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $id_planta = (isset($_GET['id_planta'])) ? $_GET['id_planta'] : '' ;

    $sql = "SELECT nome_cientifico, nome_popular, modo_preparo, cuidados, efeitos_colaterais, principio_efeitos, bibliografia, regiao, parte_planta from tb_plantas tp join tb_parte_planta tpp on tpp.id_parte_planta = tp.id_parte_planta  where id_plantas = $id_planta";

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