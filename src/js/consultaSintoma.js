//Variavel Global que recebe o array com todos os usários
var sintomas_bd;

function obtemUsuarioAtualizacao(id) {
    return usuarios[id];
}

//Busca os usuários cadastrados na base de dados
function consultaSintomas() {

    $.get('includes/buscaSintomas.php', function (data) {

        sintomas_bd = data;

        console.log(data);
        $(data).each(function (i, sintoma) {

            insereSintomas(i, sintoma.nome_cientifico.toLowerCase(), sintoma.parte_corpo, sintoma.nome_popular);
        });

    });
}

//Verifica o status do usuário para alimentar a tabela
function verificaStatus(status) {
    if (status == 1) {
        return 'Ativo';
    }
    if (status == 2) {
        return 'Inativo';
    }
}


//Insere os usuários que retornaram da consulta na tabela
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

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_user');
    var icone = $("<i>").addClass("fas fa-search");

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaSintoma);
    linha.append(colunaParteCorpo);
    linha.append(colunaNome);

    return linha;
}


//filtra os usuários na tabela
function filtraSintoma(value) {

    $("#lista-sintomas tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
}


//Abre modal
function carregaModalSintoma(id) {

    $('#id').text(usuarios[id].id_user);
    $('.modal-title').text(usuarios[id].usuario);
    $('#email_user').val(usuarios[id].email_user);
    selecionaPerfil(usuarios[id].perfil);
    $('#nome_user').val(usuarios[id].nome_user);

}

//Verifica o perfil que é carregado do BD para selecionar a option no DOM
function selecionaPerfil(perfil) {

    var combo = document.getElementById('perfil_user');

    for (var i = 0; i < combo.options.length; i++) {
        if (combo.options[i].text == perfil) {
            combo.options[i].selected = true;
        }
    }
}