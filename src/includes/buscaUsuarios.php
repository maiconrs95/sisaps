<?php

    header("Content-Type:" .  "application/json");
    require_once('conexao.php');

    $sql = "SELECT id_user, usuario, nome_user, email_user, cpf_user, perfil, telefone_user, celular_user, cep, cidade, logradouro, num_casa, ativo
        FROM tb_user INNER JOIN tb_perfil ON tb_perfil.id_perfil = tb_user.id_perfil";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result = mysqli_query($link, $sql);

    if(!$link){
        echo 'ERRO AO CONECTAR';
    }

    if($result){
        $usuarios = array();
        
        while($linha =  mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $usuarios[] = $linha;
        }

        echo json_encode($usuarios, JSON_PRETTY_PRINT);
        
    } else{
        echo '[{"Erro": "Não foi possível conectar ao banco"}]';
    }
?>