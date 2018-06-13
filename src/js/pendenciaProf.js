//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasProfessor.php', function (data) {

        plantasPendentes = data;

        //$("tbody tr").remove();
        $(data).each(function (i, planta) {
            console.log(data);
            inserePlantasPendente(i, planta.Descricao.toLowerCase(), planta.nome_cientifico, planta.nome_user);
        });

    });
}

//Insere as plantas que retornaram da consulta na tabela
function inserePlantasPendente(id_planta, desc, nome_c, user) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinhaPlanta(id_planta, desc, nome_c, user);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela
function novaLinhaPlantaPendente(id_planta, desc, nome_c, user) {

    var linha = $("<tr>").attr('id', id_planta).attr('onclick', 'carregaModalPlanta(this.id)');
    var colunaStatus = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaNome = $("<td>").text(desc).attr("width", '30%');
    var colunaUsuario = $("<td>").text(nome_c).attr("width", '30%');
    var colunaOpcoes = $("<td>").text(user).attr("width", '30%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-lg');
    var icone = $("<i>").addClass("fas fa-search");

    /*<a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target=".ver-planta">
    <i class="fas fa-edit fa-2x editar"></i>
    </a>
    <a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target=".bd-example-modal-sm">
        <i class="fas fa-check-circle fa-2x ativo"></i>
    </a>
    <a href="#" class="edit-user btn-sm p-1 opc" data-toggle="modal" data-target="#exampleModal">
        <i class="fas fa-window-close fa-2x pendente"></i>
    </a>*/

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaStatus);
    linha.append(colunaNome);
    linha.append(colunaUsuario);
    linha.append(colunaOpcoes);

    return linha;
}
