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
        $("tbody tr").remove();
        $(data).each(function (i, sintoma) {

            insereSintomasPendente(i, sintoma.nome_cientifico.toLowerCase(), sintoma.parte_corpo, sintoma.nome_popular);
        });

    });
}

//Insere os sintomas que retornaram da consulta na tabela
function insereSintomasPendente(id_sintoma, sintoma, parteCorpo, nome) {

    var corpoTabela = $("#tb-sintoma-pendente").find("tbody");
    var linha = novaLinhaSintomaPendente(id_sintoma, sintoma, parteCorpo, nome);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaSintomaPendente(id_sintoma, sintoma, parteCorpo, nome) {

    var linha = $("<tr>").attr('id', id_sintoma).addClass('sintoma-sistema').attr('onclick', 'carregaSintomaPendente(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaSintoma = $("<td>").text(sintoma).attr("width", '30%');
    var colunaParteCorpo = $("<td>").text(parteCorpo).attr("width", '30%');
    var colunaNome = $("<td>").text(nome).attr("width", '30%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar-sintoma-pendente');
    var icone = $("<i>").addClass("fas fa-search");

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaSintoma);
    linha.append(colunaParteCorpo);
    linha.append(colunaNome);

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