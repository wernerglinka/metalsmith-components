/**
 * Theme switcher
 */

document.addEventListener( 'DOMContentLoaded', () => {
  const themeToggle = document.querySelector( '.js-theme-toggle' );

  // add click handler to toggle
  themeToggle.addEventListener( 'click', () => {
    document.body.classList.toggle( 'dark-theme' );

    // store theme state in local storage so we preserve state for next page load
    localStorage.setItem( 'theme', document.body.classList.contains( 'dark-theme' ) ? 'dark' : 'light' );
  } );

} );
