//obtém o sintoma a ser cadastrado
function obterSintoma(form) {

    sintoma = {
        nome_cientifico: form.nome_cientifico.value,
        nome_popular: form.nome_popular.value,
        parte_corpo: form.parte_sintoma.value,
        causa: form.causas.value,
        tratamentos: form.tratamentos.value
    }

    return sintoma;
}


//valida os campos obrigatórios
function validaCamposSintoma(form) {

    var nome_cientifico = form.nome_cientifico;
    var nome_popular = form.nome_popular;
    var parte_corpo = form.parte_sintoma;

    if (nome_cientifico.value == '') {
        nome_cientifico.classList.add('borda-vermelha');
    } else {
        nome_cientifico.classList.remove('borda-vermelha');
    }
    if (nome_popular.value == '') {
        nome_popular.classList.add('borda-vermelha');
    } else {
        nome_popular.classList.remove('borda-vermelha');
    }
    if (parte_corpo.value == '') {
        parte_corpo.classList.add('borda-vermelha');
    } else {
        parte_corpo.classList.remove('borda-vermelha');
    }

    if (nome_cientifico.value == '' || nome_popular.value == '' || parte_corpo.value == '') {
        return false;
    } else {
        $('.alert-msg').hide();
        return true;
    }
}
