$(document).ready(function () {

    var campos_obg = 0;
    var cpf_user = 0;
    
    $('#home').click(function (){
        location.reload();
    });

    $('.side-nav').click(function () {

        var conteudo = this.id;
        conteudo = 'view/' + conteudo + '.html';

        $.ajax({
            url: conteudo,
            success: function (data) {
                $('#conteudo').html(data);
                controlaView(conteudo);
            },
            error: function (result) {
                alert("Erro ao carregar solicitação");
            },
            beforeSend: function () {
                $('.loader').css({
                    display: 'block'
                });
            },
            complete: function () {
                $('.loader').css({
                    display: 'none'
                });
            },
        });
    });

    //VERIFICA O NIVEL DE USUÁRIO NO MOMENTO DO LOGIN
    $.get('includes/session.php', function (data) {

        if (data.user_perfil != 1) {
            $('#adm-section').remove();
            $('.adm-mobile').remove();
        }
        if (data.user_perfil == 2) {
            $('#adm-section').remove();
            $('.adm-mobile').remove();
            $('#assistente-section').remove();
            $('.assistente-mobile').remove();
        }
        if (data.user_perfil == 3) {
            $('#adm-section').remove();
            $('.adm-mobile').remove();
            $('#professor-section').remove();
        }
    });

});