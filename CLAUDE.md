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

#### Partials (`lib/layouts/components/_partials/`)

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

#### Sections (`lib/layouts/components/sections/`)

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

See the [Testing Framework](#testing-framework) section below for how to validate your new component, and [DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md) for detailed best practices, lessons learned, and troubleshooting tips.

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

#### Maps Component Features

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

When adding components (see [Scaffolding a New Component](#scaffolding-a-new-component) for creation steps):

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

## Troubleshooting Guide

### Common Component Development Issues

#### Component Not Rendering

**Problem:** Component appears in frontmatter but doesn't render on the page.

**Solutions:**
1. Check `manifest.json` exists and has correct `type` field ("section" or "partial")
2. Verify `sectionType` in frontmatter matches component name exactly
3. Check template syntax in `.njk` file for errors
4. Run `npm run build:debug` to see detailed plugin output
5. Verify component is in correct directory (`sections/` or `_partials/`)

#### Styles Not Applied

**Problem:** Component renders but CSS styles are missing.

**Solutions:**
1. Check `manifest.json` has `styles` array with correct CSS filename
2. Verify CSS file exists in component directory
3. Clear build directory: `rm -rf build && npm run build`
4. Check browser console for 404 errors on CSS files
5. Verify PostCSS syntax is valid (no CSS-in-JS syntax)

#### JavaScript Not Executing

**Problem:** Interactive features don't work.

**Solutions:**
1. Check `manifest.json` has `scripts` array with correct JS filename
2. Verify JavaScript file exists in component directory
3. Check browser console for JavaScript errors
4. Ensure component has unique selectors (avoid generic class names)
5. Verify ES module syntax is correct (`export default function`)

#### Missing Dependencies

**Problem:** Component needs partials but they don't render.

**Solutions:**
1. Add required partials to `requires` array in `manifest.json`
2. Verify partial names match exactly (case-sensitive)
3. Check that required partials exist in `_partials/` directory
4. Run `npm test` to validate manifest structure
5. See [Component Structure](#component-structure) for manifest format

#### Build Errors

**Problem:** Build fails with errors.

**Solutions:**
1. Run `npm test` first to catch manifest/content issues early
2. Check for invalid YAML in `.yml` example files
3. Verify all required files exist (`.njk`, `manifest.json`)
4. Look for Nunjucks syntax errors in templates
5. Check the [Common Issues](#6-testing) list in scaffolding section

#### Module Pattern Issues (Maps, Podcast)

**Problem:** Multi-provider component not loading correct library.

**Solutions:**
1. Verify `modules` field in `manifest.json` has correct structure
2. Check provider files exist in `modules/providers/` directory
3. Ensure helper files are in `modules/helpers/` directory
4. Verify main component file loads correct provider based on data
5. Check browser console for CDN loading errors
6. See [Advanced: Multi-Provider Components](#2-required-files) section

#### Watch Mode Issues

**Problem:** Changes not triggering rebuild in development.

**Solutions:**
1. Restart development server: `npm start`
2. Check if file is excluded from watch (like auto-generated files)
3. Verify file is inside `src/`, `lib/layouts/`, or `lib/assets/`
4. Clear build directory and restart: `rm -rf build && npm start`
5. See [Watch Mode Exclusions](#watch-mode-exclusions) section

#### Search Not Finding Content

**Problem:** Component documentation doesn't appear in search results.

**Solutions:**
1. Add `tags` array to frontmatter `card` object
2. Ensure `seo.title` and `card.description` are descriptive
3. Rebuild to regenerate search index: `npm run build`
4. Verify page is in correct collection (sections/partials)
5. See [Site-Wide Search System](#site-wide-search-system) section

#### Collection Not Updating

**Problem:** New blog post or reference page not appearing in collection.

**Solutions:**
1. Verify file is in correct directory (`src/blog/`, `src/references/sections/`, etc.)
2. Check frontmatter has required fields (`card.date` for blog, `seo.title` for refs)
3. Ensure file extension is `.md`
4. Rebuild to regenerate collections: `npm run build`
5. See [Collections](#collections) section for collection patterns

#### Validation Errors

**Problem:** Content validation fails during build.

**Solutions:**
1. Check `manifest.json` validation schema matches your content structure
2. Verify all `required` fields are present in frontmatter
3. Check property types match schema (`string`, `object`, `array`, etc.)
4. Run `npm test` to see specific validation errors
5. Review example `.yml` file for correct structure

### Getting Help

If you encounter issues not covered here:

1. Check the [DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md) for lessons learned
2. Run tests for specific error messages: `npm test`
3. Enable debug output: `npm run build:debug` or `npm run start:debug`
4. Review component examples in `src/references/` for working patterns
5. Compare your component structure to working components like `text-only` or `hero`


# CSS Layout Development Skill

## Purpose

This skill provides prescriptive guidance for writing modern CSS layouts using intrinsic design principles, container queries, and fluid responsive techniques. When implementing CSS layouts, always consult this document first.

## Core Decision Framework

### When Starting Any Layout Task

1. **Identify the layout type needed:**

   - Stack: Vertical flow with consistent spacing
   - Cluster: Horizontal items that wrap
   - Sidebar: One intrinsic width column, one flexible
   - Grid: Multiple columns that adapt to space
   - Frame: Aspect ratio enforcement

2. **Determine responsiveness strategy:**

   - Use container queries for component-level adaptation
   - Use fluid values (clamp) for typography and spacing
   - Use quantity queries for content-aware layouts
   - Avoid fixed breakpoint media queries unless absolutely necessary

3. **Check for component reusability:**
   - Will this component appear in multiple contexts?
   - If yes, make it a container query candidate
   - If no, viewport-based queries may be acceptable

## Layout Primitives: Implementation Patterns

### Stack Pattern

**Use when:** You need consistent vertical spacing between elements.

```css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* With fluid spacing */
.stack {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 0.8rem + 1vw, 2rem);
}
```

**Key points:**

- Always use `gap` instead of margins on children
- Let the container handle all spacing
- Use custom properties for spacing values
- Scale spacing with clamp() for fluidity

### Cluster Pattern

**Use when:** You have inline items that should wrap naturally.

```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  align-items: center;
}
```

**Key points:**

- Always set `flex-wrap: wrap`
- Use `gap` for consistent spacing in both directions
- Consider `align-items` for vertical alignment
- Works for tags, buttons, inline metadata

### Sidebar Pattern

**Use when:** One element has intrinsic width, another is flexible.

```css
.sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
}

.sidebar > * {
  flex-grow: 1;
}

.sidebar > :first-child {
  flex-basis: 250px;
  flex-grow: 0;
}
```

**Key points:**

- The sidebar (first child) has fixed `flex-basis`
- The content (second child) grows with `flex-grow: 1`
- Will stack when space is insufficient
- Use logical properties: `flex-basis` not widths

### Adaptive Grid Pattern

**Use when:** You need columns that adjust to available space.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: var(--space-md);
}

/* With container queries */
.grid {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(1rem, 2cqw, 2rem);
}
```

**Key points:**

- Use `auto-fit` to collapse empty columns
- Use `minmax(min(250px, 100%), 1fr)` to prevent overflow
- The `min()` wrapper prevents the minimum from forcing overflow
- Never use fixed column counts with media queries

### Frame Pattern

**Use when:** You need to enforce aspect ratios.

```css
.frame {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

**Key points:**

- Always use `aspect-ratio` property
- Set `object-fit` on images inside
- Use `overflow: hidden` to contain content
- Provide fallback dimensions for older browsers

## Container Queries: Implementation Guide

### Setting Up Containers

```css
/* Define container */
.card-wrapper {
  container-name: card;
  container-type: inline-size;
}

/* Or shorthand */
.card-wrapper {
  container: card / inline-size;
}
```

**Key points:**

- Always name containers for clarity
- Use `inline-size` for width-based queries
- Can have multiple named containers in a tree
- Parent containers affect child container calculations

### Size Container Queries

```css
/* Basic pattern */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}

/* With container name */
@container card (min-width: 400px) {
  .card-content {
    padding: clamp(1rem, 2cqw, 2rem);
  }
}
```

**When to use:**

- Component layout changes based on available space
- Typography scaling relative to container
- Image sizing relative to container
- Any dimensional adaptation

**Common thresholds:**

- 300px: Minimum for horizontal card layout
- 400px: Comfortable horizontal layout
- 600px: Multi-column internal layouts
- Adjust based on actual content needs

### Style Container Queries

```css
/* Set custom property on container */
.card-wrapper {
  --featured: true;
}

/* Query it */
@container style(--featured: true) {
  .card {
    grid-template-columns: 1fr 1fr;
  }

  .card-thumb {
    grid-column: 1 / -1;
  }
}
```

**When to use:**

- Component variants (featured, compact, minimal)
- Theme switching at component level
- Conditional layouts based on configuration
- State-driven styling

**Key points:**

- Use boolean values: `true` or absent
- Can combine with size queries
- Cleaner than multiple class variants
- Enables declarative component configuration

### Container Query Units

```css
/* Typography with cqw */
.title {
  font-size: clamp(1rem, 1rem + 2cqw, 1.75rem);
}

/* Spacing with cqw */
.card {
  padding: clamp(0.5rem, 1cqw, 2rem);
  gap: clamp(0.5rem, 2cqw, 1.5rem);
}

/* Dimensions with cqw */
.card-thumb {
  flex: 0 0 clamp(70px, 10cqw + 70px, 150px);
}
```

**Available units:**

- `cqw`: 1% of container width
- `cqh`: 1% of container height
- `cqi`: 1% of container inline size
- `cqb`: 1% of container block size
- `cqmin`: Smaller of `cqi` or `cqb`
- `cqmax`: Larger of `cqi` or `cqb`

**Best practices:**

- Prefer `cqw` over `vw` for component-level scaling
- Always wrap in `clamp()` with min/max bounds
- Use for typography, spacing, and flexible dimensions
- Test at extreme container sizes

## Fluid Typography and Spacing

### Fluid Type Scale Pattern

```css
:root {
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --font-size-md: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
  --font-size-lg: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --font-size-xl: clamp(2rem, 1.6rem + 2vw, 3rem);
}
```

**How to calculate:**

- Minimum: Mobile size (typically 16px base)
- Maximum: Desktop size (typically 20px base)
- Growth factor: `(max - min) / viewport-range` as vw
- Formula: `clamp(min, min + growth-factor, max)`

**Use this calculator:**
https://min-max-calculator.9elements.com/

### Fluid Spacing Scale Pattern

```css
:root {
  --space-3xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
  --space-2xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-xs: clamp(0.75rem, 0.6rem + 0.75vw, 1.125rem);
  --space-sm: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-md: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --space-lg: clamp(2rem, 1.6rem + 2vw, 3rem);
  --space-xl: clamp(3rem, 2.4rem + 3vw, 4.5rem);
  --space-2xl: clamp(4rem, 3.2rem + 4vw, 6rem);
}
```

**Key points:**

- Maintain consistent ratios between steps
- Each step typically 1.5x the previous
- Use semantic names, not arbitrary numbers
- Reference these variables everywhere

### Component-Level Fluid Scaling

```css
.component {
  container-type: inline-size;
}

.component-title {
  /* Scales with container, not viewport */
  font-size: clamp(1rem, 1rem + 2cqw, 1.75rem);
}

.component-content {
  /* Spacing scales with container */
  padding: clamp(1rem, 2cqw, 2rem);
  gap: clamp(0.5rem, 1cqw, 1rem);
}
```

## Quantity Queries: Implementation Patterns

### Basic Quantity Query

```css
/* 4 or more items */
.section:has(.card:nth-last-child(n + 4)) {
  grid-template-columns: 1fr;
}

/* Exactly 3 items */
.section:has(.card:last-child:nth-child(3)) {
  grid-template-columns: repeat(3, 1fr);
}

/* Between 2 and 4 items */
.section:has(.card:nth-last-child(n + 2):nth-last-child(-n + 4)) {
  grid-template-columns: repeat(2, 1fr);
}
```

### Common Quantity Query Patterns

```css
/* Layout changes based on quantity */
.section {
  display: grid;
  gap: var(--space-md);
}

/* 1-3 items: horizontal layout */
.section:has(.card:nth-last-child(-n + 3)) {
  grid-template-columns: 200px 1fr;
}

/* 4+ items: vertical layout with compact header */
.section:has(.card:nth-last-child(n + 4)) {
  grid-template-columns: 1fr;
}

.section:has(.card:nth-last-child(n + 4)) .section-header {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
```

### Featured Items Based on Quantity

```css
/* Feature first item when 6+ items */
.section:has(.card:nth-last-child(n + 6)) .card:first-child {
  --featured: true;
  grid-column: 1 / -1;
}

/* Feature first two items when 8+ items */
.section:has(.card:nth-last-child(n + 8)) .card:nth-child(-n + 2) {
  --featured: true;
}
```

## Using :has() for Conditional Styling

### Content-Based Styling

```css
/* Card without image */
.card:not(:has(img)) {
  border-inline-start: 4px solid var(--color-accent);
  padding-inline-start: 1rem;
}

/* Card with image */
.card:has(img) {
  display: grid;
  grid-template-columns: auto 1fr;
}

/* Section with featured item */
.section:has([data-featured]) {
  grid-template-rows: auto 1fr;
}
```

### Sibling-Aware Styling

```css
/* First card when there's a second card */
.card:has(+ .card) {
  border-bottom: 1px solid var(--color-border);
}

/* Last card in a group */
.card:not(:has(+ .card)) {
  border-bottom: none;
}
```

## Grid vs Flexbox: Decision Matrix

### Use CSS Grid When:

- You need two-dimensional layout (rows AND columns)
- Items need precise positioning
- Layout areas are named and structured
- Overlapping elements are needed
- You want items to align across tracks

**Example scenarios:**

- Page layouts with header, sidebar, main, footer
- Card grids that adapt column count
- Dashboard layouts
- Magazine-style layouts

### Use Flexbox When:

- You need one-dimensional layout (row OR column)
- Items should distribute space flexibly
- Items need to wrap onto new lines
- Order of items might change
- Content size should drive layout

**Example scenarios:**

- Navigation bars
- Button groups
- Inline metadata (tags, dates, authors)
- Card internal content
- Form layouts

### Common Combinations

```css
/* Grid for overall structure, flex for content */
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Grid for main layout, flex for header */
.page {
  display: grid;
  grid-template-columns: 250px 1fr;
}

.page-header {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Defensive CSS Checklist

Before finalizing any CSS, verify these defensive patterns:

### ✓ Flexbox Items

```css
/* Always set min-width on flex items that could overflow */
.flex-item {
  min-width: 0;
}

/* Especially for images in flex containers */
.flex-item img {
  min-width: 0;
  max-width: 100%;
}
```

### ✓ Text Overflow

```css
/* Readable line length */
.prose {
  max-width: 65ch;
}

/* Long words */
.text {
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Truncate with ellipsis when needed */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### ✓ Images

```css
/* Prevent overflow */
img {
  max-width: 100%;
  height: auto;
}

/* Maintain aspect ratio in flex/grid */
.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Prevent too-small images */
.thumbnail {
  min-width: 48px;
  min-height: 48px;
}
```

### ✓ Variable Content Heights

```css
/* Use min-height, not height */
.card {
  min-height: 200px;
}

/* Allow growth */
.container {
  height: auto;
  min-height: 100vh;
}

/* Set max-height for very long content */
.description {
  max-height: 200px;
  overflow: auto;
}
```

### ✓ Empty States

```css
/* Handle empty containers gracefully */
.grid:empty {
  display: none;
}

/* Minimum content for empty sections */
.section:not(:has(*)) {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section:not(:has(*))::after {
  content: 'No content available';
  color: var(--color-muted);
}
```

## Common Patterns and Solutions

### Card Component Pattern

```css
.card {
  container: card / inline-size;
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 2cqw, 1rem);
  padding: clamp(1rem, 3cqw, 1.5rem);
}

/* Switch to horizontal at sufficient width */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: clamp(1rem, 3cqw, 2rem);
  }

  .card-thumbnail {
    flex: 0 0 clamp(100px, 15cqw, 200px);
    min-width: 0;
  }
}

/* Fluid typography inside card */
.card-title {
  font-size: clamp(1rem, 0.8rem + 2cqw, 1.5rem);
}

/* Featured variant */
@container style(--featured: true) {
  .card {
    background: var(--color-featured);
  }
}

/* No image variant */
.card:not(:has(.card-thumbnail)) {
  border-inline-start: 4px solid var(--color-accent);
  padding-inline-start: 1rem;
}
```

### Section Layout Pattern

```css
.section {
  container: section / inline-size;
  display: grid;
  gap: clamp(1rem, 2cqw, 2rem);
}

/* Default: sidebar layout for 1-3 items */
.section:has(.card:nth-last-child(-n + 3)) {
  grid-template-columns: 200px 1fr;
}

/* 4+ items: stacked with compact header */
.section:has(.card:nth-last-child(n + 4)) {
  grid-template-columns: 1fr;
}

.section:has(.card:nth-last-child(n + 4)) .section-header {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

/* Featured first item with 6+ total */
@container section (min-width: 600px) {
  .section:has(.card:nth-last-child(n + 6)) .card:first-child {
    --featured: true;
    grid-column: 1 / -1;
  }
}
```

### Responsive Grid Pattern

```css
.grid {
  container: grid / inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(1rem, 2cqw, 2rem);
}

/* Adjust minimum width at container sizes */
@container grid (min-width: 800px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  }
}

/* Dense packing for many items */
.grid:has(.item:nth-last-child(n + 12)) {
  grid-auto-flow: dense;
}
```

## Testing Requirements

Before considering any layout complete, test these scenarios:

### Content Variations

1. **Very long text:** Titles with 100+ characters, descriptions with 500+ words
2. **Very short text:** Single word titles, one sentence descriptions
3. **Missing content:** No images, no descriptions, empty sections
4. **Many items:** 1, 2, 5, 10, 20, 50 items
5. **Mixed content:** Some items with images, some without

### Container Variations

1. Place component in narrow sidebar (200px)
2. Place component in medium container (600px)
3. Place component in wide container (1200px)
4. Place component full-width
5. Nest component inside another component

### Browser Testing

1. Test in Chrome, Firefox, Safari
2. Verify container query support (fallback if needed)
3. Test `:has()` support (fallback if needed)
4. Verify `clamp()` calculations at extremes
5. Test logical property support

## Anti-Patterns to Avoid

### ❌ Don't: Fixed Breakpoints for Components

```css
/* BAD: Component knows about viewport */
.card {
  flex-direction: column;
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
  }
}
```

```css
/* GOOD: Component responds to container */
.card {
  container-type: inline-size;
  flex-direction: column;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### ❌ Don't: Magic Numbers

```css
/* BAD: Arbitrary value with no system */
.element {
  margin-top: 23px;
  padding: 17px;
}
```

```css
/* GOOD: System-based spacing */
.element {
  margin-top: var(--space-md);
  padding: var(--space-sm);
}
```

### ❌ Don't: Fixed Typography

```css
/* BAD: Jumps at breakpoints */
.title {
  font-size: 18px;
}

@media (min-width: 768px) {
  .title {
    font-size: 24px;
  }
}
```

```css
/* GOOD: Fluid scaling */
.title {
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);
}
```

### ❌ Don't: Class Variants for State

```css
/* BAD: Multiple classes for variants */
.card {
  /* base */
}
.card--featured {
  /* featured variant */
}
.card--compact {
  /* compact variant */
}
.card--featured-compact {
  /* combined variant */
}
```

```css
/* GOOD: Style queries with custom properties */
.card {
  /* base styles */
}

@container style(--featured: true) {
  .card {
    /* featured styles */
  }
}

@container style(--compact: true) {
  .card {
    /* compact styles */
  }
}
```

### ❌ Don't: Viewport Units Without Boundaries

```css
/* BAD: Unbounded growth */
.title {
  font-size: 2vw; /* Too small on mobile, too large on desktop */
}
```

```css
/* GOOD: Bounded with clamp */
.title {
  font-size: clamp(1.5rem, 2vw, 3rem);
}
```

## Quick Reference: Common Values

### Fluid Typography Scale

```css
--font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
--font-size-md: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);
--font-size-lg: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--font-size-xl: clamp(2rem, 1.6rem + 2vw, 3rem);
--font-size-2xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
```

### Fluid Spacing Scale

```css
--space-3xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
--space-2xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
--space-xs: clamp(0.75rem, 0.6rem + 0.75vw, 1.125rem);
--space-sm: clamp(1rem, 0.8rem + 1vw, 1.5rem);
--space-md: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
--space-lg: clamp(2rem, 1.6rem + 2vw, 3rem);
--space-xl: clamp(3rem, 2.4rem + 3vw, 4.5rem);
--space-2xl: clamp(4rem, 3.2rem + 4vw, 6rem);
--space-3xl: clamp(6rem, 4.8rem + 6vw, 9rem);
```

### Container Query Breakpoints

```css
/* Typical component breakpoints */
@container (min-width: 300px) {
  /* Minimum for horizontal layout */
}
@container (min-width: 400px) {
  /* Comfortable horizontal */
}
@container (min-width: 600px) {
  /* Multi-column internal */
}
@container (min-width: 800px) {
  /* Full-featured layout */
}
```

### Common Grid Patterns

```css
/* Auto-fit responsive grid */
grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));

/* Two-column with flexible sidebar */
grid-template-columns: minmax(200px, 250px) 1fr;

/* Holy grail layout */
grid-template-areas:
  'header header header'
  'sidebar main aside'
  'footer footer footer';
```

## Resources

- Clamp Calculator: https://min-max-calculator.9elements.com/
- Quantity Query Tool: https://css-tip.com/quantity-queries/
- Container Query Support: https://caniuse.com/css-container-queries
- Every Layout: https://every-layout.dev/
- Utopia Fluid Responsive Design: https://utopia.fyi/

## Summary

When writing CSS:

1. Start with the appropriate layout primitive
2. Make components container-aware, not viewport-aware
3. Use fluid values with clamp() for typography and spacing
4. Leverage quantity queries for content-aware layouts
5. Apply defensive techniques for variable content
6. Test across content and container variations
7. Avoid magic numbers and arbitrary breakpoints

The goal is resilient, adaptive layouts that work across infinite contexts without brittle overrides or complex media query chains.
