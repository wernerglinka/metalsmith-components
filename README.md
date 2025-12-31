<p align="center">
  <a href="https://www.metalsmith.io">
    <img alt="Metalsmith" src="https://www.glinka.co/assets/images/metalsmith2025-logo-bug.png" width="80" />
  </a>
</p>
<h1 align="center">
  Metalsmith Components
</h1>

A reference implementation and documentation site for building component-based static sites with Metalsmith. The library contains 59 production-ready components (21 partials, 38 sections) that use structured content in frontmatter rather than Markdown body content. Each component manages its own template, styles, and scripts, which are automatically bundled only when used on pages.

This library provides the component catalog for the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter). All components are compatible with the starter's architecture and can be integrated into projects using the automated packaging system.

[View the live site](https://metalsmith-components.com)

## What This Site Provides

### Component Library

The library contains 59 production-ready components organized in two categories:

**21 Partials** - Small, reusable UI elements used within larger sections:

- audio, author-date, branding, breadcrumbs, button, collection-card, collection-pagination, ctas, dark-light-theme-switcher, flip-card, icon, image, lottie, manual-card, navigation, overlay, search, slider-pagination, text, text-link, video

**38 Sections** - Large page sections and main building blocks:

- accordion, artist-slider, audio-only, banner, blog-author, blog-navigation, blurbs, calendar, cards-list, code, collection-list, columns, commons, compound, flip-cards, footer, header, hero, hero-slider, icon-only, image-compare, image-grid, image-only, logos-list, lottie-only, maps, multi-media, podcast, pricing-table, search-only, slider, stats, steps, team-grid, testimonial, text-only, timeline, video-only

**Advanced Components**:

- **maps**: Dual provider support (Leaflet, OpenLayers) with JSON data architecture, custom markers from 299 Feather icons, and marker clustering for large datasets
- **podcast**: Shikwasa player integration with RSS feed parsing from JSON configurations
- **video**: Multi-provider support (YouTube, Vimeo, Cloudinary) with responsive embeds
- **search**: Two-layer architecture using metalsmith-search plugin for build-time indexing plus client-side Fuse.js filtering
- **pricing-table**: Pricing tier comparison with cards and comparison table layouts
- **team-grid**: Team member profiles with grid/compact layouts and modal bios using native `<dialog>`
- **timeline**: Chronological events with vertical (alternating) and horizontal layouts
- **stats**: Impact numbers and metrics with grid, row, and compact layouts
- **steps**: Process/how-it-works flows with numbered steps, icons, and connector lines
- **image-grid**: Justified gallery layout for artist portfolios with automatic aspect ratio calculation and hover overlays

### Documentation & Learning

The site includes 13 technical guides covering component development and implementation:

- **Building Pages with Metalsmith Components** - Construct pages from reusable components defined in structured frontmatter
- **How Component Bundling Works** - Deep dive into automatic component discovery and bundling with metalsmith-bundled-components
- **Building a Site-Wide Search System** - Implement robust search using metalsmith-search plugin and client-side Fuse.js filtering
- **Working with Data in Metalsmith Components** - Structure, load, and use JSON data files in components
- **Building Interactive Components with JavaScript** - JavaScript patterns for dynamic library loading, event handling, and state management without frameworks
- **Understanding Component Validation with Manifest Schemas** - Use JSON Schema validation in manifest.json files to catch errors early
- **Theming Architecture** - Implement dark mode with semantic color tokens and adaptive sections
- **Section Anatomy** - Deep dive into component architecture with YAML configuration and Nunjucks templates
- **Building Structured Pages** - Understand how Metalsmith transforms YAML configurations into HTML pages
- **Getting Started with the Metalsmith2025 Starter** - Complete guide from installation to deployment
- **Installing Metalsmith Components in Your Project** - Download and install component packages with automated install scripts
- **Adding a Top Message Bar to Your Header** - Implement a dismissible announcement bar with cookie persistence and dark mode support

### Technical Implementation

The build system implements several architectural patterns for optimal performance:

- **Component Dependency Bundling**: `metalsmith-bundled-components` scans all pages and bundles only CSS/JS for components actually used, creating single site-wide optimized files
- **PostCSS Processing**: Automatic autoprefixing, stylelint validation, and cssnano minification for all component styles
- **Component Encapsulation**: Each component contains its own `.njk` template, `.css` styles, `.js` scripts, and `manifest.json` with dependencies and JSON Schema validation
- **Zero Runtime Dependencies**: Outputs pure HTML/CSS/JS without framework overhead (React, Vue, etc.)
- **Build-Time Search Indexing**: `metalsmith-search` generates unified search index from 200+ entries across pages, sections, and structured content
- **JSON Data Architecture**: External data files in `lib/data/` provide clean separation between content and configuration for maps, podcasts, blurbs, and collections
- **Component Packaging**: Automated ZIP package generation during production builds with install scripts for easy distribution
- **46 Nunjucks Filters**: Custom template filters across 8 categories (string, date, markdown, array, debug, validation, object)

## Using This Library

### For Metalsmith2025 Starter Users

To integrate components from this library into projects built with the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter):

