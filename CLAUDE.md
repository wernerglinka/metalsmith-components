# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Additional Documentation

- **[Component Development Guide](.claude/guides/COMPONENT-GUIDE.md)** - Detailed component creation, advanced features, and best practices
- **[Troubleshooting Guide](.claude/guides/TROUBLESHOOTING.md)** - Solutions to common development issues
- **[CSS Layouts Skill](.claude/skills/css-layouts.md)** - Modern CSS layout patterns using container queries and intrinsic design

## Project Overview

This is a Metalsmith Components library - a comprehensive showcase and reference implementation for building modern websites with Metalsmith using a component-based architecture. It demonstrates structured content in frontmatter instead of traditional Markdown, where each component is self-contained with its own styles and scripts that are automatically bundled only when used.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm start

# Run tests to verify everything works
npm test

# Create production build
npm run build
```

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

### Component Categories

Components are organized in two main categories:

#### Partials (`lib/layouts/components/_partials/`)

Small, reusable UI elements (22 components):

- audio, author-date, branding, breadcrumbs, button, collection-card, collection-pagination, ctas, dark-light-theme-switcher, flip-card, icon, image, lottie, manual-card, navigation, overlay, page-transitions, search, slider-pagination, text, text-link, video

#### Sections (`lib/layouts/components/sections/`)

Large page sections and main building blocks (38 components):

- accordion, artist-slider, audio-only, banner, blog-author, blog-navigation, blurbs, calendar, cards-list, code, collection-list, columns, commons, compound, flip-cards, footer, header, hero, hero-slider, icon-only, image-compare, image-grid, image-only, logos-list, lottie-only, maps, multi-media, podcast, pricing-table, search-only, slider, stats, steps, team-grid, testimonial, text-only, timeline, video-only

### Component Structure

Each component contains:

- `component-name.yml` - Frontmatter example
- `component-name.njk` - Nunjucks template
- `component-name.css` - Component-specific styles (optional)
- `component-name.js` - Interactive behavior (optional)
- `manifest.json` - Dependencies and metadata
- `README.md` - Documentation (optional)

**See [Component Development Guide](.claude/guides/COMPONENT-GUIDE.md) for detailed scaffolding instructions and advanced features.**

### Component Dependency Bundling

The `metalsmith-bundled-components` plugin automatically:

1. Scans pages to identify which components are used
2. Bundles only required CSS/JS for optimal performance
3. Applies PostCSS processing (autoprefixing, minification)
4. Generates per-page assets with no unused code

### Creating New Components

Quick reference for creating a new component:

1. Create directory: `mkdir -p lib/layouts/components/sections/[name]`
2. Add required files: `manifest.json`, `[name].njk`, `[name].yml`
3. Add optional files: `[name].css`, `[name].js`
4. Create reference page: `src/references/sections/[name].md`
5. Run tests: `npm test`
6. Build and verify: `npm run build && npm start`

**For detailed instructions, see [Component Development Guide](.claude/guides/COMPONENT-GUIDE.md#scaffolding-a-new-component).**

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
  - `src/references/sections/` - Section component reference pages (38 files)
  - `src/references/partials/` - Partial component reference pages (21 files)
- `lib/data/` - Global JSON data files (site.json, author.json, socialLinks.json, etc.)
  - `lib/data/maps/` - Map data JSON files
  - `lib/data/podcasts/` - Podcast RSS feed configurations
  - `lib/data/blurbs/` - Blurbs content data
- `lib/layouts/` - Templates, components, and icons
  - `lib/layouts/components/_partials/` - 21 partial components
  - `lib/layouts/components/sections/` - 38 section components
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

- `test/component-manifests.test.js` - Validates manifest.json existence and structure for all 59 components
- `test/build-integration.test.js` - Tests complete Metalsmith build pipeline, HTML generation, collections, pagination
- `test/content-structure.test.js` - Verifies frontmatter structure, global data file validity, SEO metadata
- `test/component-dependency-bundler.test.js` - Tests component directory structure, file associations, bundler integration

### Testing Workflow

1. Run `npm test` before committing changes
2. Use `npm run test:watch` during development
3. Run `npm run build:debug` if tests pass but build fails
4. Check specific test file: `npx mocha test/[test-file].test.js`

**For troubleshooting test failures, see [Troubleshooting Guide](.claude/guides/TROUBLESHOOTING.md#testing-issues).**

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

### SWUP Page Transitions Support

All components with JavaScript are SWUP-compatible for smooth page transitions. The `page-transitions` partial provides the SWUP integration. Components automatically re-initialize after page swaps without duplicating event listeners.

**Key patterns:**
- Components check `element.dataset.initialized` before setup
- Components with intervals/observers register cleanup functions
- Registration is conditional: `if (window.PageTransitions)` ensures backwards compatibility

See [Component Development Guide](.claude/guides/COMPONENT-GUIDE.md#swup-compatibility) for the full pattern.

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

**For detailed best practices, see [Component Development Guide](.claude/guides/COMPONENT-GUIDE.md#component-development-best-practices).**

### CSS

- PostCSS with autoprefixer and cssnano
- Component-scoped styles
- Design tokens in `_design-tokens.css`
- Base styles in `_css-base.css`
- Use container queries for responsive behavior
- Follow fluid typography and spacing patterns

**For CSS layout patterns and best practices, see [CSS Layouts Skill](.claude/skills/css-layouts.md).**

## Site-Wide Search System

The component library includes a comprehensive search system for discovering content across the entire site.

### Search Architecture (Two-Layer Design)

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

### Using Search in Pages

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

## Troubleshooting

For common issues and solutions, see the [Troubleshooting Guide](.claude/guides/TROUBLESHOOTING.md).

Quick reference for common problems:

- **Component not rendering**: Check manifest.json type field and sectionType match
- **Styles not applied**: Verify styles array in manifest.json and CSS file exists
- **Build fails**: Run `npm test` first, then `npm run build:debug` for details
- **Watch mode issues**: Restart server or check for auto-generated files being edited
- **Search not finding content**: Add tags to frontmatter card object and rebuild

## Getting Help

When you encounter issues:

1. Check [Troubleshooting Guide](.claude/guides/TROUBLESHOOTING.md) for solutions
2. Review [Component Development Guide](.claude/guides/COMPONENT-GUIDE.md) for patterns
3. Run tests for specific error messages: `npm test`
4. Enable debug output: `npm run build:debug` or `npm run start:debug`
5. Compare your work to reference components like `text-only` or `hero`
6. Check the [DEVELOPER-GUIDE.md](DEVELOPER-GUIDE.md) for lessons learned

When working with this codebase, always run tests before committing changes and ensure new components follow the established patterns and validation requirements.
