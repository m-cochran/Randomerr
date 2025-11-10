---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout


<script src="https://js.stripe.com/v3/"></script>
<style>
  /* General Form Styles */
  #payment-form, #cart-summary {
    max-width: 90%;
    margin: 2rem auto;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: #495057;
  }

  /* This span rule was too broad and affected the button's internal text span */
  /* Replaced with a more specific approach for button text */
  /* span {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: #495057;
  } */


  #submit-button {
    background-color: #0066ff;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
    display: flex; /* Use flexbox to align text and spinner */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
  }

  button:hover {
    background-color: #07f;
  }

  /* Browser's default validation styling for invalid inputs */
  input:invalid:not(:focus):not(:placeholder-shown) {
      border-color: #dc3545; /* Red border for invalid */
  }
  input:invalid:not(:focus):not(:placeholder-shown) + .validation-message {
      display: block; /* Show message for invalid input */
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      margin-bottom: 0.5rem;
  }
  .validation-message {
      display: none; /* Hidden by default */
  }


  .success {
    color: #28a745;
    font-size: 0.875rem;
  }

  .error { /* Added error class for payment status messages */
    color: #dc3545;
    font-size: 0.875rem;
  }


  .same-line {
    display: inline-flex;
    align-items: center;
  }

  .same-line input[type="checkbox"] {
    margin-left: 10px;
    width: 25px;
    height: 25px;
  }

  #card-element {
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background-color: #f8f9fa;
  }

  /* Cart Summary Styles */
  #cart-summary {
    margin-bottom: 2rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .cart-item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px; /* Added space between buttons */
  }

  .cart-item-actions button {
    width: 30%;
    padding: 0.5rem;
    font-size: 0.875rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .cart-item-actions .btn-remove {
    background-color: #f00; /* Red for remove button */
    color: white;
  }

  .cart-item-actions .btn-remove:hover {
    background-color: #d00; /* Darker red on hover */
  }

  .cart-item-actions input {
    width: 30%;
    text-align: center;
    border: 1px solid #ced4da;
    font-size: 0.875rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 0.5rem;
  }

  /* Improved Total Styling */
  .checkout-summary {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checkout-summary #cart-total {
    color: #28a745;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    #payment-form, #cart-summary {
      width: 83%;
      margin: 1rem auto;
      padding: 1rem;
    }

    .cart-item-actions button {
      width: 32%;
    }

    .cart-item-actions input {
      width: 24%;
    }
  }

  /* Spinner CSS */
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid #fff; /* White spinner against blue button */
    width: 16px;
    height: 16px;
    -webkit-animation: spin 1s linear infinite; /* Safari */
    animation: spin 1s linear infinite;
    margin-left: 8px; /* Space between text and spinner */
    display: none; /* Hidden by default */
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>

<h2>Complete Your Payment</h2>

<main class="checkout-container">
  <section id="cart-summary">
    <h2>Your Cart</h2>
    <div id="cart-items">
      </div>
    <div class="checkout-summary">
      <div id="cart-total">Total: $0.00</div>
    </div>
  </section>

  <form id="payment-form">
  <label for="name">Full Name</label>
  <input type="text" id="name" required autocomplete="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" autocomplete="email" readonly>


  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" required autocomplete="phone">

  <label for="address">Billing Address</label>
  <input type="text" id="address" placeholder="Street Address" required autocomplete="street address">
  <input type="text" id="city" placeholder="City" required>

  <input type="text" id="state" placeholder="State (e.g., PA)" required
         pattern="[A-Z]{2}" maxlength="2"
         title="Please use a 2-letter uppercase state abbreviation (e.g., PA, CA).">
  <div class="validation-message">Please use a 2-letter uppercase state abbreviation (e.g., PA, CA).</div>

  <input type="text" id="postal-code" placeholder="Postal Code" required autocomplete="postal-code">

  <input type="text" id="country" placeholder="Country (e.g., US)" required
         pattern="[A-Z]{2}" maxlength="2"
         title="Please use a 2-letter uppercase country code (e.g., US, CA).">
  <div class="validation-message">Please use a 2-letter uppercase country code (e.g., US, CA).</div>


  <label for="same-address" class="same-line">
  Shipping address is the same as billing address
  <input type="checkbox" id="same-address">
  </label>


  <div id="shipping-address-container">
    <label for="shipping-address">Shipping Address</label>
    <input type="text" id="shipping-address" placeholder="Street Address" required>
    <input type="text" id="shipping-city" placeholder="City" required>

    <input type="text" id="shipping-state" placeholder="State (e.g., PA)" required
           pattern="[A-Z]{2}" maxlength="2"
           title="Please use a 2-letter uppercase state abbreviation (e.g., PA, CA).">
    <div class="validation-message">Please use a 2-letter uppercase state abbreviation (e.g., PA, CA).</div>

    <input type="text" id="shipping-postal-code" placeholder="Postal Code" required>

    <input type="text" id="shipping-country" placeholder="Country (e.g., US)" required
           pattern="[A-Z]{2}" maxlength="2"
           title="Please use a 2-letter uppercase country code (e.g., US, CA).">
    <div class="validation-message">Please use a 2-letter uppercase country code (e.g., US, CA).</div>
  </div>


  <span for="card-element">Credit or debit card</span>
  <div id="card-element"></div>

  <button id="submit-button">
    <span id="button-text">Pay Now</span> <span class="spinner"></span> </button>
  <div id="payment-status"></div>
  </form>
