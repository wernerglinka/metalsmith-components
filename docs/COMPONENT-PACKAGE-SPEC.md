# Component Package Generator Specification

## Overview

A Metalsmith plugin that generates downloadable ZIP packages for components during the build process, making the build the single source of truth for component distribution.

## Goals

- Enable users to download individual components or complete bundles
- Support version tracking and intelligent upgrades
- Provide clear dependency management
- Minimize duplication while ensuring usability
- Integrate seamlessly with Metalsmith2025 Structured Content Starter projects

## Component Structure

Components are organized in two categories:

### Sections
Location: `lib/layouts/components/sections/`
- Large page building blocks (hero, banner, maps, testimonial, etc.)
- May depend on multiple partials
- Each has: `.njk`, `.css` (optional), `.js` (optional), `manifest.json`

### Partials
Location: `lib/layouts/components/_partials/`
- Small reusable UI elements (text, ctas, image, navigation, etc.)
- Typically no dependencies
- Each has: `.njk`, `.css` (optional), `.js` (optional), `manifest.json`

## Package Types

### 1. Individual Section Package
**Filename:** `[component-name]-v[version].zip`

**Contents:**
```
hero-v2.1.0/
├── hero.njk              # Nunjucks template
├── hero.css              # Styles (if exists)
├── hero.js               # JavaScript (if exists)
├── manifest.json         # Metadata with contentHash
├── examples.yaml         # Configuration examples
├── README.md             # Auto-generated documentation
├── install.sh            # Installation script
└── package.json          # NPM compatibility with version
```

**Dependencies:** NOT included - listed in README with download links

### 2. Individual Partial Package
**Filename:** `[partial-name]-v[version].zip`

**Contents:**
```
text-v2.1.0/
├── text.njk              # Nunjucks template
├── text.css              # Styles (if exists)
├── manifest.json         # Metadata with contentHash
├── examples.yaml         # Configuration examples (if applicable)
├── README.md             # Auto-generated documentation
├── install.sh            # Installation script
└── package.json          # NPM compatibility with version
```

**Dependencies:** Typically none

### 3. Complete Bundle
**Filename:** `metalsmith-components-v[version].zip`

**Contents:**
```
metalsmith-components-v2.1.0/
├── sections/
│   ├── hero/
│   ├── banner/
│   ├── maps/
│   └── ...
├── partials/
│   ├── text/
│   ├── ctas/
│   ├── image/
│   └── ...
├── README.md             # Installation guide
└── install-all.sh        # Batch installation script
```

**Dependencies:** All included, no external requirements

## Versioning Strategy

### Version Source
- All components share the project version from root `package.json`
- When website is released, all component packages receive that version
- Ensures synchronization across the component ecosystem

### Content Hash Tracking
Each component manifest includes a SHA256 content hash:

```json
{
  "name": "hero",
  "version": "2.1.0",
  "contentHash": "a3f5b2c1d4e6f8g9",
  "type": "section",
  "requires": {
    "text": ">=1.5.0",
    "ctas": ">=1.4.0",
    "commons": ">=1.0.0"
  }
}
```

### Hash Generation
- Computed from concatenated content of `.njk` + `.css` + `.js` files
- Truncated to 16 characters for readability
- Enables detection of actual changes vs version bumps
- Generated during package creation, no runtime impact

## Dependency Management

### Dependency Specification
Sections specify required partials using semantic versioning ranges:

```json
{
  "requires": {
    "text": ">=1.5.0",
    "ctas": ">=1.4.0"
  }
}
```

### Dependency Resolution Strategy
1. Individual packages list dependencies in README with download links
2. Install script checks for missing dependencies
3. Install script compares versions using contentHash for intelligent upgrades
4. Bundle includes all dependencies pre-resolved

## Examples System

### Examples Location
Two sources for examples:

1. **Dedicated examples directory:** `lib/layouts/components/examples/[component-name].yaml`
2. **Fallback to documentation pages:** Extract from `src/references/sections/[component-name].md` or `src/references/partials/[component-name].md`

### Example Structure
```yaml
# Basic example
- name: "Minimal Hero"
  description: "Simplest hero configuration"
  config:
    sectionType: hero
    text:
      title: "Welcome"
      prose: "Simple hero section"

# Advanced example
- name: "Full Hero"
  description: "Hero with all features"
  config:
    sectionType: hero
    text:
      title: "Welcome"
      subtitle: "Subtitle text"
      prose: "Full prose content"
    ctas:
      - url: "/contact"
        label: "Get Started"
```

## Installation Scripts

### Individual Component Install Script
**Capabilities:**
- Detect Metalsmith project structure
- Check for existing component and version
- Compare contentHash to determine if upgrade needed
- Check for required dependencies
- Warn about missing or outdated dependencies
- Backup existing files before overwriting
- Provide clear installation paths and instructions

