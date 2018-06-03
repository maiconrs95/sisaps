<?php

    session_start();

    if(!isset($_SESSION['usuario'])){
        header('Location: ../index.php?erro=6');
    }
   
    require_once('conexao.php');

    $id             = (isset($_POST['id'])) ? $_POST['id'] : '' ;
    $nome_c         = (isset($_POST['nome_c'])) ? $_POST['nome_c'] : '' ;
    $nome_p         = (isset($_POST['nome_p'])) ? $_POST['nome_p'] : '' ;
    $parte_sintoma  = (isset($_POST['parte_corpo'])) ? $_POST['parte_corpo'] : '' ;     
    $causas         = (isset($_POST['causas'])) ? $_POST['causas'] : '' ; 
    $tratamentos    = (isset($_POST['tratamentos'])) ? $_POST['tratamentos'] : '' ; 

    //verifica se o usuário existe
    $sql = "SELECT id_sintomas, nome_cientifico FROM tb_sintomas WHERE id_sintomas = $id LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);
    
    if($result_id){

        $dados_usuario = mysqli_fetch_array($result_id);
        
            //ATUALIZA OS DADOS DO SINTOMA NO SISTEMA
            $sql = "UPDATE tb_sintomas SET nome_cientifico = '$nome_c', nome_popular = '$nome_p', causas = '$causas', tratamentos =             '$tratamentos', id_parte_corpo = $parte_sintoma WHERE id_sintomas = $id";
           
            $result_id = mysqli_query($link, $sql);

            //MENSAGENS
            $retorno = array('codigo' => 3,'mensagem' => 'Dados atualizados.');
            echo json_encode($retorno);
            exit();
        
    } else{
        echo 'Erro na execução da query. Favor contatar o adm do sistema';
    }
        
?>