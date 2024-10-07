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

    function manageMenuItems() {
        const windowWidth = window.innerWidth;

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
        const breakpoints = [480, 768, 1024]; // Define breakpoints for responsiveness

        // Adjust logic based on custom breakpoints
        if (windowWidth <= breakpoints[0]) {
            // Move all items to More for very small devices or very narrow windows
            items.forEach(moveToMore);
        } else if (windowWidth <= breakpoints[1]) {
            // Move items to More for smaller screens
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
        } else if (windowWidth <= breakpoints[2]) {
            // Move items to More for medium screens
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

    function moveToMore(item) {
        if (!isInMore(item)) {
            moreNav.appendChild(item);
        }
    }

    function isInMore(item) {
        return Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML);
    }

    // Throttled resize event listener for better performance
    window.addEventListener('resize', throttle(manageMenuItems, 100)); // Throttle with a 100ms limit

    // Initial adjustment on page load
    manageMenuItems();
});
