// cart.js

// Initialize cart from local storage
const loadCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Save cart to local storage
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Add item to cart
const addToCart = (product) => {
  const cart = loadCart();
  cart.push(product);
  saveCart(cart);
  updateCartUI();
};

// Remove item from cart
const removeFromCart = (index) => {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartUI();
};

// Update cart UI
const updateCartUI = () => {
  const cartList = document.getElementById('cart-list');
  const cart = loadCart();
  
  cartList.innerHTML = ''; // Clear existing items

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartList.appendChild(itemDiv);
  });
};

// Initialize cart UI on page load
window.onload = () => {
  updateCartUI();
};
