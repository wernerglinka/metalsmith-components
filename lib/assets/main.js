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
          console.log( 'Found text node with term:', `${node.textContent.substring( 0, 50 )  }...` );
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

/**
 * Responsive Table Wrapper
 * Wraps all tables in a scrollable container for responsive behavior
 */
document.addEventListener( 'DOMContentLoaded', () => {
  const tables = document.querySelectorAll( 'table' );

  tables.forEach( table => {
    // Skip if already wrapped
    if ( table.parentElement.classList.contains( 'table-scroll' ) ) {
      return;
    }

    // Create scroll container
    const scrollContainer = document.createElement( 'div' );
    scrollContainer.className = 'table-scroll';

    // Create mask wrapper for gradient effects
    const mask = document.createElement( 'div' );
    mask.className = 'table-mask';

    // Insert mask before table
    table.parentNode.insertBefore( mask, table );

    // Move scroll container inside mask
    mask.appendChild( scrollContainer );

    // Move table inside scroll container
    scrollContainer.appendChild( table );

    // Track scroll position to show/hide gradients
    function updateScrollIndicator() {
      const isScrollable = scrollContainer.scrollWidth > scrollContainer.clientWidth;
      const isScrolledToEnd =
        scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1;
      const isAtStart = scrollContainer.scrollLeft <= 1;

      if ( isScrollable ) {
        scrollContainer.classList.add( 'is-scrollable' );

        if ( isAtStart ) {
          scrollContainer.classList.remove( 'is-scrolled' );
        } else {
          scrollContainer.classList.add( 'is-scrolled' );
        }

        if ( isScrolledToEnd ) {
          scrollContainer.classList.add( 'is-scrolled-end' );
        } else {
          scrollContainer.classList.remove( 'is-scrolled-end' );
        }
      } else {
        scrollContainer.classList.remove( 'is-scrollable', 'is-scrolled', 'is-scrolled-end' );
      }
    }

    // Initial check
    updateScrollIndicator();

    // Update on scroll
    scrollContainer.addEventListener( 'scroll', updateScrollIndicator );

    // Update on window resize
    window.addEventListener( 'resize', updateScrollIndicator );
  } );
} );
