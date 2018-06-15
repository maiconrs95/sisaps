//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;
var sintomasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function plantasAtivas() {

    $.get('includes/getPlantasAtivas.php', function (data) {

        console.log(data);

        plantasPendentes = data;
        //$("#tb-planta tbody tr").remove();

        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data).each(function (i, planta) {
                
                //inserePlantasPendente(i, planta.Descricao.toLowerCase(), planta.nome_cientifico, planta.nome_user);
            });
        }
    });
}

//Insere as plantas que retornaram da consulta na tabela planta
function inserePlantasPendente(id_planta, desc, nome_c, user) {

    var corpoTabela = $("#tb-planta").find("tbody");
    var linha = novaLinhaPlantaPendente(id_planta, desc, nome_c, user);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela planta
function listaPlantas(imagem, nome_c, nome_p, sintomas) {

    var linha = $("<tr>").attr('id', id_planta);
    var colunaImg = $("<th>").attr("width", '30%');
    var colunaNome = $("<td>").attr("width", '30%');
    var conlunaSintoma = $("<td>").attr("width", '30%');
    var coluarVer = $("<td>").attr("width", '10%');


    if (desc == 'pendente') {
        colunaStatus.attr('class', 'pendente');
    }

    var edit = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.ver-planta').attr('onclick', 'carregaPlantaPend(parentNode.parentNode.id)');
    var iEdit = $("<i>").addClass("fas fa-edit fa-2x editar");

    //Primeira TH(imagem)
    var divImg = $('div').attr('class', 'text-left');
    var img = $('img').attr('src', imagem).attr('class', 'rounded');
    divImg.append('<strong>Imagem:</strong>');
    divImg.append(img);

    colunaNome.append('<strong>Nome:</strong>');
    colunaNome.append('<p>' + nome_p + '</p>');
    colunaNome.append('<p>' + nome_c + '</p>');

    conlunaSintoma.append('<strong>Sintomas:</strong>');

    //linha.append(colunaRevisa);

    return linha;
}

function carregaPlantaPend(id) {

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {

        var img = data[0].foto_planta.split('../');

        $('.titulo-planta').text(data[0].nome_cientifico);
        $('#id_planta').text(plantasPendentes[id].id_plantas);
        $('.foto-planta').attr('src', img[1]);
        $('.nome-plantac').text(data[0].nome_cientifico);
        $('.nome-plantap').text(data[0].nome_popular);
        $('.parte-planta').text(data[0].nome_popular);
        $('.regiao-planta').text(data[0].nome_popular);
        $('.principio-planta').text(data[0].nome_popular);
        $('.contra-indicacao').text(data[0].nome_popular);
        $('.efeitos-colaterais').text(data[0].nome_popular);
        $('.modo-preparo').text(data[0].nome_popular);
        $('.bibliografia').text(data[0].bibliografia);

        //Busca os sintomas associados e preenche a lista da direita (selected)
        $.get('includes/getSintomasAssociados.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {

            $('.sintomas-associados li').remove();

            $(data).each(function (i, sintoma) {

                $('.sintomas-associados').append($('<li>').text(data[i].nome_cientifico));
            });
        });

    });
}

function filtraPlantaPendente(value) {

    $("#plantas-pendentes tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}