//VARIAVEL GLOBAL QUE VAI RECEBER O DATA PARA MANIPULAR NOS MODAIS
var plantasPendentes;

//Busca os plantas pendentes cadastrados na base de dados
function consultaplantasPendente() {

    $.get('includes/getPlantasProfessor.php', function (data) {

        plantasPendentes = data;

        $("tbody tr").remove();
        $(data).each(function (i, planta) {
            console.log(data);
            inserePlantas(i, planta.nome_cientifico.toLowerCase(), planta.nome_popular, planta.nome_user);
        });

    });
}