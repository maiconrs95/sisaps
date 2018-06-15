//Variavel Global que recebe o array com todos os sintomas
var sintomas_pendentes;

function obtemUsuarioAtualizacao(id) {
    return sintomas_pendentes[id];
}

//Busca os sintomas cadastrados na base de dados
function consultaSintomasPendentes() {

    $.get('includes/buscaSintomasPendentes.php', function (data) {
        console.log(data);
        sintomas_pendentes = data;
        $("#tb-sintoma-pendente tbody tr").remove();

        if (data.length == 0) {
            $('.sintomas-pendentes').show();
        } else {
            $(data).each(function (i, sintoma) {

                insereSintomasAssistente(i, sintoma.descricao.toLowerCase(), sintoma.nome_cientifico, sintoma.comentarios);
            });
        }
    });
}

//Insere os sintomas que retornaram da consulta na tabela
function insereSintomasAssistente(id_sintoma, status, registro, comentario) {

    var corpoTabela = $("#tb-sintoma-pendente").find("tbody");
    var linha = linhaAssistenteSintoma(id_sintoma, status, registro, comentario);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function linhaAssistenteSintoma(id_sintoma, status, registro, comentario) {

    var linha = $("<tr>").attr('id', id_sintoma).addClass('sintoma-sistema').attr('onclick', 'carregaSintomaPendente(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaStatus = $("<td>").text(status).attr("width", '20%');
    var colunaRegistro = $("<td>").text(registro).attr("width", '30%');
    var colunaComentario = $("<td>").text(comentario).attr("width", '40%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar-sintoma-pendente');
    var icone = $("<i>").addClass("fas fa-search");

    if(status == 'reprovado'){
        colunaStatus.attr('class', 'negado');
    }

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaStatus);
    linha.append(colunaRegistro);
    linha.append(colunaComentario);

    return linha;
}

//filtra os sintomas na tabela
function filtraSintoma(value) {

    $("#sintomas-pendentes tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

//Abre modal
function carregaSintomaPendente(id) {

    $('#id_sintoma').text(sintomas_pendentes[id].id_sintomas);
    $('.modal-title').text(sintomas_pendentes[id].nome_cientifico);
    $('#nome_cientifco_sintoma').val(sintomas_pendentes[id].nome_cientifico);
    $('#nome_popular_sintoma').val(sintomas_pendentes[id].nome_popular);
    $('#parte_sintoma').text(sintomas_pendentes[id].parte_corpo);
    $('#causas_sintoma').val(sintomas_pendentes[id].causas);
    $('#tratamentos_sintoma').val(sintomas_pendentes[id].tratamentos);

    parteCorpoSintoma(id);
}

function parteCorpoSintoma(id) {

    $.get('includes/getCorpo.php', function (data) {

        corpo = data;
        console.log(data);
        $(data).each(function (i, user) {

            var select = $('#parte_sintoma');

            if (corpo[i].parte_corpo == sintomas_pendentes[id].parte_corpo) {
                $('<option>').val(corpo[i].id_parte_corpo).text(corpo[i].parte_corpo).attr('selected', 'true').appendTo(select);
            } else {
                $('<option>').val(corpo[i].id_parte_corpo).text(corpo[i].parte_corpo).appendTo(select);
            }
        });
    });
}

//altera o usuário no sistema. recebe o id para query e os dados dos inputs para atualização
function alterarSintomaPendente(sintoma_update) {

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
                    $("#tb-sintoma-pendente tbody tr").remove();
                    consultaSintomasPendentes();
                    break;
                default:
                    break;
            }
        }
    });
};