**Example Output:**
```bash
✓ Metalsmith project detected
✓ Installing hero v2.1.0

Checking dependencies:
  • text v1.5.0 → v2.1.0 (no changes, compatible)
  • ctas v1.4.0 → v2.1.0 (no changes, compatible)
  ✓ All dependencies satisfied

Files copied:
  lib/layouts/components/sections/hero/hero.njk
  lib/layouts/components/sections/hero/hero.css
  lib/layouts/components/sections/hero/hero.js
  lib/layouts/components/sections/hero/manifest.json

✓ Installation complete
```

### Bundle Install Script
**Capabilities:**
- Install all components in dependency order (partials first, then sections)
- Two modes: full install (all 52 components) or update-only (existing components)
- Interactive mode selection or command-line flag (`--update-only` or `-u`)
- Detects installed components via manifest.json files
- Manifest-based detection ensures accurate component matching
- Mass upgrade with single confirmation
- Detect and resolve version conflicts
- Provide summary with installation counts
- Must be run from project root directory

**Important:** The install script must be executed from the project root directory (where `metalsmith.js` or `package.json` exists). The script sets `PROJECT_ROOT="$(pwd)"` to capture the current working directory and uses `SCRIPT_DIR` to locate the extracted component files.

**Usage:**
```bash
# From project root:
./metalsmith-components/install-all.sh           # Full install or interactive choice
./metalsmith-components/install-all.sh -u        # Update existing only
./metalsmith-components/install-all.sh --update-only  # Update existing only
```

## Plugin Architecture

### Plugin Location
`lib/plugins/component-package-generator.js`

### Plugin Configuration
```javascript
// In metalsmith.js
const componentPackageGenerator = require('./lib/plugins/component-package-generator');

Metalsmith(__dirname).use(
  componentPackageGenerator({
    componentsPath: 'lib/layouts/components',
    examplesPath: 'lib/layouts/components/examples',
    outputPath: 'downloads',
    generateBundle: true,
    generateChecksums: true
  })
);
```

### Core Functions

#### `scanComponents(basePath)`
- Scans sections and partials directories
- Returns array of component objects with paths and metadata

#### `loadComponentFiles(componentPath)`
- Reads template, styles, scripts, manifest
- Returns object with file contents and metadata

#### `generateContentHash(componentFiles)`
- Creates SHA256 hash from component file contents
- Returns truncated hash (16 chars)

#### `loadExamples(componentName)`
- Checks dedicated examples directory first
- Falls back to extracting from documentation pages
- Returns array of example configurations

#### `generateReadme(component, examples)`
- Creates comprehensive documentation
- Includes usage instructions, dependencies, examples
- Returns markdown string

#### `generatePackageJson(component, projectVersion)`
- Creates NPM-compatible package.json
- Includes version, dependencies, metadata
- Returns package.json object

#### `generateInstallScript(component)`
- Creates bash installation script
- Includes dependency checking and version comparison
- Returns shell script string

#### `createComponentPackage(component, outputPath)`
- Creates individual ZIP package
- Includes all files, generated docs, scripts
- Returns package metadata (size, checksum)

#### `createBundle(components, outputPath, projectVersion)`
- Creates complete bundle ZIP
- Organizes into sections/ and partials/ folders
- Includes master README and install-all script
- Returns bundle metadata

#### `generateManifest(packages, bundleMetadata)`
- Creates downloads/manifest.json with all package info
- Includes versions, sizes, checksums, contentHashes
- Returns manifest object

#### `addMetadataToMetalsmith(metadata, files)`
- Adds package metadata to Metalsmith metadata
- Makes available for use in Nunjucks templates
- Enables dynamic download link generation

### Build Integration

#### Execution Timing
- Run after layout processing but before final output
- Production builds only (skip in development/watch mode)

#### Output Structure
```
build/
└── downloads/
    ├── sections/
    │   ├── hero-v2.1.0.zip
    │   ├── banner-v2.1.0.zip
    │   └── ...
    ├── partials/
    │   ├── text-v2.1.0.zip
    │   ├── ctas-v2.1.0.zip
    │   └── ...
    ├── metalsmith-components-v2.1.0.zip
    └── manifest.json
```

## Template Integration

### Metadata Structure
```javascript
{
  componentPackages: {
    sections: [
      {
        name: 'hero',
        displayName: 'Hero',
        version: '2.1.0',
        contentHash: 'a3f5b2c1d4e6f8g9',
        downloadUrl: '/downloads/sections/hero-v2.1.0.zip',
        size: '12.4KB',
        checksum: 'sha256:abc123...',
        hasStyles: true,
        hasScripts: true,
        requires: ['text', 'ctas', 'commons']
      }
    ],
    partials: [
      {
        name: 'text',
        displayName: 'Text',
        version: '2.1.0',
        contentHash: 'b4c6d8e0f2g4h6i8',
        downloadUrl: '/downloads/partials/text-v2.1.0.zip',
        size: '3.2KB',
        checksum: 'sha256:def456...',
        hasStyles: true,
        hasScripts: false,
        requires: []
      }
    ],
    bundle: {
      version: '2.1.0',
      downloadUrl: '/downloads/metalsmith-components-v2.1.0.zip',
      size: '245KB',
      checksum: 'sha256:ghi789...'
    }
  }
}
```

