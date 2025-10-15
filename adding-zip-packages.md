## Summary for Claude Code: Metalsmith Package Generator Plugin Implementation

### Project Context

Building a Package Generator Plugin for a Metalsmith static site that showcases component sections. The website is located at `/Users/wernerglinka/Projects/metalsmith/metalsmith-components` and displays various page sections (hero, testimonials, features, etc.) that users can download and use in their own projects.

### Objective

Create a Metalsmith plugin that generates downloadable ZIP packages for each component during the build process, making the build the single source of truth.

### Component Structure

Components are located in `lib/layouts/components/sections/` with each component having:

- `[component-name].njk` - Nunjucks template
- `[component-name].css` - Optional styles
- `[component-name].js` - Optional JavaScript
- Optional `manifest.json` with metadata

### Required Plugin Features

#### 1. **Package Generation**

- Scan `lib/layouts/components/sections/` directory
- Create individual ZIP files for each component
- Generate one bundle ZIP containing all components
- Output to `build/downloads/` directory

#### 2. **Package Contents**

Each component ZIP should contain:

```
component-name.zip/
├── component-name.njk      # Template file
├── component-name.css      # Styles (if exists)
├── component-name.js       # JavaScript (if exists)
├── examples.yaml           # Configuration examples
├── manifest.json           # Metadata (if exists)
├── README.md              # Auto-generated docs
├── install.sh             # Installation script
└── package.json           # NPM compatibility
```

#### 3. **Examples System**

- Look for examples in `lib/layouts/components/examples/[component-name].yaml`
- Generate default examples if none exist
- Include multiple configuration variants (minimal, basic, full)

#### 4. **Metadata Generation**

- Create `downloads/manifest.json` with all package information
- Add metadata to Metalsmith for use in templates:
  - Package names, sizes, URLs
  - SHA256 checksums
  - Component features (hasStyles, hasScripts)

#### 5. **Installation Helpers**

- Generate bash install scripts for each component
- Include checks for Metalsmith project structure
- Provide clear usage instructions

### Implementation Steps

1. **Create the Plugin File**
   - Location: `lib/plugins/component-package-generator.js`
   - Follow functional programming patterns
   - Use dependency injection
   - Add comprehensive JSDoc comments

2. **Core Functions Needed**
   - `scanComponentDirectory()` - Find all components
   - `loadComponentData()` - Load component files and metadata
   - `createComponentPackage()` - Generate individual ZIP
   - `createComponentBundle()` - Generate complete bundle
   - `generateExamples()` - Create/load YAML examples
   - `generateReadme()` - Create documentation
   - `generateInstallScript()` - Create installation scripts

3. **Integration with Build**

   ```javascript
   // In metalsmith.js
   const componentPackageGenerator = require('./lib/plugins/component-package-generator');

   Metalsmith(__dirname).use(
     componentPackageGenerator({
       componentsPath: 'lib/layouts/components/sections',
       examplesPath: 'lib/layouts/components/examples',
       outputPath: 'downloads',
       generateBundle: true,
       generateChecksums: true
     })
   );
   ```

4. **Template Integration**
   The plugin should add metadata for use in Nunjucks templates:
   ```nunjucks
   {% for package in componentPackages %}
     <a href="{{ package.downloadUrl }}">
       Download {{ package.displayName }}
     </a>
   {% endfor %}
   ```

### Technical Requirements

- Node.js with ES modules
- Dependencies: `archiver` for ZIP creation
- Follow existing code patterns (functional, modular, well-documented)
- Include error handling for missing files
- Console output for build progress

### Testing Approach

- Verify ZIP files are created correctly
- Check package contents match expectations
- Validate manifest.json structure
- Test installation scripts work properly

### Success Criteria

- All components have downloadable packages
- Packages include all necessary files for users to implement
- Build process completes without errors
- Download links work on the website
- Users can successfully install and use components from packages

This plugin will make the website the authoritative source for all component packages, ensuring documentation and downloads are always synchronized through the build process.
