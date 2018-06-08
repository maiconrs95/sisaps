//Variavel Global que recebe o array com todos os usários
var usuarios;

function obtemUsuarioAtualizacao(id) {
    return usuarios[id];
}

//Busca os usuários cadastrados na base de dados
function consultaUsuario() {

    $.get('includes/buscaUsuarios.php', function (data) {

        $('a').addClass('disabled');
        usuarios = data;
        console.log(usuarios);
        
        //console.log(data);
        $(data).each(function (i, user) {
            var id_user = user.id_user;
            var usuario = user.nome_user;
            var perfil = user.perfil;
            var status = user.ativo;
            var cpf = user.cpf_user;

            insereUsuario(i, usuario.toLowerCase(), perfil, verificaStatus(status), cpf);
        });

        $('a').removeClass('disabled');
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
function insereUsuario(id_user, usuario, perfil, status, cpf) {

    var corpoTabela = $(".table").find("tbody");
    var linha = novaLinha(id_user, usuario, perfil, status, cpf);

    corpoTabela.append(linha);
}


//Cria as linhas que serão adicionada na tabela
function novaLinha(id_user, usuario, perfil, status, cpf) {

    var linha = $("<tr>").attr('id', id_user).addClass('usuario-sistema').attr('onclick', 'carregaModal(this.id)');
    var colunaEditar = $("<th>").attr("scope", "row").attr("width", '10%');
    var colunaUsuario = $("<td>").text(usuario).attr("width", '40%');
    var colunaPerfil = $("<td>").text(perfil).attr("width", '25%');
    var colunaStatus = $("<td>").text(status).attr("width", '15%');
    var colunaCpf = $("<td>").text(cpf).addClass('d-none');

    var link = $("<a>").attr("href", "#").addClass('edit-user').addClass("btn-sm p-1").attr("data-toggle", "modal").attr('data-target', '#alterar_user');
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


//Abre modal
function carregaModal(id) {

    $('#id').text(usuarios[id].id_user);
    $('.modal-title').text(usuarios[id].usuario);
    $('#email_user').val(usuarios[id].email_user);
    selecionaPerfil(usuarios[id].perfil);
    $('#nome_user').val(usuarios[id].nome_user);
    $('#cpf_user').val(usuarios[id].cpf_user);
    $('#telefone_user').val(usuarios[id].telefone_user);
    $('#celular_user').val(usuarios[id].celular_user);
    $('#cep_user').val(usuarios[id].cep);
    $('#cidade_user').val(usuarios[id].cidade);
    $('#logradouro_user').val(usuarios[id].logradouro);
    $('#num_logradouro').val(usuarios[id].num_casa);

    
    updateMaskCampo();
}


//formata os campos do formulário
function updateMaskCampo() {

    $('.cpf').mask('000.000.000-00', {
        reverse: true
    });
    $('.telefone').mask('(00) 0000-0000');
    $('.celular').mask('(00) 00000-0000');
    $('.cep').mask('00000-000');

    $('.alert-msg').hide();
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