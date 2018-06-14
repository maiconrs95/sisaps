//Variavel Global que recebe o array com todos os sintomas
var sintomas_pendentes;

function obtemUsuarioAtualizacao(id) {
    return sintomas_pendentes[id];
}

//Busca os sintomas cadastrados na base de dados
function consultaSintomasPendentes() {

    $.get('includes/buscaSintomasPendentes.php', function (data) {
        console.log(data);
        sintomas_pendentes = data;
        $("tbody tr").remove();
        $(data).each(function (i, sintoma) {

            insereSintomas(i, sintoma.nome_cientifico.toLowerCase(), sintoma.parte_corpo, sintoma.nome_popular);
        });

    });
}
