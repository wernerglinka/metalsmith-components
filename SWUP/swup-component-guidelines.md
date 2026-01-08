# SWUP-Ready Component Guidelines

This document provides guidance for making Metalsmith components compatible with SWUP page transitions. It is intended for maintainers of metalsmith-components.com to ensure all distributed components work seamlessly with SWUP-enabled sites.

## The Problem

Components typically initialize on `DOMContentLoaded`, which fires once per page load. When SWUP handles navigation, it swaps content via AJAX without a full page reload—meaning `DOMContentLoaded` never fires again. Components inside the SWUP container need a mechanism to re-initialize after each transition.

## The Solution: PageTransitions Registry

Sites using SWUP expose a `window.PageTransitions` object with two methods:

```javascript
window.PageTransitions.registerComponent(name, initFn)
window.PageTransitions.registerCleanup(name, cleanupFn)
```

Components register their initialization functions, which get called after each SWUP page transition.

## Standard Pattern for SWUP-Ready Components

Every component that lives inside `<main>` (the SWUP container) should follow this pattern:

```javascript
/**
 * Component Name
 * Brief description
 */

/**
 * Initialize the component
 */
function initComponentName() {
  const elements = document.querySelectorAll('.js-component-selector');
  elements.forEach(setupElement);
}

// Register with page transitions for SWUP support
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('component-name', initComponentName);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponentName);
} else {
  initComponentName();
}
```

Key points:

1. **Extract initialization into a named function** — Don't wrap everything in an anonymous `DOMContentLoaded` callback
2. **Conditional registration** — Check for `window.PageTransitions` before registering so the component still works without SWUP
3. **Handle both states** — Use `document.readyState` to handle cases where the script loads after DOM is ready

## Components That Need Cleanup

Components that create persistent state (intervals, observers, event listeners on `window`/`document`) should register a cleanup function. This prevents memory leaks and duplicate handlers when navigating away and back.

```javascript
let activeInterval = null;
let activeObserver = null;

function initComponent() {
  // Clean up any existing state first
  cleanupComponent();

  const elements = document.querySelectorAll('.js-component');
  if (elements.length === 0) return;

  // Set up interval
  activeInterval = setInterval(() => {
    // do something
  }, 5000);

  // Set up observer
  activeObserver = new ResizeObserver(() => {
    // handle resize
  });
  activeObserver.observe(document.body);
}

function cleanupComponent() {
  if (activeInterval) {
    clearInterval(activeInterval);
    activeInterval = null;
  }
  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
  }
}

if (window.PageTransitions) {
  window.PageTransitions.registerComponent('component-name', initComponent);
  window.PageTransitions.registerCleanup('component-name', cleanupComponent);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponent);
} else {
  initComponent();
}
```

## Preventing Duplicate Event Listeners

For components that add event listeners to elements, use a data attribute to track initialization:

```javascript
const setupElement = (element) => {
  // Skip if already initialized
  if (element.dataset.initialized) return;

  element.addEventListener('click', handleClick);
  element.addEventListener('keydown', handleKeydown);

  element.dataset.initialized = 'true';
};

function initComponent() {
  document.querySelectorAll('.js-component').forEach(setupElement);
}
```

This prevents duplicate listeners when SWUP re-initializes components that persist in the DOM (edge case, but worth handling).

## Components That Don't Need Registration

Components outside the SWUP container don't need to register:

- Header
- Footer
- Navigation (if in header)
- Any persistent UI element

These initialize once on `DOMContentLoaded` and persist across page transitions.

## Refactored Components Reference

The following components have been updated to support SWUP:

| Component | Location | Needs Cleanup | Notes |
|-----------|----------|---------------|-------|
| audio | `_partials/audio/audio.js` | No | Multiple audio players supported |
| video | `_partials/video/video.js` | No | Handles modal and in-situ videos |
| banner | `sections/banner/banner.js` | No | Accordion functionality |
| logos-list | `sections/logos-list/logos-list.js` | Yes | ResizeObserver for marquee animation |
| flip-card | `_partials/flip-card/flip-card.js` | No | Uses data-initialized pattern |
| flip-cards | `sections/flip-cards/flip-cards.js` | No | Uses data-initialized pattern |
| image-grid | `sections/image-grid/image-grid.js` | No | Justified grid layout |
| artist-slider | `sections/artist-slider/artist-slider.js` | Yes | Auto-cycling interval |
| slider | `sections/slider/slider.js` | No | Generic slider |

## Before/After Example

**Before (not SWUP-ready):**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.js-component');
  elements.forEach((el) => {
    el.addEventListener('click', () => {
      el.classList.toggle('active');
    });
  });
});
```

**After (SWUP-ready):**

```javascript
const setupElement = (element) => {
  if (element.dataset.initialized) return;

  element.addEventListener('click', () => {
    element.classList.toggle('active');
  });

  element.dataset.initialized = 'true';
};

function initComponent() {
  document.querySelectorAll('.js-component').forEach(setupElement);
}

if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initComponent);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponent);
} else {
  initComponent();
}
```

## Testing SWUP Compatibility

To verify a component works with SWUP:

1. Navigate to a page with the component
2. Navigate away to a different page
3. Navigate back (via link, not browser back button)
4. Verify the component initializes and functions correctly
5. Check the browser console for errors
6. For components with cleanup: verify no duplicate intervals/observers in DevTools

## Resources

- [SWUP Documentation](https://swup.js.org/)
- [SWUP Hooks API](https://swup.js.org/hooks/)
- [swup-implementation.md](./swup-implementation.md) — Technical implementation details
- [blogpost-swup-with-metalsmith.md](./blogpost-swup-with-metalsmith.md) — Conceptual overview
