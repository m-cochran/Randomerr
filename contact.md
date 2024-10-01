---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us


<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/contact-page.css">

<main>

  <div class="form-container">
    <h2>Get in Touch</h2>
    <p class="form-description">We'd love to hear from you! Fill out the form below, and we'll get back to you shortly.</p>

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

      <!-- Agreement Checkbox -->
      <label>
        I agree to the collection of my email address for contact purposes.
        <input type="checkbox" id="agree" required>
      </label>

      <!-- Submit Button -->
      <button type="submit">Submit</button>
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
    <iframe id="google-map" class="google-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" allowfullscreen="" title="Location on map"></iframe>
  </div>



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

    /* Submit Button */
    button {
      background-color: #06f; /* Green background */
      color: white; /* White text */
      border: none; /* No border */
      padding: 10px 20px; /* Padding */
      font-size: 1rem; /* Font size */
      cursor: pointer; /* Pointer cursor on hover */
      border-radius: 5px; /* Rounded corners */
    }

    button:hover {
      background-color: #07f; /* Darker green on hover */
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

  <script>
    document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();  // Prevent default form submission

      // Check if the agreement checkbox is checked
      const agreementCheckbox = document.getElementById('agree');
      if (!agreementCheckbox.checked) {
        alert("Please agree to the email collection terms.");
        return;
      }

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