1. Browse the live site or source code to identify needed components
2. Download component packages from production builds (available in `build/downloads/`)
3. Run the included install script to copy component files to your project's `lib/layouts/components/` directory
4. Add component dependencies to your project if not already present
5. Use components in page frontmatter by specifying `sectionType` in the sections array

### As a Reference Implementation

This repository demonstrates production-ready patterns for component-based static site generation with Metalsmith. Developers can examine the source code to understand:

- Structured content architecture using YAML frontmatter
- Component dependency management with manifest.json files
- Build-time asset bundling and optimization
- JSON data integration patterns for complex components
- Testing strategies for components and build pipelines

### Forking for Custom Libraries

The repository can be forked to create organization-specific or theme-specific component libraries:

1. Fork the repository and clone locally
2. Remove existing components or keep as reference examples
3. Develop new components following the manifest.json structure
4. Add documentation pages in `src/references/sections/` or `src/references/partials/` for each component
5. Deploy to hosting service for team access

## Installation & Development

### Prerequisites

- Node.js 18.0.0 or higher
- npm package manager
- GitHub CLI (`gh`) for release process (optional)

### Local Development

Clone the repository:

```shell
git clone https://github.com/wernerglinka/metalsmith-components.git
cd metalsmith-components
```

Install dependencies:

```shell
npm install
```

Start development server with watch mode and live reloading:

```shell
npm start
```

The site runs at `http://localhost:3000` with automatic rebuilds on file changes (excludes auto-generated `icon-loader.js` to prevent rebuild loops).

Build for production:

```shell
npm run build
```

Production build outputs to `build/` directory with HTML minification, optimized assets, and component packages in `build/downloads/`.

### Available Commands

**Core Development**:

- `npm start` - Development server with watch mode and live reloading at http://localhost:3000
- `npm run start:debug` - Development server with debug output for all @metalsmith/\* plugins
- `npm run build` - Production build in `build/` directory
- `npm run build:debug` - Production build with debug output for metalsmith-optimize-html
- `npm run serve` - Serve build directory with Browser-Sync

**Code Quality & Testing**:

- `npm test` - Run all Mocha test suites
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format code with Prettier (excludes .njk files due to compatibility issues)
- `npm run lint` - Lint and fix JavaScript with ESLint
- `npm run lint:css` - Lint and fix CSS with Stylelint
- `npm run fix` - Run format, lint, and lint:css in sequence

**Utility**:

- `npm run depcheck` - Check for unused dependencies

**Release**:

- `npm run release` - Create patch release using secure shell script with GitHub token
- `npm run release:patch` - Create patch release
- `npm run release:minor` - Create minor release
- `npm run release:major` - Create major release

## Project Structure

