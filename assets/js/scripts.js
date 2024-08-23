document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Select the toggle button and the navigation menu
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  // Define the toggleMenu function
  function toggleMenu() {
    navMenu.classList.toggle('nav-open');
  }

  // Add click event listener to the toggle button
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }
});
