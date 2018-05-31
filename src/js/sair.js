$("#btn-sair").click(function () {
    $.post('./includes/sair.php', function(){
        window.location.href = "index.html";
    });
});