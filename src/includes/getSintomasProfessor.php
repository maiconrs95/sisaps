<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "";

$conexao = new db();
$link = $conexao->conn_mysql();

$result = mysqli_query($link, $sql);

if(!$link){
    echo 'ERRO AO CONECTAR';
}

if($result){
    $sintomaPendente = array();
    
    while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
        $sintomaPendente[] = $linha;
    }

    echo json_encode($sintomaPendente, JSON_PRETTY_PRINT);
    
} else{
    echo '[{"Erro": "Não foi possível conectar ao banco"}]';
}
?>