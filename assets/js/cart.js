// Function to update the checkout page with cart items
function updateCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  let cartItemsHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    cartItemsHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>${item.name}</div>
        <div>Quantity: ${item.quantity}</div>
        <div>Price: $${item.price.toFixed(2)}</div>
      </div>
    `;
    total += item.price * item.quantity;
  });

  cartItemsContainer.innerHTML = cartItemsHTML;
  cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}
