<?php

    session_start();

    if(!isset($_SESSION['usuario'])){
        header('Location: ../index.php?erro=6');
    }
   
    require_once('conexao.php');

    $nome_c         = (isset($_GET['nome_cientifico'])) ? $_GET['nome_cientifico'] : '' ;
    $nome_comp      = (isset($_GET['nome_cientifico_comp'])) ? $_GET['nome_cientifico_comp'] : '' ;
    $nome_p         = (isset($_GET['nome_popular'])) ? $_GET['nome_popular'] : '' ; 
    $parte_corpo    = (isset($_GET['parte_corpo'])) ? $_GET['parte_corpo'] : '' ;
    $causa          = (isset($_GET['causa'])) ? $_GET['causa'] : '' ;
    $tratamento     = (isset($_GET['tratamentos'])) ? $_GET['tratamentos'] : '' ;

    //verifica se o sintoma ja se encontra cadastrado
    $sql = "SELECT * FROM tb_sintomas WHERE nome_cientifico_comp = '$nome_comp'  LIMIT 1";

    $conexao = new db();
    $link = $conexao->conn_mysql();

    $result_id = mysqli_query($link, $sql);
    
    if($result_id){
        $dados_sintoma = mysqli_fetch_array($result_id);

        if(isset($dados_sintoma['nome_cientifico_comp'])){
            
            //Caso haja algum registro no sistema o script retorna a seguinte mensagem:
            $retorno = array('codigo' => 2 , 'mensagem' => 'Sintoma já cadastrado.');
            echo json_encode($retorno);
            exit();
        } else{

            //Se não, insere o novo usuário no sistema
            $sql = "INSERT INTO tb_sintomas (nome_cientifico, nome_popular, causas, tratamentos, id_parte_corpo, nome_cientifico_comp) VALUES ('$nome_c', '$nome_p', '$causa', '$tratamento', $parte_corpo, '$nome_comp')";
           
            $result_id = mysqli_query($link, $sql);

            //Mensagem de sucesso
            $retorno = array('codigo' => 3,'mensagem' => 'Sintoma ' . $nome_c . ' cadastrado.');
            echo json_encode($retorno);
            exit();
        }
    } else{
        echo 'Erro na execução da query. Favor contatar o adm do sistema';
    }
        
?>