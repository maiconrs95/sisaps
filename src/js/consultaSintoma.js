//Variavel Global que recebe o array com todos os sintomas
var sintomas_bd;

function obtemUsuarioAtualizacao(id) {
    return sintomas_bd[id];
}

//Busca os sintomas cadastrados na base de dados
function consultaSintomas() {

    $.get('includes/buscaSintomas.php', function (data) {

        console.log(data);
        sintomas_bd = data;
        $("tbody tr").remove();
        $(data).each(function (i, sintoma) {

            insereSintomas(i, sintoma.nome_cientifico.toLowerCase(), sintoma.parte_corpo, sintoma.nome_popular);
        });

    });
}

//Insere os sintomas que retornaram da consulta na tabela
function insereSintomas(id_sintoma, sintoma, parteCorpo, nome) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinhaSintoma(id_sintoma, sintoma, parteCorpo, nome);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaSintoma(id_sintoma, sintoma, parteCorpo, nome) {

    var linha = $("<tr>").attr('id', id_sintoma).addClass('sintoma-sistema').attr('onclick', 'carregaModalSintoma(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaSintoma = $("<td>").text(sintoma).attr("width", '30%');
    var colunaParteCorpo = $("<td>").text(parteCorpo).attr("width", '30%');
    var colunaNome = $("<td>").text(nome).attr("width", '30%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_sintomas');
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

    $("#lista-sintomas tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

//Abre modal
function carregaModalSintoma(id) {

    $('#id_sintoma').text(sintomas_bd[id].id_sintomas);
    $('.modal-title').text(sintomas_bd[id].nome_cientifico);
    $('#nome_cientifco_sintoma').val(sintomas_bd[id].nome_cientifico);
    $('#nome_popular_sintoma').val(sintomas_bd[id].nome_popular);
    $('#parte_sintoma').text(sintomas_bd[id].parte_corpo);
    $('#causas_sintoma').val(sintomas_bd[id].causas);
    $('#tratamentos_sintoma').val(sintomas_bd[id].tratamentos);

    parteCorpo(id);
}

function parteCorpo(id) {

    $.get('includes/getCorpo.php', function (data) {

        corpo = data;

        $(data).each(function (i, user) {

            var select = $('#parte_sintoma');

            if(corpo[i].parte_corpo == sintomas_bd[id].parte_corpo){
                $('<option>').val(corpo[i].id_parte_corpo).text(corpo[i].parte_corpo).attr('selected', 'true').appendTo(select);
            }else{
                $('<option>').val(corpo[i].id_parte_corpo).text(corpo[i].parte_corpo).appendTo(select);
            }            
        });

    });
}