<?php
define('ADMIN_EMAIL', 'from@example.com');
include_once("db-connection.php");
spl_autoload_register();

$firstname = strip_tags(trim($_POST['firstname']));
$lastname = strip_tags(trim($_POST['lastname']));
$email = strip_tags(trim($_POST['email']));
$phone = strip_tags(trim($_POST['phone']));
$message = strip_tags(trim($_POST['message']));
$file = $_FILES['file']['tmp_name'];
$statment = false;

$newRow = new FormHandler($firstname, $lastname, $email, $phone, $message, $file, $statment);
$newRow->saveFile();
$newId = $newRow->insertInToDB($pdo);

if ($newId){
    $newRow->selectFromDB($pdo, $newId);
    $newRow->sendEmail();
    $newRow->returnResult(); 
}
