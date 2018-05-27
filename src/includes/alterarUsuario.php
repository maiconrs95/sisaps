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

    $id         = (isset($_POST['id'])) ? $_POST['id'] : '' ;
    $nome       = (isset($_POST['nome'])) ? $_POST['nome'] : '' ;
    $cpf        = (isset($_POST['cpf'])) ? $_POST['cpf'] : '' ;
    $email      = (isset($_POST['email'])) ? $_POST['email'] : '' ; 
    $usuario    = strstr($email, '@', true);
    $perfil     = (isset($_POST['perfil'])) ? $_POST['perfil'] : '' ;
    $senha      = (isset($_POST['senha'])) ? $_POST['senha'] : '' ;  
    $telefone   = (isset($_POST['telefone'])) ? $_POST['telefone'] : '' ;  
    $celular    = (isset($_POST['celular'])) ? $_POST['celular'] : '' ;  
    $cep        = (isset($_POST['cep'])) ? $_POST['cep'] : '' ;  
    $cidade     = (isset($_POST['cidade'])) ? $_POST['cidade'] : '' ;  
    $logradouro = (isset($_POST['logradouro'])) ? $_POST['logradouro'] : '' ;  
    $numero     = (isset($_POST['num'])) ? $_POST['num'] : '' ;  

    //verifica se o email ou cpf ja se encontra cadastrado
    $sql = "SELECT id_user, id_perfil, usuario FROM tb_user WHERE id_user = $id LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);
    
    if($result_id){
        $dados_usuario = mysqli_fetch_array($result_id);

        //SE A VIRIÁVEL DE SENHA ESTIVER PREENCHIDA, A QUERY ATUALIZARA OS DADOS + SENHA, SE NÃO APENAS OS DADOS SERÃO ALTERADOS
        if(1 < 0){
            
            $retorno = array('codigo' => 2 , 'Usuário' => $dados_usuario['usuario'], 'cpf' => $dados_usuario['cpf_user'],'mensagem' => 'Email e/ou CPF já cadastrado.');
            echo json_encode($retorno);
            exit();
        } else{

            //ATUALIZA OS DADOS DO USUÁRIO NO SISTEMA
            $sql = "UPDATE tb_user SET nome_user = '$nome', email_user = '$email', cpf_user='$cpf', telefone_user = '$telefone',
            celular_user= '$celular', cep = '$cep', cidade = '$cidade', logradouro = '$logradouro', num_casa = '$numero', id_perfil = $perfil, usuario='usuario' WHERE id_user = $id";
           
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