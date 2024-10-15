document.addEventListener("DOMContentLoaded", function () {
  // Add a small delay to ensure styles are loaded
  setTimeout(initAutoNav, 200); // Slightly increased delay
  window.dispatchEvent(new Event('resize')); // Force a resize event after page load
});

function initAutoNav() {
  const mainNav = document.getElementById("autoNav");
  const moreNav = document.getElementById("autoNavMoreList");
  const moreButton = document.getElementById("autoNavMore");

  if (!mainNav || !moreNav || !moreButton) return;

  const donateItem = document.createElement("li");
  donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
  moreNav.appendChild(donateItem);

  const items = Array.from(mainNav.children).slice(0, -1);

  // Throttle function for performance
  function throttle(func, limit) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, limit);
    };
  }

  // Get window width for responsiveness
  function getAdjustedWindowWidth() {
    return window.innerWidth;
  }

  // Manage the menu items based on window width
  function manageMenuItems() {
    requestAnimationFrame(() => {
      const adjustedWindowWidth = getAdjustedWindowWidth();

      // Clear More dropdown, keep Donate
      while (moreNav.children.length > 1) {
        moreNav.removeChild(moreNav.lastChild);
      }

      // Reset mainNav
      items.forEach((item) => {
        if (!isInMore(item)) {
          mainNav.appendChild(item);
        }
      });

      const breakpoints = [
        250, // Smartphone portrait
        350, // Smartphone landscape
        450, // Tablet portrait
        550, // Tablet landscape
        650  // Desktop
      ];

      // Move menu items based on breakpoints
      if (adjustedWindowWidth <= breakpoints[0]) {
        items.forEach(moveToMore);
      } else if (adjustedWindowWidth <= breakpoints[1]) {
        moveToMore(items[items.length - 1]);
        moveToMore(items[items.length - 2]);
        moveToMore(items[items.length - 3]);
        moveToMore(items[items.length - 4]);
        moveToMore(items[items.length - 5]);
      } else if (adjustedWindowWidth <= breakpoints[2]) {
        moveToMore(items[items.length - 1]);
        moveToMore(items[items.length - 2]);
        moveToMore(items[items.length - 3]);
        moveToMore(items[items.length - 4]);
      } else if (adjustedWindowWidth <= breakpoints[3]) {
        moveToMore(items[items.length - 1]);
        moveToMore(items[items.length - 2]);
        moveToMore(items[items.length - 3]);
      } else if (adjustedWindowWidth <= breakpoints[4]) {
        moveToMore(items[items.length - 1]);
        moveToMore(items[items.length - 2]);
      } else if (adjustedWindowWidth <= breakpoints[5]) {
        moveToMore(items[items.length - 1]);
      }

      // Ensure the More button is always the last child
      if (mainNav.lastChild !== moreButton) {
        mainNav.appendChild(moreButton);
      }
    });
  }

  // Move item to 'More' dropdown
  function moveToMore(item) {
    if (!isInMore(item)) {
      moreNav.appendChild(item);
    }
  }

  // Check if item is already in 'More' dropdown
  function isInMore(item) {
    return Array.from(moreNav.children).some(
      (child) => child.innerHTML === item.innerHTML
    );
  }

  // Trigger the resize and menu recalculation
  function triggerResize() {
    requestAnimationFrame(manageMenuItems);
  }

  // Attach throttled resize event listener
  window.addEventListener("resize", throttle(manageMenuItems, 100));
  window.addEventListener("orientationchange", triggerResize);

  // Ensure calculation on page load
  setTimeout(function () {
    triggerResize();
  }, 500);

  // Trigger resize after fonts are loaded to ensure layout calculation is correct
  document.fonts.ready.then(function () {
    triggerResize(); // Ensure menu is correct once fonts are loaded
  });
}

















