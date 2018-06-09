function validaImage(arquiv) {
    var file = arquiv.files[0];
    var imagefile = file.type;
    var match = ["image/jpeg", "image/png", "image/jpg"];
    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
        $('#previewing').attr('src', 'noimage.png');
        alert('Selecione uma imagem valida!');
        return false;
    } else {
        showPreview($('#arquivo'));
    }
}

function showPreview(objFileInput) {

    var file = objFileInput.files[0];
    var imagefile = file.type;
    var match = ["image/jpeg", "image/png", "image/jpg"];

    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
        $('#previewing').attr('src', 'img/sem-foto.jpg');
        alert('Selecione uma imagem valida!');
        return false;
    } else {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            $('#previewing').attr('src', e.target.result);
        }
        fileReader.readAsDataURL(objFileInput.files[0]);

        return true;
    }
}


function previewing() {

    form = document.querySelector('#form-planta');

    $.ajax({
        url: "../src/includes/novoPlanta.php",
        type: "POST",
        data: new FormData(form),
        beforeSend: function () {
            $("#body-overlay").show();
        },
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
        },
        error: function () {}
    });

}