### Template Usage
```nunjucks
{# Download page example #}
<h2>Available Sections</h2>
{% for package in componentPackages.sections %}
  <article>
    <h3>{{ package.displayName }}</h3>
    <p>Version: {{ package.version }}</p>
    <p>Size: {{ package.size }}</p>
    {% if package.requires.length > 0 %}
      <p>Requires: {{ package.requires | join(', ') }}</p>
    {% endif %}
    <a href="{{ package.downloadUrl }}">Download</a>
  </article>
{% endfor %}

{# Complete bundle #}
<article>
  <h3>Complete Component Bundle</h3>
  <p>Version: {{ componentPackages.bundle.version }}</p>
  <p>Size: {{ componentPackages.bundle.size }}</p>
  <a href="{{ componentPackages.bundle.downloadUrl }}">Download All</a>
</article>
```

## Technical Requirements

### Dependencies
- `archiver` - ZIP file creation
- `crypto` (built-in) - Content hash generation
- `fs/promises` (built-in) - File operations
- `path` (built-in) - Path manipulation
- `js-yaml` - YAML parsing for examples

### Code Conventions
- ES modules syntax (`import`/`export`)
- Functional programming patterns
- Dependency injection
- Comprehensive JSDoc comments
- Proper error handling with descriptive messages
- Console output for build progress

### Error Handling
- Graceful degradation for missing optional files
- Clear error messages for missing required files
- Validation of component structure
- Checksum verification

## Testing Strategy

### Test Coverage
1. **Component scanning** - Verify all components found
2. **File loading** - Test with/without optional files
3. **Hash generation** - Consistent hashing, change detection
4. **Package creation** - ZIP structure validation
5. **Manifest generation** - Correct metadata structure
6. **Template integration** - Metadata available in templates

### Test Files
- `test/component-package-generator.test.js` - Unit tests for plugin
- `test/package-installation.test.js` - Integration tests for install scripts

## Usage Scenarios

### Scenario 1: New Project Setup
1. User starts with Metalsmith2025 Structured Content Starter
2. Starter includes subset of components (v1.5.0)
3. User builds initial website

### Scenario 2: Adding New Component
1. User needs maps section (not in starter)
2. Downloads `maps-v2.1.0.zip` from component library
3. Install script detects existing project
4. Script checks dependencies: text, ctas already installed
5. Script compares versions using contentHash
6. Script reports: "text v1.5.0 → v2.1.0 (no changes, compatible)"
7. Maps component installed successfully

### Scenario 3: Bulk Upgrade
1. Component library releases v2.5.0 with new features
2. User downloads `metalsmith-components-v2.5.0.zip`
3. Bundle install script detects existing components
4. Script compares contentHash for each component
5. Script reports: "5 components updated, 8 unchanged"
6. User confirms upgrade
7. All components updated to v2.5.0

### Scenario 4: Dependency Resolution
1. User downloads new testimonial section
2. Install script checks dependencies
3. Finds missing `author-date` partial
4. Script provides download link: `/downloads/partials/author-date-v2.1.0.zip`
5. User downloads and installs partial
6. Re-runs testimonial install script
7. Installation completes successfully

### Scenario 5: Update-Only Mode (Selective Updates)
1. User started with Metalsmith2025 Structured Content Starter (includes 22 components)
2. Component library releases v2.5.0 with bug fixes
3. User downloads `metalsmith-components-v2.5.0.zip`
4. Runs: `./metalsmith-components/install-all.sh --update-only`
5. Script checks for manifest.json in each component directory
6. Detects 22 installed components (10 partials + 12 sections) by matching names
7. Skips 30 components not currently installed
8. Updates only the 22 existing components
9. Reports: "Installed/Updated: 22 components, Skipped: 30 components"
10. User keeps their lean project without unwanted components

## Success Criteria

- All components have downloadable packages
- Packages include all necessary files for implementation
- Build process completes without errors
- Download links work correctly on website
- Install scripts handle dependencies intelligently
- Content hash prevents unnecessary upgrades
- Users can successfully install and use components
- Version tracking works across partial/section dependencies
- Bundle provides zero-friction complete installation

## Future Enhancements

- Interactive CLI tool for component selection
- Automatic dependency installation (opt-in)
- Component marketplace with search/filter
- Usage analytics (anonymous)
- Migration guides for breaking changes
- Automated testing of installed components
