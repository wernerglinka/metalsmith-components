# Component Development Guide

This guide provides detailed information for creating, developing, and maintaining components in the Metalsmith Components library.

## Scaffolding a New Component

When creating a new component, follow these steps to ensure proper integration:

### 1. Create Component Directory

```bash
mkdir -p lib/layouts/components/sections/[component-name]
# or for partials:
mkdir -p lib/layouts/components/_partials/[component-name]
```

### 2. Required Files

#### manifest.json

**Must follow this exact structure:**

```json
{
  "name": "component-name",
  "type": "section",  // or "partial"
  "styles": ["component-name.css"],  // array of CSS files
  "scripts": ["component-name.js"],  // array of JS files
  "requires": ["text", "ctas", "commons"],  // required partials
  "validation": {
    "required": ["sectionType"],
    "properties": {
      "sectionType": {
        "type": "string",
        "const": "component-name"
      }
      // additional validation rules
    }
  }
}
```

**Important**: Do NOT use the following structure (this is outdated):

```json
// WRONG - Don't use this format
{
  "dependencies": {
    "partials": ["text", "ctas"],
    "helpers": ["hasText", "hasCtas"]
  },
  "assets": {
    "css": ["component.css"],
    "js": ["component.js"]
  }
}
```

#### Other Required Files

- **component-name.yml** - Example frontmatter configuration
- **component-name.njk** - Nunjucks template
- **component-name.css** - Component styles (optional)
- **component-name.js** - Component JavaScript (optional)

### 3. Data Loading Pattern

For components that load data from `lib/data/`:

```njk
{# Load all items from data source #}
{% if section.items.scope === "all" %}
  {% set itemsList = data[section.items.source] %}
{% endif %}

{# Load selected items by ID #}
{% if section.items.scope === "selections" %}
  {% set itemsList = data[section.items.source] | getSelections(section.items.selections) %}
{% endif %}
```

### 4. Helper Functions

Common helper functions are globally available in templates:

- `hasText` - Check if text object has content
- `hasCtas` - Check if CTAs array exists and has items
- `getSelections` - Filter data array by ID selections

These are NOT declared in manifest.json - they're provided by the build system.

### 5. Creating Reference Pages

Add a reference page in `src/references/sections/component-name.md` (for sections) or `src/references/partials/component-name.md` (for partials) with:

- Multiple examples showing different configurations
- Clear section explaining features and options
- Implementation notes if needed

The references pages are automatically included in their respective collections (sections or partials) - no manual linking needed.

### 6. Testing

After creating a component:

1. Run `npm test` to ensure manifest validation passes
2. Run `npm run build` to verify the component bundles correctly
3. Run `npm start` to test the component in the development server

Common issues:
- Missing `type` field in manifest.json
- Using deprecated manifest structure
- Incorrect `requires` dependencies
- Template syntax errors with helper functions

See the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide for detailed solutions to common issues.

## Advanced: Multi-Provider Components with Modules

For components supporting multiple provider libraries (maps, video, podcast players), use the `modules` field:

```json
{
  "name": "maps",
  "type": "section",
  "styles": ["maps.css"],
  "scripts": ["maps.js"],
  "requires": ["ctas", "text", "commons"],
  "modules": {
    "providers": ["leaflet.js", "openlayers.js"],
    "helpers": ["load-script.js", "load-styles.js", "maps-utils.js", "icon-loader.js"]
  }
}
```

Components using the modules pattern:
- **maps**: Supports Leaflet and OpenLayers providers via `mapProvider` field
- **podcast**: Uses Shikwasa player with RSS parsing via dedicated modules

Note: The **video** partial supports multiple providers (YouTube, Vimeo, Cloudinary) but does not use the modules pattern - it handles provider switching internally.

Module organization:

```
component-name/
├── modules/
│   ├── providers/       # Alternative library implementations
│   │   ├── provider-a.js
│   │   └── provider-b.js
│   └── helpers/         # Shared utilities
│       ├── load-script.js
│       └── utils.js
├── manifest.json        # Includes "modules" field
└── component-name.js    # Main entry point, loads appropriate provider
```

## Advanced Component Features

### Maps Component Features

The maps component provides comprehensive interactive mapping capabilities with:

