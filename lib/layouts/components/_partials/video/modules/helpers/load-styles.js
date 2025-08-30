/**
 * Styles Loading Helper
 */

/**
 * Dynamically load a stylesheet
 * @param {string} href - The stylesheet URL
 * @returns {Promise} Promise that resolves when styles are loaded
 */
const loadStyles = (href) => {
  return new Promise((resolve, reject) => {
    // Check if styles are already loaded
    const existingLink = document.querySelector(`link[href="${href}"]`);
    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load styles: ${href}`));

    document.head.appendChild(link);
  });
};

export default loadStyles;