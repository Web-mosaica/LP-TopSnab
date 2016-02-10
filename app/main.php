<?php

$recepient = "";
$sitename = "Template";

$name = trim($_POST["fullName"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \nТелефон: $phone\nEmail: $email";
if ( mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient") ) 
    //echo "name="+$name;
?>