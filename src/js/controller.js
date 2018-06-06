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

    else if (conteudo == 'view/novo_planta.html'){

        var img_valida = 0;

        obtemSintomas();

        //valida-img
        $("#file").change(function () {
            if(validaImg()){
                img_valida = 1;
            }else{
                img_valida = 0;
            };
        });

        $('#insert_planta').click(function(){

            var formPLanta = document.querySelector('#form-planta');
            var planta = obterPlanta(formPLanta);

            if(validaPlanta(formPLanta) && img_valida == 1){
                cadastraPlanta(planta);
                enviaImg();
            }else{
                console.log('Não cadastra');
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
            
        });
    }

    else if(conteudo == 'view/novo_sintoma.html'){

        getCorpo();

        $('#insert_sintoma').click(function(){

            var formSintoma = document.querySelector('#form-sintoma');
            var sintoma = obterSintoma(formSintoma);

            if(validaCamposSintoma(formSintoma)){
                cadastrarSintoma(sintoma);
            }else{
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });
        
    }//sintoma
    else if(conteudo == 'view/alterar_sintoma.html'){
        
        consultaSintomas();

        $('.close').click(function(){
            $('.alert-msg').hide();
        });
    
        $("#pesquisar-sintoma").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraSintoma(value);
        });

        $('#update_registro').click(function(){
            var formSintomas = document.querySelector('#update_sintoma');

            if(updateCamposSintoma(formSintomas)){
                alterarSintoma(obtemSintomaInputs());
            }else{
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }            
        });
    }//sintoma
}