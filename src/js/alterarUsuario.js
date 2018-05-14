//obtém dados dos campos
function obtemDadosInputs() {

    var usuarioModal = {
        nome: document.querySelector('#nome_user').value,
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
    
    return usuarioModal;
}


//altera o usuário no sistema
function alterarUsuario(id, dados) {

    var data = 'nome=' + usuario.nome +
        '&email=' + usuario.email +
        '&cpf=' + usuario.cpf +
        '&perfil=' + usuario.perfil +
        '&telefone=' + usuario.telefone +
        '&celular=' + usuario.celular +
        '&cep=' + usuario.cep +
        '&cidade=' + usuario.cidade +
        '&logradouro=' + usuario.logradouro +
        '&num=' + usuario.num;

    $('.alert-msg').hide();

    $.ajax({
        type: 'POST',
        url: 'includes/alterarUsuario.php',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            $('#insert_cadastrar').attr('disabled', true);
            $('#insert_cancelar').attr('disabled', true);
        },
        success: function (response) {
            $('#insert_cadastrar').attr('disabled', false);
            $('#insert_cancelar').attr('disabled', false);

            switch (response.codigo) {
                case 1:
                    aler(response.mensagem);
                    break;
                case 2:
                    exibeMsg(response.mensagem, 'alert-warning');
                    break;
                case 3:
                    exibeMsg(response.mensagem, 'alert-success');
                    limpaCampos();
                    break;
                default:
                    break;
            }
        }
    });
};


//valida os campos obrigatórios
function validaCampos(form) {

    var usuario = form.nome;
    var email = form.email;
    var cpf = form.cpf;
    var perfil = form.perfil;

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

    if (cpf.value == '') {
        cpf.classList.add('borda-vermelha');
    } else {
        cpf.classList.remove('borda-vermelha');
    }

    if (perfil.value == '') {
        perfil.classList.add('borda-vermelha');
    } else {
        perfil.classList.remove('borda-vermelha');
    }

    if (usuario.value == '' || email.value == '' || cpf.value == '' || perfil.value == '') {
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

//limpa todos os campos do formulário
function limpaCampos() {

    $('#nome_user').val("");
    $('#email_user').val("");
    $('#cpf_user').val("");
    $('#perfil_user').val("");
    $('#telefone_user').val("");
    $('#celular_user').val("");
    $('#cep_user').val("");
    $('#cidade_user').val("");
    $('#logradouro_user').val("");
    $('#num_logradouro').val("");
    $('#cpf_invalido').hide();
    $('#cpf_valido').hide();
}


//formata os campos do formulário
function mascaraCampo() {

    $('.cpf').mask('000.000.000-00', {
        reverse: true
    });
    $('.telefone').mask('(00) 0000-0000');
    $('.celular').mask('(00) 00000-0000');
    $('.cep').mask('00000-000');

    $('.alert-msg').hide();
    $('#cpf_invalido').hide();
    $('#cpf_valido').hide();
}