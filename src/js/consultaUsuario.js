//Busca os usuários cadastrados na base de dados
function consultaUsuario() {

    $.get('includes/buscaUsuarios.php', function (data) {

        data = JSON.parse(data);
        console.log(data);
        $(data).each(function (i, user) {
            var usuario = user.nome_user;
            var perfil = user.perfil;

            insereUsuario(usuario.toLowerCase(), perfil, 'Ativo');

        });
    });  
}


//Insere os usuários que retornaram da consulta na tabela
function insereUsuario(usuario, perfil, status) {
    var corpoTabela = $(".table").find("tbody");

    var linha = novaLinha(usuario, perfil, status);

    corpoTabela.append(linha);
}


//Cria as linhas que serão adicionada na tabela
function novaLinha(usuario, perfil, status) {

    var linha = $("<tr>");
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaUsuario = $("<td>").text(usuario).attr("width", '40%');
    var colunaPerfil = $("<td>").text(perfil).attr("width", '25%');
    var colunaStatus = $("<td>").text(status).attr("width", '25%');

    var link = $("<a>").attr("href", "#").addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_user');
    var icone = $("<i>").addClass("fas fa-search");

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaUsuario);
    linha.append(colunaPerfil);
    linha.append(colunaStatus);

    return linha;
}


//lista os usuários na tabela
function filtraUsuario(value) {

    $("#lista-usuarios tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)        
    });

}


//carrega os dados no modal