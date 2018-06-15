//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;
var sintomasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasAtivas.php', function (data) {

        console.log(data);

        plantasPendentes = data;
        //$("#tb-planta tbody tr").remove();

        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data).each(function (i, planta) {

                $.get('includes/getSintomasAssociados.php?id_planta=' + planta.id_plantas, function (data) {                       
                    console.log(data); 
                    $(data).each(function (i, sintoma) {

                        $('.sintomas-associados').append($('<li>').text(data[i].nome_cientifico));
                    });
                });
                                                
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
    var colunaImg = $("<th>").text(desc).attr("width", '30%');
    var colunaNome = $("<td>").text(nome_c).attr("width", '30%');
    var conlunaSintoma = $("<td>").text(user).attr("width", '30%');
    var coluarVer = $("<td>").attr("width", '10%');
    

    if (desc == 'pendente') {
        colunaStatus.attr('class', 'pendente');
    }

    var edit = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.ver-planta').attr('onclick', 'carregaPlantaPend(parentNode.parentNode.id)');
    var iEdit = $("<i>").addClass("fas fa-edit fa-2x editar");

    var aprova = $("<a>").attr("href", "#").addClass('aprovar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-sm').attr('onclick', 'carregaPlantaId(parentNode.parentNode.id)');
    var iAprova = $("<i>").addClass("fas fa-check-circle fa-2x ativo");

    var revisa = $("<a>").attr("href", "#").addClass('revisar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '#exampleModal').attr('onclick', 'carregaPlantaId(parentNode.parentNode.id)');
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