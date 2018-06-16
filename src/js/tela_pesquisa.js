//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasAtivas;

//Busca os plantas pendentes cadastrados na base de dados
function plantasAtivas() {

    $.get('includes/getPlantasAtivas.php', function (data) {

        plantasAtivas = data;
        //$("#tb-planta tbody tr").remove();

        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data.Planta).each(function (i, planta) {

                img = planta.foto_planta.split('../');
                tabelaPlantas(i, img[1], planta.nome_cientifico, planta.nome_popular, planta.Sintomas);
            });
        }
    });
}

//Insere as plantas que retornaram da consulta na tabela planta
function tabelaPlantas(i, imagem, nome_p, nome_c, sintomas) {

    var corpoTabela = $("#resultados-pesquisa").find("tbody");
    var linha = listaPlantas(i, imagem, nome_p, nome_c, sintomas);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela planta
function listaPlantas(i, imagem, nome_c, nome_p, sintomas) {

    var linha = $("<tr>").attr('id', i);
    var colunaEditar = $("<th>").attr("width", '30%').append('<div class="text-left" style="width: 100%; height: 100px;"><img id="previewing" src=' + imagem + ' class="rounded" alt="..." style="max-width: 100%; max-height: 100%"></div>');

    var colunaPlanta = $("<td>").attr("width", '30%').append('<p class="m-0">' + nome_p + '</p><p class="m-0">' + nome_c + '</p>');
    var colunaSintomas = $("<td>").attr("width", '30%').attr('class', 'd-none').append(listaSintomas(sintomas));

    var colunaVer = $("<td>").attr("width", '10%');

    var btn = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_sintomas');
    var icone = $("<i>").addClass("fas fa-search");

    colunaVer.append('<button type="button" data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-outline-success btn-block" data-toggle="modal" data-target=".ver-registro" onclick="verPlantas(parentNode.parentNode.id)">Ver</button>');

    linha.append(colunaEditar);
    linha.append(colunaPlanta);
    linha.append(colunaSintomas);
    linha.append(colunaVer);

    return linha;
}

function listaSintomas(list) {

    var novaUL = document.createElement('ul');

    $(list).each(function (i, sintoma) {

        novaUL.append(sintoma.nome_cientifico + ' ' + sintoma.nome_popular + ' ' + sintoma.causas + ' ' + sintoma.tratamentos);
    });

    return novaUL;
    //console.log('======');
}

function listaSintomasModal(list) {

    var novaUL = document.createElement('ul');

    novaUL.style.listStyle = "none";

    $(list).each(function (i, sintoma) {
        var novaLI = document.createElement('li');
        novaLI.append(sintoma.nome_cientifico);
        novaUL.append(novaLI);
    });

    return novaUL;
    //console.log('======');
}

function verPlantas(id) {

     var img = plantasAtivas.Planta[id].foto_planta.split('../');

    $('.modal-title').text(plantasAtivas.Planta[id].nome_cientifico);
    $('#id_planta').text(plantasAtivas.Planta[id].id_plantas);
    $('.foto-planta').attr('src', img[1]);
    $('.nome-plantac').text(plantasAtivas.Planta[id].nome_cientifico);
    $('.nome-plantap').text(plantasAtivas.Planta[id].nome_popular);
    $('.parte-planta').text(plantasAtivas.Planta[id].parte_planta);
    $('.regiao-planta').text(plantasAtivas.Planta[id].regiao);
    $('.principio-planta').text(plantasAtivas.Planta[id].principio_efeitos);
    $('.contra-indicacao').text(plantasAtivas.Planta[id].cuidados);
    $('.efeitos-colaterais').text(plantasAtivas.Planta[id].efeitos_colaterais);
    $('.modo-preparo').text(plantasAtivas.Planta[id].modo_preparo);
    $('.bibliografia').text(plantasAtivas.Planta[id].bibliografia);
    $('#sintomas-modal ul').remove();
    $('#sintomas-modal').append(listaSintomasModal(plantasAtivas.Planta[id].Sintomas));
}

function filtraRegistro(value) {

    $("#lista-resultado tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}