<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT id_plantas, nome_cientifico, nome_popular, nome_user FROM tb_plantas tp JOIN tb_user ts ON ts.id_user = tp.id_user";

$conexao = new db();
$link = $conexao->conn_mysql();

$result = mysqli_query($link, $sql);

if(!$link){
    echo 'ERRO AO CONECTAR';
}

if($result){
    $plantaAtiva = array();
    $i = 0;

    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){

        $plantaAtiva['Planta'][] = $linha;
        $plantaAtiva['Planta'][$i]['Sintomas'] = getSintomas($plantaAtiva['Planta'][$i]['id_plantas']);

        $i++;
    }

    echo json_encode($plantaAtiva, JSON_PRETTY_PRINT);
    
} else{
    echo '[{"Erro": "Não foi possível conectar ao banco"}]';
}

function getSintomas($id_planta){

    $sql = "SELECT tpp.id_sintomas, tpp.id_plantas, ts.nome_cientifico from tb_plantas_sintomas tpp join tb_plantas tp on tp.id_plantas = tpp.id_plantas join tb_sintomas as ts on ts.id_sintomas = tpp.id_sintomas where tpp.id_plantas = $id_planta";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);
  
    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $sintomas[] = $linha;
    }
    
    return $sintomas;        
}

?>