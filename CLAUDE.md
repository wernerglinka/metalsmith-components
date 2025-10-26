# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Metalsmith Components library - a comprehensive showcase and reference implementation for building modern websites with Metalsmith using a component-based architecture. It demonstrates structured content in frontmatter instead of traditional Markdown, where each component is self-contained with its own styles and scripts that are automatically bundled only when used.

## Development Commands

### Core Development

- `npm start` - Start development server with watch mode and live reloading at http://localhost:3000
- `npm run start:debug` - Start development server with debug output for all @metalsmith\* plugins
- `npm run build` - Create production build in `build/` directory
- `npm run build:debug` - Production build with debug output for metalsmith-optimize-html
- `npm run serve` - Serve the build directory with Browser-Sync

### Code Quality & Testing

- `npm test` - Run all tests using Mocha
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format all code with Prettier (excludes .njk files)
- `npm run lint` - Lint and fix JavaScript with ESLint
- `npm run lint:css` - Lint and fix CSS with Stylelint
- `npm run fix` - Run format, lint, and lint:css in sequence

### Utility Scripts

- `npm run depcheck` - Check for unused dependencies

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

#### Partials (`lib/layouts/components/_partials/`) - 21 Components

Small, reusable UI elements used within larger sections or as standalone elements:

- **audio** - Audio player element
- **author-date** - Author and publication date display
- **branding** - Logo and branding element
- **breadcrumbs** - Navigation breadcrumbs
- **button** - CTA button element
- **collection-card** - Card for displaying collection items
- **collection-pagination** - Pagination controls for collections
- **ctas** - Call-to-action links/buttons array
- **dark-light-theme-switcher** - Theme toggle control
- **flip-card** - Single flip card element
- **icon** - Icon display element
- **image** - Image element with caption support
- **lottie** - Lottie animation element
- **manual-card** - Manually configured card element
- **navigation** - Main navigation menu
- **overlay** - Overlay/modal element
- **search** - Search interface element
- **slider-pagination** - Pagination controls for sliders
- **text** - Text content element (title, prose, etc.)
- **text-link** - Styled text link element
- **video** - Video player element (supports YouTube, Vimeo, Cloudinary)

#### Sections (`lib/layouts/components/sections/`) - 30 Components

Large page sections and main building blocks for page layouts:

- **audio-only** - Audio player sections
- **banner** - Call-to-action banner sections with flexible backgrounds
- **blog-author** - Author information for blog posts
- **blog-navigation** - Previous/next blog post navigation
- **blurbs** - Grid of content blurbs (text cards)
- **cards-list** - Displays cards from data or array
- **code** - Code block display with syntax highlighting
- **collection-list** - Lists collections (blog posts, references, etc.)
- **columns** - Multi-column layout for custom content
- **commons** - Base container and styling component (required dependency for most sections)
- **compound** - Composable multi-section layout
- **flip-cards** - Interactive flip card animations
- **footer** - Site footer
- **header** - Site header/navigation
- **hero** - Full-screen or standard hero sections with background images
- **hero-slider** - Hero section with image carousel
- **icon-only** - Display-only icon section
- **image-compare** - Before/after image comparison slider
- **image-only** - Image display section
- **logos-list** - Auto-scrolling logo carousel
- **lottie-only** - Lottie animation display
- **maps** - Interactive maps with Leaflet/OpenLayers providers (multi-provider component)
- **multi-media** - Combined media sections
- **podcast** - Podcast player with RSS parsing (multi-provider component)
- **search-only** - Search functionality section
- **simple-accordion** - Expandable/collapsible content sections
- **slider** - Image/content carousel with pagination
- **testimonial** - Customer quotes/testimonials with attribution
- **text-only** - Pure content sections with markdown support
- **video-only** - Video player section

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

#### 5. Creating Reference Pages

Add a reference page in `src/references/sections/component-name.md` (for sections) or `src/references/partials/component-name.md` (for partials) with:
- Multiple examples showing different configurations
- Clear section explaining features and options
- Implementation notes if needed

The references pages are automatically included in their respective collections (sections or partials) - no manual linking needed.

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

When creating documentation pages for components (`src/references/sections/` or `src/references/partials/`):

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

### Advanced Component Features

