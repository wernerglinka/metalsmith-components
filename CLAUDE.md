# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Metalsmith Components library - a comprehensive showcase and reference implementation for building modern websites with Metalsmith using a component-based architecture. It demonstrates structured content in frontmatter instead of traditional Markdown, where each component is self-contained with its own styles and scripts that are automatically bundled only when used.

## Development Commands

### Core Development

- `npm start` - Start development server with watch mode and live reloading at http://localhost:3000
- `npm run start:debug` - Start development server with debug output for all @metalsmith\* plugins
- `npm run build` - Create production build in `build/` directory
- `npm run serve` - Serve the build directory with Browser-Sync

### Code Quality & Testing

- `npm test` - Run all tests using Mocha
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format all code with Prettier (excludes .njk files)
- `npm run lint` - Lint and fix JavaScript with ESLint
- `npm run lint:css` - Lint and fix CSS with Stylelint
- `npm run fix` - Run format, lint, and lint:css in sequence

### Release Process

- `npm run release` - Create patch release using secure shell script
- `npm run release:patch` - Create patch release
- `npm run release:minor` - Create minor release
- `npm run release:major` - Create major release

**Note**: Releases use `./scripts/release.sh` which securely manages GitHub tokens via `gh auth token` and includes `--ci` flag automatically.

## Architecture & Component System

### Core Concept

This project uses **structured content in frontmatter** instead of traditional Markdown body content. Pages are defined using YAML sections that reference reusable components:

```yaml
---
layout: pages/sections.njk
sections:
  - sectionType: hero
    text:
      title: 'Welcome to Metalsmith Components'
      prose: 'Build modern websites with reusable components'
  - sectionType: media-image
    text:
      title: 'Feature Showcase'
    image:
      src: '/assets/images/feature.jpg'
---
```

### Component Architecture

Components are organized in two main categories:

#### Partials (`lib/layouts/components/_partials/`)

Small, reusable UI elements:

- author-date, branding, breadcrumbs, ctas, head, image, logo, navigation, text
- Used within larger sections or as standalone elements

#### Sections (`lib/layouts/components/sections/`)

Large page sections:

- hero, banner, media-image, text-only, slider, flip-cards, logos-list, testimonial, columns, blog-list, maps
- Main building blocks for page layouts

### Component Structure

Each component contains:

- `component-name.yml` - Frontmatter example
- `component-name.njk` - Nunjucks template
- `component-name.css` - Component-specific styles (optional)
- `component-name.js` - Interactive behavior (optional)
- `manifest.json` - Dependencies and metadata
- `README.md` - Documentation (optional)

### Component Dependency Bundling

The `metalsmith-bundled-components` plugin automatically:

1. Scans pages to identify which components are used
2. Bundles only required CSS/JS for optimal performance
3. Applies PostCSS processing (autoprefixing, minification)
4. Generates per-page assets with no unused code

### Scaffolding a New Component

When creating a new component, follow these steps to ensure proper integration:

#### 1. Create Component Directory
```bash
mkdir -p lib/layouts/components/sections/[component-name]
# or for partials:
mkdir -p lib/layouts/components/_partials/[component-name]
```

#### 2. Required Files

**manifest.json** - Must follow this exact structure:
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

**Advanced: Multi-Provider Components with Modules**

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
- **video**: Supports YouTube, Vimeo, and Cloudinary via `video.src` enum
- **podcast**: Uses Shikwasa player with RSS parsing via dedicated modules

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

**component-name.yml** - Example frontmatter configuration
**component-name.njk** - Nunjucks template
**component-name.css** - Component styles (optional)
**component-name.js** - Component JavaScript (optional)

#### 3. Data Loading Pattern

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

#### 4. Helper Functions

Common helper functions are globally available in templates:
- `hasText` - Check if text object has content
- `hasCtas` - Check if CTAs array exists and has items
- `getSelections` - Filter data array by ID selections

These are NOT declared in manifest.json - they're provided by the build system.

#### 5. Creating Demo Pages

Add a demo page in `src/library/component-name.md` with:
- Multiple examples showing different configurations
- Clear section explaining features and options
- Implementation notes if needed

The library page (`src/library.md`) uses a `collection-list` section that automatically includes all pages in the `/library/` folder - no manual linking needed.

#### 6. Testing

After creating a component:
1. Run `npm test` to ensure manifest validation passes
2. Run `npm run build` to verify the component bundles correctly
3. Run `npm start` to test the component in the development server

Common issues:
- Missing `type` field in manifest.json
- Using deprecated manifest structure
- Incorrect `requires` dependencies
- Template syntax errors with helper functions

See [DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md) for detailed best practices, lessons learned, and troubleshooting tips.

### Component Documentation

When creating documentation pages for components (`src/library/` or `src/partials/`):

**Structure:**
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

**Best Practices:**
- Focus on developer audience (how to use in templates)
- Include import statements and integration patterns
- Document only actual component features (not build plugin features)
- Provide multiple examples showing different configurations
- Add relevant tags for search discoverability

### Mapping Component Features

The maps component provides comprehensive interactive mapping capabilities with:

#### Dual Provider Support
- **Leaflet**: Lightweight mapping library (145KB) ideal for basic maps needs
- **OpenLayers**: Enterprise-grade maps with advanced vector capabilities
- **Unified API**: Switch providers by changing just the `mapProvider` field

