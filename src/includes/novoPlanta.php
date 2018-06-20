<?php

    //header("Content-type: text/html; charset=utf-8");
    header("Content-type: application/json; charset=utf-8");

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
    $sintomas = (isset($_POST['duallistbox_demo2'])) ? $_POST['duallistbox_demo2'] : '0' ;

    $sql = "SELECT * FROM tb_plantas WHERE nome_cientifico = '$nome_c'  LIMIT 1";
    $conexao = new db();
    $link = $conexao->conn_mysql();
    $result_planta = mysqli_query($link, $sql);

    if($result_planta){

        $dados_planta = mysqli_fetch_array($result_planta);

        if(isset($dados_planta['nome_cientifico'])){

            //Caso haja algum registro no sistema o script retorna a seguinte mensagem:
            $retorno = array('codigo' => 3 , 'mensagem' => 'Planta já cadastrada no sistema.');
         
            echo json_encode($retorno);
            exit();

        }else{

            if(!is_uploaded_file($_FILES['arquivo']['tmp_name'])){
        
                $targetPath = "../img/plantas/sem-foto.jpg";
        
            }else{
        
                $sourcePath = $_FILES['arquivo']['tmp_name'];
                $targetPath = "../img/plantas/".$_FILES['arquivo']['name'];
                move_uploaded_file($sourcePath,$targetPath);
            }
            
            $usuario = array('nome_c' => $nome_c, 'nome_p' => $nome_p, 'parte_planta' => $parte_planta, 'regiao' => $regiao, 'principio_ativo' => $principio_ativo, 'cuidados' => $cuidados, 'efeitos' => $efeitos, 'preparo' => $modo_preparo, 'bibliografia' => $bibliografia, 'img' => $targetPath, 'Sintomas' => $sintomas);
        
            if($sintomas != 0){
        
                $associar = array_chunk($sintomas, ceil(count($sintomas) / 2));       
        
            }else{
        
                $retorno = array('codigo' => 0, 'Usuário' => "",'mensagem' => 'Selecione algum sintoma.', 'dados' => $usuario);
                echo json_encode($retorno);
                exit();
            }
        
        
            
            $procedure_planta = "call cadastro_planta('$nome_c', '$nome_p', '$modo_preparo', '$targetPath', '$cuidados', '$efeitos', '$principio_ativo','$bibliografia', $parte_planta, $id_usuario, '$regiao')";
        
            $result_id = mysqli_query($link, $procedure_planta);
        
            while ($row = mysqli_fetch_array($result_id)) {
                $id_planta = $row[0];
        
                if($id_planta == 0){
        
                    $retorno = array('codigo' => 1, 'Usuário' => "",'mensagem' => 'Preencha todos os campos obrigaórios.', 'dados' => $usuario);
                    echo json_encode($retorno);
                    exit();
                }
        
                $id_planta = $row[0]; 
                //echo $id_planta;
            }
            
            foreach($associar[0] as $id_sintoma){
        
                //$sql =  "CALL associa_planta_sintoma ('$id_planta,'$id_sintoma')";
                $sql = "INSERT INTO tb_plantas_sintomas (id_plantas, id_sintomas) VALUES ('$id_planta', '$id_sintoma')";
        
                $link = $conexao->conn_mysql();
                $associa = mysqli_query($link, $sql);
            }
        
            $retorno = array('codigo' => 2, 'Usuário' => "",'mensagem' => 'Planta '. $nome_c .' cadastrada.', 'user' => $usuario);
            echo json_encode($retorno);
            exit();

        } 
    }
?>