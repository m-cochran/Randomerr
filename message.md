---
layout: default
title: "Message"
date: 2024-08-19
permalink: /message/
---

<title>Post Details</title>
<style>
  #message-modal,
  #message-thread {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  #messages {
    list-style: none;
    padding: 0;
  }

  #messages li {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
</style>
</head>

<body>
  <div id="post-details" data-poster-id="2">
    <h2>Post Title</h2>
    <p>Post Description</p>
    <button id="contact-seller-btn">Enroll/Access to Contact</button>
  </div>

  <div id="message-modal" style="display: none;">
    <textarea id="message-input" placeholder="Type your message..."></textarea>
    <button id="send-message-btn">Send</button>
    <button id="close-modal-btn">Close</button>
  </div>

  <div id="message-thread" style="display: none;">
    <ul id="messages"></ul>
    <button id="close-thread-btn">Close</button>
  </div>

  <script>
const contactSellerBtn = document.getElementById('contact-seller-btn');
const messageModal = document.getElementById('message-modal');
const sendMessageBtn = document.getElementById('send-message-btn');
const messageInput = document.getElementById('message-input');
const closeModalBtn = document.getElementById('close-modal-btn');
const messageThreadModal = document.getElementById('message-thread');
const closeThreadBtn = document.getElementById('close-thread-btn');
const messagesList = document.getElementById('messages');

let accountId = null; // Store accountId
let loggedInUserData = null; // store logged in user data.

function getPostId() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('postId'));
}

function getPosterId() {
    return parseInt(document.getElementById('post-details').dataset.posterId);
}

function fetchMessageThread() {
    const postId = getPostId();

    if (!postId || !accountId) {
        return;
    }

    fetch(`/api/messages/${postId}/${accountId}`)
        .then(response => response.json())
        .then(messages => {
            messagesList.innerHTML = '';
            messages.forEach(message => {
                const listItem = document.createElement('li');
                listItem.textContent = `${message.senderId === accountId ? 'You' : 'Seller'}: ${message.messageText}`;
                messagesList.appendChild(listItem);
            });
            messageThreadModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
            alert('Failed to fetch messages.');
        });
}

sendMessageBtn.addEventListener('click', () => {
    const messageText = messageInput.value;
    const postId = getPostId();
    const receiverId = getPosterId();

    if (!accountId || !postId || !receiverId) {
        alert("Missing necessary data.");
        return;
    }

    fetch('/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            senderId: accountId,
            receiverId: receiverId,
            postId: postId,
            messageText: messageText,
        }),
    })
    .then(response => {
        if (response.ok) {
            messageInput.value = '';
            messageModal.style.display = 'none';
            fetchMessageThread();
        } else {
            console.error('Error sending message:', response.statusText);
            alert('Failed to send message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        alert('An error occurred. Please try again.');
    });
});

closeModalBtn.addEventListener('click', () => {
    messageModal.style.display = 'none';
});

closeThreadBtn.addEventListener('click', () => {
    messageThreadModal.style.display = 'none';
})

async function checkAuthStatus() {
    try {
        const response = await fetch("http://localhost:3000/check-auth", {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();
        loggedInUserData = data; // Store the data

        if (data.loggedIn) {
            accountId = data.user.accountId;
            document.getElementById("accountIdDisplay").textContent = accountId;

            contactSellerBtn.textContent = "Contact Seller";
            contactSellerBtn.addEventListener('click', () => {
                messageModal.style.display = 'block';
            });

            fetchMessageThread(); // Load messages if logged in

        } else {
            contactSellerBtn.textContent = "Click Enroll/Access to Post";
            contactSellerBtn.onclick = () => alert("You must be logged in to contact the seller.");
        }
    } catch (error) {
        console.error("Error checking auth status:", error);
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    await checkAuthStatus(); // Check login status on page load
});
  </script>
</body>

</html>