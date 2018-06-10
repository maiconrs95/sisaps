//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var allPlants;

//Busca os plantas cadastrados na base de dados
function consultaplantas() {

    $.get('includes/getPlantas.php', function (data) {

        allPlants = data;
        
        console.log(allPlants);

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

    console.log(allPlants[id].id_plantas);

    $.get('includes/getPlantasSintomas.php?id_planta=' + allPlants[id].id_plantas, function (data) {        
        console.log(data);

    });
}