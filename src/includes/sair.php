<?php

    session_start();
    unset($_SESSION['id']);
    unset($_SESSION['perfil']);
    unset($_SESSION['usuario']);
    unset($_SESSION['email']);

    header('Location: ../index.html');
    
?>