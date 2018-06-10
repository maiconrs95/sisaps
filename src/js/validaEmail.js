function IsEmail(email){
    var espacos = '                           ';
    var parse_email = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    parse_email.test(email);
    console.log(email + espacos.substring(email.length) + parse_email.test(email));

    if(!parse_email.test(email)){
        $('#email_user').addClass('borda-vermelha');
    }else{
        $('#email_user').removeClass('borda-vermelha');
    }
}