function enviaImg() {

    $.ajax({
        url: "ajax_php_file.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: new FormData(document.querySelector('#file')), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false, // The content type used when sending data to the server.
        cache: false, // To unable request pages to be cached
        processData: false, // To send DOMDocument or non processed data file it is set to false
    });
};

// Function to preview image after validation
function validaImg() {

    $("#message").empty(); // To remove the previous error message
    var file = document.querySelector('#file').files[0];
    var imagefile = file.type;
    var match = ["image/jpeg", "image/png", "image/jpg"];
    console.log(imagefile);
    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
        $('#previewing').attr('src', 'img/sem-foto.jpg');
        $('#previwborder').removeClass('borda-img');
        $('#previwborder').addClass('borda-vermelha');
        alert('Selecione uma imagem válida.');
        return false;
    } else {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(document.querySelector('#file').files[0]);
        $('#previwborder').addClass('borda-img');
        $('#previwborder').removeClass('borda-vermelha');

        return true;
    }
}

function imageIsLoaded(e) {
    $("#file").css("color", "green");
    //$('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
};