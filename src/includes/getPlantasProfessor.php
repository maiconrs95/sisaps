<?php

header("Content-Type:" .  "application/json");
require_once('conexao.php');

$sql = "SELECT tp.id_plantas, Descricao, nome_cientifico, nome_user FROM tb_plantas as tp JOIN tb_user as tu ON tu.id_user = tp.id_user JOIN tb_status ts ON ts.id_status = tp.id_status
Where tp.id_status = 1";

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