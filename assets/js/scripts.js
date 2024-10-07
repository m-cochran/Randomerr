document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="/donate/">Donate</a>';
    moreNav.appendChild(donateItem);

    const items = Array.from(mainNav.children).slice(0, -1); // Exclude the More button

    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    function getAdjustedWindowWidth() {
        return window.innerWidth * window.devicePixelRatio;
    }

    function manageMenuItems() {
        const windowWidth = window.innerWidth;
        const adjustedWindowWidth = getAdjustedWindowWidth();

        console.log(`Window width: ${windowWidth}, Adjusted Width: ${adjustedWindowWidth}`);

        // Clear More dropdown except Donate
        while (moreNav.children.length > 1) {
            moreNav.removeChild(moreNav.lastChild);
        }

        // Reset mainNav to its original state
        items.forEach(item => {
            if (!isInMore(item)) {
                mainNav.appendChild(item);
            }
        });

        const breakpoints = [250, 350, 450, 550, 650]; // Custom breakpoints for devices

        if (adjustedWindowWidth <= breakpoints[0]) {
            items.forEach(moveToMore); // Smallest width: move everything to More
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
        }

        // Always append More button last
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

    // Throttled resize for better performance
    window.addEventListener('resize', throttle(() => {
        setTimeout(manageMenuItems, 50); // Timeout to let layout changes apply
    }, 200));

    // Initial run after DOM loads
    manageMenuItems();

    // Force a resize event after load to ensure correct layout adjustment
    window.dispatchEvent(new Event('resize'));
});
