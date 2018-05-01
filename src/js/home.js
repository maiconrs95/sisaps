$(document).ready(function () {

    var campos_obg = 0;
    var cpf_user = 0;

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

});