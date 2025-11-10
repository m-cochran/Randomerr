import json
import os

# Function to append a new order to the JSON file
def append_order_to_json_file(path, filename, new_order):
    # Ensure the directory exists
    os.makedirs(path, exist_ok=True)

    # Construct the file path
    file_path = os.path.join(path, filename + '.json')

    # Load existing orders if the file exists
    if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
        with open(file_path, 'r') as fp:
            try:
                orders = json.load(fp)  # Read the existing orders
                if not isinstance(orders, list):  # Ensure it's a list
                    orders = [orders]
            except json.JSONDecodeError:
                orders = []  # If file is corrupted or not valid JSON, start fresh
    else:
        orders = []  # Initialize empty list if file doesn't exist

    # Append the new order
    orders.append(new_order)

    # Write updated orders back to the file
    with open(file_path, 'w') as fp:
        json.dump(orders, fp, indent=4)

    print(f"✅ New order added to: {file_path}")

# Define file path and name
path = r'C:\Users\mr_co\Desktop\Randomerr-main'  # Specify your path here
filename = 'orders2'  # File name (without the .json extension)

# New order to append (Example order data)
new_order = {
    "orderId": "67890",
    "customer": { "accountId": "name": "Alice Brown", "email": "alice@example.com" },
    "cartItems": [
        { "product": "Laptop", "price": 999 },
        { "product": "Mouse", "price": 25 }
    ],
    "totalAmount": 1024
}

# Call the function to append the order to the file
append_order_to_json_file(path, filename, new_order)
