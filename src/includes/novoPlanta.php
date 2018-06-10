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

    //Verificar se a planta ja existe. Se sim, excluir todos os registro da tabela planta e sintoma. Se nao, só cria o registro
    $sql = "SELECT * FROM tb_plantas WHERE nome_cientifico = '$nome_c'";

    $result_planta = mysqli_query($link, $sql);

    if($result_planta){

       $retorno_plantas = mysqli_fetch_array($result_id);

       if(isset($retorno_plantas['nome_cientifico'])){

        $id_apagar = $retorno_plantas['id_plantas'];

        $query = "delete from tb_plantas_sintomas where id_planta_sintomas = $id_apagar";
        $apagar = mysqli_query($link, $query);
        echo $query;

        $query = "delete from tb_plantas where id_planta_sintomas = $id_apagar";
        $apagar = mysqli_query($link, $query);
        echo $query;

       }
    }//ACABA AQ

    if(!is_uploaded_file($_FILES['arquivo']['tmp_name'])){
        
        $targetPath = "img/sem-foto.jpg";

    }else{

        $sourcePath = $_FILES['arquivo']['tmp_name'];
        $targetPath = "img/plantas/".$_FILES['arquivo']['name'];
        move_uploaded_file($sourcePath,$targetPath);
    }

    $procedure_planta = "call cadastro_planta('$nome_c', '$nome_p', '$modo_preparo', '$targetPath', '$cuidados', '$efeitos', '$principio_ativo','$bibliografia', 2, $id_usuario, '$regiao')";

    $result_id = mysqli_query($link, $procedure_planta);

    while ($row = mysqli_fetch_array($result_id)) {   
        $id_planta = $row[0]; 
        //echo $id_planta;
    }
    
    foreach($sintomas as $id_sintoma){

        $sql =  "INSERT INTO tb_plantas_sintomas (id_plantas, id_sintomas) VALUES ('$id_planta', '$id_sintoma')";

        $link = $conexao->conn_mysql();
        $associa = mysqli_query($link, $sql);
    }

    $retorno = array('codigo' => 3, 'Usuário' => "",'mensagem' => 'Planta cadastrada.');
    echo json_encode($retorno);
    exit();
?>