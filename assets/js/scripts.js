function initAutoNav() {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    if (!mainNav || !moreNav || !moreButton) return; // Make sure elements are loaded

    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    const items = Array.from(mainNav.children).slice(0, -1); // Exclude the More button

    // Throttle function to optimize resize event handling
    function throttle(func, limit) {
        let inThrottle;
        return function() {
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
        const adjustedWindowWidth = getAdjustedWindowWidth(); // Adjust width based on pixel ratio

        console.log(`Adjusted Width: ${adjustedWindowWidth}`);

        // Clear the More dropdown except for Donate
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

        // Ensure the More button remains last
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

    // Throttled resize event listener for better performance
    window.addEventListener('resize', throttle(manageMenuItems, 100));

    // Manually trigger a resize event to ensure the layout is correct
    setTimeout(function () {
        manageMenuItems();
        window.dispatchEvent(new Event('resize')); // Trigger a resize event after load
    }, 200);
}

// Ensure the script runs after both the DOM and all resources are fully loaded
window.addEventListener('load', function () {
    // Slight delay to ensure resources have loaded and layout is settled
    setTimeout(function () {
        initAutoNav();
        // Force a small layout change to recalculate sizes
        document.body.style.overflow = 'hidden'; // Force a tiny change to reflow
        setTimeout(function () {
            document.body.style.overflow = ''; // Revert the change
        }, 50); 
    }, 150);
});
