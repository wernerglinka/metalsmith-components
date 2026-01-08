# Using SWUP with Metalsmith

Page transitions have long been the domain of single-page applications. Libraries like React and Vue handle navigation internally, swapping components without full page reloads. But what about static sites? What about Metalsmith?

SWUP brings that same smooth navigation experience to server-rendered and static sites. It intercepts link clicks, fetches pages via AJAX, and swaps content with animations—all while maintaining proper browser history. For Metalsmith sites, this means we can have the performance benefits of static HTML with the polish of a modern SPA.

## The Challenge with Sectioned Metalsmith Sites

This implementation uses a sectioned, component-based approach to Metalsmith. Rather than monolithic templates, pages are composed from discrete sections defined in YAML frontmatter:

```yaml
# src/index.md
layout: pages/sections.njk
sections:
  - sectionType: artist-slider
    cycleTime: 5000
    slides:
      - image: /assets/images/artwork-1.jpg
        title: "Object 2007.01.001"
  - sectionType: text-only
    prose: |
      Werner Glinka is a mixed media artist...
  - sectionType: image-grid
    images:
      - src: /assets/images/thumb-1.jpg
      - src: /assets/images/thumb-2.jpg
```

Each section type has its own Nunjucks template, CSS, and JavaScript, bundled automatically via `metalsmith-bundled-components`. This architecture creates a challenge for page transitions: each section's JavaScript initializes on `DOMContentLoaded`, which only fires once per page load. When SWUP swaps content, those initialization functions don't run again.

## The Solution: A Component Registry

The key insight is that components inside the SWUP container need a way to re-initialize after transitions. Components outside the container—header, footer, navigation—persist across page changes and don't need this.

The page layout makes this boundary explicit:

```html
<!-- lib/layouts/pages/default.njk -->
<body>
  {% include "components/sections/header/header.njk" %}

  <main class="transition-fade" id="swup">
    {{ breadcrumbs(navigation.breadcrumbs) }}
    {% block body %}
      {# Page sections render here #}
    {% endblock %}
  </main>

  {% include "components/sections/footer/footer.njk" %}
</body>
```

Everything inside `<main id="swup">` gets replaced during transitions—including the breadcrumbs, which need to update with each page. Everything outside stays put.

The page-transitions module provides a simple registry:

```javascript
// lib/layouts/components/_partials/page-transitions/page-transitions.js
import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';

const componentRegistry = new Map();
const cleanupRegistry = new Map();

function registerComponent(name, initFn) {
  componentRegistry.set(name, initFn);
}

function registerCleanup(name, cleanupFn) {
  cleanupRegistry.set(name, cleanupFn);
}

function initAllComponents() {
  componentRegistry.forEach((initFn, name) => {
    try {
      initFn();
    } catch (error) {
      console.error(`Error initializing component "${name}":`, error);
    }
  });
}

function initSwup() {
  const swup = new Swup({
    containers: ['#swup'],
    animationSelector: '[class*="transition-"]',
    plugins: [
      new SwupHeadPlugin({
        persistAssets: true,
        awaitAssets: true
      })
    ]
  });

  swup.hooks.on('content:replace', () => {
    // Run cleanup before content swap
    cleanupRegistry.forEach((fn) => fn());
  });

  swup.hooks.on('page:view', () => {
    // Re-initialize after new content loads
    initAllComponents();
  });
}

// Export registry immediately so components can register
window.PageTransitions = { registerComponent, registerCleanup };

document.addEventListener('DOMContentLoaded', initSwup);
```

## Adapting Section Components

With the registry in place, section components need minimal changes. The pattern is straightforward: extract initialization into a named function, register it, and still bind to `DOMContentLoaded` for the initial page load.

Here's the image-grid component before and after:

