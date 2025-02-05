<?php
// Path to your JSON file where data will be saved
$jsonFile = 'orders.json';

// Check if the request is a POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Check if the data is valid
    if ($data) {
        // Write the data to the JSON file
        if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
            // Respond with success message
            echo json_encode(["success" => true, "message" => "Checkout data saved successfully"]);
        } else {
            // Respond with failure message if writing to the file fails
            echo json_encode(["success" => false, "message" => "Failed to save checkout data"]);
        }
    } else {
        // Respond with failure if the data is invalid
        echo json_encode(["success" => false, "message" => "Invalid data received"]);
    }
} else {
    // Respond with error if the method is not POST
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>