**Dual Provider Support:**
- **Leaflet**: Lightweight mapping library (145KB) ideal for basic maps needs
- **OpenLayers**: Enterprise-grade maps with advanced vector capabilities
- **Unified API**: Switch providers by changing just the `mapProvider` field

**Dynamic Library Loading:**
- Libraries loaded from CDN only when maps components are used
- Keeps initial bundle size small with tree-shaking optimization
- Supports multiple maps per page with different providers

**Advanced Marker System:**
- **JSON Data Architecture**: Map content stored in external JSON files (`/lib/data/maps/`) for clean separation from page configuration
- **Dynamic Icon Registry**: Build-time generation of icon registry from Feather icons used in maps sections
- **Consistent SVG Markers**: Unified marker design across both providers (48px standardized size)
- **Custom Icons**: Support for custom marker icons with automatic fallbacks
- **Interactive Popups**: Rich popup content with titles, descriptions, and external links

**Marker Clustering:**
- **Performance Optimization**: Groups nearby markers to handle large datasets efficiently
- **Provider Agnostic**: Works with both Leaflet and OpenLayers
- **Configurable Clustering**: Customizable radius, zoom thresholds, and visual styling
- **Interactive Expansion**: Click clusters to zoom in or expand at maximum zoom level

**Technical Architecture:**
- **Modular Structure**: Organized into providers (`leaflet.js`, `openlayers.js`) and helpers (`maps-utils.js`, `icon-loader.js`, `load-script.js`, `load-styles.js`)
- **Data Management**: Recursive JSON loading from `/lib/data/maps/` with automatic `data.maps.filename` access
- **Build-Time Optimization**: Icon registry auto-generated during build by `plugins/generate-maps-icons.js` to include only icons actually used
- **Icon Library**: 299 Feather icons available in `lib/layouts/icons/` for marker customization
- **Error Handling**: Graceful fallbacks for missing icons and failed library loads
- **Accessibility**: Proper ARIA attributes and screen reader support

### Podcast Component Features

The podcast component provides audio playback with RSS feed integration:

- **Shikwasa Player Integration**: Modern, lightweight audio player
- **RSS Feed Parsing**: Automatic episode loading from podcast RSS feeds
- **JSON Data Architecture**: Podcast feed configurations stored in `lib/data/podcasts/`
- **Modular Structure**: Organized with `rss-parser.js` and `load-shikwasa.js` modules
- **Dynamic Loading**: Player library loaded only when podcast components are used
- **Multiple Shows**: Support for multiple podcast feeds on a single page

### Video Component Features

The video partial supports multiple video providers:

- **Multi-Provider Support**: YouTube, Vimeo, and Cloudinary
- **Responsive Embeds**: Automatic aspect ratio handling
- **Provider Detection**: Automatic provider selection based on URL
- **Lightweight**: No external dependencies for basic video embedding

### Other Interactive Components

- **image-compare**: Before/after image comparison with draggable slider handle
- **simple-accordion**: Expandable/collapsible content sections
- **flip-cards**: Interactive card animations with front/back content
- **slider**: Carousel with pagination or tabbed interface
- **logos-list**: Auto-scrolling logo carousel with infinite loop
- **hero-slider**: Hero section with image carousel functionality

## Component Documentation

When creating documentation pages for components (`src/references/sections/` or `src/references/partials/`):

### Structure

```yaml
---
layout: pages/sections.njk
seo:
  title: [Component Name] - Metalsmith Components
  description: 'Brief SEO description'
card:
  title: '[Component Name]'
  description: 'Description for search and cards'
  tags: ['relevant', 'search', 'tags']  # For search functionality
sections:
  - sectionType: text-only
    # Overview section
  - sectionType: text-only
    # Usage examples with code
  - sectionType: component-name
    # Live example
  - sectionType: text-only
    # Integration notes
---
```

### Best Practices

- Focus on developer audience (how to use in templates)
- Include import statements and integration patterns
- Document only actual component features (not build plugin features)
- Provide multiple examples showing different configurations
- Add relevant tags for search discoverability

## Component Development Best Practices

### Semantic HTML

- Use appropriate HTML5 semantic elements
- Avoid div soup - use `<section>`, `<article>`, `<aside>`, etc.
- Maintain proper heading hierarchy

