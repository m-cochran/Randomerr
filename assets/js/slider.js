document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");
  const slides = document.querySelectorAll(".slide");

  // Set the desired speed (in pixels per second)
  const speed = 100; // Adjust speed as needed (e.g., 50 pixels per second)

  // Get the width of a single slide
  const slideWidth = slides[0].clientWidth; // Width of each slide
  const totalSlides = slides.length; // Total number of slides

  // Duplicate slides for seamless scrolling
  for (let i = 0; i < totalSlides; i++) {
    const clone = slides[i].cloneNode(true);
    slider.appendChild(clone);
  }

  // Calculate the total width of the slide track
  const totalWidth = slideWidth * (totalSlides * 2); // Total width for both original and cloned slides

  // Calculate the duration (total width / speed)
  const duration = totalWidth / speed; // In seconds

  // Set the animation duration dynamically
  slider.style.animation = `scroll ${duration}s linear infinite`;

  // Pause animation on hover
  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});
