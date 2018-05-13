//Busca os usuários cadastrados na base de dados
function consultaUsuario() {

    $.get('includes/buscaUsuarios.php', function (data) {

        console.log(obtemUsers(data));

        //console.log(data);
        $(data).each(function (i, user) {
            var usuario = user.nome_user;
            var perfil = user.perfil;
            var status = user.ativo;
            var cpf = user.cpf_user;

            insereUsuario(usuario.toLowerCase(), perfil, verificaStatus(status), cpf);
        });
    });  
}


//Obtém todos os usuários
function obtemUsers(data){
    var usuarios = data;

    return usuarios;
}


//Verifica o status do usuário para alimentar a tabela
function verificaStatus(status){
    if(status == 1){
        return 'Ativo';
    }
    if(status == 2){
        return 'Inativo';
    }
}


//Insere os usuários que retornaram da consulta na tabela
function insereUsuario(usuario, perfil, status, cpf) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinha(usuario, perfil, status, cpf);

    corpoTabela.append(linha);
}


//Cria as linhas que serão adicionada na tabela
function novaLinha(usuario, perfil, status, cpf) {

    var linha = $("<tr>").addClass('usuario-sistema');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaUsuario = $("<td>").text(usuario).attr("width", '40%');
    var colunaPerfil = $("<td>").text(perfil).attr("width", '25%');
    var colunaStatus = $("<td>").text(status).attr("width", '15%');
    var colunaCpf = $("<td>").text(cpf).addClass('d-none');

    var link = $("<a>").attr("href", "#").addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_user');
    var icone = $("<i>").addClass("fas fa-search");

    link.append(icone);

    colunaEditar.append(link);

    linha.append(colunaEditar);
    linha.append(colunaUsuario);
    linha.append(colunaPerfil);
    linha.append(colunaStatus);
    linha.append(colunaCpf);

    return linha;
}


//filtra os usuários na tabela
function filtraUsuario(value) {

    $("#lista-usuarios tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)        
    });

}


//carrega os dados no modal