#### Dynamic Library Loading
- Libraries loaded from CDN only when maps components are used
- Keeps initial bundle size small with tree-shaking optimization
- Supports multiple maps per page with different providers

#### Advanced Marker System
- **JSON Data Architecture**: Map content stored in external JSON files (`/lib/data/maps/`) for clean separation from page configuration
- **Dynamic Icon Registry**: Build-time generation of icon registry from Feather icons used in maps sections
- **Consistent SVG Markers**: Unified marker design across both providers (48px standardized size)
- **Custom Icons**: Support for custom marker icons with automatic fallbacks
- **Interactive Popups**: Rich popup content with titles, descriptions, and external links

#### Marker Clustering
- **Performance Optimization**: Groups nearby markers to handle large datasets efficiently
- **Provider Agnostic**: Works with both Leaflet and OpenLayers
- **Configurable Clustering**: Customizable radius, zoom thresholds, and visual styling
- **Interactive Expansion**: Click clusters to zoom in or expand at maximum zoom level

#### Technical Architecture
- **Modular Structure**: Organized into providers (`leaflet.js`, `openlayers.js`) and helpers (`maps-utils.js`, `icon-loader.js`)
- **Data Management**: Recursive JSON loading from `/lib/data/maps/` with automatic `data.maps.filename` access
- **Build-Time Optimization**: Icon registry auto-generated during build to include only icons actually used
- **Error Handling**: Graceful fallbacks for missing icons and failed library loads
- **Accessibility**: Proper ARIA attributes and screen reader support

### Library Search System

The component library includes a dedicated search system for discovering components by name, description, or tags.

#### Search Index Generation
- **Plugin**: `plugins/generate-library-search-index.js` generates a JSON search index at build time
- **Output**: Creates `library-search-index.json` with metadata for all library components
- **Data Structure**: Includes title, description, URL, and tags for each component

#### Component Tagging
- **Location**: Tags are stored in the `card.tags` array in each library page's frontmatter
- **Purpose**: Enable discovery by functionality, use case, or component type
- **Examples**: `['hero', 'banner', 'fullscreen', 'cta']` for hero components

#### Search Implementation
- **Search Partial**: `lib/layouts/components/_partials/search/` provides the search UI
- **Client-Side**: Uses Fuse.js for fuzzy search capabilities
- **Real-Time**: Instant search results as users type
- **Search Fields**: Searches across title, description, and tags

#### Using Search in Pages
To add search functionality to any page, include the search partial in your frontmatter:
```yaml
sections:
  - sectionType: search
    searchIndex: '/library-search-index.json'
    placeholder: 'Search components...'
```

## Key Files & Configuration

### Build Configuration

- `metalsmith.js` - Main build configuration with all plugins and settings
- `package.json` - Dependencies, scripts, and project metadata
- `eslint.config.js` - ESLint configuration
- `prettier.config.js` - Prettier formatting rules
- `plugins/generate-maps-icons.js` - Build-time icon registry generation for maps components
- `plugins/generate-library-search-index.js` - Build-time search index generation for library components

### Content Structure

- `src/` - Source content pages (Markdown files with frontmatter)
- `lib/data/` - Global JSON data files (site.json, author.json, etc.)
- `lib/data/maps/` - Map data JSON files for maps components
- `lib/layouts/` - Templates, components, and icons
- `lib/assets/` - Images, main CSS/JS entry points, and global styles

### Build Output

- `build/` - Generated static site (git-ignored)

## Testing Framework

Comprehensive test suite using Mocha:

### Test Files

- `test/build-integration.test.js` - Validates the Metalsmith build pipeline
- `test/component-manifests.test.js` - Ensures all components have valid manifests
- `test/content-structure.test.js` - Verifies frontmatter and data file structure
- `test/component-dependency-bundler.test.js` - Tests the bundling system

### Testing New Components

When adding components:

1. Add test cases for the component's manifest
2. Test with various configuration options
3. Verify the component renders without errors
4. Test responsive behavior and accessibility
5. Validate against the Metalsmith2025 Starter structure

## Important Development Notes

### Nunjucks Template Formatting

**All Nunjucks template files (`.njk`) are excluded from Prettier formatting** due to compatibility issues. When editing `.njk` files, format them manually using consistent indentation and spacing to match the project's style.

### Environment Variables

- `NODE_ENV=development` - Enables watch mode, includes drafts, disables HTML minification
- `NODE_ENV=production` - Production build with optimizations
- `BASE_PATH` - For subdirectory deployment (optional)
- `DEBUG=@metalsmith*` - Enable debug output for all Metalsmith plugins

### Relationship to Metalsmith2025 Starter

This component library demonstrates the same paradigm used by the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter). Components are designed to be compatible with the starter's architecture for easy importing and integration.

## Code Conventions

### JavaScript

- ES modules syntax (`import`/`export`)
- JSDoc comments for functions and classes
- Functional programming patterns preferred
- No TypeScript - uses JSDoc type annotations for IDE support

### Component Development

- Follow semantic HTML practices
- Include proper ARIA attributes for accessibility
- Use consistent property naming conventions
- Maintain component isolation and reusability
- Test component portability to starter projects

### CSS

- PostCSS with autoprefixer and cssnano
- Component-scoped styles
- Design tokens in `_design-tokens.css`
- Base styles in `_css-base.css`

When working with this codebase, always run tests before committing changes and ensure new components follow the established patterns and validation requirements.