#### Mapping Component Features

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
- **Modular Structure**: Organized into providers (`leaflet.js`, `openlayers.js`) and helpers (`maps-utils.js`, `icon-loader.js`, `load-script.js`, `load-styles.js`)
- **Data Management**: Recursive JSON loading from `/lib/data/maps/` with automatic `data.maps.filename` access
- **Build-Time Optimization**: Icon registry auto-generated during build by `plugins/generate-maps-icons.js` to include only icons actually used
- **Icon Library**: 299 Feather icons available in `lib/layouts/icons/` for marker customization
- **Error Handling**: Graceful fallbacks for missing icons and failed library loads
- **Accessibility**: Proper ARIA attributes and screen reader support

#### Podcast Component Features

The podcast component provides audio playback with RSS feed integration:

- **Shikwasa Player Integration**: Modern, lightweight audio player
- **RSS Feed Parsing**: Automatic episode loading from podcast RSS feeds
- **JSON Data Architecture**: Podcast feed configurations stored in `lib/data/podcasts/`
- **Modular Structure**: Organized with `rss-parser.js` and `load-shikwasa.js` modules
- **Dynamic Loading**: Player library loaded only when podcast components are used
- **Multiple Shows**: Support for multiple podcast feeds on a single page

#### Video Component Features

The video partial supports multiple video providers:

- **Multi-Provider Support**: YouTube, Vimeo, and Cloudinary
- **Responsive Embeds**: Automatic aspect ratio handling
- **Provider Detection**: Automatic provider selection based on URL
- **Lightweight**: No external dependencies for basic video embedding

#### Other Interactive Components

- **image-compare**: Before/after image comparison with draggable slider handle
- **simple-accordion**: Expandable/collapsible content sections
- **flip-cards**: Interactive card animations with front/back content
- **slider**: Carousel with pagination or tabbed interface
- **logos-list**: Auto-scrolling logo carousel with infinite loop
- **hero-slider**: Hero section with image carousel functionality

### Site-Wide Search System

The component library includes a comprehensive search system for discovering content across the entire site.

#### Search Architecture (Two-Layer Design)

**Layer 1: Build-Time Index Generation**
- **Plugin**: `metalsmith-search` generates a unified search index at build time
- **Output**: Creates `search-index.json` with 200+ entries including pages, sections, and structured content
- **Data Structure**: Indexes title, content, tags, leadIn, prose, and section-level content
- **Comprehensive**: Single index covers all site content (library components, partials, blog posts, documentation)

**Layer 2: Client-Side Filtering**
- **Search Component**: `lib/layouts/components/_partials/search/` provides the search UI
- **Fuzzy Search**: Uses Fuse.js for initial fuzzy matching
- **Strict Filtering**: JavaScript applies exact substring matching to eliminate false positives
- **Real-Time**: Instant search results as users type with quality filtering

#### Search Quality Features
- **Relevance Threshold**: Minimum 50% relevance score required
- **Exact Match Requirement**: Search term must exist as substring in result content
- **Multi-Field Search**: Searches across title, pageName, content, tags, leadIn, prose, and section content
- **False Positive Prevention**: Two-layer approach ensures only valid matches reach users

#### Using Search in Pages
To add search functionality to any page, include the search section in your frontmatter:
```yaml
sections:
  - sectionType: search
    placeholder: 'Search components...'
    settings:
      maxResults: 20
      minCharacters: 2
```

The search automatically uses `/search-index.json` unless a custom source is specified via `source` or `settings.source`.

### Component Packaging System

The component library includes an automated component packaging system that generates downloadable ZIP files for easy component distribution and installation.

#### Build-Time Package Generation

During production builds, the `lib/plugins/component-package-generator.js` plugin automatically:

- **Creates Individual Packages**: Generates ZIP files for each section and partial component
- **Bundles Complete Sets**: Creates complete section and partial bundle packages
- **Includes Documentation**: Each package contains README, examples, and usage instructions
- **Generates Install Scripts**: Automatic installation scripts for easy integration
- **Version Tracking**: Maintains version information and checksums for each package
- **Download URLs**: Embeds download URLs in component documentation pages

#### Package Structure

Each component package includes:
- Component source files (.njk, .css, .js)
- manifest.json with dependencies
- Example frontmatter (.yml)
- README with integration instructions
- Installation script for automated setup

This system enables developers to quickly download and integrate individual components into their Metalsmith projects.

## Key Files & Configuration

### Build Configuration

- `metalsmith.js` - Main build configuration with all plugins and settings
- `package.json` - Dependencies, scripts, and project metadata (Node.js >=18.0.0 required)
- `eslint.config.js` - ESLint configuration for JavaScript linting
- `prettier.config.js` - Prettier formatting rules (excludes .njk files)
- `plugins/generate-maps-icons.js` - Build-time icon registry generation for maps components
- `lib/plugins/component-package-generator.js` - Component packaging system (production-only)

