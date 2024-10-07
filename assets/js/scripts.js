document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    // Track all items except the More button
    const items = Array.from(mainNav.children).slice(0, -1); // Exclude More button

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

    // Function to get window width adjusted by device pixel ratio
    function getAdjustedWindowWidth() {
        const pixelRatio = window.devicePixelRatio || 1;
        return window.innerWidth * pixelRatio;
    }

    // Function to manage items in navigation menu
    function manageMenuItems() {
        const windowWidth = window.innerWidth;      // Get browser window width
        const adjustedWindowWidth = getAdjustedWindowWidth(); // Adjust width based on pixel ratio

        console.log(`Window width: ${windowWidth}, Adjusted Width: ${adjustedWindowWidth}`);

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

        // Custom breakpoints for handling responsiveness
        const breakpoints = [250, 350, 450,  550, 650]; 

        // Adjust based on custom breakpoints
        if (adjustedWindowWidth <= breakpoints[0]) {
            // Move all items to More for very small devices
            items.forEach(moveToMore);
        } else if (adjustedWindowWidth <= breakpoints[1]) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            moveToMore(items[items.length - 4]); // Move Contact
            moveToMore(items[items.length - 5]); // Move About
        } else if (adjustedWindowWidth <= breakpoints[2]) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            moveToMore(items[items.length - 4]); // Move Contact
        } else if (adjustedWindowWidth <= breakpoints[3]) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
        } else if (adjustedWindowWidth <= breakpoints[4]) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
        } else {
            // For larger screens, keep all items in the main navigation
            items.forEach(item => mainNav.appendChild(item));
        }

        // Ensure the More button remains last
        if (mainNav.lastChild !== moreButton) {
            mainNav.appendChild(moreButton);
        }
    }

    // Move an item to the More dropdown
    function moveToMore(item) {
        if (!isInMore(item)) {
            moreNav.appendChild(item);
        }
    }

    // Check if an item is already in the More dropdown
    function isInMore(item) {
        return Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML);
    }

    // Throttled resize event listener for better performance
    window.addEventListener('resize', throttle(manageMenuItems, 100));

    // Ensure resizing and applying proper width after the page is fully loaded
    window.addEventListener('load', manageMenuItems);

    // Initial adjustment on page load
    manageMenuItems();
});
