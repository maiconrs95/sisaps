function obterSintomas() {

    var sintomas_select = new Array();

    $(".demo2 option").each(function () {
        if ($(this).is(':selected'))
            sintomas_select.push(this.value);
    });

    return sintomas_select;
}

function obterPlanta(form) {

    var planta = {
        nome_c: form.nome_cientifico.value,
        nome_p: form.nome_popular.value,
        parte_planta: form.parte_planta.value,
        regiao: form.regiao.value,
        modo_preparo: form.modo_preparo.value,
        cuidados: form.cuidados.value,
        efeitos: form.efeitos.value,
        principio_ativo: form.principio_ativo.value,
        bibliografia: form.bibliografia.value,
        sintomas: obterSintomas()
    }

    return planta;
}

function cadastraPlanta(planta) {

    //FAZER UPLOAD DE IMAGEM

}

function validaPlanta(form) {

    var nome_c = form.nome_cientifico;
    var nome_p = form.nome_popular;
    var cuidados = form.cuidados;
    var efeitos = form.efeitos;
    var principio = form.principio_ativo;

    if (nome_c.value == '') {
        nome_c.classList.add('borda-vermelha');
    } else {
        nome_c.classList.remove('borda-vermelha');
    }

    if (nome_p.value == '') {
        nome_p.classList.add('borda-vermelha');
    } else {
        nome_p.classList.remove('borda-vermelha');
    }

    if (cuidados.value == '') {
        cuidados.classList.add('borda-vermelha');
    } else {
        cuidados.classList.remove('borda-vermelha');
    }

    if (efeitos.value == '') {
        efeitos.classList.add('borda-vermelha');
    } else {
        efeitos.classList.remove('borda-vermelha');
    }

    if (principio.value == '') {
        principio.classList.add('borda-vermelha');
    } else {
        principio.classList.remove('borda-vermelha');
    }

    if (nome_c.value == '' || nome_p.value == '' || cuidados.value == '' || efeitos.value == '' || principio.value == '') {
        return false;
    } else {
        $('.alert-msg').hide();
        limpaPlanta(form);
        return true;
    }
}

function limpaPlanta(form) {
    form.reset();

    $(".demo2 option").each(function () {
        if ($(this).is(':selected'))
            $(this).attr('selected', 'false');
    });
}

function obtemSintomas() {
    
    $.get('includes/buscaSintomasAtivos.php', function (data) {

        var select = $('.demo2');
        $(data).each(function (i, user) {

            select.append($('<option>').val(data[i].id_sintomas).text(data[i].nome_cientifico));
        });

        var demo2 = $('.demo2').bootstrapDualListbox({
            preserveSelectionOnMove: 'moved',
            nonSelectedListLabel: 'Não associado:',
            selectedListLabel: 'Associado:',
            moveOnSelect: true,
            nonSelectedFilter: ''
        });

    });
}

function getPartePlanta() {

    $.get('includes/getPartePlanta.php', function (data) {

        parte = data;
        
        $('#parte_planta option').remove();
        $(data).each(function (i, user) {

            var select = $('#parte_planta');
            $('<option>').val(parte[i].id_parte_planta).text(parte[i].parte_planta).appendTo(select);
        });
    });
}