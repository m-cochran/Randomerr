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

















document.addEventListener('DOMContentLoaded', () => {
    const backgroundContainer = document.getElementById('backgroundContainer');
    const shapeOverlay = document.getElementById('shapeOverlay');

    if (!shapeOverlay) {
        console.error("Shape overlay element not found!");
        return;
    }


const animalImages = [
    'https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1495594059084-33752639b9c3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

// Get the container elements
const backgroundContainer = document.getElementById('backgroundContainer');
const shapeOverlay = document.getElementById('shapeOverlay');

// Create a canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
shapeOverlay.appendChild(canvas);

// Set initial canvas size
updateCanvasSize();

// Initialize the current background index
let currentBackgroundIndex = 0; // Start with the first background image

// Variables for static shapes
let staticShapes = [];

// Variables for rotating shape
let rotatingShape = {
    size: Math.random() * 396 + 196, // Random initial size
    angle: 0,
    startTime: 0,
    type: Math.floor(Math.random() * 7), // Randomly select initial shape type
    rotationDirection: Math.random() < 0.5 ? 1 : -1, // Randomly choose rotation direction: 1 for clockwise, -1 for counterclockwise
    color: getRandomColor(), // Set a fixed color when the shape is created
    offset: Math.random() * 50 + 50 // Random offset for spinning
};

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
}

// Function to create random static shapes
function createStaticShapes() {
    staticShapes = []; // Clear previous shapes
    const shapeCount = 7; // Number of random shapes

    for (let i = 0; i < shapeCount; i++) {
        const shapeType = Math.floor(Math.random() * 7); // Randomly choose a shape type (0-6)
        
        // Adjust size scaling based on canvas size
        const size = Math.random() * (canvas.width * 0.3) + (canvas.width * 0.05); // Size as a percentage of canvas width
        
        // Randomly position the shapes across the entire canvas, considering shape size
        const x = Math.random() * (canvas.width - size); 
        const y = Math.random() * (canvas.height - size); 

        const shape = {
            type: shapeType,
            x: x,
            y: y,
            size: size,
            color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.25)`,
        };

        staticShapes.push(shape);
    }
}


// Function to draw a polygon
function drawPolygon(ctx, x, y, size, sides) {
    const angle = (Math.PI * 2) / sides;
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (let i = 1; i < sides; i++) {
        ctx.lineTo(x + size * Math.cos(i * angle), y + size * Math.sin(i * angle));
    }
    ctx.closePath();
}



// Function to draw static shapes
function drawStaticShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
    for (const shape of staticShapes) {
        ctx.fillStyle = shape.color;
        ctx.beginPath();

        switch (shape.type) {
            case 0: // Circle
                ctx.arc(shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 0, Math.PI * 2);
                break;
            case 1: // Rectangle
                ctx.rect(shape.x, shape.y, shape.size, shape.size);
                break;
            case 2: // Triangle
                ctx.moveTo(shape.x + shape.size / 2, shape.y);
                ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
                ctx.lineTo(shape.x, shape.y + shape.size);
                ctx.closePath();
                break;
            case 3: // Pentagon
                drawPolygon(ctx, shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 5);
                break;
            case 4: // Hexagon
                drawPolygon(ctx, shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 6);
                break;
            case 5: // Ellipse
                ctx.ellipse(shape.x + shape.size / 2, shape.y + shape.size / 4, shape.size / 2, shape.size / 4, 0, 0, Math.PI * 2);
                break;
            case 6: // Rhombus
                ctx.moveTo(shape.x + shape.size / 2, shape.y);
                ctx.lineTo(shape.x + shape.size, shape.y + shape.size / 2);
                ctx.lineTo(shape.x, shape.y + shape.size);
                ctx.lineTo(shape.x, shape.y + shape.size / 2);
                ctx.closePath();
                break;
        }

        ctx.fill(); // Fill the shape
    }
}



// Function to animate a rotating shape
function animateRotatingShape() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - rotatingShape.startTime;

    // Update the angle based on the elapsed time
    rotatingShape.angle = (elapsedTime / 30000) * Math.PI * 2 * rotatingShape.rotationDirection; // Full rotation in 30 seconds

    // Clear previous frame and redraw static shapes
    drawStaticShapes();

    // Draw the rotating shape based on its type
    ctx.save();
    ctx.translate(rotatingShape.x + rotatingShape.size / 2 + rotatingShape.offset * Math.cos(rotatingShape.angle), 
                 rotatingShape.y + rotatingShape.size / 2 + rotatingShape.offset * Math.sin(rotatingShape.angle)); // Offset rotation
    ctx.rotate(rotatingShape.angle); // Rotate according to the set direction
    ctx.fillStyle = rotatingShape.color; // Use fixed color

    // Draw the rotating shape based on its type
    switch (rotatingShape.type) {
        case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, rotatingShape.size / 2, 0, Math.PI * 2);
            break;
        case 1: // Rectangle
            ctx.fillRect(-rotatingShape.size / 2, -rotatingShape.size / 2, rotatingShape.size, rotatingShape.size);
            break;
        case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -rotatingShape.size / 2);
            ctx.lineTo(rotatingShape.size / 2, rotatingShape.size / 2);
            ctx.lineTo(-rotatingShape.size / 2, rotatingShape.size / 2);
            ctx.closePath();
            break;
        case 3: // Pentagon
            drawPolygon(ctx, 0, 0, rotatingShape.size / 2, 5);
            break;
        case 4: // Hexagon
            drawPolygon(ctx, 0, 0, rotatingShape.size / 2, 6);
            break;
        case 5: // Ellipse
            ctx.ellipse(0, 0, rotatingShape.size / 2, rotatingShape.size / 4, 0, 0, Math.PI * 2);
            break;
        case 6: // Rhombus
            ctx.beginPath();
            ctx.moveTo(0, -rotatingShape.size / 2);
            ctx.lineTo(rotatingShape.size / 2, 0);
            ctx.lineTo(0, rotatingShape.size / 2);
            ctx.lineTo(-rotatingShape.size / 2, 0);
            ctx.closePath();
            break;
    }

    ctx.fill(); // Fill the shape
    ctx.restore();

    requestAnimationFrame(animateRotatingShape); // Continue animation
}

// Function to change the background image and rotating shape
function changeBackgroundAndShape() {
    // Change background image
    backgroundContainer.style.backgroundImage = `url(${animalImages[currentBackgroundIndex]})`;
    
    // Reset rotating shape properties
    createStaticShapes();
    rotatingShape.x = Math.random() * (canvas.width - rotatingShape.size); // Random position
    rotatingShape.y = Math.random() * (canvas.height - rotatingShape.size); // Random position
    rotatingShape.size = Math.random() * 396 + 196; // Random size
    rotatingShape.color = getRandomColor(); // Set a new fixed color
    rotatingShape.startTime = performance.now(); // Reset the start time
    rotatingShape.type = Math.floor(Math.random() * 7); // Randomly select shape type
    rotatingShape.rotationDirection = Math.random() < 0.5 ? 1 : -1; // Randomly choose rotation direction

    // Update the current background index
    currentBackgroundIndex = (currentBackgroundIndex + 1) % animalImages.length; // Cycle through images
}

// Function to update the canvas size
function updateCanvasSize() {
    canvas.width = shapeOverlay.clientWidth; // Set width based on overlay size
    canvas.height = shapeOverlay.clientHeight; // Set height based on overlay size
}

// Initial setup
createStaticShapes();
animateRotatingShape(); // Start the animation

// Change the background image and shapes every 5 seconds
setInterval(changeBackgroundAndShape, 5000);

// Update canvas size on window resize
window.addEventListener('resize', updateCanvasSize);
