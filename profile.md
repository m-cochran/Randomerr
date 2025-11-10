---
layout: default
title: Profile
permalink: /profile/
---

# Profile

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/profile.css">

<div class="profile-container">
  <h2>Your Profile</h2>
  <div class="profile">
    <img id="profilePicture" src="{{ site.baseurl }}/assets/images/logo.svg" alt="Profile Picture" class="profile-picture" />
    <h1 id="profileName">Name</h1>
    <p id="profileEmail">Email</p>
  </div>

  <p class="profile-description">
    Welcome to your profile page. Here you can manage your account, view recent purchases, listings, and messages.
  </p>

  <div id="ordersContainer" class="orders-container">
    <h2>Recent Orders</h2>
    <div id="ordersToggleBar" class="orders-toggle-bar">Show Orders ▼</div>
<div id="ordersList" class="orders-list" style="display: none;"></div>


  <div id="userEventsContainer" class="orders-container">
    <h2>Your Events</h2>
    <div id="eventsToggleBar" class="orders-toggle-bar">Show Events ▼</div>
<div id="userEventsList" class="orders-list" style="display: none;"></div>

  </div>
</div>

<style>
/* Moved inline styles here for clarity */
.orders-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.orders-list {
  max-height: 400px;
  overflow-y: auto;
  background: #f9f9f9;
  border-radius: 5px;
}
.order-item {
  background: #fff;
  margin-bottom: 10px;
}
.order-header {
  background: #06f;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.order-header:hover { background: #07f; }
.order-details {
  display: none;
  padding: 10px;
  background: #f7f7f7;
  border-top: 1px solid #ddd;
  font-size: 14px;
}
.orders-toggle-bar {
  text-align: center;
  padding: 10px;
  background: #eee;
  border-top: 1px solid #ccc;
  cursor: pointer;
  font-weight: bold;
}
.orders-toggle-bar:hover { background: #ddd; }
.event-btn {
  border: none;
  padding: 6px 12px;
  background: #06f;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}
.event-btn:hover { background: #0055cc; }
.event-btn.delete { background: #e00; }
.event-btn.delete:hover { background: #c00; }
</style>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const ordersList = document.getElementById("ordersList");
  const eventsList = document.getElementById("userEventsList");
  const ordersToggleBar = document.getElementById("ordersToggleBar");
  const eventsToggleBar = document.getElementById("eventsToggleBar");

  // Toggle handlers
  ordersToggleBar.onclick = () => {
    const isVisible = ordersList.style.display !== "none";
    ordersList.style.display = isVisible ? "none" : "block";
    ordersToggleBar.textContent = isVisible ? "Show Orders ▼" : "Hide Orders ▲";
  };

  eventsToggleBar.onclick = () => {
    const isVisible = eventsList.style.display !== "none";
    eventsList.style.display = isVisible ? "none" : "block";
    eventsToggleBar.textContent = isVisible ? "Show Events ▼" : "Hide Events ▲";
  };

  try {
  const authRes = await fetch("http://localhost:3000/check-auth", { method: "GET", credentials: "include" });
  if (!authRes.ok) throw new Error("Auth failed");
  const authData = await authRes.json();

  if (!authData.loggedIn || !authData.user) throw new Error("Not logged in");

  const { email, accountId, name, picture } = authData.user;

  // 👇 Update profile DOM
  if (name) {
    document.getElementById("profileName").textContent = name;
  }
  if (email) {
    document.getElementById("profileEmail").textContent = email;
  }
  if (picture) {
    document.getElementById("profilePicture").src = picture;
  }

  if (email) {
    await loadOrders(email.trim().toLowerCase());
  }
  if (accountId) {
    await loadEvents(accountId);
  }
} catch (err) {
  console.error("Auth or loading error:", err);
  ordersList.innerHTML = `<p>Please log in to view your orders.</p>`;
  eventsList.innerHTML = `<p>Please log in to view your events.</p>`;
}


  async function loadOrders(email) {
  try {
    const BACKEND_URL = "http://localhost:3000"; // or your actual backend port
    const res = await fetch(`${BACKEND_URL}/api/orders?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error("Failed to load orders");
    const orders = await res.json();

    if (orders.length === 0) {
      ordersList.innerHTML = `<p>No orders found for ${email}.</p>`;
      return;
    }

    ordersList.innerHTML = "";

    orders.forEach((order, i) => {
      const item = document.createElement("div");
      item.className = "order-item";
      item.innerHTML = `
        <div class="order-header" onclick="toggleOrderDetails(${i})" style="cursor:pointer;">
          <span>Order ID: ${order.orderId}</span>
          <span class="toggle-icon">+</span>
        </div>
        <div class="order-details" id="orderDetails-${i}" style="display:none;">
          <p><strong>Account Id:</strong> ${order.accountId}</p>
          <p><strong>Name:</strong> ${order.customer.name}</p>
          <p><strong>Email:</strong> ${order.customer.email}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>
          <p><strong>Order Date:</strong> ${new Date(Number(order.orderId.split("-")[1])).toLocaleString()}</p>
          <p><strong>Total:</strong> $${order.totalAmount}</p>
          <h4>Tracking Numbers:</h4>
          ${
            order.tracking_numbers?.length
              ? `<ul>${order.tracking_numbers.map((tn, j) => {
                  const url = order.tracking_urls?.[j] || "";
                  return `<li>${url ? `<a href="${url}" target="_blank">${tn}</a>` : tn}</li>`;
                }).join("")}</ul>`
              : "<p>Tracking not yet available.</p>"
          }
          <h4>Shipping Address:</h4>
          <p>${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postal_code}, ${order.shippingAddress.country}</p>
          <h4>Billing Address:</h4>
          <p>${order.customer.address.line1}, ${order.customer.address.city}, ${order.customer.address.state}, ${order.customer.address.postal_code}, ${order.customer.address.country}</p>
          <h4>Cart Items:</h4>
          <ul>${order.cartItems.map(ci => `
            <li><img src="${ci.image}" style="width:50px;height:50px;"/> ${ci.name} (x${ci.quantity}) - $${ci.price}</li>
          `).join("")}</ul>
        </div>
      `;
      ordersList.appendChild(item);
    });
  } catch (err) {
    console.error("Order load error:", err);
    ordersList.innerHTML = `<p>Failed to load orders. Try again later.</p>`;
  }
}


  async function loadEvents(accountId) {
    try {
      const res = await fetch("/data/categories.json");
      if (!res.ok) throw new Error("Failed to load events");
      const data = await res.json();
      const userEvents = [];

      (function collect(obj) {
        if (Array.isArray(obj)) {
          obj.forEach(e => { if (e.accountId === accountId) userEvents.push(e); });
        } else if (typeof obj === "object") {
          for (const key in obj) collect(obj[key]);
        }
      })(data);

      if (userEvents.length === 0) {
        eventsList.innerHTML = `<p>No events found for your account.</p>`;
        return;
      }

      eventsList.innerHTML = "";
      userEvents.forEach((event, i) => {
        const item = document.createElement("div");
        item.className = "order-item";
        item.innerHTML = `
          <div class="order-header" onclick="toggleEventDetails(${i})">
            <span>${event.title}</span>
            <span class="toggle-icon">+</span>
          </div>
          <div class="order-details" id="eventDetails-${i}">
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Price:</strong> $${event.price}</p>
            <p><strong>Description:</strong> ${event.description.slice(0, 200)}...</p>
            <div style="margin-top:10px;">${event.images.map(img => `<img src="${img}" style="width:60px;height:60px;margin-right:5px;" />`).join("")}</div>
            <div class="event-actions" style="margin-top: 10px;">
              <a href="http://localhost:4000/event-details.html?id=${event.id}" class="event-btn">Edit/View</a>
              <button onclick="deleteEvent('${event.id}', this)" class="event-btn delete">Delete</button>
            </div>
          </div>`;
        eventsList.appendChild(item);
      });
    } catch (err) {
      console.error("Event load error:", err);
      eventsList.innerHTML = `<p>Failed to load events. Try again later.</p>`;
    }
  }
});

// Toggles
function toggleOrderDetails(index) {
  const details = document.getElementById(`orderDetails-${index}`);
  if (!details) return;
  const isHidden = details.style.display === "none" || details.style.display === "";
  details.style.display = isHidden ? "block" : "none";

  const header = details.previousElementSibling;
  const icon = header.querySelector(".toggle-icon");
  if (icon) icon.textContent = isHidden ? "−" : "+";
}


function toggleEventDetails(i) {
  const details = document.getElementById(`eventDetails-${i}`);
  const icon = details.previousElementSibling.querySelector(".toggle-icon");
  const show = details.style.display !== "block";
  details.style.display = show ? "block" : "none";
  icon.textContent = show ? "-" : "+";
}



  async function deleteEvent(eventId, buttonElement) {
    const firstConfirm = confirm("Are you sure you want to delete this event?");
    if (!firstConfirm) return;

    const secondConfirm = confirm("This action is permanent. Delete the event?");
    if (!secondConfirm) return;

    try {
      const response = await fetch(`http://localhost:3000/delete-event/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Remove the event item from DOM
      const eventItem = buttonElement.closest(".order-item");
      if (eventItem) {
        eventItem.remove();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Error deleting event. Please try again.");
    }
  }
</script>
