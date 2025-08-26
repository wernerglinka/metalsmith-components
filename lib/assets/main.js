/**
 * Theme switcher
 */

document.addEventListener( 'DOMContentLoaded', () => {
  const theme = localStorage.getItem( 'theme' ) || 'light';
  document.body.classList.toggle( 'dark-theme', theme === 'dark' );
} );
