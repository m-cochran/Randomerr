document.addEventListener("DOMContentLoaded", function () {
    function initAutoNav() {
        // Navigation elements
        const mainNav = document.getElementById("autoNav");
        const moreNav = document.getElementById("autoNavMoreList");
        const moreButton = document.getElementById("autoNavMore");

        if (!mainNav || !moreNav || !moreButton) return;

        // Add Donate item
        const donateItem = document.createElement('li');
        donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
        moreNav.appendChild(donateItem);

        const items = Array.from(mainNav.children).slice(0, -1);

        // Debounce function for performance
        function debounce(func, wait) {
            let timeout;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), wait);
            };
        }

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
            const itemsToMove = [1, 2, 3, 4, 5];

            breakpoints.forEach((breakpoint, index) => {
                if (adjustedWindowWidth <= breakpoint) {
                    itemsToMove.slice(0, index + 1).forEach(offset => {
                        moveToMore(items[items.length - offset - 1]);
                    });
                }
            });

            // Ensure More button is last child
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
            return Array.from(moreNav.children).some(child => 
                child.innerHTML === item.innerHTML && 
                !child.innerHTML.includes('Donate')
            );
        }

        function triggerResize() {
            manageMenuItems();
        }

        // Attach debounced resize event listener
        window.addEventListener("resize", debounce(manageMenuItems, 100));

        // Initial calculation on page load
        setTimeout(triggerResize, 300);
    }

    // Ensure full page load before initializing
    window.addEventListener("load", initAutoNav);
});