### Content Structure

- `src/` - Source content pages (Markdown files with frontmatter)
  - `src/index.md` - Homepage
  - `src/blog.md` - Blog index with pagination
  - `src/blog/` - Blog posts (12 articles)
  - `src/references/sections/` - Section component reference pages (31 files)
  - `src/references/partials/` - Partial component reference pages (21 files)
- `lib/data/` - Global JSON data files
  - `site.json` - Site configuration
  - `author.json` - Author information
  - `socialLinks.json` - Social media links
  - `lib/data/maps/` - Map data JSON files (london-landmarks.json, paris-monuments.json, nyc-clustering-demo.json)
  - `lib/data/podcasts/` - Podcast RSS feed configurations (4 files)
  - `lib/data/blurbs/` - Blurbs content data (2 files)
  - Additional data: artMuseums.json, awards.json, faqs.json
- `lib/layouts/` - Templates, components, and icons
  - `lib/layouts/components/_partials/` - 21 partial components
  - `lib/layouts/components/sections/` - 30 section components
  - `lib/layouts/pages/` - Page templates (sections.njk, etc.)
  - `lib/layouts/icons/` - 299 Feather icon SVG templates
- `lib/assets/` - Images, main CSS/JS entry points, and global styles
  - `main.css` - Main CSS entry point (processed through component bundler)
  - `main.js` - Main JavaScript entry point (bundled with esbuild)
  - `styles/` - Design tokens and base styles

### Build Output

- `build/` - Generated static site (git-ignored)
  - `build/assets/` - Bundled and optimized CSS/JS
  - `build/search-index.json` - Search index for site-wide search
  - `build/downloads/` - Component packages (production builds only)

## Testing Framework

Comprehensive test suite using Mocha:

### Test Files

Four comprehensive test suites using Mocha:

- `test/component-manifests.test.js` - Validates manifest.json existence and structure for all 51 components (partials and sections)
- `test/build-integration.test.js` - Tests complete Metalsmith build pipeline, HTML generation, collections, pagination, and static assets
- `test/content-structure.test.js` - Verifies frontmatter structure, global data file validity, SEO metadata, and content consistency
- `test/component-dependency-bundler.test.js` - Tests component directory structure, file associations, manifest dependencies, and bundler integration

### Testing New Components

When adding components:

1. Add test cases for the component's manifest
2. Test with various configuration options
3. Verify the component renders without errors
4. Test responsive behavior and accessibility
5. Validate against the Metalsmith2025 Starter structure

## Important Development Notes

### Collections

Three collections are automatically created during the build:

- **blog**: Blog posts from `blog/*.md`, sorted by `card.date`
- **sections**: Section documentation from `references/sections/*.md`, sorted by `seo.title`
- **partials**: Partial documentation from `references/partials/*.md`, sorted by `seo.title`

These collections power the blog pagination, library search, and partials search features.

### Watch Mode Exclusions

The `icon-loader.js` file in the maps component is excluded from watch mode (`lib/layouts/components/sections/maps/modules/helpers/icon-loader.js`) because it's auto-generated during builds. Including it would cause infinite rebuild loops.

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

### Nunjucks Filters

46 custom filters available globally in templates across 8 categories:

**String Filters** (`nunjucks-filters/string-filters.js`):
- `toLower`, `toUpper`, `spaceToDash`, `condenseTitle`, `trimSlashes`, `trimString`

**Date Filters** (`nunjucks-filters/date-filters.js`):
- `currentYear`, `UTCdate`, `blogDate`, `getDate`, `getMonthYear`

**Markdown Filter** (`nunjucks-filters/markdown-filter.js`):
- `mdToHTML` - Convert markdown to HTML

**Array Filters** (`nunjucks-filters/array-filters.js`):
- `getSelections`, `toArray`, `getArrayLength`, `isArray`, `isRelated`

**Debug Filters** (`nunjucks-filters/debug-filters.js`):
- `objToString`, `myDump`, `safeDump`, `debugCollections`

**Validation Filters** (`nunjucks-filters/validation-filters.js`):
- `isExternal`, `isString`, `hasImage`, `hasCtas`, `hasText`, `hasAuthor`, `hasUrl`, `hasItems`, `hasIcon`

**Object Filters** (`nunjucks-filters/object-filters.js`):
- `normalizeIcon`, `mergeProps`, `merge`, `getDownloadUrl`

These filters are essential for template development and are automatically available in all Nunjucks templates.

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
