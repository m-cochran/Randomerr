function initMenu() {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem);

    const items = Array.from(mainNav.children).slice(0, -1); // Exclude More button

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function getAdjustedWindowWidth() {
        return window.innerWidth * window.devicePixelRatio;
    }

    function manageMenuItems() {
        const adjustedWindowWidth = getAdjustedWindowWidth();

        // Clear the dropdown except for Donate
        while (moreNav.children.length > 1) {
            moreNav.removeChild(moreNav.lastChild);
        }

        // Reset mainNav to its original state
        items.forEach(item => {
            if (!isInMore(item)) {
                mainNav.appendChild(item);
            }
        });

        const breakpoints = [250, 350, 450, 550, 650]; // Define breakpoints

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
        } else {
            items.forEach(item => mainNav.appendChild(item));
        }

        if (mainNav.lastChild !== moreButton) {
            mainNav.appendChild(moreButton);
        }
    }

    function moveToMore(item) {
        if (!isInMore(item)) {
            moreNav.appendChild(item);
        }
    }

    function isInMore(item) {
        return Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML);
    }

    window.addEventListener('resize', throttle(manageMenuItems, 10));

    // Force recalculation after a short delay
    setTimeout(() => {
        manageMenuItems(); // Initial call after page load
        requestAnimationFrame(() => manageMenuItems()); // Ensure any layout shift handled
    }, 100); // Slight delay to handle environment rendering
}

// Trigger on DOM load, full page load, and a custom delay
document.addEventListener("DOMContentLoaded", initMenu);
window.addEventListener("load", initMenu);
setTimeout(initMenu, 200); // Additional fallback after a small delay
