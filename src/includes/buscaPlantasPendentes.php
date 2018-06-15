<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT id_plantas, nome_cientifico, nome_popular, modo_preparo, cuidados, efeitos_colaterais, principio_efeitos, bibliografia, regiao, comentarios, descricao from tb_plantas p join tb_status ts ON ts.id_status = p.id_status WHERE p.id_status = 2";

$conexao = new db();
$link = $conexao->conn_mysql();

$result = mysqli_query($link, $sql);

if(!$link){
    echo 'ERRO AO CONECTAR';
}

if($result){
    $plantaPendente = array();
    
    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $plantaPendente[] = $linha;
    }

    echo json_encode($plantaPendente, JSON_PRETTY_PRINT);
    
} else{
    echo '[{"Erro": "Não foi possível conectar ao banco"}]';
}
?>