<?php
// Set headers to allow cross-origin requests (optional if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Define the file where orders will be saved
$file = 'orders.json';

// Read the incoming JSON data
$orderData = file_get_contents("php://input");

// Decode JSON to an associative array
$order = json_decode($orderData, true);

// Check if decoding was successful
if (!$order) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
    exit;
}

// Read existing orders from file or create an empty array if file doesn't exist
if (file_exists($file)) {
    $orders = json_decode(file_get_contents($file), true);
} else {
    $orders = [];
}

// Append the new order to the orders list
$orders[] = $order;

// Save back to the JSON file
if (file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success", "message" => "Order saved"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save order"]);
}
?>
