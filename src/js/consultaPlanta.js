//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var allPlants;

//Busca os plantas cadastrados na base de dados
function consultaplantas() {

    $.get('includes/getPlantas.php', function (data) {

        allPlants = data;

        $("tbody tr").remove();
        $(data).each(function (i, planta) {

            inserePlantas(i, planta.nome_cientifico.toLowerCase(), planta.nome_popular, planta.nome_user);
        });

    });
}

//Insere as plantas que retornaram da consulta na tabela
function inserePlantas(id_planta, planta, nome_c, nome) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinhaPlanta(id_planta, planta, nome_c, nome);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaPlanta(id_planta, planta, nome_c, nome) {

    var linha = $("<tr>").attr('id', id_planta).addClass('sintoma-sistema').attr('onclick', 'carregaModalPlanta(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaPlanta = $("<td>").text(planta).attr("width", '30%');
    var colunaNome_c = $("<td>").text(nome_c).attr("width", '30%');
    var colunaNome = $("<td>").text(nome).attr("width", '30%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-lg');
    var icone = $("<i>").addClass("fas fa-search");

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaPlanta);
    linha.append(colunaNome_c);
    linha.append(colunaNome);

    return linha;
}

//filtra as plantas na tabela
function filtraPlanta(value) {

    $("#lista-plantas tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

//Abre modal
function carregaModalPlanta(id) {

    //Zera e reconfigura o dual list
    var select = $('.demo2');
    select.empty();
    var demo2 = $('.demo2').bootstrapDualListbox({
        preserveSelectionOnMove: 'moved',
        nonSelectedListLabel: 'Não associado:',
        selectedListLabel: 'Associado:',
        moveOnSelect: true,
        nonSelectedFilter: ''
    });

    //Busca os sintomas da lista de opções e preenche a lista da esquerda
    $.get('includes/buscaSintomas.php', function (data) {

        $(data).each(function (i, user) {            
            select.append($('<option>').val(data[i].id_sintomas).text(data[i].nome_cientifico));
        });

        select.bootstrapDualListbox('refresh', true);
    });

    //Busca os sintomas associados e preenche a lista da direita (selected)
    $.get('includes/getSintomasAssociados.php?id_planta=' + allPlants[id].id_plantas, function (data) {        
        $(data).each(function (i, user) {
            var indice = select[0].length;
            select.append($('<option>').val(data[i].id_sintomas).text(data[i].nome_cientifico).attr('data-sortindex', indice++).prop('selected', true));
        });

        select.bootstrapDualListbox('refresh', true);
    });

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + allPlants[id].id_plantas, function (data) {

        var img = data[0].foto_planta.split('../');
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
        $('#bibliografia').val(data[0].bibliografia);

    });
}