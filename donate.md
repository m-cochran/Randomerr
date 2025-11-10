---
layout: default
title: Donate
permalink: /donate/
---

# Donate

<style>
  /* Basic styling for the donate page content */
  .donate-container {
    background-color: #f9f9f9;
    border-radius: 8px;
    text-align: center;
    color: #333;
    padding: 20px; /* Add some padding to the container */
  }

  .donate-container h1 {
    color: #0066ff;
    font-family: 'Arial', sans-serif;
    font-size: 2rem;
    text-align: center;
  }

  .donate-container p {
    font-size: 1.2em;
    text-align: center;
    color: #666;
    margin-bottom: 20px;
  }

  .donate-options {
    display: flex;
    flex-wrap: wrap; /* Allow items to wrap on smaller screens */
    justify-content: center;
    gap: 25px; /* Space between donation options */
    margin-top: 30px;
  }

  /* The .donate-option-card-link class is important for the clickable area */
  .donate-option-card-link {
    display: block; /* Make the anchor tag a block to fill the div */
    text-decoration: none; /* Remove underline from the link */
    color: inherit; /* Inherit text color from parent */
    width: 280px; /* Fixed width for cards */
  }

  .donate-option-card {
    border: 1px solid #eee;
    border-radius: 8px;
    height: 280px; /* Fixed height for cards */
    text-align: center;
    display: flex;
    flex-direction: column; /* Arrange content in a column */
    justify-content: flex-end; /* Push content (button) to the bottom */
    align-items: center; /* Center items horizontally */
    overflow: hidden; /* Hide anything that overflows the card */
    position: relative; /* Needed for absolute positioning of image */
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */
  }

  .donate-option-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .donate-option-card img {
    position: absolute; /* Position image absolutely */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Make the image cover the entire card */
    z-index: 1; /* Place image behind the button */
    border-radius: 8px; /* Apply border-radius to the image */
  }

  /* Styling for the buttons */
  .donate-button {
  display: block; /* Make the button take up full width */
  width: 100%; /* 100% width minus 15px padding on each side */
  color: white;
  padding: 12px 15px; /* Adjust horizontal padding to create space from card edges */
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  border: none;
  cursor: pointer;
  z-index: 2; /* Place button above the image */
  margin-bottom: 0px; /* Add some space from the bottom of the card */
  text-align: center; /* Ensure text inside the button is centered */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

/* You might want to adjust the margin-bottom of the button for better visual spacing if needed */
/* For example, if you want it closer to the bottom edge: */
/* .donate-button {
  margin-bottom: 0;
  padding-bottom: 12px;
  padding-top: 12px;
} */
  /* Specific button colors */
  .donate-button.red {
    background-color: #FF0000;
  }

  .donate-button.yellow {
    background-color: #ea8302; /* Adjusted yellow for better contrast with white text */
    color: #fff; /* Darker text for better readability on yellow */
  }

  .donate-button.blue {
    background-color: #0066ff;
  }
</style>

<div class="donate-container">
  <h1>Support Our Mission</h1>
  <p>
    Your generous contributions help us continue our work, expand our reach, and provide valuable resources to our community. Every little bit makes a difference! Thank you for considering a donation.
  </p>

  <div class="donate-options">
    <a href="https://americanredcross.donordrive.com/index.cfm?fuseaction=donorDrive.personalCampaign&participantID=2596" class="donate-option-card-link" target="_blank" rel="noopener noreferrer">
      <div class="donate-option-card">
        <img src="/assets/images/redcross.svg" alt="American Red Cross">
        <span class="donate-button red">Provide</span>
      </div>
    </a>

    <a href="https://teamfeed.feedingamerica.org/index.cfm?fuseaction=donorDrive.participant&participantID=8905" class="donate-option-card-link" target="_blank" rel="noopener noreferrer">
      <div class="donate-option-card">
        <img src="/assets/images/feed.svg" alt="Feeding America">
        <span class="donate-button yellow">Support</span>
      </div>
    </a>

    <a href="https://www.bgca.org/get-involved/find-a-club/?form=donate" class="donate-option-card-link" target="_blank" rel="noopener noreferrer">
      <div class="donate-option-card">
        <img src="/assets/images/bngc.svg" alt="Boys & Girls Clubs of America">
        <span class="donate-button blue">Give</span>
      </div>
    </a>

    <a href="https://sharedhope.org/donate/" class="donate-option-card-link" target="_blank" rel="noopener noreferrer">
      <div class="donate-option-card">
        <img src="/assets/images/sh.svg" alt="Shared Hope International">
        <span class="donate-button red">Donate</span>
      </div>
    </a>
  
  <a href="https://www.paypal.com/donate/?hosted_button_id=FGZPTQLNCPTP2" target="_blank" rel="noopener noreferrer" class="donate-option-card-link">
    <div class="donate-option-card">
      <img src="/assets/images/logo-donate.svg" alt="MY CUP OF EARTH">
      <span class="donate-button blue">Sponsor</span>
    </div>
  </a>
</div>

  <p style="margin-top: 50px; font-size: 0.9em; color: #777;">
    All donations are greatly appreciated and contribute directly to our efforts.
  </p>
</div>