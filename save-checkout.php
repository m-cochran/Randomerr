<?php
// Path to your JSON file where data will be saved
$jsonFile = 'orders.json';

// Check if the request is a POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Check if the data is valid
    if ($data) {
        // Extract individual pieces of data
        $orderId = $data['orderId'];
        $name = $data['customer']['name'];
        $email = $data['customer']['email'];
        $orderDate = date('Y-m-d'); // Current date as the order date
        $totalAmount = $data['totalAmount'];
        
        // Extract items (assuming cartItems is an array)
        $items = $data['cartItems'];
        
        // Shipping and billing address
        $shippingAddress = $data['shippingAddress'];
        $billingAddress = $data['customer']['address']; // Assuming billing address is the same as the customer address

        // Constructing the output format
        $orderData = [];

        foreach ($items as $item) {
            $orderData[] = [
                "Order ID" => $orderId,
                "Name" => $name,
                "Email" => $email,
                "Order Date" => $orderDate,
                "Total Amount" => $totalAmount,
                "Item Name" => $item['name'],
                "Item Quantity" => $item['quantity'],
                "Shipping Street" => $shippingAddress['line1'],
                "Shipping City" => $shippingAddress['city'],
                "Shipping State" => $shippingAddress['state'],
                "Shipping Postal" => $shippingAddress['postal_code'],
                "Shipping Country" => $shippingAddress['country'],
                "Billing Street" => $billingAddress['line1'],
                "Billing City" => $billingAddress['city'],
                "Billing State" => $billingAddress['state'],
                "Billing Postal" => $billingAddress['postal_code'],
                "Billing Country" => $billingAddress['country'],
                "Tracking Number" => "TRACK" . rand(100000, 999999) // Generate a random tracking number
            ];
        }

        // Read existing data from the JSON file
        $existingData = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];

        // Merge the new order with the existing data
        $existingData = array_merge($existingData, $orderData);

        // Write the updated data to the JSON file
        if (file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
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
