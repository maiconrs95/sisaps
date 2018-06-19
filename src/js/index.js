$('document').ready(function () {

    var email = $('#email');
    var senha = $('#senha');
    var nova_senha = $('#nova-senha');

    $("#btn-login").click(function () {
        logar();
    });

    $("#btn-alterar").click(function () {

        if (senha.val() == "" || nova_senha.val() == "") {

            exibeMsg('Preencha todos os campos.', 'alert-danger');
            $('.alterar-senha').addClass('borda-vermelha');
            
        } else if (nova_senha.val() != $('#senha-nova').val()) {

            exibeMsg('As senhas devem ser iguais.', 'alert-danger');
            $('.alterar-senha').addClass('borda-vermelha');

        } else if (nova_senha.val() === senha.val()) {

            exibeMsg('Digite uma senha diferente à anterior.', 'alert-danger');
        } else {
            alterarSenha();
        }
    });

    $("#btn-cancelar").click(function () {
        limpaFormulario();
        email.focus();
    });

    //realiza o login
    function logar() {

        var data = $("#login-form").serialize();
        email.removeClass('borda-vermelha');
        senha.removeClass('borda-vermelha');

        $('.alert').hide();

        $.ajax({
            type: 'POST',
            url: 'includes/login.php',
            data: data,
            dataType: 'json',
            beforeSend: function () {
                $("#btn-login").attr('disabled', true);
            },
            success: function (response) {
                console.log(response);
                $("#btn-login").attr('disabled', false);

                switch (response.codigo) {
                    case 1:
                        exibeMsg(response.mensagem, 'alert-danger');
                        $('.alert').html(response.mensagem).show();

                        if (email.val() == "")
                            email.addClass('borda-vermelha');
                        else
                            email.removeClass('borda-vermelha');

                        if (senha.val() == "")
                            senha.addClass('borda-vermelha');
                        else
                            senha.removeClass('borda-vermelha');
                        break;

                    case 2:
                        exibeMsg(response.mensagem, 'alert-info');
                        email.attr('readonly', true);
                        senha.attr('readonly', true);
                        $('#btn-login').hide();
                        $('#btn-alterar').fadeIn(300);
                        $('.alterar-senha').fadeIn(300);
                        $('.btn-danger').fadeIn(300);
                        $('#senha-nova').focus();
                        break;

                    case 3:
                        window.location.href = "home.php"
                        break;

                    case 4:
                        exibeMsg(response.mensagem, 'alert-warning');
                        break;

                    default:
                        break;
                }
            }
        });
    }

    //altera a senha
    function alterarSenha() {

        var login = email.val();
        var data = $("#login-form").serialize();
        email.attr('readonly', false);
        senha.attr('readonly', false);
        email.removeClass('borda-vermelha');
        senha.removeClass('borda-vermelha');

        $('.alert').hide();

        $.ajax({
            type: 'POST',
            url: 'includes/alterarSenha.php',
            data: data,
            dataType: 'json',
            beforeSend: function () {
                $("#btn-alterar").attr('disabled', true);
            },
            success: function (response) {

                $("#btn-alterar").attr('disabled', false);

                switch (response.codigo) {
                    case 1:
                        exibeMsg(response.mensagem, 'alert-danger');
                        break;

                    case 2:
                        limpaFormulario();
                        exibeMsg(response.mensagem, 'alert-success');
                        email.val(login);
                        senha.focus();
                        break;

                    case 3:
                        exibeMsg(response.mensagem, 'alert-warning');
                        break;

                    case 4:
                        alert(response.mensagem);
                        break;

                    default:
                        break;
                }
            }
        });
    }

    //monta a mensagem a ser exibida para o usuário
    function exibeMsg(msg, alerta) {

        var col = $('<div>');
        var alert = $('<div>');

        $('.mensagem').remove();

        col.addClass('mensagem').addClass('col-md-12');
        alert.addClass('alert').addClass(alerta);

        alert.text(msg);

        col.append(alert);
        alert.parent().remove();
        $('.alert-msg').append(col);
        $('.alert-msg').fadeIn(100);
    };

    //limpa form
    function limpaFormulario() {

        email.attr('readonly', false);
        senha.attr('readonly', false);
        $('.form-control').val("");
        $('.form-control').removeClass('borda-vermelha');
        $('#btn-login').fadeOut(300).toggle();
        $('#btn-alterar').fadeIn(300).toggle();
        $('.alterar-senha').fadeIn(300).toggle();
        $('.btn-danger').fadeIn(300).toggle();
        $('.alert-msg').fadeIn(100).toggle();
    };

}); // document ready