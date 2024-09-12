---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us

<div class="contact-container">
  <h2>Get in Touch</h2>
  
  <form id="contactForm" method="POST" action="send_email.php">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
    </div>

    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" required></textarea>
    </div>

    <button type="submit">Send</button>
  </form>
</div>

<div class="google-map-container">
  <h3>Our Location</h3>
  <iframe 
    id="google-map" 
    class="google-map" 
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" 
    allowfullscreen 
    title="Location on map"
  ></iframe>
</div>

<div class="contact-email">
  <p>If you have any questions, feel free to email us at <a href="mailto:contact@randomerr.com">contact@randomerr.com</a>.</p>
</div>
