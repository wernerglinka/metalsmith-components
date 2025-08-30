/**
 * DOM Helper Functions
 */

/**
 * Create an element with an ID
 * @param {string} tagName - The HTML tag name
 * @param {string} id - The element ID
 * @returns {HTMLElement} The created element
 */
export const createElementWithId = (tagName, id) => {
  const element = document.createElement(tagName);
  element.id = id;
  return element;
};

/**
 * Fade in an element with animation
 * @param {HTMLElement} element - The element to fade in
 * @param {string} openClass - The class to add when open
 * @param {Function} callback - Optional callback after fade in
 */
export const fadeInElement = (element, openClass, callback) => {
  // Clear any previous animation classes and inline styles
  element.classList.remove('fadeout');
  element.style.removeProperty('display');

  // Fade in the element
  element.classList.add('fadein');
  if (openClass) {
    element.classList.add(openClass);
  }

  // Remove fadein class after animation completes
  element.addEventListener(
    'animationend',
    () => {
      element.classList.remove('fadein');
      if (callback) callback();
    },
    { once: true }
  );
};

/**
 * Fade out an element with animation
 * @param {HTMLElement} element - The element to fade out
 * @param {string} openClass - The class to remove when closed
 * @param {Function} callback - Optional callback after fade out
 */
export const fadeOutElement = (element, openClass, callback) => {
  // Clear fadein and add fadeout
  element.classList.remove('fadein');
  if (openClass) {
    element.classList.remove(openClass);
  }
  element.classList.add('fadeout');

  // After animation completes, hide completely
  let animationCompleted = false;
  const hideElement = () => {
    if (animationCompleted) return;
    animationCompleted = true;
    element.classList.remove('fadeout');
    element.style.display = 'none';
    if (callback) callback();
  };

  // Listen for animation end
  element.addEventListener('animationend', hideElement, { once: true });

  // Fallback in case animation doesn't fire
  setTimeout(hideElement, 600);
};

/**
 * Attach an event listener that fires only once
 * @param {HTMLElement} element - The element to attach to
 * @param {string} event - The event name
 * @param {Function} handler - The event handler
 */
export const attachEventOnce = (element, event, handler) => {
  element.addEventListener(event, handler, { once: true });
};