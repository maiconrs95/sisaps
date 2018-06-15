function controlaView(conteudo) {

    //novo usuario
    if (conteudo == 'view/novo_usuario.html') {

        mascaraCampo();

        var formulario = document.querySelector('#form-usuario');

        $('#cep_user').blur(function () {
            carregaCep();
        });

        $('#email_user').blur(function () {
            !IsEmail(formulario.email.value)
        });

        $('#cpf_user').blur(function () {
            validacaoCpf(formulario.cpf.value);
        });

        $('#insert_cadastrar').click(function () {

            var usuario = obterUsuario(formulario);
            var camposObg = validaCampos(formulario);
            var cpfValido = validacaoCpf(formulario.cpf.value);
            var emailValido = IsEmail(formulario.email.value);

            if (camposObg && cpfValido && emailValido) {
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

        obtemSintomas();
        getPartePlanta();

        $('#form-planta').on('submit', (function (event) {
            event.preventDefault();
            previewing();
    
            /*if () {
                //cadastraPlanta(planta);
                //
                limpaPlanta(formPLanta);
                console.log('cadastrado');
            } else {
                console.log('Não cadastra');
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }*/
        }));
    }

    //alterar planta
    else if (conteudo == 'view/alterar_planta.html') {

        consultaplantas();
        //obtemSintomas();
        getPartePlanta();

        $('.close').click(function (){
            $('#previewing').attr('src', 'img/plantas/sem-foto.jpg');
            $("input:text").val("");
            $('#parte_planta option:selected').remove();
            $('.demo2').empty();
            $('.alert-msg').fadeOut(100);        
        });
        $('#cancela_planta').click(function (){
            $('#previewing').attr('src', 'img/plantas/sem-foto.jpg');
            $("input:text").val("");
            $('#parte_planta option:selected').removeAttr('selected');
            $('.demo2').empty();
            $('.alert-msg').fadeOut(100);         
        });
        
        $("#pesquisar-planta").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraPlanta(value);
        });

        $('#atualiza-planta').on('click', (function (event) {
            //event.preventDefault();
            updatePlanta();
        }));
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

    //pendencias professor
    else if(conteudo == 'view/pendencias.html') {
        $('.sintomas-pendentes').hide();
        $('.plantas-pendentes').hide();

        consultaplantasPendente();
        consultasintomasPendente();

        $("#find-plantap").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraPlantaPendente(value);
        });

        $("#find-sintomap").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraSintomaPendente(value);
        });

        $('.close').click(function () {
            $('label p').text('');
            $('h5 label').text('');
            $('.sintomas-associados li').remove();
        });

        $('#aprova-planta').click(function (){
            aprovaPlanta($('#id_planta').text());
        });

        $('#aprova-planta-modal').click(function (){
            aprovaPlanta($('.id-planta-aprova').text());
        });

        $('#cancela-planta').click(function (){
            $('.id-planta-mensagem').text($('#id_planta').text());        
        });

        $('#enviar-mensagem').click(function (){
            revisarPlanta($('.id-planta-mensagem').text(), $('#message-text').val());
        });
        

        $('#aprova-sintoma').click(function (){
            aprovaSintoma($('#id_sintoma').text());
        });

        $('#aprova-sintoma-modal').click(function (){
            aprovaSintoma($('.id-sintoma-aprova').text());
        });

        $('#enviar-mensagem-sintoma').click(function (){
            revisarSintoma($('.id-sintoma-mensagem').text(), $('#message-text-sintoma').val());
        });

        $('#cancela-sintoma').click(function (){
            $('.id-sintoma-mensagem').text($('#id_sintoma').text());            
        });

    }

    //pendencias assistente
    else if(conteudo == 'view/revisao_assistente.html'){

        $('.sintomas-pendentes').hide();
        $('.plantas-pendentes').hide();

        consultaPlantasPendentes();
        consultaSintomasPendentes();

        $('.close').click(function () {
            $('.alert-msg').hide();
        });

        $("#find-sintomap").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraSintomap(value);
        });

        $("#find-plantap").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            filtraPlantap(value);
        });

        $('#update_registro').click(function () {
            var formSintomas = document.querySelector('#modal-sintomas-pendentes');

            if (updateCamposSintoma(formSintomas)) {
                alterarSintomaPendente(obtemSintomaInputs());
            } else {
                exibeMsg('Preencha e valide todos os campos obrigatórios.', 'alert-danger');
            }
        });

        $('#atualiza-planta-pendente').on('click', (function (event) {
            //event.preventDefault();
            updatePlantaPendente();
        }));
    }

}//controla view