---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/contact-page.css">

<div class="form-contactcontainer">
  <h2>Get in Touch</h2>
  <p class="form-contactdescription">We'd love to hear from you! Fill out the form below, and we'll get back to you shortly.</p>

<form id="contact-form" action="http://localhost:3000/submit-contact-form" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" placeholder="Your Name" required autocomplete="name">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" placeholder="Your Email" required autocomplete="email">

  <label for="message">Message:</label>
  <textarea id="message" name="message" placeholder="Your Message" required></textarea>

  <label>
    I agree to the collection of my email address for contact purposes.
    <input type="checkbox" id="agree" required>
  </label>

  <button id="contactSendBtn" class="contact-button" type="submit">Send Message</button>
</form>

  <div id="success-message" style="display: none; text-align: center;">
    <h3>Thank You!</h3>
    <p>Your message has been received. We'll get back to you as soon as possible. In the meantime, feel free to explore more on our website or follow us on social media!</p>
    <p style="font-size: 14px; color: #666; margin-bottom: 10px;">
      Follow us on social media:
    </p>
    <div style="margin-top: 10px;">
      <a href="https://www.facebook.com/profile.php?id=100074631399155" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" style="width: 24px; height: 24px; border: none;">
      </a>
      <a href="https://x.com/MyCupOfEarth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Twitter_X.png" alt="Twitter Logo" style="width: 24px; height: 24px; border: none;">
      </a>
      <a href="https://www.instagram.com/mycupofearth/" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram Logo" style="width: 24px; height: 24px; border: none;">
      </a>
      <a href="https://www.tiktok.com/@mycupofearth" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ionicons_logo-tiktok.svg/512px-Ionicons_logo-tiktok.svg.png?20230423144016" alt="TikTok Logo" style="width: 24px; height: 24px; border: none;">
      </a>
      <a href="https://www.youtube.com/@MYCUPOFEARTH" style="margin-right: 10px; text-decoration: none;" target="_blank" rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/512px-YouTube_social_white_squircle.svg.png?20200112151940" alt="YouTube Logo" style="width: 24px; height: 24px; border: none;">
      </a>
    </div>
  </div>
</div>

<div class="google-map-container">
  <h3>Our Location</h3>
  <iframe id="google-map" class="google-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&language=en&zoom=16&q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" allowfullscreen="" title="Location on map"></iframe>
</div>

<script>
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission (browser navigating away)

    // Check if the agreement checkbox is checked
    const agreementCheckbox = document.getElementById('agree');
    if (!agreementCheckbox.checked) {
      alert("Please agree to the email collection terms.");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to a plain JavaScript object
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Send the data as JSON to your backend endpoint
    fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Tell the server we're sending JSON
      },
      body: JSON.stringify(data) // Convert the JavaScript object to a JSON string
    })
    .then(response => {
      // Check if the response status is okay (200-299 range)
      if (response.ok) {
        return response.json(); // Parse the JSON response from your backend
      } else {
        // If the response is not OK, try to parse error details
        return response.json().then(errorData => {
            throw new Error(errorData.error || 'Failed to submit form.');
        });
      }
    })
    .then(data => {
      // If the submission was successful (response.ok and parsed JSON)
      console.log('Success:', data.message);
      // Hide the form and show the success message
      form.style.display = 'none';
      const formDescription = document.querySelector('.form-contactdescription');
      formDescription.style.display = 'none';
      document.getElementById('success-message').style.display = 'block';
    })
    .catch((error) => {
      // Catch any errors during the fetch operation or from the backend's error response
      console.error('Error submitting form:', error.message);
      alert(`There was an error sending your message: ${error.message}. Please try again later.`);
    });
  });
</script>