```
.
├── src/                                    # Source content pages (Markdown with YAML frontmatter)
│   ├── index.md                           # Homepage
│   ├── blog.md                            # Blog index with pagination (6 posts per page)
│   ├── blog/                              # 12 blog posts covering technical guides
│   ├── library/                           # Component documentation and examples
│   ├── references/
│   │   ├── sections/                      # Reference pages for 38 section components
│   │   └── partials/                      # Reference pages for 21 partial components
│   └── partials.md                        # Partials index page
├── lib/
│   ├── assets/
│   │   ├── images/                        # Static images
│   │   ├── main.css                       # Main CSS entry point (processed by bundler)
│   │   ├── main.js                        # Main JS entry point (bundled with esbuild)
│   │   └── styles/                        # Design tokens and base styles
│   ├── data/                              # Global JSON data files
│   │   ├── site.json                      # Site configuration
│   │   ├── author.json                    # Author information
│   │   ├── socialLinks.json               # Social media links
│   │   ├── faqs.json, artMuseums.json, awards.json
│   │   ├── maps/                          # Map data (3 JSON files for demos)
│   │   ├── podcasts/                      # Podcast RSS feed configs (4 JSON files)
│   │   └── blurbs/                        # Blurbs content (2 JSON files)
│   ├── layouts/
│   │   ├── components/
│   │   │   ├── _partials/                 # 21 partial components
│   │   │   └── sections/                  # 38 section components
│   │   │       └── maps/                  # Example: maps component structure
│   │   │           ├── maps.njk           # Template
│   │   │           ├── maps.css           # Styles
│   │   │           ├── maps.js            # Main script
│   │   │           ├── manifest.json      # Dependencies & validation
│   │   │           └── modules/
│   │   │               ├── providers/     # Leaflet & OpenLayers
│   │   │               └── helpers/       # Utilities & icon loader
│   │   ├── icons/                         # 299 Feather icon SVG templates
│   │   └── pages/                         # Page layout templates
│   └── plugins/
│       └── component-package-generator.js # Production-only ZIP packaging
├── nunjucks-filters/                      # 46 custom template filters in 8 categories
│   ├── index.js                           # Filter exports
│   ├── string-filters.js, date-filters.js
│   ├── markdown-filter.js, array-filters.js
│   ├── debug-filters.js, validation-filters.js
│   └── object-filters.js
├── plugins/
│   └── generate-maps-icons.js             # Build-time icon registry generator
├── test/                                  # 4 comprehensive Mocha test suites
│   ├── component-manifests.test.js        # Validates all 59 component manifests
│   ├── build-integration.test.js          # Tests build pipeline and HTML output
│   ├── content-structure.test.js          # Verifies frontmatter and data files
│   └── component-dependency-bundler.test.js
├── build/                                 # Generated output (git-ignored)
│   ├── assets/                            # Bundled and optimized CSS/JS
│   ├── search-index.json                  # Site-wide search index
│   └── downloads/                         # Component packages (production only)
├── metalsmith.js                          # Build configuration
├── package.json                           # Dependencies and scripts
├── eslint.config.js                       # ESLint configuration
├── prettier.config.js                     # Prettier rules (excludes .njk)
└── CLAUDE.md                              # AI assistant instructions
```

## Architecture

### Relationship with Metalsmith2025 Starter

This library demonstrates the same structured content paradigm used by the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter). The starter provides the foundation and build system for component-based Metalsmith sites, while this library provides a catalog of production-ready components that integrate with that system.

Both projects share:

- Component architecture with manifest.json dependency tracking
- Structured frontmatter approach instead of Markdown body content
- Metalsmith-bundled-components for asset optimization
- Nunjucks template engine with custom filters
- JSON Schema validation in component manifests

### Structured Content Approach

Instead of traditional Markdown files with content in the body, this system uses structured data in frontmatter to define pages:

```yaml
---
layout: pages/sections.njk
sections:
  - sectionType: hero
    text:
      title: 'Welcome to Metalsmith Components'
      prose: 'Build modern websites with reusable components'
    containerFields:
      background:
        image: '/assets/images/hero.jpg'
  - sectionType: media-image
    text:
      title: 'Feature Showcase'
      prose: 'Combine text and images seamlessly'
    image:
      src: '/assets/images/feature.jpg'
      alt: 'Feature demonstration'
---
```

### Component Structure

Each component is self-contained in its own directory with required and optional files:

**Required Files**:

- `component-name.njk` - Nunjucks template defining HTML structure
- `manifest.json` - Component metadata with dependency declarations and JSON Schema validation

**Optional Files**:

- `component-name.css` - Component-specific styles (bundled only when component is used)
- `component-name.js` - Interactive behavior (bundled only when component is used)
- `component-name.yml` - Example frontmatter configuration for documentation
- `README.md` - Component documentation

**Manifest Structure**:

```json
{
  "name": "component-name",
  "type": "section",
  "styles": ["component-name.css"],
  "scripts": ["component-name.js"],
  "requires": ["text", "ctas", "commons"],
  "validation": {
    "required": ["sectionType"],
    "properties": {}
  }
}
```

**Advanced: Multi-Provider Components**:
Components supporting multiple libraries (maps with Leaflet/OpenLayers, podcast with RSS parsing) use the `modules` field in manifest.json to organize provider implementations and shared utilities in a `modules/` subdirectory.

### Dependency Bundling System

