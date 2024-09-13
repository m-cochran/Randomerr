<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capture form fields and sanitize input
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate form data
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Email recipient and subject
    $to = "reachmycupofearth@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission from $name";

    // Email content
    $emailContent = "Name: $name\n";
    $emailContent .= "Email: $email\n\n";
    $emailContent .= "Message:\n$message\n";

    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Attempt to send the email
    if (mail($to, $subject, $emailContent, $headers)) {
        echo "Thank you for contacting us, $name. We will get back to you soon.";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
} else {
    // Redirect to form page if accessed directly
    header("Location: /contact/");
    exit;
}
?>
