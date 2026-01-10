/**
 * Page Transitions Module
 *
 * Implements smooth page transitions using SWUP.
 * Uses the PageTransitions registry initialized in main.js (the entry point)
 * to ensure it exists before any component scripts try to register.
 *
 * Components inside the SWUP container (#swup / main) should register their
 * init functions to be called after each page transition. Components
 * outside the container (header, footer) don't need to register.
 *
 * Plugins:
 * - HeadPlugin: Updates <head> tags during transitions
 * - ScrollPlugin: Handles scroll position and smooth scrolling
 * - PreloadPlugin: Prefetches pages on link hover for instant navigation
 *
 * @see https://swup.js.org/
 */

import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

/**
 * Get registries from the global PageTransitions object
 * These are initialized in main.js (entry point) to ensure they exist first
 */
const componentRegistry = window.PageTransitions?._componentRegistry || new Map();
const cleanupRegistry = window.PageTransitions?._cleanupRegistry || new Map();

/**
 * Initialize all registered components
 * Called after each page transition
 */
function initAllComponents() {
  componentRegistry.forEach((initFn, name) => {
    try {
      initFn();
    } catch (error) {
      console.error(`Error initializing component "${name}":`, error);
    }
  });
}

/**
 * Run all registered cleanup functions
 * Called before content is replaced during page transition
 */
function cleanupAllComponents() {
  cleanupRegistry.forEach((cleanupFn, name) => {
    try {
      cleanupFn();
    } catch (error) {
      console.error(`Error cleaning up component "${name}":`, error);
    }
  });
}

/**
 * Check if a page has the sidebar layout
 * @param {Document} doc - The document to check
 * @returns {boolean}
 */
function hasSidebarLayout(doc) {
  return doc.body.classList.contains('with-sidebar');
}

/**
 * Initialize SWUP page transitions
 */
function initSwup() {
  const swup = new Swup({
    containers: ['#swup'],
    animationSelector: '[class*="transition-"]',
    plugins: [
      new SwupHeadPlugin({
        persistAssets: true,
        awaitAssets: true
      }),
      new SwupScrollPlugin({
        doScrollingRightAway: false,
        animateScroll: {
          betweenPages: true,
          samePageWithHash: true,
          samePage: true
        },
        offset: 0
      }),
      new SwupPreloadPlugin({
        preloadHoveredLinks: true,
        preloadVisibleLinks: false,
        preloadInitialPage: true
      })
    ]
  });

  // Detect layout changes and force full page reload
  swup.hooks.on('page:view', (visit) => {
    const currentHasSidebar = hasSidebarLayout(document);
    const newHasSidebar = hasSidebarLayout(visit.to.document);

    if (currentHasSidebar !== newHasSidebar) {
      // Layout changed - force full page reload
      window.location.href = visit.to.url;
      
    }
  });

  // Run cleanup before content is replaced
  swup.hooks.on('content:replace', () => {
    cleanupAllComponents();
  });

  // Re-initialize components after new page content is loaded and transition completes
  swup.hooks.on('visit:end', () => {
    initAllComponents();
  });

  // Store swup instance on window for debugging
  window.swup = swup;

  return swup;
}

// Initialize SWUP when DOM is ready
// PageTransitions registry is already defined in main.js (entry point)
document.addEventListener('DOMContentLoaded', initSwup);
