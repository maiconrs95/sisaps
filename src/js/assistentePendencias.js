//Variavel Global que recebe o array com todos os sintomas
var sintomas_pendentes;
var plantas_pendentes;

function obtemUsuarioAtualizacao(id) {
    return sintomas_pendentes[id];
}

//Busca os sintomas cadastrados na base de dados
function consultaSintomasPendentes() {

    $.get('includes/buscaSintomasPendentes.php', function (data) {

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

//Busca os sintomas cadastrados na base de dados
function consultaPlantasPendentes() {

    $.get('includes/buscaPlantasPendentes.php', function (data) {
        console.log(data);
        plantas_pendentes = data;
        $("#tb-planta-pendente tbody tr").remove();

        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data).each(function (e, planta) {

                inserePlantasAssistente(e, planta.descricao.toLowerCase(), planta.nome_cientifico, planta.comentarios);
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

//Insere os plantas que retornaram da consulta na tabela
function inserePlantasAssistente(id_planta, status, registro, comentario) {

    var corpoTabela = $("#tb-planta-pendente").find("tbody");
    var linha = linhaAssistentePlanta(id_planta, status, registro, comentario);

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

//Cria as linhas que serão adicionada na tabela
function linhaAssistentePlanta(id_planta, status, registro, comentario) {

    var linha = $("<tr>").attr('id', id_planta).addClass('sintoma-sistema').attr('onclick', 'carregaPlantaPendente(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaStatus = $("<td>").text(status).attr("width", '20%');
    var colunaRegistro = $("<td>").text(registro).attr("width", '30%');
    var colunaComentario = $("<td>").text(comentario).attr("width", '40%');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '.planta-pendente-ass');
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
function filtraSintomap(value) {

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

//Abre modal
function carregaPlantaPendente(id) {
 
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
    $.get('includes/getSintomasAssociados.php?id_planta=' + plantas_pendentes[id].id_plantas, function (data) {        
        $(data).each(function (i, user) {
            var indice = select[0].length;
            select.append($('<option>').val(data[i].id_sintomas).text(data[i].nome_cientifico).attr('data-sortindex', indice++).prop('selected', true));
        });

        select.bootstrapDualListbox('refresh', true);
    });

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + plantas_pendentes[id].id_plantas, function (data) {

        var img = data[0].foto_planta.split('../');
        $('#id-modal').val(plantas_pendentes[id].id_plantas);
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

function updatePlantaPendente() {

    form = document.querySelector('#update-planta');

    $.ajax({
        url: "../src/includes/alterarPlanta.php",
        type: "POST",
        dataType: 'json',
        data: new FormData(form),
        beforeSend: function () {

        },
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#atualiza-planta').prop('disabled', true);
            $('#cancela-planta').prop('disabled', true);
        },
        success: function (data) {
            $('#atualiza-planta').prop('disabled', false);
            $('#cancela-planta').prop('disabled', false);
            
            switch (data.codigo) {
                case 0:
                    exibeMsg(data.mensagem, 'alert-danger');
                    break;
                case 1:
                    exibeMsg(data.mensagem, 'alert-danger');
                    validaPlanta(form);
                    break;
                case 2:
                    exibeMsg(data.mensagem, 'alert-success');
                    consultaPlantasPendentes();
                    $('.demo2').bootstrapDualListbox('refresh');
                    validaPlanta(form);
                    exibeMsg(data.mensagem, 'alert-success');                    
                    break;
                case 3:
                    exibeMsg(data.mensagem, 'alert-success');
                    break;
                default:
                    break;
            }
        },
        error: function () {}
    });
}