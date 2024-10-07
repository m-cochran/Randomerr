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

    function getAdjustedWindowWidth() {
        return window.innerWidth * window.devicePixelRatio;
    }

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

        // Custom breakpoints
        const breakpoints = [250, 350, 450,  550, 650]; // Define breakpoints for responsiveness

        // Adjust logic based on custom breakpoints
        if (adjustedWindowWidth <= breakpoints[0]) {
            // Move all items to More for very small devices or very narrow windows
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
            // Keep About and Contact
        } else if (adjustedWindowWidth <= breakpoints[4]) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            // Keep Shop, Contact, and About
        } else if (adjustedWindowWidth <= breakpoints[5]) {
            moveToMore(items[items.length - 1]); // Move Hub
            // Keep Arcade, Shop, Contact, and About
        } else {
            // For larger screens, keep all items in the main navigation
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

    // Trigger the menu management after the DOM is fully loaded
    function triggerMenuManagement() {
        requestAnimationFrame(manageMenuItems); // Wait for page to render
    }

    // Throttled resize event listener for better performance
    window.addEventListener('resize', throttle(manageMenuItems, 10)); // Throttle with a 10ms limit

    // Initial adjustment on page load
    triggerMenuManagement();
});
