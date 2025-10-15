---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Installing Metalsmith Components in Your Project'
  description: 'Step-by-step guide to downloading and installing component packages. Learn how to add sections and partials to your Metalsmith project with automated install scripts.'
  date: '2025-10-15'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample8.jpg'

seo:
  title: Installing Metalsmith Components - Download and Setup Guide
  description: 'Complete installation guide for Metalsmith components. Download individual sections or the complete bundle, use automated install scripts, and manage dependencies.'
  socialImage: '/assets/images/sample8.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, install components, download sections, component packages, metalsmith setup, component installation'

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
        image: '/assets/images/sample8.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Component Installation Guide'
      title: Installing Metalsmith Components
      titleTag: 'h1'
      subTitle: 'Add powerful, reusable components to your Metalsmith project'
      prose: 'Learn how to download and install component packages from the Metalsmith Components library. Whether you need a single section or the complete collection, this guide walks you through the installation process.'
    ctas:
      - url: '#getting-started'
        label: 'Get Started'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'getting-started'
    isDisabled: false
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
      title: Getting Started
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The Metalsmith Components library provides downloadable packages for all sections and partials. Each package includes everything you need to use the component in your project.

        **What's included in each package:**
        - Component template (`.njk` file)
        - Styles (`.css` file, if applicable)
        - JavaScript (`.js` file, if applicable)
        - Manifest file with metadata and dependencies
        - Configuration examples (`.yaml` file)
        - Comprehensive README with usage instructions
        - Automated installation script

        Components are designed to work seamlessly with the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter).
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'download-options'
    isDisabled: false
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Download Options
      titleTag: 'h2'
      subTitle: ''
      prose: |
        You have three options for downloading components, depending on your needs.

        ### Individual Section Components

        Download specific section components as needed. Perfect when you only need a few components or want to keep your project lean.

        **Available sections include:**
        - Hero sections (full-screen and standard)
        - Banner sections with images and CTAs
        - Media sections (image, video, audio)
        - Content sections (text, code blocks, accordions)
        - Interactive sections (sliders, flip cards, testimonials)
        - Utility sections (maps, search, logos)

        Visit any [section reference page](/references/sections/) and click the download button at the bottom of the page.

        ### Individual Partial Components

        Download reusable partial components that are used within sections. These are smaller UI elements that sections depend on.

        **Available partials include:**
        - Text partial (headings, prose content)
        - CTAs partial (buttons and links)
        - Image partial (responsive images with captions)
        - Navigation partial (menus and breadcrumbs)
        - Author/date partial (blog metadata)
        - And many more...

        Visit any [partial reference page](/references/partials/) and click the download button.

        ### Complete Bundle

        Download all components in one package. Ideal for new projects or when you want access to the full library.

        The complete bundle includes:
        - All 30 section components
        - All 21 partial components
        - Organized into `sections/` and `partials/` folders
        - Master installation script for batch installation
        - Complete documentation

        [Download Complete Bundle](/downloads/metalsmith-components.zip) (256KB)
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'automated-installation'
    isDisabled: false
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
      title: Automated Installation
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Every component package includes an automated installation script that handles the setup for you.

        ### Installing an Individual Component

        After downloading a component package, extract it and run the install script:

        ```bash
        # Extract the package
        unzip hero.zip
        cd hero

        # Run the installation script
        ./install.sh
        ```

        The installation script will:
        1. Verify you're in a Metalsmith project directory
        2. Check for existing installations and compare versions
        3. Validate that required dependencies are installed
        4. Copy component files to the correct locations
        5. Report any missing dependencies with download links

        ### Example Installation Output

        ```bash
        🔧 Installing hero v0.0.1...

        Checking dependencies...
        ⚠ Warning: Missing required partials:
          • text
          • ctas
          • image

        Download from: https://metalsmith-components.netlify.app/downloads/

        Continue installation anyway? (y/n)
        ```

        If you proceed, the component files will be installed even if dependencies are missing. You can download the required partials later.

        ### Installing the Complete Bundle

        The bundle includes a master installation script that installs all components in the correct order:

        ```bash
        # Extract the bundle
        unzip metalsmith-components.zip
        cd metalsmith-components

        # Run the master installation script
        ./install-all.sh
        ```

        This script automatically:
        - Installs all partials first (resolving dependencies)
        - Then installs all sections
        - Handles the entire installation with one command
        - Reports progress for each component
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'manual-installation'
    isDisabled: false
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Manual Installation
      titleTag: 'h2'
      subTitle: ''
      prose: |
        If you prefer to install components manually or need more control over the process, you can copy files directly.

        ### Component File Structure

        Each component follows this structure in your project:

        ```bash
        lib/layouts/components/
        ├── sections/
        │   └── hero/
        │       ├── hero.njk          # Template
        │       ├── hero.css          # Styles
        │       ├── hero.js           # Scripts (if applicable)
        │       └── manifest.json     # Metadata
        └── _partials/
            └── text/
                ├── text.njk          # Template
                ├── text.css          # Styles (if applicable)
                └── manifest.json     # Metadata
        ```

        ### Manual Installation Steps

        1. **Extract the component package**
        ```bash
        unzip hero.zip
        ```

        2. **Create the component directory**
        ```bash
        mkdir -p lib/layouts/components/sections/hero
        ```

        3. **Copy the component files**
        ```bash
        cp hero/hero.njk lib/layouts/components/sections/hero/
        cp hero/hero.css lib/layouts/components/sections/hero/
        cp hero/manifest.json lib/layouts/components/sections/hero/
        ```

        4. **Install required dependencies**
        Check the manifest.json `requires` field and install any missing partials using the same process.

        5. **Verify installation**
        Build your project to ensure the component is properly integrated:
        ```bash
        npm run build
        ```
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'dependency-management'
    isDisabled: false
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
      title: Managing Dependencies
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Understanding and managing component dependencies ensures your components work correctly.

        ### How Dependencies Work

        Most section components depend on one or more partial components. For example, the hero section requires:
        - **text** partial - for headings and prose content
        - **ctas** partial - for call-to-action buttons
        - **image** partial - for hero images
        - **commons** partial - for shared utilities

        These dependencies are automatically detected by the `metalsmith-bundled-components` plugin, which bundles only the CSS and JavaScript actually used on each page.

        ### Checking Dependencies

        Each component's manifest.json file lists its dependencies:

        ```json
        {
          "name": "hero",
          "requires": ["text", "ctas", "image", "commons"]
        }
        ```

        You can also check the README.md file included in each package for a complete list.

        ### Installing Missing Dependencies

        If you're missing required partials, the installation script will warn you and provide download links. You can:

        1. Download individual partials from their reference pages
        2. Use the complete bundle to get all partials at once
        3. Continue without the dependency (component may not render correctly)

        ### Version Compatibility

        All components share the same version number as the main project. When downloading components, they'll work together seamlessly regardless of when you downloaded them.

        However, the `contentHash` field in each manifest.json tracks actual changes to component files. This allows the install script to detect when a component has truly changed vs. just having a version bump.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'using-components'
    isDisabled: false
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Using Installed Components
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Once installed, components are ready to use in your page frontmatter.

        ### Basic Usage

        Add components to your pages by listing them in the `sections` array:

        ```yaml
        ---
        layout: pages/sections.njk
        title: My Page

        sections:
          - sectionType: hero
            containerTag: section
            containerFields:
              background:
                image: '/images/hero-bg.jpg'
            text:
              title: 'Welcome to My Site'
              prose: 'A compelling introduction'
            ctas:
              - url: '/contact'
                label: 'Get Started'
                isButton: true
        ---
        ```

        ### Configuration Examples

        Each component package includes an `examples.yaml` file with multiple configuration examples showing different use cases:

        - Minimal configuration
        - Common patterns
        - Advanced features
        - Real-world scenarios

        Refer to these examples as templates for your own implementations.

        ### Reference Documentation

        Visit the component's reference page on this site for:
        - Live examples
        - Complete configuration options
        - Implementation notes
        - Common patterns and best practices

        **Sections:** Browse all [section components](/references/sections/)
        **Partials:** Browse all [partial components](/references/partials/)
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'troubleshooting'
    isDisabled: false
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
      title: Troubleshooting
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Common issues and solutions when installing components.

        ### Component Not Rendering

        **Problem:** Component doesn't appear on the page after installation.

        **Solutions:**
        - Verify all required dependencies are installed
        - Check that file paths are correct in your project structure
        - Ensure your build process completed without errors
        - Review the component's manifest.json for missing files

        ### Build Errors

        **Problem:** Build fails after installing a component.

        **Solutions:**
        - Check for YAML syntax errors in your frontmatter
        - Verify the component's `sectionType` matches the component name
        - Ensure all required fields are provided in your configuration
        - Review build output for specific error messages

        ### Missing Styles or Scripts

        **Problem:** Component appears but styling or interactivity is missing.

        **Solutions:**
        - Verify the `metalsmith-bundled-components` plugin is configured
        - Check that CSS/JS files exist in the component directory
        - Ensure your build process includes PostCSS for CSS processing
        - Clear your browser cache and rebuild

        ### Version Conflicts

        **Problem:** Install script reports version conflicts.

        **Solutions:**
        - Check the `contentHash` to see if files actually changed
        - Review the component's README for breaking changes
        - Consider downloading the complete bundle for consistency
        - Backup your customizations before upgrading

        ### Permission Errors

        **Problem:** Install script fails with permission errors.

        **Solutions:**
        - Make the install script executable: `chmod +x install.sh`
        - Run from your project root directory
        - Ensure you have write permissions in the project directory

        For additional help, visit the [Component Architecture](/section-anatomy/) guide or review the [YAML to HTML](/yaml-to-html/) documentation.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'next-steps'
    isDisabled: false
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Next Steps
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Now that you know how to install components, explore these resources to make the most of them:

        **Browse Components**
        - [Section Components Library](/references/sections/) - All available sections
        - [Partial Components Library](/references/partials/) - All available partials
        - [Complete Component Bundle](/downloads/metalsmith-components.zip) - Download everything

        **Learn the Architecture**
        - [Section Anatomy](/section-anatomy/) - How components are structured
        - [From YAML to HTML](/yaml-to-html/) - Understanding the rendering process
        - [Building Pages with Components](/blog/building-pages-with-components/) - Page construction guide

        **Advanced Topics**
        - [Building Interactive Components](/blog/building-interactive-components/) - Adding JavaScript behavior
        - [Component Search System](/blog/building-component-search-system/) - Finding the right components

        **Get the Starter**
        The [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) provides a complete foundation with several components pre-installed. It's the fastest way to start building with components.
    ctas:
      - url: '/references/sections/'
        label: 'Browse All Components'
        isButton: true
        buttonStyle: 'primary'
      - url: '/downloads/metalsmith-components.zip'
        label: 'Download Complete Bundle'
        isButton: true
        buttonStyle: 'secondary'
---
