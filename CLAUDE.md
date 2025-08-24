# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Metalsmith Components library - a comprehensive showcase and reference implementation for building modern websites with Metalsmith using a component-based architecture. It demonstrates structured content in frontmatter instead of traditional Markdown, where each component is self-contained with its own styles and scripts that are automatically bundled only when used.

## Development Commands

### Core Development
- `npm start` - Start development server with watch mode and live reloading at http://localhost:3000
- `npm run start:debug` - Start development server with debug output for all @metalsmith* plugins
- `npm run build` - Create production build in `build/` directory
- `npm run serve` - Serve the build directory with Browser-Sync

### Code Quality & Testing  
- `npm test` - Run all tests using Mocha
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format all code with Prettier (excludes .njk files)
- `npm run lint` - Lint and fix code with ESLint
- `npm run fix` - Run both format and lint in sequence

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
- hero, banner, media-image, text-only, slider, flip-cards, logos-list, testimonial, composed, blog-list
- Main building blocks for page layouts

### Component Structure
Each component contains:
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

## Key Files & Configuration

### Build Configuration
- `metalsmith.js` - Main build configuration with all plugins and settings
- `package.json` - Dependencies, scripts, and project metadata
- `eslint.config.js` - ESLint configuration
- `prettier.config.js` - Prettier formatting rules

### Content Structure
- `src/` - Source content pages (Markdown files with frontmatter)
- `lib/data/` - Global JSON data files (site.json, author.json, etc.)
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