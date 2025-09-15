/**
 * Simple Accordion Component
 * Handles the expand/collapse functionality for FAQ items with smooth simultaneous animations
 */

const initSimpleAccordion = () => {
  const accordions = document.querySelectorAll('.js-accordion');

  accordions.forEach(accordion => {
    const allowMultiple = accordion.dataset.allowMultiple === 'true';
    const expandFirst = accordion.dataset.expandFirst === 'true';
    const headers = accordion.querySelectorAll('.js-accordion-header');
    const panels = accordion.querySelectorAll('.js-accordion-panel');

    const duration = 400;
    let isAnimating = false;

    /**
     * Cubic easing function for smooth animations
     * @param {number} t - Progress from 0 to 1
     * @returns {number} Eased value
     */
    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /**
     * Gets the natural height of a content element (following accordion-improvements pattern)
     * @param {HTMLElement} panel - The panel element
     * @returns {number} Natural height in pixels
     */
    function getContentHeight(panel) {
      // Store original styles
      const originalHeight = panel.style.height;
      const originalOverflow = panel.style.overflow;

      // Temporarily set styles to measure natural height
      panel.style.height = 'auto';
      panel.style.overflow = 'visible';

      // Get the height while maintaining layout context
      const height = panel.scrollHeight;

      // Restore original styles
      panel.style.height = originalHeight;
      panel.style.overflow = originalOverflow;

      return height;
    }

    /**
     * Animates height changes for multiple elements simultaneously
     * @param {Array} animations - Array of animation configurations
     * @param {Function} onComplete - Callback function when animation completes
     */
    function animateHeights(animations, onComplete) {
      if (isAnimating) {return;}

      isAnimating = true;
      const startTime = performance.now();

      function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        animations.forEach(({ element, startHeight, endHeight }) => {
          const currentHeight = startHeight + (endHeight - startHeight) * easedProgress;
          element.style.height = `${currentHeight}px`;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isAnimating = false;
          if (onComplete) {onComplete();}
        }
      }

      requestAnimationFrame(animate);
    }

    // Initialize panels with proper heights
    panels.forEach((panel, index) => {
      if (expandFirst && index === 0) {
        const height = getContentHeight(panel);
        panel.style.height = `${height}px`;
        headers[index].setAttribute('aria-expanded', 'true');
      } else {
        panel.style.height = '0px';
        panel.classList.add('is-closed');
        headers[index].setAttribute('aria-expanded', 'false');
      }
    });

    headers.forEach((header, index) => {
      header.addEventListener('click', () => {
        if (isAnimating) {return;}

        const panel = panels[index];
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const animations = [];

        if (isExpanded) {
          // Close current panel
          animations.push({
            element: panel,
            startHeight: panel.offsetHeight,
            endHeight: 0
          });

          animateHeights(animations, () => {
            header.setAttribute('aria-expanded', 'false');
            panel.classList.add('is-closed');
          });
        } else {
          // Open current panel
          const targetHeight = getContentHeight(panel);

          // If not allowing multiple, close all other panels simultaneously
          if (!allowMultiple) {
            headers.forEach((otherHeader, otherIndex) => {
              if (otherIndex !== index) {
                const otherPanel = panels[otherIndex];
                const otherIsExpanded = otherHeader.getAttribute('aria-expanded') === 'true';

                if (otherIsExpanded) {
                  animations.push({
                    element: otherPanel,
                    startHeight: otherPanel.offsetHeight,
                    endHeight: 0
                  });
                }
              }
            });
          }

          // Add opening animation for current panel
          animations.push({
            element: panel,
            startHeight: panel.offsetHeight,
            endHeight: targetHeight
          });

          animateHeights(animations, () => {
            // Update aria-expanded states after animation
            if (!allowMultiple) {
              headers.forEach((otherHeader, otherIndex) => {
                if (otherIndex !== index) {
                  otherHeader.setAttribute('aria-expanded', 'false');
                  panels[otherIndex].classList.add('is-closed');
                }
              });
            }

            header.setAttribute('aria-expanded', 'true');
            panel.classList.remove('is-closed');
          });
        }
      });
    });
  });
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimpleAccordion);
} else {
  initSimpleAccordion();
}

export default initSimpleAccordion;