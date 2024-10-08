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
      console.log(`Adjusted Width: ${adjustedWindowWidth}`);

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

  // MutationObserver to detect DOM changes after initial load
  const observer = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach(() => {
      triggerResize(); // Adjust if mutations are detected
    });
  });

  // Observe changes to the entire document body
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  });

  // Trigger resize after fonts are loaded
  document.fonts.ready.then(function () {
    triggerResize(); // Ensure menu is correct once fonts are loaded
  });
}
