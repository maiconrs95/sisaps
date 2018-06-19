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
        url: "includes/novoPlanta.php",
        type: "POST",
        dataType: 'json',
        data: new FormData(form),
        beforeSend: function () {

        },
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#insert_planta').attr('disabled', true);
            $('#planta_cancelar').attr('disabled', true);
        },
        success: function (data) {
            $('#insert_planta').attr('disabled', false);
            $('#planta_cancelar').attr('disabled', false);

            console.log(data);

            switch (data.codigo) {
                case 0:
                    exibeMsg(data.mensagem, 'alert-danger');
                    break;
                case 1:
                    exibeMsg(data.mensagem, 'alert-danger');
                    validaPlanta(form);
                    break;
                case 2:
                    exibeMsg(data.mensagem, 'alert-success');
                    validaPlanta(form);
                    limpaPlanta(form);
                    $('#previewing').attr('src', 'img/plantas/sem-foto.jpg');
                    $('.demo2').bootstrapDualListbox('refresh');
                    exibeMsg(data.mensagem, 'alert-success');
                    break;
                case 3:
                    exibeMsg(data.mensagem, 'alert-danger');
                    break;
                default:
                    break;
            }
        },
        error: function () {}
    });
}

function updatePlanta() {

    form = document.querySelector('#update-planta');

    $.ajax({
        url: "includes/alterarPlanta.php",
        type: "POST",
        dataType: 'json',
        data: new FormData(form),
        beforeSend: function () {

        },
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#atualiza-planta').prop('disabled', true);
            $('#cancela-planta').prop('disabled', true);
        },
        success: function (data) {
            $('#atualiza-planta').prop('disabled', false);
            $('#cancela-planta').prop('disabled', false);            
            
            switch (data.codigo) {
                case 0:
                    exibeMsg(data.mensagem, 'alert-danger');
                    break;
                case 1:
                    exibeMsg(data.mensagem, 'alert-danger');
                    validaPlanta(form);
                    break;
                case 2:
                    exibeMsg(data.mensagem, 'alert-success');
                    consultaplantas();
                    $('.demo2').bootstrapDualListbox('refresh');
                    //validaPlanta(form);              
                    break;
                case 3:
                    exibeMsg(data.mensagem, 'alert-success');
                    break;
                default:
                    break;
            }
        },
        error: function () {}
    });
}