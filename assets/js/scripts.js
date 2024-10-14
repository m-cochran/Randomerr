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
    "38week.img",
    "39week.img",
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

  function getCurrentMonthAndWeek() {
    const date = new Date();
    const month = date.getMonth();
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    const currentDate = date.getDate();
    const week = Math.floor((currentDate - 1) / Math.ceil(daysInMonth / 4));
    return { month, week };
  }

  function changeBackgroundImage() {
    const { month, week } = getCurrentMonthAndWeek();
    const imageIndex = month * 4 + week;
    const currentBackgroundImage = animalImages[imageIndex];
    backgroundContainer.style.backgroundImage = `url(${currentBackgroundImage})`;

    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    monthOverlay.textContent = monthNames[month];
  }

  changeBackgroundImage();
  setInterval(changeBackgroundImage, 1000 * 60 * 60 * 24 * 7); // Update weekly

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  shapeOverlay.appendChild(canvas);

  function updateCanvasSize() {
    canvas.width = shapeOverlay.clientWidth;
    canvas.height = shapeOverlay.clientHeight;
    createStaticShapes(); // Redraw static shapes on resize
    animateRotatingShape(); // Update rotating shape
  }

  let staticShapes = [];
  let rotatingShape = {
    size: Math.random() * 212 + 62,
    angle: 0,
    position: { x: 0, y: 0 },
    wobbleOffset: { x: Math.random() * 50 - 25, y: Math.random() * 50 - 25 },
    rotationDirection: Math.random() < 0.5 ? 1 : -1,
    color: getRandomColor(),
    type: Math.floor(Math.random() * 7)
  };

  function getRandomColor() {
    return `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, 0.5)`;
  }

  function createStaticShapes() {
    staticShapes = [];
    const shapeCount = 10;

    for (let i = 0; i < shapeCount; i++) {
      const shapeType = Math.floor(Math.random() * 7);
      const size = Math.random() * (canvas.width * 0.15) + 50;
      const x = Math.random() * (canvas.width - size);
      const y = Math.random() * (canvas.height - size);

      staticShapes.push({
        type: shapeType,
        x: x,
        y: y,
        size: size,
        color: getRandomColor()
      });
    }

    rotatingShape.position.x = Math.random() * (canvas.width - rotatingShape.size);
    rotatingShape.position.y = Math.random() * (canvas.height - rotatingShape.size);
  }

  function drawStaticShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    staticShapes.forEach(shape => {
      ctx.fillStyle = shape.color;
      ctx.beginPath();
      switch (shape.type) {
        case 0: ctx.arc(shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 0, Math.PI * 2); break;
        case 1: ctx.rect(shape.x, shape.y, shape.size, shape.size); break;
        case 2: 
          ctx.moveTo(shape.x + shape.size / 2, shape.y);
          ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
          ctx.lineTo(shape.x, shape.y + shape.size);
          ctx.closePath();
          break;
        case 3: drawPolygon(ctx, shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 5); break;
        case 4: drawPolygon(ctx, shape.x + shape.size / 2, shape.y + shape.size / 2, shape.size / 2, 6); break;
        case 5: ctx.ellipse(shape.x + shape.size / 2, shape.y + shape.size / 4, shape.size / 2, shape.size / 4, 0, 0, Math.PI * 2); break;
        case 6: 
          ctx.moveTo(shape.x + shape.size / 2, shape.y);
          ctx.lineTo(shape.x + shape.size, shape.y + shape.size / 2);
          ctx.lineTo(shape.x, shape.y + shape.size);
          ctx.lineTo(shape.x, shape.y + shape.size / 2);
          ctx.closePath();
          break;
      }
      ctx.fill();
    });
  }

  function drawPolygon(ctx, x, y, size, sides) {
    const angle = (Math.PI * 2) / sides;
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    for (let i = 1; i <= sides; i++) {
      ctx.lineTo(x + size * Math.cos(i * angle), y + size * Math.sin(i * angle));
    }
  }

  function animateRotatingShape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStaticShapes();

    rotatingShape.angle += 0.005 * rotatingShape.rotationDirection;
    ctx.save();

    const wobbleX = rotatingShape.wobbleOffset.x * Math.sin(rotatingShape.angle);
    const wobbleY = rotatingShape.wobbleOffset.y * Math.cos(rotatingShape.angle);

    ctx.translate(
      rotatingShape.position.x + rotatingShape.size / 2 + wobbleX,
      rotatingShape.position.y + rotatingShape.size / 2 + wobbleY
    );
    ctx.rotate(rotatingShape.angle);

    ctx.fillStyle = rotatingShape.color;
    ctx.beginPath();
    switch (rotatingShape.type) {
      case 0: ctx.arc(0, 0, rotatingShape.size / 2, 0, Math.PI * 2); break;
      case 1: ctx.rect(-rotatingShape.size / 2, -rotatingShape.size / 2, rotatingShape.size, rotatingShape.size); break;
      case 2: 
        ctx.moveTo(0, -rotatingShape.size / 2);
        ctx.lineTo(rotatingShape.size / 2, rotatingShape.size / 2);
        ctx.lineTo(-rotatingShape.size / 2, rotatingShape.size / 2);
        ctx.closePath();
        break;
      case 3: drawPolygon(ctx, 0, 0, rotatingShape.size / 2, 5); break;
      case 4: drawPolygon(ctx, 0, 0, rotatingShape.size / 2, 6); break;
      case 5: ctx.ellipse(0, 0, rotatingShape.size / 2, rotatingShape.size / 4, 0, 0, Math.PI * 2); break;
      case 6: 
        ctx.moveTo(0, -rotatingShape.size / 2);
        ctx.lineTo(rotatingShape.size / 2, 0);
        ctx.lineTo(0, rotatingShape.size / 2);
        ctx.lineTo(-rotatingShape.size / 2, 0);
        ctx.closePath();
        break;
    }
    ctx.fill();
    ctx.restore();
  }

  function updateRotatingShape() {
    shapeOverlay.style.opacity = 0;
    setTimeout(() => {
      rotatingShape.size = Math.random() * 512 + 62;
      rotatingShape.color = getRandomColor();
      rotatingShape.type = Math.floor(Math.random() * 7);
      rotatingShape.wobbleOffset.x = Math.random() * 50 - 25;
      rotatingShape.wobbleOffset.y = Math.random() * 50 - 25;
      rotatingShape.rotationDirection = Math.random() < 0.5 ? 1 : -1;
      createStaticShapes();
      shapeOverlay.style.opacity = 1;
    }, 5000);
  }

  function animate() {
    requestAnimationFrame(animate);
    animateRotatingShape();
  }

  createStaticShapes();
  animate();

  setInterval(updateRotatingShape, 1000 * 30);
  window.addEventListener("resize", updateCanvasSize);
  updateCanvasSize();
});
