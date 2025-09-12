/**
 * Theme switcher
 */

document.addEventListener( 'DOMContentLoaded', () => {
  const theme = localStorage.getItem( 'theme' ) || 'light';
  document.body.classList.toggle( 'dark-theme', theme === 'dark' );
} );

/**
 * Page Highlight Utility
 * Highlights search terms on pages based on URL query parameters
 */

/**
 * Initialize page highlighting when DOM loads
 */
document.addEventListener( 'DOMContentLoaded', () => {
  const urlParams = new URLSearchParams( window.location.search );
  const highlightTerm = urlParams.get( 'highlight' );

  console.log( 'Highlight script loaded. URL params:', window.location.search );
  console.log( 'Highlight term:', highlightTerm );

  if ( highlightTerm && highlightTerm.trim().length >= 2 ) {
    console.log( 'Starting page highlighting for term:', highlightTerm.trim() );
    highlightPageContent( highlightTerm.trim() );
    showClearButton();
  } else {
    console.log( 'No valid highlight term found' );
  }
} );

/**
 * Highlight all instances of search term on the page
 */
function highlightPageContent( searchTerm ) {
  console.log( 'highlightPageContent called with term:', searchTerm );

  // Create a TreeWalker to efficiently traverse text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function( node ) {
        // Skip script, style, and already highlighted content
        const parentTag = node.parentElement.tagName.toLowerCase();
        if ( [ 'script', 'style', 'mark' ].includes( parentTag ) ) {
          return NodeFilter.FILTER_REJECT;
        }

        // Only process nodes that contain the search term
        if ( node.textContent.toLowerCase().includes( searchTerm.toLowerCase() ) ) {
          console.log( 'Found text node with term:', node.textContent.substring( 0, 50 ) + '...' );
          return NodeFilter.FILTER_ACCEPT;
        }

        return NodeFilter.FILTER_REJECT;
      }
    }
  );

  const textNodes = [];
  let node;

  // Collect all text nodes that contain the search term
  while ( node = walker.nextNode() ) {
    textNodes.push( node );
  }

  console.log( 'Found', textNodes.length, 'text nodes to highlight' );

  // Process nodes in reverse order to avoid affecting subsequent nodes
  textNodes.reverse().forEach( textNode => {
    highlightTextNode( textNode, searchTerm );
  } );
}

/**
 * Highlight search term in a specific text node
 */
function highlightTextNode( textNode, searchTerm ) {
  const text = textNode.textContent;
  const regex = new RegExp( `(${ searchTerm.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ) })`, 'gi' );

  if ( regex.test( text ) ) {
    const highlightedHTML = text.replace( regex, '<mark data-highlight>$1</mark>' );

    // Create a temporary container to parse the HTML
    const temp = document.createElement( 'div' );
    temp.innerHTML = highlightedHTML;

    // Replace the text node with the highlighted content
    const fragment = document.createDocumentFragment();
    while ( temp.firstChild ) {
      fragment.appendChild( temp.firstChild );
    }

    textNode.parentNode.replaceChild( fragment, textNode );
  }
}

/**
 * Show the clear highlights button
 */
function showClearButton() {
  // Check if button already exists
  if ( document.getElementById( 'clear-highlights-btn' ) ) {
    return;
  }

  const button = document.createElement( 'button' );
  button.id = 'clear-highlights-btn';
  button.className = 'clear-highlights button primary';
  button.innerHTML = 'Clear highlights';
  button.setAttribute( 'aria-label', 'Clear highlighted search terms' );

  // Add click handler
  button.addEventListener( 'click', clearHighlights );

  // Add keyboard shortcut (Escape key)
  document.addEventListener( 'keydown', ( event ) => {
    if ( event.key === 'Escape' ) {
      clearHighlights();
    }
  } );

  // Append to body
  document.body.appendChild( button );
}

/**
 * Clear all highlights and reload page without query parameter
 */
function clearHighlights() {
  window.location = window.location.pathname;
}
