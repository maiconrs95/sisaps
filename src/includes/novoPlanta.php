<?php

    //header("Content-type: application/json; charset=utf-8");

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
    
    //var $associar = array_chunk($associar, ceil(count($associar) / 2));

    $conexao = new db();
    $link = $conexao->conn_mysql();

    if(!is_uploaded_file($_FILES['arquivo']['tmp_name']) || ($_FILES["file"]["type"] != "image/jpg") || ($_FILES["file"]["type"] != "image/png") || ($_FILES["file"]["type"] != "image/jpeg")){
        
        $targetPath = "img/sem-foto.jpg";

    }else{

        $sourcePath = $_FILES['arquivo']['tmp_name'];
        $targetPath = "../img/plantas/".$_FILES['arquivo']['name'];
        move_uploaded_file($sourcePath,$targetPath);
    }

    $procedure_planta = "call cadastro_planta('$nome_c','$nome_p','$modo_preparo','$targetPath','$cuidados','$efeitos','$principio_ativo','$bibliografia', 2,$id_usuario,'$regiao')";

    $result_id = mysqli_query($link, $procedure_planta);

    while ($row = mysqli_fetch_array($result_id)) {   
        $id_planta = $row[0]; 
        //echo $id_planta;
    }
    
    foreach($sintomas as $id_sintoma){

        $sql =  "INSERT INTO tb_plantas_sintomas (id_plantas, id_sintomas) VALUES ('$id_planta', '$id_sintoma')";

        $link = $conexao->conn_mysql();
        $associa = mysqli_query($link, $sql);

        echo $associa;
    }

    $retorno = array('Data' => $sintomas);
    //echo json_encode($result_id);
    exit();
?>