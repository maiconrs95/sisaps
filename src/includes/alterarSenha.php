<?php

    session_start();

    require_once('conexao.php');
    
    $usuario = (isset($_POST['email'])) ? $_POST['email'] : '' ;
    $senha = (isset($_POST['senha'])) ? $_POST['senha'] : '' ;  
    $nova_senha = (isset($_POST['nova-senha'])) ? $_POST['nova-senha'] : '' ;
    
    //verificar se os campos de usuario e senha estão preenchidos
    if (empty($usuario) || empty($senha) || empty($nova_senha)){
        $retorno = array('codigo' => 1, 'mensagem' => 'Preencha todos os campos.');
        echo json_encode($retorno);
        exit();
    }

    $sql = "SELECT id_user, id_perfil, primeiro_login, usuario, email_user FROM tb_user WHERE (usuario = '$usuario' || email_user = '$usuario') AND senha_user = '$senha' LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);

    //faz a consulta, e caso retorne algo o sistema pega a nova senha e atualiza no BD
    if($result_id){
        $dados_usuario = mysqli_fetch_array($result_id);

        if(isset($dados_usuario['usuario'])){

            $id = $dados_usuario['id_user'];
            $sql = "UPDATE tb_user SET senha_user = '$nova_senha', primeiro_login = 0 WHERE id_user = $id";
        
            $result_id = mysqli_query($link, $sql);
        
            $retorno = array('codigo' => 2, 'mensagem' => 'Senha alterada com sucesso.');
            echo json_encode($retorno);
        }
        else{
            $retorno = array('codigo' => 3, 'mensagem' => 'Dados inválidos');
            echo json_encode($retorno);
        }

    } else{
        echo 'Erro na execução da consulta. Favor contatar o adm do sistema';
    }
?>