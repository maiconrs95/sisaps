//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;
var sintomasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasProfessor.php', function (data) {

        plantasPendentes = data;
        $("#tb-planta tbody tr").remove();

        if (data.length == 0) {
            $('.plantas-pendentes').show();
        } else {
            $(data).each(function (i, planta) {

                inserePlantasPendente(i, planta.Descricao, planta.nome_cientifico, planta.nome_user);
            });
        }
    });
}

//Busca os sintomas pendentes cadastrados na base de dados
function consultasintomasPendente() {

    $.get('includes/getSintomasProfessor.php', function (data) {

        sintomasPendentes = data;
        $("#tb-sintoma tbody tr").remove();

        if (data.length == 0) {
            $('.sintomas-pendentes').show();
        } else {
            $(data).each(function (i, sintoma) {

                insereSintomasPendente(i, sintoma.Descricao, sintoma.nome_cientifico, sintoma.nome_user);
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

//Insere as plantas que retornaram da consulta na tabela sintoma
function insereSintomasPendente(id_sintoma, desc, nome_c, user) {

    var corpoTabela = $("#tb-sintoma").find("tbody");
    var linha = novaLinhaSintomaPendente(id_sintoma, desc, nome_c, user);

    corpoTabela.append(linha);
}

//Cria as linhas que serão adicionada na tabela planta
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

    var aprova = $("<a>").attr("href", "#").addClass('aprovar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.bd-example-modal-sm').attr('onclick', 'carregaPlantaId(parentNode.parentNode.id)');
    var iAprova = $("<i>").addClass("fas fa-check-circle fa-2x ativo");

    var revisa = $("<a>").attr("href", "#").addClass('revisar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '#exampleModal').attr('onclick', 'carregaPlantaId(parentNode.parentNode.id)');
    var Irevisa = $("<i>").addClass("fas fa-window-close fa-2x pendente");

    if (desc == 'Pendente') {
        colunaStatus.attr('class', 'pendente');
    } else if (desc == 'Reprovado') {
        colunaStatus.attr('class', 'red');
        edit.prop('disabled', true).removeAttr('onclick');
        iEdit.removeClass('editar');
        iEdit.addClass('inativo');

        aprova.prop('disabled', true).removeAttr('onclick');
        iAprova.removeClass('ativo');
        iAprova.addClass('inativo');

        revisa.prop('disabled', true).removeAttr('onclick');
        Irevisa.removeClass('pendente');
        Irevisa.addClass('inativo');
    }

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

//Cria as linhas que serão adicionada na tabela sintoma
function novaLinhaSintomaPendente(id_sintoma, desc, nome_c, user) {

    var linha = $("<tr>").attr('id', id_sintoma);
    var colunaStatus = $("<th>").text(desc).attr("scope", "row").attr("width", '20%');
    var colunaNome = $("<td>").text(nome_c).attr("width", '20%');
    var colunaUsuario = $("<td>").text(user).attr("width", '30%');
    var colunaEdit = $("<td>").attr("width", '10%');
    var colunaAprova = $("<td>").attr("width", '10%');
    var colunaRevisa = $("<td>").attr("width", '10%');

    var edit = $("<a>").attr("href", "#").addClass('edit-user btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.ver-sintoma').attr('onclick', 'carregaSintomaPend(parentNode.parentNode.id)');
    var iEdit = $("<i>").addClass("fas fa-edit fa-2x editar");

    var aprova = $("<a>").attr("href", "#").addClass('aprovar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.aprova-sintoma').attr('onclick', 'carregaSintomaId(parentNode.parentNode.id)');
    var iAprova = $("<i>").addClass("fas fa-check-circle fa-2x ativo");

    var revisa = $("<a>").attr("href", "#").addClass('revisar-planta btn-sm p-1 opc').attr("data-toggle", "modal").attr('data-target', '.revisa-sintoma').attr('onclick', 'carregaSintomaId(parentNode.parentNode.id)');
    var Irevisa = $("<i>").addClass("fas fa-window-close fa-2x pendente");

    if (desc == 'Pendente') {
        colunaStatus.attr('class', 'pendente');
    } else if (desc == 'Reprovado') {
        colunaStatus.attr('class', 'red');
        edit.prop('disabled', true).removeAttr('onclick');
        iEdit.removeClass('editar');
        iEdit.addClass('inativo');

        aprova.prop('disabled', true).removeAttr('onclick');
        iAprova.removeClass('ativo');
        iAprova.addClass('inativo');

        revisa.prop('disabled', true).removeAttr('onclick');
        Irevisa.removeClass('pendente');
        Irevisa.addClass('inativo');
    }

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

    $('.msgn-aprovado-planta').hide();
    $('.informativo').show();
    $('#aprova-planta').prop('disabled', false);
    $('#cancela-planta').prop('disabled', false);

    //Busca a planta do ID passado
    $.get('includes/getPlantasSintomas.php?id_planta=' + plantasPendentes[id].id_plantas, function (data) {

        var img = data[0].foto_planta.split('../');

        $('.titulo-planta').text(data[0].nome_cientifico);
        $('#id_planta').text(plantasPendentes[id].id_plantas);
        $('.foto-planta').attr('src', img[1]);
        $('.nome-plantac').text(data[0].nome_cientifico);
        $('.nome-plantap').text(data[0].nome_popular);
        $('.parte-planta').text(data[0].parte_planta);
        $('.regiao-planta').text(data[0].regiao);
        $('.principio-planta').text(data[0].principio_efeitos);
        $('.contra-indicacao').text(data[0].nome_popular);
        $('.efeitos-colaterais').text(data[0].efeitos_colaterais);
        $('.modo-preparo').text(data[0].modo_preparo);
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

function carregaSintomaPend(id) {

    $('.msgn-aprovado-sintoma').hide();
    $('.informativo-sintoma').show();
    $('#aprova-sintoma').prop('disabled', false);
    $('#cancela-sintoma').prop('disabled', false);

    //Busca a planta do ID passado
    $.get('includes/getSintomaPendente.php?id_sintoma=' + sintomasPendentes[id].id_sintomas, function (data) {

        $('#id_sintoma').text(data[0].id_sintomas);
        $('.titulo-sintoma').text(data[0].nome_cientifico);
        $('.nome-sintomac').text(data[0].nome_cientifico);
        $('.nome-sintomap').text(data[0].nome_popular);
        $('.parte-corpo').text(data[0].parte_corpo);
        $('.causas').text(data[0].causas);
        $('.tratamentos').text(data[0].tratamentos);
    });
}

function aprovaPlanta(id) {

    $.get('../src/includes/aprovarPlanta.php?id_planta=' + id, function (data) {

        if (data.codigo == 0) {
            consultaplantasPendente();
            $('.msgn-aprovado-planta').show();
            $('.informativo').hide();
            $('#aprova-planta').prop('disabled', true);
            $('#cancela-planta').prop('disabled', true);
        } else {
            alert('ERRO ao aprovar. Contate o administrador do sistema.');
        }
    });
}

function aprovaSintoma(id) {

    $.get('../src/includes/aprovarSintoma.php?id_sintoma=' + id, function (data) {

        if (data.codigo == 0) {
            consultasintomasPendente();
            $('.msgn-aprovado-sintoma').show();
            $('.informativo-sintoma').hide();
            $('#aprova-sintoma').prop('disabled', true);
            $('#cancela-sintoma').prop('disabled', true);
        } else {
            alert('ERRO ao aprovar. Contate o administrador do sistema.');
        }
    });
}

function revisarPlanta(id, msg) {

    if (msg == '') {
        $('#message-text-planta').addClass('borda-vermelha');
    } else {
        $('#message-text-planta').removeClass('borda-vermelha');
        $.get('../src/includes/revisarPlanta.php?id_planta=' + id + '&comentario=' + msg, function (data) {

            if (data.codigo == 0) {
                consultaplantasPendente();
                $('.alert-mgn-planta').show();
                $('#enviar-mensagem').prop('disabled', true);
                $('#aprova-planta').prop('disabled', true);
                $('#cancela-planta').prop('disabled', true);
                $('.mgn-planta').hide();
            } else {
                alert('ERRO ao enviar. Contate o administrador do sistema.');
            }
        });
    }
}

function revisarSintoma(id, msg) {

    if (msg == '') {
        $('#message-text-sintoma').addClass('borda-vermelha');
    } else {
        $('#message-text-sintoma').removeClass('borda-vermelha');

        $.get('../src/includes/revisarSintoma.php?id_sintoma=' + id + '&comentario=' + msg, function (data) {

            if (data.codigo == 0) {
                consultasintomasPendente();
                $('.alert-mgn-sintoma').show();
                $('#enviar-mensagem-sintoma').prop('disabled', true);
                $('.mgn-sintoma').hide();
                $('#message-text-sintoma').text("");
            } else {
                alert('ERRO ao enviar. Contate o administrador do sistema.');
            }
        });
    }
}

function carregaPlantaId(id) {

    $('.alert-mgn-planta').hide();
    $('.msgn-aprovado-planta').hide();
    $('.mgn-planta').show();
    $('.informativo').show();

    $('#enviar-mensagem').prop('disabled', false);
    $('#aprova-planta').prop('disabled', false);
    $('#cancela-planta').prop('disabled', false);

    $('#message-text-planta').val("");
    $('#message-text-planta').removeClass('borda-vermelha');

    $('.id-planta-aprova').text(plantasPendentes[id].id_plantas);
    $('.id-planta-mensagem').text(plantasPendentes[id].id_plantas);
    $('.nome-registro').text(plantasPendentes[id].nome_cientifico);
}

function carregaSintomaId(id) {

    $('.alert-mgn-sintoma').hide();
    $('.msgn-aprovado-sintoma').hide();
    $('.mgn-sintoma').show();
    $('.informativo-sintoma').show();

    $('#enviar-mensagem-sintoma').prop('disabled', false);
    $('#aprova-sintoma').prop('disabled', false);
    $('#cancela-sintoma').prop('disabled', false);
    
    $('#message-text-sintoma').val("");
    $('#message-text-sintoma').removeClass('borda-vermelha');

    $('.id-sintoma-aprova').text(sintomasPendentes[id].id_sintomas);
    $('.id-sintoma-mensagem').text(sintomasPendentes[id].id_sintomas);
}

function filtraPlantaPendente(value) {

    $("#plantas-pendentes tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}

function filtraSintomaPendente(value) {

    $("#sintomas-pendentes tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}