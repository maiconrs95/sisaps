<?php

    session_start();

    require_once('conexao.php');

    $usuario = (isset($_POST['email'])) ? $_POST['email'] : '' ;
    $senha = (isset($_POST['senha'])) ? $_POST['senha'] : '' ;  

    //verificar se os campos de usuario e senha estão preenchidos
    if (empty($usuario) || empty($senha)){
        $retorno = array('codigo' => 1, 'mensagem' => 'Preencha o e-mail e a senha!');
        echo json_encode($retorno);
        exit();
    }
    
    $sql = "SELECT id_user, id_perfil, primeiro_login, usuario, email_user FROM tb_user WHERE (usuario = '$usuario' || email_user = '$usuario') AND BINARY senha_user = '$senha' LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);

    if($result_id != null){

        $dados_usuario = mysqli_fetch_array($result_id);

        //verificar o primeiro acesso ao sistema, onde deve alterar a senha
        if($dados_usuario['primeiro_login'] == 1){

            $retorno = array('codigo' => 2,'mensagem' => 'Altere a senha para fazer logon.');
            echo json_encode($retorno);
            exit();
        }

        //realiza o login e inicia as sessões
        if(isset($dados_usuario['usuario']) || isset($dados_usuario['senha'])){

            $_SESSION['id'] = $dados_usuario['id_user'];
            $_SESSION['perfil'] = $dados_usuario['id_perfil'];
            $_SESSION['usuario'] = $dados_usuario['usuario'];
            $_SESSION['email'] = $dados_usuario['email_user'];
            
            $retorno = array('codigo' => 3, 'user' => $_SESSION['usuario'], 'perfil' => $_SESSION['perfil'],'mensagem' => 'Logado');
            echo json_encode($retorno);
            exit();
        } else{

            //caso os dados estejam incorretos
            $retorno = array('codigo' => 4, 'mensagem' => 'Dados inválidos.');
            echo json_encode($retorno);
            exit();
        }
    } else{
        echo 'Erro na execução da consulta. Favor contatar o adm do sistema';
    }
?>