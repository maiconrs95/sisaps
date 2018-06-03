//obtém dados dos campos
function obtemSintomaInputs() {

    var sintoma_update = {
        id: document.querySelector('#id_sintoma').textContent,    
        nome_cientifico: document.querySelector('#nome_cientifco_sintoma').value,
        nome_popular: document.querySelector('#nome_popular_sintoma').value,
        parte_sintoma: document.querySelector('#parte_sintoma').value,
        causas: document.querySelector('#causas_sintoma').value,
        tratamentos: document.querySelector('#tratamentos_sintoma').value
    }
    
    return sintoma_update;
}


//altera o usuário no sistema. recebe o id para query e os dados dos inputs para atualização
function alterarSintoma(sintoma_update) {

    var data = 'id=' + sintoma_update.id +
        '&nome_c=' + sintoma_update.nome_cientifico +
        '&nome_p=' + sintoma_update.nome_popular +
        '&parte_corpo=' + sintoma_update.parte_sintoma +
        '&causas=' + sintoma_update.causas +
        '&tratamentos=' + sintoma_update.tratamentos;
        
    $('.alert-msg').hide();
    
    $.ajax({
        type: 'POST',
        url: 'includes/alterarSintoma.php',
        data: data,
        dataType: 'json',
        beforeSend: function () {
            $('#update_registro').attr('disabled', true);
            $('#calcel_update').attr('disabled', true);
        },
        success: function (response) {
            $('#update_registro').attr('disabled', false);
            $('#calcel_update').attr('disabled', false);

            switch (response.codigo) {
                case 1:
                    alert(response.mensagem);
                    break;
                case 2:
                    exibeMsg(response.mensagem, 'alert-success');
                    break;
                case 3:
                    exibeMsg(response.mensagem, 'alert-success');
                    $("tbody tr").remove();
                    consultaSintomas();
                    break;
                default:
                    break;
            }
        }
    });
};


//valida os campos obrigatórios
function updateCamposSintoma(formSintoma) {

    var nome_c = formSintoma.nome_c;
    var nome_p = formSintoma.nome_p;
    var parte_corpo = formSintoma.parte_corpo;

    if (nome_c.value == '') {
        nome_c.classList.add('borda-vermelha');
    } else {
        nome_c.classList.remove('borda-vermelha');
    }

    if (nome_p.value == '') {
        nome_p.classList.add('borda-vermelha');
    } else {
        nome_p.classList.remove('borda-vermelha');
    }

    if (parte_corpo.value == '') {
        parte_corpo.classList.add('borda-vermelha');
    } else {
        parte_corpo.classList.remove('borda-vermelha');
    }

    if (nome_c.value == '' || nome_p.value == '' || parte_corpo.value == '') {
        return false;
    } else {
        $('.alert-msg').hide();
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
    alertModal();
};