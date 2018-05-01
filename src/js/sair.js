$("#btn-sair").click(function () {
    
    $.post('./includes/sair.php', function(){
        alert('saindo...');
        window.location.href = "index.html";
    });

});