document.addEventListener("DOMContentLoaded", () => {
  const backgroundContainer = document.getElementById("backgroundContainer");
  const shapeOverlay = document.getElementById("shapeOverlay");
  const monthOverlay = document.getElementById("monthOverlay");

  const animalImages = [
    // January
    "1week.img",
    "2week.img",
    "3week.img",
    "4week.img",

    // February
    "5week.img",
    "6week.img",
    "7week.img",
    "8week.img",

    // March
    "9week.img",
    "10week.img",
    "11week.img",
    "12week.img",

    // April
    "13week.img",
    "14week.img",
    "15week.img",
    "16week.img",

    // May
    "17week.img",
    "18week.img",
    "19week.img",
    "20week.img",

    // June
    "21week.img",
    "22week.img",
    "23week.img",
    "24week.img",

    // July
    "25week.img",
    "26week.img",
    "27week.img",
    "28week.img",

    // August
    "29week.img",
    "30week.img",
    "31week.img",
    "32week.img",

    // September
    "33week.img",
    "34week.img",
    "35week.img",
    "36week.img",

    // October
    "37week.img",
    "https://m-cochran.github.io/Randomerr/assets/images/header-backgrounds/halloween-week38.webp",
    "https://images.pexels.com/photos/3095465/pexels-photo-3095465.png",
    "40week.img",

    // November
    "41week.img",
    "42week.img",
    "43week.img",
    "44week.img",

    // December
    "45week.img",
    "46week.img",
    "47week.img",
    "48week.img"
  ];

  let sampledColors = []

  function loadImageAndSampleColors(imageSrc) {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "Anonymous" // Handle cross-origin if needed
      img.src = imageSrc
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        sampledColors = []

        const samplesCount = 50 // Number of colors to sample
        for (let i = 0; i < samplesCount; i++) {
          const randomIndex = Math.floor(Math.random() * (data.length / 4))
          const r = data[randomIndex * 4]
          const g = data[randomIndex * 4 + 1]
          const b = data[randomIndex * 4 + 2]
          const color = `rgba(${r}, ${g}, ${b}, 0.6)` // Create color string with alpha
          sampledColors.push(color)
        }

        backgroundContainer.style.backgroundImage = `url(${imageSrc})`
        resolve()
      }
    })
  }

  function getCurrentMonthAndWeek() {
    const date = new Date()
    const month = date.getMonth()
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate()
    const currentDate = date.getDate()
    const week = Math.floor((currentDate - 1) / Math.ceil(daysInMonth / 4))
    return { month, week }
  }

  async function changeBackgroundImage() {
  // Get current month and week
  const { month, week } = getCurrentMonthAndWeek();
  
  // Calculate image index
  const imageIndex = month * 4 + week;

  // Ensure the index is within bounds of the animalImages array
  if (imageIndex >= 0 && imageIndex < animalImages.length) {
    const currentBackgroundImage = animalImages[imageIndex];
    
    // Set the background image
    backgroundContainer.style.backgroundImage = `url(${currentBackgroundImage})`;

    // Set month overlay
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    if (month >= 0 && month < monthNames.length) {
      monthOverlay.textContent = monthNames[month];
    } else {
      console.warn("Invalid month value:", month);
    }

    // Await image load and color sampling
    try {
      await loadImageAndSampleColors(currentBackgroundImage);
      // After colors are sampled, create new shapes with updated colors
      createShapes();
    } catch (error) {
      console.error("Error loading image or sampling colors:", error);
    }
  } else {
    console.warn("Image index out of bounds:", imageIndex);
  }
}


  changeBackgroundImage()
  setInterval(changeBackgroundImage, 1000 * 60 * 60 * 24 * 7) // Change weekly

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  shapeOverlay.appendChild(canvas)

  function updateCanvasSize() {
    canvas.width = shapeOverlay.clientWidth
    canvas.height = shapeOverlay.clientHeight
  }

  let shapes = []

  function createShapes() {
    shapes = []
    const shapeCount = 15 + Math.floor(Math.random() * 6)

    for (let i = 0; i < shapeCount; i++) {
      const size = Math.random() * 112 + 30
      const x = Math.random() * (canvas.width - size)
      const y = Math.random() * (canvas.height - size)
      const vx = (Math.random() - 0.5) * 0.7
      const vy = (Math.random() - 0.5) * 0.7
      const oscillationSpeed = Math.random() * 0.001 + 0.01
      const phase = Math.random() * Math.PI * 2
      const rotationSpeed = (Math.random() - 0.5) * 0.05

      const shapeType = Math.floor(Math.random() * 7)
      const color =
        sampledColors[Math.floor(Math.random() * sampledColors.length)]

      const shape = {
        x,
        y,
        vx,
        vy,
        size,
        color,
        time: 0,
        oscillationSpeed,
        phase,
        shapeType,
        rotation: 0,
        rotationSpeed,
      }
      shapes.push(shape)
    }
  }

  // Function to draw shapes
  function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let shape of shapes) {
      ctx.save() // Save the current state of the canvas
      ctx.translate(shape.x + shape.size / 2, shape.y + shape.size / 2) // Center the shapes
      ctx.rotate(shape.rotation) // Rotate the canvas

      ctx.beginPath()
      ctx.fillStyle = shape.color

      const sizeOscillation =
        Math.sin(shape.time + shape.phase) * (shape.size * 0.4)
      const currentSize = shape.size / 2 + sizeOscillation

      // Draw the shapes with rounded edges
      switch (shape.shapeType) {
        case 0: // Circle
          ctx.arc(0, 0, currentSize, 0, Math.PI * 2)
          break
        case 1: // Rounded Square
          const radius = currentSize * 0.2 // Rounded corner radius
          ctx.moveTo(-currentSize + radius, -currentSize) // Top-left corner
          ctx.lineTo(currentSize - radius, -currentSize) // Top-right corner
          ctx.quadraticCurveTo(
            currentSize,
            -currentSize,
            currentSize,
            -currentSize + radius,
          ) // Top-right curve
          ctx.lineTo(currentSize, currentSize - radius) // Bottom-right corner
          ctx.quadraticCurveTo(
            currentSize,
            currentSize,
            currentSize - radius,
            currentSize,
          ) // Bottom-right curve
          ctx.lineTo(-currentSize + radius, currentSize) // Bottom-left corner
          ctx.quadraticCurveTo(
            -currentSize,
            currentSize,
            -currentSize,
            currentSize - radius,
          ) // Bottom-left curve
          ctx.lineTo(-currentSize, -currentSize + radius) // Top-left corner
          ctx.quadraticCurveTo(
            -currentSize,
            -currentSize,
            -currentSize + radius,
            -currentSize,
          ) // Top-left curve
          break
        case 2: // Rounded Triangle
          const triangleRadius = currentSize * 0.055 // Adjustable rounded corner radius

          // Start drawing the rounded triangle
          ctx.beginPath()

          // Top vertex
          ctx.moveTo(0, -currentSize + triangleRadius)
          ctx.arcTo(
            -currentSize * 0.5,
            currentSize * 0.5,
            currentSize * 0.5,
            currentSize * 0.5,
            triangleRadius,
          ) // Left curve
          ctx.arcTo(
            currentSize * 0.5,
            currentSize * 0.5,
            0,
            -currentSize,
            triangleRadius,
          ) // Right curve
          ctx.arcTo(
            0,
            -currentSize,
            -currentSize * 0.3,
            currentSize * 0.3,
            triangleRadius,
          ) // Top curve

          ctx.closePath()
          ctx.fill()
          break

        case 3: // Oval
          ctx.ellipse(0, 0, currentSize, currentSize * 0.6, 0, 0, Math.PI * 2)
          break
        case 4: // Rounded Star
          const spikes = 5
          const outerRadius = currentSize
          const innerRadius = currentSize / 2
          const step = Math.PI / spikes
          const roundness = currentSize * 0.001 // Controls how rounded the star's corners are

          ctx.beginPath()
          for (let j = 0; j < spikes * 2.2; j++) {
            const radius = j % 2 === 1 ? outerRadius : innerRadius
            const angle = j * step
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            if (j === 0.5) {
              ctx.moveTo(x, y) // Move to the first point
            } else {
              const prevAngle = (j - 0.4) * step
              const prevX = Math.cos(prevAngle) * radius
              const prevY = Math.sin(prevAngle) * radius

              // Add rounded corners between points
              const cpX = (prevX + x) / 2 + Math.cos(prevAngle) * roundness
              const cpY = (prevY + y) / 2 + Math.sin(prevAngle) * roundness

              ctx.quadraticCurveTo(cpX, cpY, x, y) // Rounded transition
            }
          }

          ctx.closePath()
          ctx.fill()
          break

        case 5: // Rounded Pentagon
          const pentagonSides = 5
          const pentagonRadius = currentSize
          ctx.moveTo(pentagonRadius, 0)
          for (let j = 1; j < pentagonSides; j++) {
            const angle = ((Math.PI * 2) / pentagonSides) * j
            const x = Math.cos(angle) * pentagonRadius
            const y = Math.sin(angle) * pentagonRadius
            ctx.lineTo(x, y)
          }
          ctx.closePath()
          break
        case 6: // Rounded Hexagon
          const hexagonSides = 6
          const hexagonRadius = currentSize
          ctx.moveTo(hexagonRadius, 0)
          for (let j = 1; j < hexagonSides; j++) {
            const angle = ((Math.PI * 2) / hexagonSides) * j
            const x = Math.cos(angle) * hexagonRadius
            const y = Math.sin(angle) * hexagonRadius
            ctx.lineTo(x, y)
          }
          ctx.closePath()
          break
      }
      ctx.fill()
      ctx.restore() // Restore the canvas state
    }
  }

  // Function to update shapes' positions and sizes
