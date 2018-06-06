$("#uploadimage").on('submit', (function (e) {
    e.preventDefault();
    $("#message").empty();
    $('#loading').show();
    $.ajax({
        url: "ajax_php_file.php", // Url to which the request is send
        type: "POST", // Type of request to be send, called as method
        data: new FormData(document.querySelector('#file')), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false, // The content type used when sending data to the server.
        cache: false, // To unable request pages to be cached
        processData: false, // To send DOMDocument or non processed data file it is set to false
        success: function (data) // A function to be called if request succeeds
        {
            $('#loading').hide();
            $("#message").html(data);
        }
    });
}));

// Function to preview image after validation
function validaImg() {

    console.log(document.querySelector('#file'));
    $("#message").empty(); // To remove the previous error message
    var file = document.querySelector('#file').files[0];
    var imagefile = file.type;
    var match = ["image/jpeg", "image/png", "image/jpg"];
    console.log(imagefile);
    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
        $('#previewing').attr('src', 'noimage.png');
        alert('Selecione uma imagem válida.');
        return false;
    } else {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(document.querySelector('#file').files[0]);

        return true;
    }
}

function imageIsLoaded(e) {
    $("#file").css("color", "green");
    //$('#image_preview').css("display", "block");
    $('#previewing').attr('src', e.target.result);
};