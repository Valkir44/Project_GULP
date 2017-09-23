<?php

$recipient = "beluy845@gmail.com";

$site_name = "Повідомлення із форми зворотнього звязку";

$name_of_uploaded_file =
    basename($_FILES['file']['name']);

//get the file extension of the file
$type_of_uploaded_file =
    substr($name_of_uploaded_file,
        strrpos($name_of_uploaded_file, '.') + 1);

$size_of_uploaded_file =
    $_FILES["uploaded_file"]["size"]/4024;//size in KBs

$upload_folder =

//copy the temp. uploaded file to uploads folder
$path_of_uploaded_file = $upload_folder . $name_of_uploaded_file;

$tmp_path = $_FILES["uploaded_file"]["tmp_name"];

if(is_uploaded_file($tmp_path))
{
    if(!copy($tmp_path,$path_of_uploaded_file))
    {
        $errors .= '\n error while copying the uploaded file';
    }
}

$name = trim($_POST["userName"]);
$email = trim($_POST["email"]);
//$file = trim($_POST["file"]);

$message = "Name: $name \n\n email: $email";

mail($recipient, $site_name, $message,
    "Content-type: text/plain; charset=\"utf-8\"\n From: $email");



