# SWUP Page Transitions Implementation

This document describes the SWUP page transition system implemented for smooth navigation between pages.

## Overview

SWUP intercepts internal link clicks, fetches pages via AJAX, and swaps content with a fade animation. This provides a smoother user experience compared to full page reloads while maintaining proper browser history and URL updates.

## Dependencies

```bash
npm install swup @swup/head-plugin @swup/scroll-plugin @swup/preload-plugin
```

- **swup** (v4.8.2) - Core page transition library
- **@swup/head-plugin** - Updates `<head>` tags (title, meta, etc.) during transitions
- **@swup/scroll-plugin** - Handles scroll position and smooth scrolling between pages
- **@swup/preload-plugin** - Prefetches pages on link hover for instant navigation

## Architecture

### Container Structure

The `<main>` element serves as the SWUP container. Content inside this element gets swapped during transitions, while everything outside (header, footer) persists.

```html
<!-- lib/layouts/pages/default.njk -->
<body>
  {% include "header.njk" %}           <!-- persists -->

  <main class="transition-fade" id="swup">
    {{ breadcrumbs() }}                <!-- swapped -->
    {% block body %}{% endblock %}     <!-- swapped -->
  </main>

  {% include "footer.njk" %}           <!-- persists -->
</body>
```

Note: Breadcrumbs are inside the SWUP container so they update correctly during transitions.

### Component Registry

Components inside `<main>` that require JavaScript initialization must register with the `PageTransitions` system. This ensures they re-initialize after each page swap.

```javascript
// Example: Registering a component
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('component-name', initFunction);
  window.PageTransitions.registerCleanup('component-name', cleanupFunction);
}

// Still initialize on initial page load
document.addEventListener('DOMContentLoaded', initFunction);
```

## Files

### Core Module

**`lib/layouts/components/_partials/page-transitions/page-transitions.js`**

Initializes SWUP and provides the component registry:

- Creates SWUP instance with `#swup` container
- Loads HeadPlugin for meta tag updates
- Exposes `window.PageTransitions.registerComponent()` for components
- Exposes `window.PageTransitions.registerCleanup()` for teardown
- Calls registered init functions on `page:view` hook
- Calls registered cleanup functions on `content:replace` hook

### Transition Styles

**`lib/layouts/components/_partials/page-transitions/page-transitions.css`**

```css
/* Fade transition */
main.transition-fade {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}

html.is-animating main.transition-fade {
  opacity: 0;
}

/* Prevent scroll during transition */
html.is-changing {
  overflow: hidden;
}
```

### Manifest

**`lib/layouts/components/_partials/page-transitions/manifest.json`**

```json
{
  "name": "page-transitions",
  "type": "partial",
  "styles": ["page-transitions.css"],
  "scripts": ["page-transitions.js"],
  "requires": []
}
```

## Registered Components

Components that register with PageTransitions for re-initialization:

| Component | File | Purpose |
|-----------|------|---------|
| artist-slider | `sections/artist-slider/artist-slider.js` | Hero image carousel with auto-cycling |
| slider | `sections/slider/slider.js` | Generic slide component |
| image-grid | `sections/image-grid/image-grid.js` | Justified image gallery layout |

## Components That Don't Need Registration

Components outside the SWUP container don't need to register:

- **header** - Persists across transitions
- **footer** - Persists across transitions
- **navigation** - Inside header, persists

## SWUP Configuration

```javascript
const swup = new Swup({
  containers: ['#swup'],
  animationSelector: '[class*="transition-"]',
  plugins: [
    new SwupHeadPlugin({
      persistAssets: true,  // Keep script/style tags
      awaitAssets: true     // Wait for new styles to load
    }),
    new SwupScrollPlugin({
      doScrollingRightAway: false,  // Scroll after content swap
      animateScroll: {
        betweenPages: true,         // Smooth scroll on page change
        samePageWithHash: true,     // Smooth scroll for anchor links
        samePage: true              // Smooth scroll on same page
      },
      offset: 0                     // Offset for fixed headers
    }),
    new SwupPreloadPlugin({
      preloadHoveredLinks: true,    // Preload on hover
      preloadVisibleLinks: false,   // Don't preload all visible links
      preloadInitialPage: true      // Cache initial page for back button
    })
  ]
});
```

## SWUP Hooks Used

| Hook | Purpose |
|------|---------|
| `content:replace` | Run cleanup functions before content swap |
| `page:view` | Re-initialize components after new content loads |

## Adding New Components

When creating a new component that requires JavaScript and lives inside `<main>`:

1. Extract initialization logic into a named function
2. Register with PageTransitions if available
3. Also bind to DOMContentLoaded for initial page load

```javascript
function initMyComponent() {
  // Component initialization logic
  const elements = document.querySelectorAll('.my-component');
  elements.forEach(setupElement);
}

// Register for SWUP re-initialization
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initMyComponent);
}

// Initial page load
document.addEventListener('DOMContentLoaded', initMyComponent);
```

## Debugging

SWUP instance is available on `window.swup` for debugging:

```javascript
// In browser console
window.swup                    // SWUP instance
window.swup.hooks              // Registered hooks
window.PageTransitions         // Component registry functions
```

## Resources

- [SWUP Documentation](https://swup.js.org/)
- [SWUP Hooks API](https://swup.js.org/hooks/)
- [SWUP Head Plugin](https://swup.js.org/plugins/head-plugin/)
- [SWUP Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/)
- [SWUP Preload Plugin](https://swup.js.org/plugins/preload-plugin/)
- [SWUP Lifecycle](https://swup.js.org/lifecycle/)
