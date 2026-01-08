# Page Transitions

Smooth page transitions using SWUP. This partial intercepts internal link clicks, fetches pages via AJAX, and swaps content with a fade animation.

## Dependencies

This component requires npm packages that are not bundled:

```bash
npm install swup @swup/head-plugin @swup/scroll-plugin @swup/preload-plugin
```

## Usage

Include the partial in your base layout:

```nunjucks
{% include "components/_partials/page-transitions/page-transitions.njk" %}
```

Your layout needs a main element with the SWUP container:

```html
<main class="transition-fade" id="swup">
  <!-- Page content that gets swapped -->
</main>
```

Content inside `#swup` is replaced during transitions. Content outside (header, footer) persists.

## Component Registration

Components inside the SWUP container that require JavaScript must register with the PageTransitions system to re-initialize after each page swap:

```javascript
function initMyComponent() {
  const elements = document.querySelectorAll('.my-component');
  elements.forEach(setupElement);
}

// Register for SWUP re-initialization
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initMyComponent);
}

// Initial page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMyComponent);
} else {
  initMyComponent();
}
```

Components that create persistent state (intervals, observers) should also register a cleanup function:

```javascript
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initMyComponent);
  window.PageTransitions.registerCleanup('my-component', cleanupMyComponent);
}
```

## Without SWUP

All components in this library work without SWUP. The `window.PageTransitions` check ensures the registration code is skipped when SWUP is not present. Components initialize normally via `DOMContentLoaded`.

## Customization

### Transition Duration

Edit `page-transitions.css` to change the fade duration:

```css
main.transition-fade {
  transition: opacity 0.3s ease-in-out; /* Change 0.3s */
}
```

### Progress Bar

The CSS includes an optional progress bar. Add this element to your layout to display it:

```html
<div class="swup-progress-bar"></div>
```

## Resources

- [SWUP Documentation](https://swup.js.org/)
- [SWUP Hooks API](https://swup.js.org/hooks/)
- [SWUP Plugins](https://swup.js.org/plugins/)
