<?php

    header("Content-Type:" .  "application/json");
    session_start();

    $retorno = array('user_id' => $_SESSION['id'], 'user_nome' => $_SESSION['usuario'], 'user_perfil' => $_SESSION['perfil']);
    echo json_encode($retorno);    
    exit();
?>