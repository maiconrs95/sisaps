function controlaView(conteudo) {

    //novo usuario
    if (conteudo == 'view/novo_usuario.html') {

        mascaraCampo();

        var formulario = document.querySelector('#form-usuario');

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
    }

    //alterar usuario
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

    }

    //nova planta
    else if (conteudo == 'view/novo_planta.html') {



        $('#form-planta').on('submit', function (e) {
            e.preventDefault();

            var formPLanta = document.querySelector('#form-planta');
            var planta = obterPlanta(formPLanta);
            var hhh = document.getElementById('file');
            previewing(); 
            if (validaPlanta(formPLanta)) {
                //cadastraPlanta(planta);
                $('#previewing').attr('src', 'img/sem-foto.jpg');
                limpaPlanta(formPLanta);
                console.log('cadastrado');
            } else {
                console.log('Não cadastra');
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });

        obtemSintomas();

    }

    //alterar planta
    else if (conteudo == 'view/alterar_planta.html') {

        obtemSintomas();
    }

    //novo sintoma
    else if (conteudo == 'view/novo_sintoma.html') {

        getCorpo();

        $('#insert_sintoma').click(function () {

            var formSintoma = document.querySelector('#form-sintoma');
            var sintoma = obterSintoma(formSintoma);

            if (validaCamposSintoma(formSintoma)) {
                cadastrarSintoma(sintoma);
            } else {
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });

    }

    //alterar sintoma
    else if (conteudo == 'view/alterar_sintoma.html') {

        consultaSintomas();

        $('.close').click(function () {
            $('.alert-msg').hide();
        });

        $("#pesquisar-sintoma").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraSintoma(value);
        });

        $('#update_registro').click(function () {
            var formSintomas = document.querySelector('#update_sintoma');

            if (updateCamposSintoma(formSintomas)) {
                alterarSintoma(obtemSintomaInputs());
            } else {
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });
    }
}