document.addEventListener("DOMContentLoaded", function () {
    function initAutoNav() {
        const mainNav = document.getElementById("autoNav");
        const moreNav = document.getElementById("autoNavMoreList");
        const moreButton = document.getElementById("autoNavMore");

        if (!mainNav || !moreNav || !moreButton) return;

        const donateItem = document.createElement('li');
        donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
        moreNav.appendChild(donateItem);

        const items = Array.from(mainNav.children).slice(0, -1);

        // Throttle function for performance
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

        // Recalculate based on pixel ratio and window width
        function getAdjustedWindowWidth() {
            return Math.min(window.innerWidth, screen.width) * window.devicePixelRatio;
        }

        function manageMenuItems() {
            const adjustedWindowWidth = getAdjustedWindowWidth();

            console.log(`Adjusted Width: ${adjustedWindowWidth}`);

            // Clear More dropdown, keep Donate
            while (moreNav.children.length > 1) {
                moreNav.removeChild(moreNav.lastChild);
            }

            // Reset mainNav
            items.forEach(item => {
                if (!isInMore(item)) {
                    mainNav.appendChild(item);
                }
            });

            const breakpoints = [250, 350, 450, 550, 650];

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
        }

        function moveToMore(item) {
            if (!isInMore(item)) {
                moreNav.appendChild(item);
            }
        }

        function isInMore(item) {
            return Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML);
        }

        // Use requestAnimationFrame for layout calculation after rendering
        function triggerResize() {
            requestAnimationFrame(manageMenuItems);
        }

        // Attach throttled resize event listener
        window.addEventListener("resize", throttle(manageMenuItems, 100));

        // Use a delay to ensure layout recalculation after DOM and styles are fully rendered
        setTimeout(function () {
            triggerResize();  // Ensure calculation on page load
        }, 300);
    }

    // Ensure full page load before initializing
    window.addEventListener("load", initAutoNav);
});
