//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasProfessor.php', function (data) {

        plantasPendentes = data;
        console.log(plantasPendentes);
        //$("tbody tr").remove();
        $(data).each(function (i, planta) {

            inserePlantasPendente(i, planta.Descricao.toLowerCase(), planta.nome_cientifico, planta.nome_user);
        });

    });
}

//Insere as plantas que retornaram da consulta na tabela
function inserePlantasPendente(id_planta, desc, nome_c, user) {

    var corpoTabela = $("#tb-planta").find("tbody");
    var linha = novaLinhaPlantaPendente(id_planta, desc, nome_c, user);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaPlantaPendente(id_planta, desc, nome_c, user) {

    var linha = $("<tr>").attr('id', id_planta);
    var colunaStatus = $("<th>").text(desc).attr("scope", "row").attr("width", '20%');
    var colunaNome = $("<td>").text(nome_c).attr("width", '20%');
    var colunaUsuario = $("<td>").text(user).attr("width", '30%');
    var colunaEdit = $("<td>").attr("width", '10%');
    var colunaAprova = $("<td>").attr("width", '10%');
    var colunaRevisa = $("<td>").attr("width", '10%');

    var edit = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.ver-planta').attr('onclick', 'carregaPlantaPend(parentNode.parentNode.id)');
    var iEdit = $("<i>").addClass("fas fa-edit fa-2x editar");

    var aprova = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-sm').attr('onclick', 'carregaPlantaPend(parentNode.parentNode.id)');
    var iAprova = $("<i>").addClass("fas fa-check-circle fa-2x ativo");

    var revisa = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '#exampleModal').attr('onclick', 'carregaPlantaPend(parentNode.parentNode.id)');
    var Irevisa = $("<i>").addClass("fas fa-window-close fa-2x pendente");

    edit.append(iEdit);
    aprova.append(iAprova);
    revisa.append(Irevisa);

    colunaEdit.append(edit);
    colunaAprova.append(aprova);
    colunaRevisa.append(revisa);

    linha.append(colunaStatus);
    linha.append(colunaNome);
    linha.append(colunaUsuario);
    linha.append(colunaEdit);
    linha.append(colunaAprova);
    linha.append(colunaRevisa);

    return linha;
}

function carregaPlantaPend(id) {

    console.log(plantasPendentes[id]);

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {
        
        console.log(data[0]);

        $('.foto-planta').attr('src', data[0].foto_planta.split('../'));
        $('.nome-plantac').text(data[0].nome_cientifico);
        $('.nome-plantap').text(data[0].nome_popular);
        $('.parte-planta').text(data[0].nome_popular);
        $('.regiao-planta').text(data[0].nome_popular);
        $('.principio-planta').text(data[0].nome_popular);
        $('.contra-indicacao').text(data[0].nome_popular);
        $('.efeitos-colaterais').text(data[0].nome_popular);
        $('.modo-preparo').text(data[0].nome_popular);
        $('.bibliografia').text(data[0].bibliografia);

        /*var img = data[0].foto_planta.split('../');
        $('#id-modal').val(allPlants[id].id_plantas);
        $('.modal-title').text(data[0].nome_cientifico);
        $('#previewing').attr('src', img[1]);
        $('#nome_popular').val(data[0].nome_popular);
        $('#nome_cientifico').val(data[0].nome_cientifico);

        $('<option>').val(data[0].id_parte_planta).text(data[0].parte_planta).attr('selected', 'true').appendTo($('#parte_planta'));

        $('#regiao').val(data[0].regiao);
        $('#principio_ativo').val(data[0].principio_efeitos);
        $('#cuidados').val(data[0].cuidados);
        $('#efeitos').val(data[0].efeitos_colaterais);
        $('#modo_preparo').val(data[0].modo_preparo);
        $('#bibliografia').val(data[0].bibliografia);*/

    });
}