function updateShapes() {
  // Remove opacity logic from inside this function, as it's unnecessary here
  for (let shape of shapes) {
    // Update shape position based on velocity
    shape.x += shape.vx;
    shape.y += shape.vy;

    // Bounce off edges properly
    if (shape.x + shape.size < 0 || shape.x > canvas.width) {
      shape.vx *= -1; // Reverse direction fully
    }
    if (shape.y + shape.size < 0 || shape.y > canvas.height) {
      shape.vy *= -1; // Reverse direction fully
    }

    // Update oscillation and rotation
    shape.time += shape.oscillationSpeed;
    shape.rotation += shape.rotationSpeed;

    // Randomly change rotation direction
    if (Math.random() < 0.1) {
      shape.rotationSpeed *= 1; // Just reverse direction, don't reduce speed
    }
  }
}

// Separate the opacity change logic
function changeShapeOverlayOpacity() {
  shapeOverlay.style.opacity = 0;
  setTimeout(() => {
    shapeOverlay.style.opacity = 1;
  }, 5000); // Delay for 5 seconds
}

// Call `changeShapeOverlayOpacity` function when you need to change the opacity


  // Function to animate the shapes
  function animate() {
    updateShapes()
    drawShapes()
    requestAnimationFrame(animate)
  }

  // Set up and start the animation
  updateCanvasSize()
  createShapes()
  animate()

  // Handle window resize
  setInterval(changeShapeOverlayOpacity, 1000 * 100);
  window.addEventListener("resize", () => {
    updateCanvasSize()
    createShapes() // Regenerate shapes on resize
  })
})

