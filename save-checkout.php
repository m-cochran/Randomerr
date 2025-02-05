<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonFile = 'orders.json'; // Path to JSON file
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["success" => true, "message" => "Data saved successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid data"]);
    }
}
?>
