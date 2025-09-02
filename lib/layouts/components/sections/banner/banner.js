/**
 * Banner Component - Simple accordion functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    const content = header.nextElementSibling;
    
    if (!content?.classList.contains('accordion-content')) {
      console.warn('Banner accordion missing .accordion-content sibling');
      return;
    }

    header.addEventListener('click', (e) => {
      e.preventDefault();
      header.classList.toggle('is-open');
      content.classList.toggle('is-closed');
    });

    // Set initial state
    if (!header.classList.contains('is-open')) {
      content.classList.add('is-closed');
    }
  });
});