**Before:**
```javascript
function initImageGrids() {
  const grids = document.querySelectorAll('.js-image-grid');
  grids.forEach((grid) => {
    loadImagesAndCalculateAspectRatios(grid).then((aspectRatioCache) => {
      layoutJustifiedGrid(grid, aspectRatioCache);

      const resizeObserver = new ResizeObserver(
        debounce(() => layoutJustifiedGrid(grid, aspectRatioCache), 50)
      );
      resizeObserver.observe(grid);
    });
  });
}

document.addEventListener('DOMContentLoaded', initImageGrids);
```

**After:**
```javascript
function initImageGrids() {
  const grids = document.querySelectorAll('.js-image-grid');
  grids.forEach((grid) => {
    loadImagesAndCalculateAspectRatios(grid).then((aspectRatioCache) => {
      layoutJustifiedGrid(grid, aspectRatioCache);

      const resizeObserver = new ResizeObserver(
        debounce(() => layoutJustifiedGrid(grid, aspectRatioCache), 50)
      );
      resizeObserver.observe(grid);
    });
  });
}

// Register for SWUP re-initialization
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('image-grid', initImageGrids);
}

// Initial page load
document.addEventListener('DOMContentLoaded', initImageGrids);
```

The conditional check (`if (window.PageTransitions)`) ensures the component still works if SWUP isn't loaded—useful for debugging or if you later decide to remove page transitions.

## Components That Need Cleanup

Some components create state that should be torn down before the content swap. The artist-slider, for example, runs an interval timer for auto-cycling. Without cleanup, navigating away and back would create duplicate intervals.

```javascript
let activeSliders = [];

function initArtistSliders() {
  cleanupArtistSliders();

  const wrappers = document.querySelectorAll('.artist-slider-wrapper');
  wrappers.forEach((wrapper) => {
    const slider = initSlider(wrapper);
    if (slider) {
      activeSliders.push(slider);
    }
  });
}

function cleanupArtistSliders() {
  activeSliders.forEach((slider) => {
    if (slider.intervalId) {
      clearInterval(slider.intervalId);
    }
  });
  activeSliders = [];
}

if (window.PageTransitions) {
  window.PageTransitions.registerComponent('artist-slider', initArtistSliders);
  window.PageTransitions.registerCleanup('artist-slider', cleanupArtistSliders);
}

document.addEventListener('DOMContentLoaded', initArtistSliders);
```

## Components That Don't Need Registration

Not every component needs to register. The header and navigation live outside the SWUP container—they persist across transitions and only initialize once. Same for the footer, the scroll-to-top button, and any other persistent UI elements.

This is actually one of the nice aspects of the sectioned approach: the layout template makes the boundary explicit. You can look at `default.njk` and immediately see what persists and what gets swapped.

## Integrating with the Component Bundler

The `metalsmith-bundled-components` plugin discovers and bundles component assets based on manifest files. To include the page-transitions module, it needs to be a dependency of a component that's always present.

The header section is a natural choice—it appears on every page:

```json
{
  "name": "header",
  "type": "section",
  "styles": ["header.css"],
  "scripts": ["header.js"],
  "requires": ["branding", "navigation", "page-transitions"]
}
```

Because the bundler resolves dependencies recursively, adding `page-transitions` to the header's requirements ensures it's bundled into every page. The bundler uses esbuild under the hood, so the npm imports (`swup`, `@swup/head-plugin`) resolve correctly.

## The CSS Side

SWUP adds classes to the `<html>` element during transitions:

- `is-changing` — transition in progress
- `is-animating` — animation phase active
- `is-leaving` — leaving current page
- `is-rendering` — entering new page

The transition styles hook into these:

```css
main.transition-fade {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}

html.is-animating main.transition-fade {
  opacity: 0;
}

html.is-changing {
  overflow: hidden;
}
```

The animation timing is controlled by CSS, not JavaScript. SWUP watches for `transitionend` events and waits for them to complete before swapping content.

## Head Plugin Configuration

