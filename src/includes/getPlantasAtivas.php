<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT tp.nome_cientifico, tp.nome_popular, ts.nome_cientifico, foto_planta, modo_preparo, cuidados, efeitos_colaterais, 
principio_efeitos, bibliografia, regiao, tp.id_parte_planta ,parte_planta 

from tb_plantas tp 
join tb_parte_planta tpp on tpp.id_parte_planta = tp.id_parte_planta 
join tb_plantas_sintomas tps on tps.id_plantas = tp.id_plantas
join tb_sintomas ts on ts.id_sintomas = tps.id_sintomas";

$conexao = new db();
$link = $conexao->conn_mysql();

$result = mysqli_query($link, $sql);

if(!$link){
    echo 'ERRO AO CONECTAR';
}

if($result){
    $plantaAtiva = array();
    
    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $plantaAtiva[] = $linha;
    }

    echo json_encode($plantaAtiva, JSON_PRETTY_PRINT);
    
} else{
    echo '[{"Erro": "Não foi possível conectar ao banco"}]';
}
?>