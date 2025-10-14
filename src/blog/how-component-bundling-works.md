---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'How Component Bundling Works'
  description: 'Deep dive into automatic component discovery and bundling with metalsmith-bundled-components. Learn how CSS and JavaScript are automatically optimized for each page.'
  date: '2025-06-24'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample22.jpg'

seo:
  title: How Component Bundling Works - Metalsmith Components
  description: 'Understanding automatic component discovery, dependency resolution, and intelligent bundling with metalsmith-bundled-components for optimal performance.'
  socialImage: '/assets/images/sample22.jpg'
  canonicalURL: ''
  keywords: 'component bundling, metalsmith, esbuild, tree shaking, css bundling, javascript bundling, component architecture, performance optimization'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    isFullScreen: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample22.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Under the Hood'
      title: How Component Bundling Works
      titleTag: 'h1'
      subTitle: 'Automatic optimization with zero configuration'
      prose: 'The metalsmith-bundled-components plugin automatically discovers components used on each page and bundles only the CSS and JavaScript needed. No manual imports, no unused code, just optimal performance.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'The Problem'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Traditional static sites face a dilemma: either include all CSS and JavaScript on every page (wasting bandwidth), or manually manage imports for each page (tedious and error-prone).

        Component-based sites make this worse. With dozens of components, each with its own styles and scripts, manual management becomes impossible. You need:

        - Automatic discovery of which components are used
        - Dependency resolution (components requiring other components)
        - Proper loading order
        - Bundling and optimization
        - Tree-shaking to remove unused code

        The `metalsmith-bundled-components` plugin solves all of this automatically.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'How It Works: The Build Process'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The plugin runs during your Metalsmith build and follows a four-step process:

        ### Step 1: Component Discovery

        The plugin scans your component directories (`_partials/` and `sections/`) looking for `manifest.json` files. Each manifest declares what the component needs:

        ```json
        {
          "name": "hero",
          "type": "section",
          "styles": ["hero.css"],
          "scripts": ["hero.js"],
          "requires": ["text", "ctas", "image", "commons"]
        }
        ```

        This tells the bundler that the hero component has its own CSS and JavaScript, and depends on four partial components.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Step 2: Dependency Resolution'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When a page uses the hero section, the plugin:

        1. Identifies the hero component from page frontmatter
        2. Reads hero's manifest to find its dependencies
        3. Recursively loads manifests for `text`, `ctas`, `image`, and `commons`
        4. Checks if those components have dependencies
        5. Builds a complete dependency tree

        This ensures components load in the correct order - dependencies first, then components that use them.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Step 3: Bundling with esbuild'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Once dependencies are resolved, the plugin uses esbuild to bundle the assets. esbuild is exceptionally fast and provides:

        **For JavaScript:**
        - ES module bundling
        - Tree-shaking (removes unused exports)
        - Minification in production
        - Source maps for debugging

        **For CSS:**
        - `@import` resolution
        - Concatenation and deduplication
        - Minification with cssnano
        - Autoprefixing for browser compatibility

        The result is a single optimized CSS file and a single optimized JavaScript file containing only what's needed.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Step 4: PostCSS Processing'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        After bundling, CSS passes through PostCSS for additional processing:

        ```javascript
        componentDependencyBundler({
          // ... other options
          postcss: {
            enabled: true,
            plugins: [
              stylelint(),           // Lint CSS for errors
              postcssImport({        // Resolve @import statements
                path: ['lib/assets', 'lib/assets/styles']
              }),
              autoprefixer(),        // Add vendor prefixes
              cssnano({              // Minify CSS
                preset: 'default'
              })
            ]
          }
        })
        ```

        This pipeline ensures CSS is validated, processed, optimized, and compatible with all target browsers.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Configuration in metalsmith.js'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Here's how the plugin is configured for this website:

        ```javascript
        import componentDependencyBundler from 'metalsmith-bundled-components';

        metalsmith
          .use(componentDependencyBundler({
            basePath: 'lib/layouts/components/_partials',
            sectionsPath: 'lib/layouts/components/sections',
            mainCSSEntry: 'lib/assets/main.css',
            mainJSEntry: 'lib/assets/main.js',
            cssDest: 'assets/main.css',
            jsDest: 'assets/main.js',
            minifyOutput: isProduction,
            postcss: {
              enabled: true,
              plugins: [
                stylelint(),
                postcssImport({
                  path: ['lib/assets', 'lib/assets/styles']
                }),
                autoprefixer(),
                cssnano({ preset: 'default' })
              ]
            }
          }))
        ```

        **Key configuration points:**
        - `basePath`: Where to find partial components
        - `sectionsPath`: Where to find section components
        - `mainCSSEntry`/`mainJSEntry`: Global styles/scripts included on every page
        - `cssDest`/`jsDest`: Where to output bundled files
        - `minifyOutput`: Enable minification in production
        - `postcss`: PostCSS configuration

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Component Manifest Structure'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Each component can have a `manifest.json` that declares its assets and dependencies:

        **Basic manifest:**
        ```json
        {
          "name": "text",
          "type": "partial",
          "styles": ["text.css"],
          "scripts": [],
          "requires": ["commons"]
        }
        ```

        **Section with multiple dependencies:**
        ```json
        {
          "name": "media-image",
          "type": "section",
          "styles": ["media-image.css"],
          "scripts": [],
          "requires": ["text", "ctas", "image", "commons"]
        }
        ```

        **Component with modules (advanced):**
        ```json
        {
          "name": "maps",
          "type": "section",
          "styles": ["maps.css"],
          "scripts": ["maps.js"],
          "requires": ["text", "ctas", "commons"],
          "modules": {
            "providers": ["leaflet.js", "openlayers.js"],
            "helpers": ["load-script.js", "maps-utils.js", "icon-loader.js"]
          }
        }
        ```

        The manifest tells the bundler exactly what files to include and in what order.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Performance Benefits'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        This approach delivers significant performance improvements:

        **Site-wide optimized bundles:**
        - Plugin scans all pages across the entire site
        - Bundles only components actually used on the site
        - Creates single CSS and JavaScript files containing all used components
        - No unused components included in bundles

        **Browser caching benefits:**
        - Single CSS file shared across all pages (one HTTP request, cached)
        - Single JavaScript file shared across all pages (one HTTP request, cached)
        - Browser loads these files once, then uses cached version for all pages
        - Both files are minified and compressed

        **Build-time optimization:**
        - All processing happens during build
        - No runtime overhead
        - Tree-shaking removes unused exports
        - Static files served directly from CDN

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Developer Experience Benefits'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The bundler also provides excellent developer experience:

        **Zero manual imports:**
        - Write components, declare dependencies in manifest
        - Bundler handles the rest automatically
        - No import statements in page files

        **Component isolation:**
        - Each component's styles and scripts stay with the component
        - Easy to move components between projects
        - No global namespace pollution

        **Validation:**
        - Plugin validates all manifests during build
        - Catches missing dependencies before deployment
        - Clear error messages when something's wrong

        **Maintainability:**
        - Adding a component? Just create its directory with manifest
        - Removing a component? Delete its directory
        - Dependencies are explicit and documented

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'How Pages Declare Components'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Pages don't import components - they simply declare what sections they use in frontmatter:

        ```yaml
        ---
        layout: pages/sections.njk
        sections:
          - sectionType: hero
            text:
              title: 'Welcome'
          - sectionType: media-image
            text:
              title: 'Features'
            image:
              src: '/assets/images/feature.jpg'
          - sectionType: text-only
            text:
              title: 'Documentation'
        ---
        ```

        The plugin:
        1. Sees `hero`, `media-image`, and `text-only` section types
        2. Loads their manifests
        3. Resolves all dependencies (`text`, `ctas`, `image`, `commons`)
        4. Bundles only the CSS/JS needed for those components

        The page never needs to know about component dependencies - the bundler handles it.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Complete Component Library'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Every component in this library is production-ready and includes everything needed:

        **Complete component packages:**
        - `manifest.json` - Declares dependencies and assets
        - `.njk` template - Nunjucks template with proper structure
        - `.css` file - Component-specific styles
        - `.js` file - Interactive behavior (when needed)
        - `README.md` - Documentation and usage examples (for most components)

        This means you can copy any component from this library directly into your project and it will work immediately. The bundler will automatically:
        - Discover the component via its manifest
        - Load all required dependencies
        - Bundle the styles and scripts
        - Apply all optimizations

        **No assembly required** - each component is self-contained and ready to use.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Building Your Own Components'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        If you want to create your own custom components (rather than using the ready-made ones from this library), here's how to set up component bundling in your project:

        **1. Install the plugin:**
        ```bash
        npm install metalsmith-bundled-components
        ```

        **2. Configure in metalsmith.js:**
        ```javascript
        import componentDependencyBundler from 'metalsmith-bundled-components';

        metalsmith.use(componentDependencyBundler({
          basePath: 'lib/layouts/components/_partials',
          sectionsPath: 'lib/layouts/components/sections',
          mainCSSEntry: 'lib/assets/main.css',
          mainJSEntry: 'lib/assets/main.js',
          cssDest: 'assets/main.css',
          jsDest: 'assets/main.js'
        }))
        ```

        **3. Create component manifests:**
        Add `manifest.json` to each component directory declaring its assets and dependencies.

        **4. Write your components:**
        Create your `.njk`, `.css`, and `.js` files as needed. The bundler will discover and include them automatically.

        The plugin handles discovery, dependency resolution, bundling, and optimization automatically. But if you're just using components from this library, simply copy the complete component directories into your project - everything is already set up and ready to work.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Learn More'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        For complete documentation, advanced configuration options, and validation features, visit the [metalsmith-bundled-components GitHub repository](https://github.com/wernerglinka/metalsmith-bundled-components).

        The plugin is actively maintained and used in production on this site and the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter).

  - sectionType: blog-navigation
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
---