</main>



<script>
document.addEventListener("DOMContentLoaded", async () => {
  const stripe = Stripe("pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb");
  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const buttonText = document.getElementById("button-text"); // Get the text span
  const spinner = submitButton.querySelector(".spinner");     // Get the spinner element
  const paymentStatus = document.getElementById("payment-status");
  const emailInput = document.getElementById("email");
  const sameAddressCheckbox = document.getElementById("same-address");
  const shippingAddressContainer = document.getElementById("shipping-address-container");
  let loggedInUser = null;

  // Function to show loading state
  function showLoading() {
    submitButton.disabled = true;
    buttonText.textContent = "Processing..."; // Change text ONLY in the text span
    spinner.style.display = "inline-block";   // Show spinner
    paymentStatus.textContent = "";            // Clear previous messages
  }

  // Function to hide loading state
  function hideLoading(originalText = "Pay Now") {
    submitButton.disabled = false;
    buttonText.textContent = originalText;   // Revert text ONLY in the text span
    spinner.style.display = "none";          // Hide spinner
  }

  // Fetch logged-in user info
  async function fetchUserInfo() {
    try {
      console.log("Fetching user info...");
      const response = await fetch("http://localhost:3000/user-info", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.status}`);
      }

      const data = await response.json();
      console.log("User info received:", data);

      if (data && data.accountId && data.email) {
        loggedInUser = data;
        emailInput.value = loggedInUser.email;
      } else {
        console.warn("User info missing accountId or email:", data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  await fetchUserInfo();

  // ✅ Copy Billing Address to Shipping Address when Checkbox is Checked
  sameAddressCheckbox.addEventListener("change", () => {
    const isChecked = sameAddressCheckbox.checked;
    shippingAddressContainer.style.display = isChecked ? "none" : "block";
    if (isChecked) {
      document.getElementById("shipping-address").value = document.getElementById("address").value;
      document.getElementById("shipping-city").value = document.getElementById("city").value;
      // Copy the state/country value AS IS. The pattern attribute will validate on submit.
      document.getElementById("shipping-state").value = document.getElementById("state").value;
      document.getElementById("shipping-postal-code").value = document.getElementById("postal-code").value;
      document.getElementById("shipping-country").value = document.getElementById("country").value;
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission initially

    // The browser's built-in validation for 'required' and 'pattern' will
    // automatically prevent submission if fields are invalid.
    // We just need to check if the form is valid before proceeding with AJAX.
    if (!form.checkValidity()) {
        paymentStatus.textContent = "Please fill out all required fields and correct any errors.";
        paymentStatus.classList.add("error"); // Use a general error style
        // submitButton.disabled = false; // No need to re-enable, as it was never disabled if invalid
        form.reportValidity(); // Show native browser validation messages
        return;
    }

    // --- Show loading state BEFORE any processing starts ---
    showLoading();

    if (!loggedInUser || !loggedInUser.accountId) {
      alert("User not logged in! Please log in before checkout.");
      hideLoading(); // Hide loading if this initial check fails
      return;
    }

    const name = document.getElementById("name").value;
    const email = emailInput.value;
    const phone = document.getElementById("phone").value;
    const address = {
      line1: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value, // Will be 2-letter uppercase due to pattern
      postal_code: document.getElementById("postal-code").value,
      country: document.getElementById("country").value // Will be 2-letter uppercase due to pattern
    };

    let shippingAddress;
    if (sameAddressCheckbox.checked) {
        shippingAddress = { // Use the values directly from the billing fields
            line1: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            postal_code: document.getElementById("postal-code").value,
            country: document.getElementById("country").value
        };
    } else {
        shippingAddress = {
            line1: document.getElementById("shipping-address").value,
            city: document.getElementById("shipping-city").value,
            state: document.getElementById("shipping-state").value, // Will be 2-letter uppercase due to pattern
            postal_code: document.getElementById("shipping-postal-code").value,
            country: document.getElementById("shipping-country").value // Will be 2-letter uppercase due to pattern
        };
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalInCents = total * 100;

    const checkoutData = {
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      accountId: loggedInUser.accountId,
      orderDate: new Date().toISOString(),
      customer: {
        name,
        email,
        phone,
        address
        },
      shippingAddress,
      cartItems,
      totalAmount: total
    };

    const ref = localStorage.getItem("affiliateRef");
    if (ref) checkoutData.affiliateRef = ref;

    console.log("Sending checkout data:", checkoutData);


    // Fetch products.json (has sku → variant_id mapping)
    const productMetaRes = await fetch("/products.json");
    const productMeta = await productMetaRes.json(); // This is your server-side file

    // Build SKU to variant_id map
    const skuToVariantId = {};
    for (const p of productMeta) {
      const variants = p.sync_variants || [];
      for (const variant of variants) {
        skuToVariantId[variant.sku] = variant.variant_id;
      }
    }

    // Log for debug
    console.log("Cart items:", cartItems);
    console.log("SKU → Variant ID map:", skuToVariantId);

    // Fetch live variant stock & region info
    // Ensure this URL fetches data relevant to ALL your potential products
    // You might need a more dynamic way to generate this ID list
    const productResponse = await fetch("http://localhost:3000/product/403,19,678,474,585,382,637");
    if (!productResponse.ok) {
      alert("Failed to fetch product data for shipping check.");
      hideLoading(); // Hide loading if this fails
      return;
    }
    const productDataArray = await productResponse.json();
    console.log("Fetched product data:", productDataArray);

    const destinationRegion = shippingAddress.country.toUpperCase(); // Already 2-letter uppercase due to pattern
    console.log("Destination region:", destinationRegion);

    // Flatten all variants from product API
    const allVariants = productDataArray.flatMap(p => (p.data?.result?.variants || []));
    console.log("All variants fetched:", allVariants);

    // Validate availability
    const unavailableItems = [];

    for (const item of cartItems) {
      console.log(`Checking item: ${item.name} (SKU: ${item.sku})`);

      const variantId = skuToVariantId[item.sku];
      console.log(`Mapped SKU to variant ID: ${variantId}`);

      if (!variantId) {
        console.warn(`SKU not found in products.json: ${item.sku}`);
        unavailableItems.push(`${item.name} (Unknown variant)`);
        continue;
      }

      const matchingVariant = allVariants.find(v => Number(v.id) === Number(variantId));

      if (!matchingVariant) {
        console.warn(`No matching variant found in API for ID ${variantId} (sku: ${item.sku})`);
        unavailableItems.push(`${item.name} (Variant not found)`);
        continue;
      }

      console.log(`Matching variant found: ${matchingVariant.name}`);

      const statusEntry = Array.isArray(matchingVariant.availability_status)
        ? matchingVariant.availability_status.find(s => s.region.toUpperCase() === destinationRegion)
        : null;

      const acceptableStatuses = ["in_stock", "stocked_on_demand"];
      const isInStock = statusEntry && acceptableStatuses.includes(statusEntry.status);

      console.log(`Availability status for region ${destinationRegion}: ${isInStock ? 'In stock' : 'Not in stock'}`);

      if (!isInStock) {
        unavailableItems.push(`${item.name} (Unavailable in ${destinationRegion})`);
      }
    }

    if (unavailableItems.length > 0) {
      alert(`The following items cannot be shipped to your region (${destinationRegion}):\n\n${unavailableItems.join("\n")}`);
      hideLoading(); // Hide loading if items are unavailable
      return;
    }


    try {
      const response = await fetch("https://backend-github-io.vercel.app/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalInCents,
          email: email,
          phone: phone,
          name: name,
          address: address, // This address object now has 2-letter state/country
          shippingAddress: shippingAddress, // This address object now has 2-letter state/country
          cartItems: cartItems
        })
      });

      if (!response.ok) throw new Error("Failed to create payment intent");

      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: { name: name, email: email, phone: phone, address: address }
        }
      });

      if (result.error) {
        paymentStatus.textContent = `Error: ${result.error.message}`;
        paymentStatus.classList.add("error");
        hideLoading(); // Hide loading on Stripe error
      } else if (result.paymentIntent.status === "succeeded") {
        paymentStatus.textContent = `Payment successful! Your Order ID is: ${checkoutData.orderId}`;
        paymentStatus.classList.add("success");


        await fetch("http://localhost:3000/save-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutData)
        });

        localStorage.setItem("orderId", checkoutData.orderId);
        localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
        localStorage.removeItem("cartItems");

        // No need to hide loading here, as we're redirecting
        window.location.href = `/thank-you/?orderId=${checkoutData.orderId}`;
      }
    } catch (error) {
      paymentStatus.textContent = `Error: ${error.message}`;
      paymentStatus.classList.add("error");
      hideLoading(); // Hide loading on any other error
    }
  });
});

</script>