The `@swup/head-plugin` handles updating the `<head>` during transitions—page titles, meta descriptions, Open Graph tags. Two options are particularly important for Metalsmith sites:

```javascript
new SwupHeadPlugin({
  persistAssets: true,
  awaitAssets: true
})
```

`persistAssets: true` keeps existing `<script>` and `<link>` tags in place. Since Metalsmith typically bundles all JavaScript and CSS into single files loaded on every page, we don't want SWUP removing and re-adding them.

`awaitAssets: true` waits for any new stylesheets to load before showing the new content. This prevents a flash of unstyled content if a page has additional CSS.

## Scroll and Preload Plugins

Two additional plugins round out the implementation:

### Scroll Plugin

The `@swup/scroll-plugin` handles scroll position during transitions. Without it, navigating to a new page leaves you scrolled to wherever you were on the previous page.

```javascript
new SwupScrollPlugin({
  doScrollingRightAway: false,
  animateScroll: {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  },
  offset: 0
})
```

`doScrollingRightAway: false` means scrolling happens after the content swap, not before. The `animateScroll` options enable smooth scrolling for page transitions, anchor links, and same-page navigation. If you have a fixed header, the `offset` option lets you account for its height.

### Preload Plugin

The `@swup/preload-plugin` prefetches pages when users hover over links. By the time they click, the page is already cached and loads instantly.

```javascript
new SwupPreloadPlugin({
  preloadHoveredLinks: true,
  preloadVisibleLinks: false,
  preloadInitialPage: true
})
```

`preloadHoveredLinks: true` is the magic—a few hundred milliseconds of hover time is usually enough to fetch a page. `preloadInitialPage: true` caches the current page on load, so the back button works instantly too.

Setting `preloadVisibleLinks: false` prevents aggressive preloading of every link in the viewport. For image-heavy art portfolio sites, that would be wasteful.

## Performance Considerations

SWUP adds about 10KB (gzipped) to your bundle. In exchange, subsequent page loads feel instant—no white flash, no layout shift, no re-parsing of CSS and JavaScript.

The `page:view` hook fires after the new content is in the DOM but before the enter animation completes. This means component initialization happens during the fade-in, which can occasionally cause a brief visual jump if a component significantly changes layout. The image-grid component is a good example: it calculates a justified layout after images load, which can shift content.

For most components, this isn't noticeable. But if you have a component that causes significant layout changes, you might want to:

1. Use CSS to reserve space before JavaScript runs
2. Initialize earlier using the `content:replace` hook
3. Add a loading state that transitions smoothly

## Debugging

SWUP exposes its instance on `window.swup`, which is helpful for debugging:

```javascript
window.swup                    // SWUP instance
window.swup.hooks              // Registered hooks
window.PageTransitions         // Component registry
```

You can also watch the network tab during navigation. If SWUP is working, you'll see XHR requests for the HTML instead of document requests.

## Wrapping Up

SWUP brings single-page app navigation to static Metalsmith sites with minimal friction. The sectioned, component-based architecture actually makes integration cleaner—the layout template defines a clear boundary between persistent and swapped content, and the component bundler handles the npm dependencies automatically.

The main work is adapting section components to re-initialize after transitions. The registry pattern keeps this simple: extract your init function, register it, done. Components outside the swap container don't need any changes at all.

For Metalsmith sites that want that extra polish of smooth page transitions, SWUP is worth the ~10KB addition to your bundle.

---

**Resources:**

- [SWUP Documentation](https://swup.js.org/)
- [SWUP Hooks API](https://swup.js.org/hooks/)
- [SWUP Head Plugin](https://swup.js.org/plugins/head-plugin/)
- [SWUP Scroll Plugin](https://swup.js.org/plugins/scroll-plugin/)
- [SWUP Preload Plugin](https://swup.js.org/plugins/preload-plugin/)
- [metalsmith-bundled-components](https://github.com/wernerglinka/metalsmith-bundled-components)