The `metalsmith-bundled-components` plugin implements build-time asset optimization:

1. Scans all pages site-wide to identify which components are used
2. Bundles CSS/JS only for components actually present on pages
3. Creates single optimized files (main.css, main.js) shared across all pages
4. Applies PostCSS processing (autoprefixer, cssnano) to bundled CSS
5. Uses esbuild for JavaScript bundling with tree-shaking

Result: Minimal bundle sizes with optimal browser caching since all pages share the same asset files.

### JSON Data Architecture

Complex components use external JSON files in `lib/data/` for data management:

**Data Organization**:

- `lib/data/maps/` - Map marker data (3 files: London, Paris, NYC clustering demo)
- `lib/data/podcasts/` - RSS feed configurations (4 podcast shows)
- `lib/data/blurbs/` - Content blurbs (2 files with grid configurations)
- Root data files: site.json, author.json, socialLinks.json, faqs.json, etc.

**Benefits**:

- Clean separation of UI configuration (frontmatter) from content data (JSON)
- Scalable for large datasets without cluttering page files
- Reusable across multiple pages
- Recursive directory loading makes all data accessible as `data.filename` or `data.subdirectory.filename`

**Filtering**:
Use the `getSelections` Nunjucks filter to display subsets:

```yaml
items:
  source: 'maps.london-landmarks'
  scope: 'selections'
  selections: ['tower-bridge', 'big-ben']
```

## Component Catalog

### Section Components (38)

**Content Display**:

- **hero** - Full-screen or standard hero sections with background images and CTAs
- **banner** - Call-to-action sections with flexible backgrounds
- **text-only** - Pure content sections with markdown support
- **image-only** - Image display sections
- **icon-only** - Display-only icon sections
- **audio-only** - Audio player sections
- **video-only** - Video player sections
- **lottie-only** - Lottie animation display
- **multi-media** - Combined media sections
- **code** - Code blocks with syntax highlighting via Prism.js
- **testimonial** - Customer quotes with attribution
- **blurbs** - Grid of content blurbs (text cards)

**Interactive & Advanced**:

- **accordion** - Expandable/collapsible content sections
- **artist-slider** - Image slider optimized for artwork galleries
- **calendar** - Event calendar with recurring event support
- **slider** - Image/content carousel with pagination or tabbed interface
- **hero-slider** - Hero section with image carousel
- **flip-cards** - Interactive cards with front/back content and animations
- **image-grid** - Justified gallery layout for artist portfolios with automatic aspect ratio calculation and hover overlays
- **logos-list** - Auto-scrolling logo carousel with infinite loop
- **image-compare** - Before/after image comparison with draggable slider handle
- **search-only** - Search functionality with two-layer filtering
- **maps** - Interactive maps with dual provider support (Leaflet/OpenLayers), JSON data, custom Feather icon markers, and clustering
- **podcast** - Podcast player with Shikwasa integration and RSS feed parsing
- **pricing-table** - Pricing tier comparison with cards and table layouts, featured tier highlighting
- **team-grid** - Team member profiles with grid/compact layouts and modal bios
- **timeline** - Chronological events with vertical alternating and horizontal layouts
- **stats** - Impact numbers and metrics with grid, row, and compact layouts
- **steps** - Process flows with numbered steps, icons, and connector lines

**Layout & Structure**:

- **columns** - Multi-column layout for custom content
- **compound** - Composable multi-section layout
- **commons** - Base container and styling (required dependency for most sections)

**Blog & Collections**:

- **collection-list** - Lists collections (blog posts, references, etc.)
- **cards-list** - Displays cards from data arrays
- **blog-author** - Author information for blog posts
- **blog-navigation** - Previous/next post navigation

**Site Structure**:

- **header** - Site header/navigation with optional top message bar (dismissible announcements with cookie persistence)
- **footer** - Site footer

### Partial Components (21)

**Content Elements**:

- **text** - Text content element (title, prose, etc.)
- **image** - Image element with caption support
- **video** - Video player supporting YouTube, Vimeo, and Cloudinary
- **audio** - Audio player element
- **lottie** - Lottie animation element
- **icon** - Icon display element

**Interactive Elements**:

- **button** - CTA button element
- **ctas** - Call-to-action links/buttons array
- **text-link** - Styled text link element
- **search** - Search interface element
- **dark-light-theme-switcher** - Theme toggle control

**Cards & Lists**:

