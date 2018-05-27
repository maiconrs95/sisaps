//obtém dados dos campos
function obtemDadosInputs() {

    var usuario = {
        id: document.querySelector('#id').textContent,    
        nome: document.querySelector('#nome_user').value,
        senha: document.querySelector('#password_user').value,
        email: document.querySelector('#email_user').value,
        cpf: document.querySelector('#cpf_user').value,
        perfil: document.querySelector('#perfil_user').value,
        telefone: document.querySelector('#telefone_user').value,
        celular: document.querySelector('#celular_user').value,
        cep: document.querySelector('#cep_user').value,
        cidade: document.querySelector('#cidade_user').value,
        logradouro: document.querySelector('#logradouro_user').value,
        num: document.querySelector('#num_logradouro').value
    }
    
    return usuario;
}


//altera o usuário no sistema. recebe o id para query e os dados dos inputs para atualização
function alterarUsuario(usuario) {

    var data = 'id=' + usuario.id +
        '&nome=' + usuario.nome +
        '&email=' + usuario.email +
        '&senha=' + usuario.senha +
        '&cpf=' + usuario.cpf +
        '&perfil=' + usuario.perfil +
        '&telefone=' + usuario.telefone +
        '&celular=' + usuario.celular +
        '&cep=' + usuario.cep +
        '&cidade=' + usuario.cidade +
        '&logradouro=' + usuario.logradouro +
        '&num=' + usuario.num;

    alert(data);
    $('.alert-msg').hide();

    $.ajax({
        type: 'POST',
        url: 'includes/alterarUsuario.php',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            $('#update_user').attr('disabled', true);
            $('#calcel_update').attr('disabled', true);
        },
        success: function (response) {
            $('#update_user').attr('disabled', false);
            $('#calcel_update').attr('disabled', false);

            switch (response.codigo) {
                case 1:
                    aler(response.mensagem);
                    break;
                case 2:
                    exibeMsg(response.mensagem, 'alert-warning');
                    break;
                case 3:
                    exibeMsg(response.mensagem, 'alert-success');
                    $(".table tr").remove();
                    consultaUsuario();
                    break;
                default:
                    break;
            }
        }
    });
};


//valida os campos obrigatórios
function updateCamposObg(formPerfil, formPessoais) {

    var usuario = formPessoais.nome;
    var email = formPerfil.email;
    var perfil = formPerfil.perfil;

    if (usuario.value == '') {
        usuario.classList.add('borda-vermelha');
    } else {
        usuario.classList.remove('borda-vermelha');
    }

    if (email.value == '') {
        email.classList.add('borda-vermelha');
    } else {
        email.classList.remove('borda-vermelha');
    }

    if (perfil.value == '') {
        perfil.classList.add('borda-vermelha');
    } else {
        perfil.classList.remove('borda-vermelha');
    }

    if (usuario.value == '' || email.value == '' || perfil.value == '') {
        return false;
    } else {
        $('.alert_user').hide();
        return true;
    }
}


//monta a mensagem a ser exibida para o usuário
function exibeMsg(msg, alerta) {

    var col = $('<div>');
    var alert = $('<div>');

    $('.mensagem').remove();

    col.addClass('mensagem').addClass('col-md-12').addClass('mx-auto');
    alert.addClass('alert').addClass(alerta);

    alert.text(msg);
    alert.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    col.append(alert);

    alert.parent().remove();
    $('.alert-msg').append(col);
    $('.alert-msg').fadeIn(100);
    scrollMsg();
};

//scroll para header da tela
function scrollMsg() {

    $("html, body").animate({
        scrollTop: 0
    }, 200);
}
