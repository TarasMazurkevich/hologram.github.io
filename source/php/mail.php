<?php 

	if(isset($_POST['name'])) $name = htmlspecialchars(trim($_POST['name']));
	if(isset($_POST['phone'])) $phone = htmlspecialchars(trim($_POST['phone']));
	if(isset($_POST['email'])) $email = htmlspecialchars(trim($_POST['email']));
	if(isset($_POST['title'])) $title = htmlspecialchars(trim($_POST['title']));
	if(isset($_POST['price'])) $price = htmlspecialchars(trim($_POST['price']));

	$msg = "Имя : " . $name . "\n" . "Телефон : " . $phone . "\n" . "Почта : " . $email . "\n" . "Название товара : " . $title . "\n" . "Цена : " . $price;

	if(mail("tartitan1999@gmail.com", "Заявка с сайта", $msg, "From: tartitan1999@gmail.com")) {
		echo $msg;
	} else {
		echo "при отправке сообщения возникли ошибки";
	}

?>