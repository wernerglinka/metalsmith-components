/**
 * Header Component
 * Handles mobile menu toggle and header search functionality
 */

/**
 * Initialize header functionality when DOM loads
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderSearch();
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('header nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
}

/**
 * Initialize header search form
 * Handles form submission and redirect to search page
 */
function initHeaderSearch() {
  const searchForm = document.querySelector('.header-search-form');
  const searchInput = document.querySelector('#header-search-input');

  if (!searchForm || !searchInput) {
    return;
  }

  // Handle form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query.length === 0) {
      // Focus input if empty
      searchInput.focus();
      return;
    }

    // Redirect to search page with query parameter
    const searchURL = `/search/?q=${encodeURIComponent(query)}`;
    window.location.href = searchURL;
  });

  // Handle keyboard shortcut (Cmd/Ctrl + K) to focus search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}
