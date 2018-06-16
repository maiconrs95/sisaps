<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT id_plantas, nome_cientifico, nome_popular, foto_planta, modo_preparo, cuidados, 
efeitos_colaterais, principio_efeitos, bibliografia, regiao,  parte_planta
FROM tb_plantas tp 
JOIN tb_user ts ON ts.id_user = tp.id_user 
JOIN tb_parte_planta tpp ON tpp.id_parte_planta = tp.id_parte_planta
WHERE id_status = 3 ORDER BY id_plantas DESC";

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

    $sql = "SELECT tpp.id_sintomas, tpp.id_plantas, ts.nome_cientifico, ts.nome_popular, ts.causas, ts.tratamentos from tb_plantas_sintomas tpp join tb_plantas tp on tp.id_plantas = tpp.id_plantas join tb_sintomas as ts on ts.id_sintomas = tpp.id_sintomas where tpp.id_plantas = $id_planta";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);
  
    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $sintomas[] = $linha;
    }

    return $sintomas;        
}

?>