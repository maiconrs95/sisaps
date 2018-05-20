function controlaView(conteudo) {

    if (conteudo == 'view/novo_usuario.html') {

        var formulario = document.querySelector('#form-usuario');

        mascaraCampo();

        $('#cep_user').blur(function () {
            carregaCep();
        });

        $('#cpf_user').blur(function () {
            validacaoCpf(formulario.cpf.value);
        });

        $('#insert_cadastrar').click(function () {

            var usuario = obterUsuario(formulario);
            var camposObg = validaCampos(formulario);
            var cpfValido = validacaoCpf(formulario.cpf.value);

            if (camposObg && cpfValido) {
                cadastrarUsuario(usuario);
            } else {
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }

        });
    } //novo usuario
    else if (conteudo == 'view/alterar_usuario.html') {

        consultaUsuario();

        //Filtrar por nome
        $("#find-user").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraUsuario(value);
        });

        $('#update_user').click(function () {

            var formPerfil = document.querySelector('#formPerfil');
            var formPessoais = document.querySelector('#formPessoais');
            
            var camposObg = validaCampos(formPerfil, formPessoais);

            console.log(formPerfil);
            console.log(formPessoais);
            console.log(camposObg);
            
            var usuario = obtemDadosInputs();
            //var camposObg = validaCampos(formulario);
                      
            console.log(usuario);
        });

    } //alterar usuario
}