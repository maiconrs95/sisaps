<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT id_sintomas ,Descricao, nome_cientifico, nome_user FROM tb_sintomas ts JOIN tb_status tst ON tst.id_status = ts.id_status JOIN tb_user tu ON ts.id_user = tu.id_user WHERE ts.id_status <> 3";

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