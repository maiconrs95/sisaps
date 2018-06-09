<?php

    session_start();
    require_once('conexao.php');

    $id_usuario = $_SESSION['id'];
    $nome_p = (isset($_POST['nome_popular'])) ? $_POST['nome_popular'] : '' ; 
    $nome_c = (isset($_POST['nome_cientifico'])) ? $_POST['nome_cientifico'] : '' ;   
    $parte_planta = (isset($_POST['parte_planta'])) ? $_POST['parte_planta'] : '' ;  
    $regiao = (isset($_POST['regiao'])) ? $_POST['regiao'] : '' ;  
    $principio_ativo = (isset($_POST['principio_ativo'])) ? $_POST['principio_ativo'] : '' ;  
    $cuidados = (isset($_POST['cuidados'])) ? $_POST['cuidados'] : '' ;  
    $efeitos = (isset($_POST['efeitos'])) ? $_POST['efeitos'] : '' ;  
    $modo_preparo = (isset($_POST['modo_preparo'])) ? $_POST['modo_preparo'] : '' ;  
    $bibliografia = (isset($_POST['bibliografia'])) ? $_POST['bibliografia'] : '' ;   
    $sintomas = (isset($_POST['duallistbox_demo2'])) ? $_POST['duallistbox_demo2'] : '' ;  
    $associar = array_chunk($sintomas, count($sintomas) / 2);
    $conexao = new db();
    $link = $conexao->conn_mysql();

    if(!is_uploaded_file($_FILES['arquivo']['tmp_name'])){
        
        $targetPath = "";

    }else{

        $sourcePath = $_FILES['arquivo']['tmp_name'];
        $targetPath = "../img/plantas/".$_FILES['arquivo']['name'];
        move_uploaded_file($sourcePath,$targetPath);
    }

    $sql = "INSERT INTO tb_plantas (nome_cientifico, nome_popular, modo_preparo, foto_planta, cuidados, efeitos_colaterais, principio_efeitos, bibliografia, id_parte_planta, id_user, estado, cidade, regiao, pais, id_status, comentarios) VALUES
    ('$nome_c', '$nome_p', '$modo_preparo', '$targetPath', '$cuidados', '$efeitos','$principio_ativo', '$bibliografia','$sintomas', '$id_usuario', 'estado', 'cidade','$regiao','pais', 1, 'Planta Pendente de Verificação')";
    
    $retorno = array('DADOS' => $sql, 'Sintomas' => $associar[0]);
    echo json_encode($retorno);
    exit();
?>