### Accessibility

- Include proper ARIA attributes for interactive elements
- Ensure keyboard navigation works
- Provide alt text for images
- Use semantic color (don't rely on color alone)
- Test with screen readers when possible

### CSS Best Practices

- Component-scoped styles only
- Use design tokens from `_design-tokens.css`
- Follow the patterns in [css-layouts.md](../skills/css-layouts.md)
- Use container queries for responsive behavior
- Avoid viewport-based media queries when possible

### JavaScript Best Practices

- Use ES modules syntax (`export default function`)
- Keep component JavaScript isolated
- Clean up event listeners in cleanup functions
- Handle missing DOM elements gracefully
- Avoid global state
- Make components SWUP-compatible (see [SWUP Compatibility](#swup-compatibility))

### Naming Conventions

- Use consistent property naming in frontmatter
- Class names should be descriptive and component-scoped
- Data attributes use kebab-case: `data-map-provider`
- JavaScript variables use camelCase
- CSS custom properties use kebab-case: `--component-spacing`

### Component Isolation

- Components should work in any container size
- Avoid assumptions about parent context
- Don't rely on global styles beyond design tokens
- Test component in multiple contexts
- Ensure portability to starter projects

## Testing New Components

When adding components:

1. **Manifest Tests**: Add test cases for the component's manifest structure
2. **Configuration Tests**: Test with various configuration options
3. **Rendering Tests**: Verify the component renders without errors
4. **Responsive Tests**: Test responsive behavior at different container sizes
5. **Accessibility Tests**: Verify keyboard navigation and screen reader support
6. **Starter Compatibility**: Validate against the Metalsmith2025 Starter structure

## Component Packaging

The component library includes an automated packaging system for distribution.

### Build-Time Package Generation

During production builds, the `lib/plugins/component-package-generator.js` plugin automatically:

- **Creates Individual Packages**: Generates ZIP files for each section and partial component
- **Bundles Complete Sets**: Creates complete section and partial bundle packages
- **Includes Documentation**: Each package contains README, examples, and usage instructions
- **Generates Install Scripts**: Automatic installation scripts for easy integration
- **Version Tracking**: Maintains version information and checksums for each package
- **Download URLs**: Embeds download URLs in component documentation pages

### Package Structure

Each component package includes:
- Component source files (.njk, .css, .js)
- manifest.json with dependencies
- Example frontmatter (.yml)
- README with integration instructions
- Installation script for automated setup

This system enables developers to quickly download and integrate individual components into their Metalsmith projects.

## Component Portability

Components are designed to be portable to the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter).

### Ensuring Portability

1. **No Hardcoded Paths**: Use relative paths or configuration-based paths
2. **Documented Dependencies**: All dependencies listed in manifest.json
3. **Self-Contained**: Component includes all necessary files
4. **Standard Patterns**: Follow established conventions for data loading
5. **Tested Integration**: Verify component works in starter environment

### Integration Checklist

Before marking a component as portable:

- [ ] All dependencies in manifest.json
- [ ] No library-specific paths or assumptions
- [ ] Works with standard design tokens
- [ ] Documentation includes integration steps
- [ ] Example frontmatter is complete and tested
- [ ] Component renders in isolation
- [ ] Tests pass in both library and starter

## SWUP Compatibility

All components with JavaScript are SWUP-compatible for smooth page transitions. This allows sites using SWUP to re-initialize components after each page swap without duplicating event listeners.

### Pattern for SWUP-Compatible Components

```javascript
/**
 * Initialize component
 */
function initMyComponent() {
  const elements = document.querySelectorAll('.my-component');

  elements.forEach((element) => {
    // Skip if already initialized (prevents duplicate listeners)
    if (element.dataset.initialized) return;
    element.dataset.initialized = 'true';

    // Component setup code here
    setupElement(element);
  });
}

// Register with page transitions for SWUP support
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initMyComponent);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMyComponent);
} else {
  initMyComponent();
}
```

### Components Requiring Cleanup

For components with intervals, observers, or other persistent state:

```javascript
/**
 * Cleanup component (stop intervals, disconnect observers)
 */
function cleanupMyComponent() {
  const elements = document.querySelectorAll('.my-component[data-initialized]');
  elements.forEach((element) => {
    if (element._intervalId) {
      clearInterval(element._intervalId);
    }
    if (element._resizeObserver) {
      element._resizeObserver.disconnect();
    }
  });
}

// Register cleanup with page transitions
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('my-component', initMyComponent);
  window.PageTransitions.registerCleanup('my-component', cleanupMyComponent);
}
```

### Key Points

1. **Initialization Tracking**: Always check `element.dataset.initialized` before setting up event listeners
2. **Cleanup Registration**: Components with intervals, observers, or fetch requests should register cleanup functions
3. **Backwards Compatible**: The `if (window.PageTransitions)` check ensures components work without SWUP
4. **Named Functions**: Extract initialization logic into named functions for re-usability
5. **Entry Point Setup**: If your script is the entry point for a bundler, initialize the `PageTransitions` registry at the top (see below)

### Setting Up the Entry Point

When using a bundler (esbuild, Webpack, Rollup), the entry point script runs before other bundled scripts. This creates a timing issue: component scripts try to register with `window.PageTransitions` before `page-transitions.js` has defined it.

**Solution - initialize the registry in the entry point:**

The simplest approach is to initialize the `PageTransitions` registry at the very top of your bundler entry point (e.g., `main.js`). This ensures the registry exists before any component scripts run:

```javascript
/**
 * Initialize PageTransitions registry at the very top of the entry point.
 * This ensures it exists before any component scripts try to register.
 * The actual SWUP initialization happens in page-transitions.js on DOMContentLoaded.
 */
if (!window.PageTransitions) {
  const componentRegistry = new Map();
  const cleanupRegistry = new Map();

  window.PageTransitions = {
    registerComponent: (name, initFn) => componentRegistry.set(name, initFn),
    registerCleanup: (name, cleanupFn) => cleanupRegistry.set(name, cleanupFn),
    // Expose registries for page-transitions.js to use
    _componentRegistry: componentRegistry,
    _cleanupRegistry: cleanupRegistry
  };
}
```

Then in `page-transitions.js`, use the existing registries instead of creating new ones:

```javascript
// Get registries from the global PageTransitions object
const componentRegistry = window.PageTransitions?._componentRegistry || new Map();
const cleanupRegistry = window.PageTransitions?._cleanupRegistry || new Map();
```

This approach is simpler and more reliable than deferring registration to `DOMContentLoaded`.

### Components with Cleanup Functions

These components register cleanup functions for proper SWUP support:

| Component | Cleanup Reason |
|-----------|----------------|
| artist-slider | Interval for auto-cycling |
| hero-slider | Interval for auto-play |
| logos-list | ResizeObserver |
| image-grid | ResizeObserver per grid |
| image-compare | IntersectionObserver, ResizeObserver |
| podcast | Shikwasa player instance |

### Using Page Transitions

To enable SWUP on your site, include the `page-transitions` partial in your layout and ensure your main content is wrapped in a SWUP container:

```html
<main class="transition-fade" id="swup">
  <!-- Page content -->
</main>
```

See the [page-transitions README](../../lib/layouts/components/_partials/page-transitions/README.md) for detailed setup instructions.

### Handling Multiple Layouts

Sites with multiple layouts (e.g., default and sidebar) need special handling. SWUP only replaces content inside `#swup`, so elements outside (like sidebars) persist during transitions.

The solution is to detect layout changes and force a full reload:

```javascript
function hasSidebarLayout(doc) {
  return doc.body.classList.contains('with-sidebar');
}

swup.hooks.on('page:view', (visit) => {
  const currentHasSidebar = hasSidebarLayout(document);
  const newHasSidebar = hasSidebarLayout(visit.to.document);

  if (currentHasSidebar !== newHasSidebar) {
    window.location.href = visit.to.url;
    return;
  }
});
```

This provides smooth transitions within the same layout type, and graceful reloads (with fade-out) when switching layouts.

## Reference Implementation

For best practices and patterns, refer to these well-established components:

- **text-only**: Simple section with good documentation patterns
- **hero**: Complex section with multiple configuration options
- **cards-list**: Data loading and iteration patterns
- **maps**: Multi-provider architecture example
- **collection-card**: Partial that works well in various contexts

Study these components when creating new ones to maintain consistency and quality.
