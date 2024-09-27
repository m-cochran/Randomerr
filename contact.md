---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us

<main>

  <div class="form-container">
    <h2>Get in Touch</h2>
    <p class="form-description">We'd love to hear from you! Fill out the form below, and we'll get back to you shortly.</p>

    <!-- Custom Contact Form -->
    <form id="contact-form" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScjRTlq41Ca-Tizns-XS5b8ZffB26ux1gd63zPCvcY1J-7a9Q/formResponse" method="POST" target="_self">
      
      <!-- Name Field -->
      <label for="name">Name:</label>
      <input type="text" id="name" name="entry.2005620554" placeholder="Your Name" required>
      
      <!-- Email Field -->
      <label for="email">Email:</label>
      <input type="email" id="email" name="entry.1045781291" placeholder="Your Email" required>
      
      <!-- Message Field -->
      <label for="message">Message:</label>
      <textarea id="message" name="entry.839337160" placeholder="Your Message" required></textarea>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
    </form>

    <!-- Success Message -->
    <div id="success-message" style="display:none;">
      <p>Thanks for submitting your contact info!</p>
    </div>
  </div>

  <div class="google-map-container">
    <h3>Our Location</h3>
    <iframe id="google-map" class="google-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" allowfullscreen="" title="Location on map"></iframe>
  </div>

  <div class="contact-email">
    <p>If you have any questions, feel free to email us at <a href="mailto:contact@randomerr.com">contact@randomerr.com</a>.</p>
  </div>

  <!-- CSS Styling -->
  <style>
    /* Container for the form */
    .form-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Form heading */
    .form-container h2 {
      font-family: 'Arial', sans-serif;
      font-size: 2rem;
      color: #333;
      text-align: center;
      margin-bottom: 10px;
    }

    /* Description text */
    .form-description {
      font-size: 1.2rem;
      color: #666;
      text-align: center;
      margin-bottom: 20px;
    }

    /* Input fields and textarea styling */
    #contact-form label {
      display: block;
      font-size: 1rem;
      margin-bottom: 5px;
      color: #333;
    }

    #contact-form input, #contact-form textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    #contact-form button {
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    #contact-form button:hover {
      background-color: #218838;
    }

    #success-message {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #d4edda;
      color: #155724;
      text-align: center;
    }

    /* Styling for the map */
    .google-map-container {
      margin-top: 20px;
    }

    .google-map {
      width: 100%;
      height: 400px;
      border: none;
      border-radius: 10px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .form-container {
        padding: 15px;
      }

      .form-container h2 {
        font-size: 1.5rem;
      }

      .form-description {
        font-size: 1rem;
      }
    }
  </style>

  <!-- JavaScript for handling form submission -->
  <script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();  // Prevent default form submission

      // Prepare form data for submission
      const form = e.target;
      const formData = new FormData(form);

      // Submit form data to Google Forms
      fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'  // Avoid CORS issues
      }).then(() => {
        // Hide the form and show the success message
        form.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
      }).catch((error) => {
        console.error('Error!', error.message);
      });
    });
  </script>
</main>
