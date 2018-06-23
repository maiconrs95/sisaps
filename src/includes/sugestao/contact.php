<?php

//require_once('conexao.php');
//$conexao = new db();
//$link = $conexao->conn_mysql();

//Retrieve form data.
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['nome']) ? $_GET['nome'] : $_POST['nome'];
$email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$comment = ($_GET['sugestao']) ?$_GET['sugestao'] : $_POST['sugestao'];

//flag to indicate which method it uses. If POST set it to 1

if ($_POST) $post=1;

//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Por favor, preencha seu nome.';
if (!$email) $errors[count($errors)] = 'Por favor, preencha seu email.';
if (!$comment) $errors[count($errors)] = 'Por favor, preencha o campo de mensagem.';

//if the errors array is empty, send the mail
if (!$errors) {

	//recipient - replace your email here
	$to = 'sisaps@outlook.com';
	//sender - from the form
	$from = $name . ' <' . $email . '>';

	//subject and the html message
	$subject = 'Mensagem via SISAPS' . $name;
	$message = 'Nome: ' . $name . '<br/><br/>
		       Email: ' . $email . '<br/><br/>
		       Sugestão: ' . $comment . '<br/>';

	//sav prospects in database
	//$sql = "INSERT INTO prospects_tb(nome, email, servico, mensagem) values ('$name','$email','$servico','$comment')";
	//mysqli_query($link, $sql);

	//send the mail
	$result = sendmail($to, $subject, $message, $from);

	//if POST was used, display the message straight away
	if ($_POST) {
		if ($result){
			echo 'Obrigado, Nós recebemos a sua mensagem!';
		}
		else echo 'Ocorreu um erro inesperado, tente novamente.';

	//else if GET was used, return the boolean value so that
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="index.html">Voltar</a>';
	exit;
}


//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";
	$headers .= 'De: ' . $from . "\r\n";

	$result = mail($to,$subject,$message,$headers);

	if ($result) return 1;
	else return 0;
}

?>
