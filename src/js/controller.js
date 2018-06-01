function controlaView(conteudo) {

    if (conteudo == 'view/novo_usuario.html') {
        
        mascaraCampo();

        $('#cep_user').blur(function () {
            carregaCep();
        });

        $('#cpf_user').blur(function () {
            validacaoCpf(formulario.cpf.value);
        });

        $('#insert_cadastrar').click(function () {

            var formulario = document.querySelector('#form-usuario');
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

        $('#cep_user').blur(function () {
            carregaCep();
        });

        $('#update_user').click(function () {

            //VALIDA OS DADOS OBRIGATÓRIOS DO MODAL
            var formPerfil = document.querySelector('#formPerfil');
            var formPessoais = document.querySelector('#formPessoais');
            var camposObg = updateCamposObg(formPerfil, formPessoais);
            
            //OBTÉM OS DADOS DO USUÁRIO DO MODAL
            var usuario = obtemDadosInputs();

            if (camposObg) {
                alterarUsuario(usuario);
            } else {
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });

    } //alterar usuario

    //planta x sintomas

    else if(conteudo == 'view/novo_sintoma.html'){

        $('#insert_sintoma').click(function(){

            var formSintoma = document.querySelector('#form-sintoma');
            var sintoma = obterSintoma(formSintoma);

           console.log(validaCamposSintoma(formSintoma));

            if(validaCamposSintoma(formSintoma)){
                cadastrarSintoma(sintoma);
            }else{
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });
        
    }//sintoma
}