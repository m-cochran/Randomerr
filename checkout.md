---
layout: default
title: Checkout
permalink: /Checkout/
---

# Checkout

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).

        <div id="checkout-cart">
            <h2>Your Cart</h2>
            <div id="cart-items">
                <!-- Cart items will be dynamically added here -->
            </div>
            <div id="cart-total">
                <strong>Total: </strong> $<span id="total-amount">0.00</span>
            </div>
        </div>

        <div id="checkout-form">
            <h2>Billing Details</h2>
            <form id="checkout-form">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="address">Address:</label>
                    <input type="text" id="address" name="address" required>
                </div>
                <div>
                    <label for="city">City:</label>
                    <input type="text" id="city" name="city" required>
                </div>
                <div>
                    <label for="postal-code">Postal Code:</label>
                    <input type="text" id="postal-code" name="postal-code" required>
                </div>
                <div>
                    <label for="country">Country:</label>
                    <input type="text" id="country" name="country" required>
                </div>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