- **flip-card** - Single flip card element
- **manual-card** - Manually configured card element
- **collection-card** - Card for displaying collection items
- **slider-pagination** - Pagination controls for sliders
- **collection-pagination** - Pagination controls for collections

**Navigation & Metadata**:

- **navigation** - Main navigation menu
- **breadcrumbs** - Navigation breadcrumbs
- **branding** - Logo and branding element
- **author-date** - Author and publication date display

**UI Elements**:

- **overlay** - Overlay/modal element

All components include live examples and documentation at the [Component Library](https://metalsmith-components.com/library).

## Testing

The repository includes 4 comprehensive Mocha test suites validating the component system:

**Test Coverage**:

- `test/component-manifests.test.js` - Validates manifest.json existence and structure for all 59 components
- `test/build-integration.test.js` - Tests complete Metalsmith build pipeline, HTML generation, collections, pagination, and static assets
- `test/content-structure.test.js` - Verifies frontmatter structure, global data file validity, SEO metadata, and content consistency
- `test/component-dependency-bundler.test.js` - Tests component directory structure, file associations, manifest dependencies, and bundler integration

Run tests:

```shell
npm test              # Run all test suites
npm run test:watch    # Run tests in watch mode
```

## Deployment

The build output in `build/` is a standard static site deployable to any hosting service:

**Recommended Platforms**:

- [Netlify](https://www.netlify.com) - Continuous deployment from Git (current deployment)
- [Vercel](https://vercel.com/) - Zero-config deployment
- [Cloudflare Pages](https://pages.cloudflare.com/) - Global CDN deployment
- GitHub Pages - Free hosting for public repositories

**Subdirectory Deployment**:
For deployment to subdirectories (e.g., `example.com/subdirectory/`), set the `BASE_PATH` environment variable. The `metalsmith-safe-links` plugin automatically prefixes all internal links and asset paths:

```shell
BASE_PATH=/subdirectory npm run build
```

## Resources

### Related Projects

- [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) - Foundation template using the same component paradigm
- [Metalsmith](https://www.metalsmith.io) - Pluggable static site generator
- [metalsmith-bundled-components](https://www.npmjs.com/package/metalsmith-bundled-components) - Component dependency bundler plugin
- [metalsmith-search](https://www.npmjs.com/package/metalsmith-search) - Build-time search index generator

### Developer Documentation

Additional technical documentation for developers is located in the [`docs/`](docs/) directory:

- [Developer Guide](docs/DEVELOPER-GUIDE.md) - Best practices, patterns, and lessons learned
- [Component Package Specification](docs/COMPONENT-PACKAGE-SPEC.md) - ZIP package structure and implementation
- [Recurring Events Fix](docs/RECURRING-EVENTS-FIX.md) - Calendar component bug fix documentation
- [Adding ZIP Packages](docs/adding-zip-packages.md) - Component packaging system implementation

### Technical Documentation

The site includes detailed technical guides available at [metalsmith-components.com/blog](https://metalsmith-components.com/blog):

1. Building Pages with Metalsmith Components
2. How Component Bundling Works
3. Building a Site-Wide Search System
4. Working with Data in Metalsmith Components
5. Building Interactive Components with JavaScript
6. Understanding Component Validation with Manifest Schemas
7. Theming Architecture
8. Section Anatomy
9. Building Structured Pages
10. Getting Started with the Metalsmith2025 Starter
11. Installing Metalsmith Components in Your Project
12. Adding a Top Message Bar to Your Header

Browse the complete [Component Library](https://metalsmith-components.com/library) for live examples and implementation details.

## Contributing

Contributions are welcome. When submitting pull requests:

1. Add tests for new components or features
2. Follow existing component structure with manifest.json
3. Ensure all tests pass (`npm test`)
4. Run linting and formatting (`npm run fix`)
5. Document components with examples in `src/references/sections/` or `src/references/partials/`

## License

MIT License - see LICENSE file for details.

## Community

**Metalsmith Community**:

- [Gitter Chat](https://gitter.im/metalsmith/community)
- [GitHub Discussions](https://github.com/metalsmith/metalsmith/discussions)

**Component Library**:

- Live Site: [metalsmith-components.com](https://metalsmith-components.com)
- GitHub: [github.com/wernerglinka/metalsmith-components](https://github.com/wernerglinka/metalsmith-components)
- Issues: [github.com/wernerglinka/metalsmith-components/issues](https://github.com/wernerglinka/metalsmith-components/issues)
