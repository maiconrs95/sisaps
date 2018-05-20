<?php

    session_start();

    if(!isset($_SESSION['usuario'])){
        header('Location: ../index.php?erro=6');
    }
    
    if($_SESSION['perfil'] != 1){
        $retorno = array('codigo' => 1 , 'mensagem' => 'Você não possui acesso para esta operação. Favor entrar em contato com o adm do sistema.');
        echo json_encode($retorno);
        exit();
    }
   
    require_once('conexao.php');

    $id         = (isset($_GET['id'])) ? $_GET['id'] : '' ;
    $nome       = (isset($_GET['nome'])) ? $_GET['nome'] : '' ;
    $email      = (isset($_GET['email'])) ? $_GET['email'] : '' ; 
    $usuario    = strstr($email, '@', true);
    $perfil     = (isset($_GET['perfil'])) ? $_GET['perfil'] : '' ;
    $senha     = (isset($_GET['senha'])) ? $_GET['senha'] : '' ;  
    $telefone   = (isset($_GET['telefone'])) ? $_GET['telefone'] : '' ;  
    $celular    = (isset($_GET['celular'])) ? $_GET['celular'] : '' ;  
    $cep        = (isset($_GET['cep'])) ? $_GET['cep'] : '' ;  
    $cidade     = (isset($_GET['cidade'])) ? $_GET['cidade'] : '' ;  
    $logradouro = (isset($_GET['logradouro'])) ? $_GET['logradouro'] : '' ;  
    $numero     = (isset($_GET['num'])) ? $_GET['num'] : '' ;  

    //verifica se o email ou cpf ja se encontra cadastrado
    $sql = "SELECT id_user, id_perfil, usuario, email_user, cpf_user FROM tb_user WHERE (cpf_user = '$cpf' || email_user = '$email')  LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);
    
    if($result_id){
        $dados_usuario = mysqli_fetch_array($result_id);

        //SE A VIRIÁVEL DE SENHA ESTIVER PREENCHIDA, A QUERY ATUALIZARA OS DADOS + SENHA, SE NÃO APENAS OS DADOS SERÃO ALTERADOS
        if(isset($senha)){
            
            $retorno = array('codigo' => 2 , 'Usuário' => $dados_usuario['usuario'], 'cpf' => $dados_usuario['cpf_user'],'mensagem' => 'Email e/ou CPF já cadastrado.');
            echo json_encode($retorno);
            exit();
        } else{

            //ATUALIZA OS DADOS DO USUÁRIO NO SISTEMA
            $sql = "INSERT INTO tb_user (nome_user, email_user, cpf_user, id_perfil, telefone_user, celular_user, cep, cidade, logradouro, num_casa, primeiro_login, senha_user, usuario) values ('$nome', '$email', '$cpf', '$perfil', '$telefone', '$celular', '$cep', '$cidade', '$logradouro', '$numero', 1, '1234', '$usuario')";
           
            $result_id = mysqli_query($link, $sql);

            //Mensagem de sucesso
            $retorno = array('codigo' => 3,'mensagem' => 'Dados atualizado');
            echo json_encode($retorno);
            exit();
        }
    } else{
        echo 'Erro na execução da query. Favor contatar o adm do sistema';
    }
        
?>