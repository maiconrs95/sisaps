//PLANTAS
function totalPlantasAtivas() {

    $.get('includes/dashboard/plantasAtivas.php', function (data) {                    
        console.log(data);
    });
}
function totalPlantasPendentes() {

    $.get('includes/dashboard/plantasPendentes.php', function (data) {            
        console.log(data);
    });
}
function totalPlantasReprovadas() {

    $.get('includes/dashboard/plantasReprovadas.php', function (data) {            
        console.log(data);
    });
}



//SINTOMAS
function totalSintomasAtivos() {

    $.get('includes/dashboard/sintomasAtivos.php', function (data) {                    
        console.log(data);
    });
}
function totalSintomasPendentes() {

    $.get('includes/dashboard/sintomasPendentes.php', function (data) {            
        console.log(data);
    });
}
function totalSintomasReprovados() {

    $.get('includes/dashboard/sintomasReprovadas.php', function (data) {            
        console.log(data);
    });
}