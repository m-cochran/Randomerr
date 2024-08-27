<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "reachmycupofearth@gmail.com";
    $subject = "Contact Form Submission from $name";
    $headers = "From: $email";
    $mailBody = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    if (mail($to, $subject, $mailBody, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request method.";
}
?>
