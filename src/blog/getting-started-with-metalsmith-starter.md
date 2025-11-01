---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Getting Started with the Metalsmith2025 Starter'
  description: 'Complete guide to setting up your first Metalsmith project. From installation to deployment, learn how to build modern static sites with structured content and reusable components.'
  date: '2025-10-15'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample17.jpg'

seo:
  title: Getting Started with Metalsmith2025 Structured Content Starter
  description: 'Step-by-step guide to building your first Metalsmith site. Install the starter, understand the structure, build pages with components, and deploy to production.'
  socialImage: '/assets/images/sample6.jpg'
  canonicalURL: ''
  keywords: 'metalsmith starter, getting started, static site generator, structured content, component-based website, metalsmith tutorial, metalsmith setup'

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
        image: '/assets/images/sample6.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Metalsmith Tutorial'
      title: 'Getting Started with the Metalsmith2025 Starter'
      titleTag: 'h1'
      subTitle: 'Build your first component-based static site with Metalsmith'
      prose: 'The Metalsmith2025 Structured Content Starter provides everything you need to build modern, component-based websites. This guide takes you from installation to your first deployed site.'
    ctas:
      - url: '#installation'
        label: 'Start Building'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'what-is-it'
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
      title: What is the Metalsmith2025 Starter?
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The Metalsmith2025 Structured Content Starter is a modern static website template that uses a component-based architecture. Unlike traditional static web sites that embed content in Markdown files, this starter defines pages using structured data in frontmatter.

        The starter embraces a component-based architecture that lets you build pages by composing reusable sections. Rather than writing content in Markdown, you define everything as structured YAML data in frontmatter. The build system scans all components used across your entire site and bundles them into optimized, cacheable CSS and JavaScript files. There's no framework overhead - just pure HTML, CSS, and vanilla JavaScript rendered through the powerful Nunjucks templating engine. Modern tooling like PostCSS, ESLint, and Prettier keeps your code clean and maintainable.

        This approach works beautifully for marketing websites, documentation sites, blogs, portfolios, landing pages, and any project that benefits from reusable, structured content. The starter comes with several pre-installed components and provides a solid foundation for adding more from the Metalsmith Components library.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'installation'
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
      title: Installation
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Getting started with the Metalsmith2025 Starter is straightforward. You'll need Node.js 18 or higher installed on your system.

        ### Clone the Repository

        Start by cloning the starter repository to your local machine:

        ```bash
        git clone https://github.com/wernerglinka/metalsmith2025-structured-content-starter my-site
        ```

        This creates a new directory called `my-site` with all the starter files. You can replace `my-site` with any name you prefer for your project.

        ### Install Dependencies

        Navigate to your project directory and install the required dependencies:

        ```bash
        cd my-site
        npm install
        ```

        This installs all the necessary packages including Metalsmith, plugins, and build tools. The installation typically takes 1-2 minutes depending on your connection speed.

        ### Start the Development Server

        Launch the development server with live reload:

        ```bash
        npm start
        ```

        Your site is now running at `http://localhost:3000`. The browser will automatically refresh whenever you make changes to your files.

        **That's it!** You now have a fully functional Metalsmith site ready for development.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'project-structure'
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
      title: Understanding the Project Structure
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The starter follows a clear, organized structure that separates content, components, and configuration.

        ### Key Directories

        ```bash
        my-site/
        ├── src/                    # Source content files
        │   ├── index.md            # Homepage
        │   ├── about.md            # About page
        │   └── blog/               # Blog posts
        ├── lib/                    # Application code
        │   ├── assets/             # Images, fonts, global styles
        │   ├── data/               # Global data (JSON files)
        │   ├── layouts/            # Templates and components
        │   │   ├── components/     # Reusable components
        │   │   │   ├── sections/   # Page sections (hero, banner, etc.)
        │   │   │   └── _partials/  # UI partials (text, ctas, image, etc.)
        │   │   └── pages/          # Page layout templates
        │   └── plugins/            # Custom Metalsmith plugins
        ├── build/                  # Generated site (git-ignored)
        ├── metalsmith.js           # Build configuration
        └── package.json            # Project dependencies
        ```

        ### Content Files (`src/`)

        Your content lives in the `src/` directory as Markdown files with YAML frontmatter. Each file represents a page on your site.

        ### Components (`lib/layouts/components/`)

        The starter includes two types of components:

        **Sections** - Large page building blocks like heroes, banners, and content sections. These are complete, self-contained page elements.

        **Partials** - Smaller reusable UI elements like text blocks, CTAs, and images. Sections typically depend on multiple partials.

        ### Assets (`lib/assets/`)

        Static assets like images, fonts, and global stylesheets. The build system automatically processes and optimizes these files.

        ### Data Files (`lib/data/`)

        Global data stored as JSON files (site metadata, navigation, author info, etc.) that can be referenced throughout your templates.

        ### Build Output (`build/`)

        The generated static site. This directory is created during builds and is excluded from version control. Deploy this directory to your hosting service.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'creating-pages'
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
      title: Creating Your First Page
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Let's create a new page to understand how the structured content approach works.

        ### Create a New Page File

        Create a new file in the `src/` directory:

        ```bash
        touch src/services.md
        ```

        ### Define Page Structure in Frontmatter

        Add content to `services.md` using structured frontmatter:

        ```yaml
        ---
        layout: pages/sections.njk

        seo:
          title: Our Services
          description: 'Professional services for modern businesses'

        sections:
          - sectionType: hero
            containerTag: section
            containerFields:
              background:
                image: '/assets/images/services-hero.jpg'
                imageScreen: 'dark'
            text:
              title: 'Our Services'
              prose: 'Comprehensive solutions for your business needs'
            ctas:
              - url: '#services'
                label: 'Learn More'
                isButton: true

          - sectionType: text-only
            containerTag: article
            containerFields:
              inContainer: true
            text:
              title: 'What We Offer'
              prose: |
                We provide expert consulting and development services
                to help businesses thrive in the digital age.
        ---
        ```

        ### View Your New Page

        Save the file and visit `http://localhost:3000/services/` in your browser. The page is automatically generated with:
        - A hero section with background image
        - A text section with content
        - Proper HTML structure and styling
        - SEO metadata

        **Key points:**
        - No Markdown body content needed
        - Everything defined in structured YAML
        - Components automatically rendered from frontmatter
        - Changes appear instantly in the browser

        For more details, see [Building Pages with Components](/blog/building-pages-with-components/).
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'development-workflow'
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
      title: Development Workflow
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The starter includes several npm scripts to streamline your development workflow.

        ### Core Commands

        **Development server with live reload:**
        ```bash
        npm start
        ```
        Starts the development server at `http://localhost:3000` with file watching and automatic browser refresh.

        **Production build:**
        ```bash
        npm run build
        ```
        Creates an optimized production build in the `build/` directory with minified HTML, CSS, and JavaScript.

        **Serve the production build:**
        ```bash
        npm run serve
        ```
        Previews the production build locally before deployment.

        ### Code Quality Commands

        **Format all code:**
        ```bash
        npm run format
        ```
        Runs Prettier on JavaScript, JSON, and CSS files.

        **Lint JavaScript:**
        ```bash
        npm run lint
        ```
        Runs ESLint and automatically fixes issues.

        **Lint CSS:**
        ```bash
        npm run lint:css
        ```
        Runs Stylelint on all CSS files.

        **Run all formatters and linters:**
        ```bash
        npm run fix
        ```
        Sequentially runs format, lint, and lint:css.

        ### Typical Development Session

        1. Start the development server: `npm start`
        2. Edit files in `src/` and `lib/`
        3. View changes automatically in browser
        4. Format and lint before committing: `npm run fix`
        5. Build for production: `npm run build`
        6. Deploy the `build/` directory

        ### File Watching

        The development server watches these locations:
        - `src/**/*` - Content files
        - `lib/layouts/**/*` - Templates and components
        - `lib/assets/**/*` - Static assets

        Changes to these files trigger automatic rebuilds and browser refresh.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'adding-components'
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
      title: Adding More Components
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The starter includes a basic set of components. You can easily add more from the Metalsmith Components library.

        ### Pre-installed Components

        The starter includes these essential components:
        - **hero** - Hero sections with images and CTAs
        - **banner** - Content banners with media
        - **text-only** - Text content sections
        - **media** - Image and video sections
        - **text** partial - Headings and prose content
        - **ctas** partial - Call-to-action buttons
        - **image** partial - Responsive images

        ### Adding New Components

        To add components from the library:

        **Option 1: Download Individual Components**

        1. Browse the [sections library](/references/sections/) or [partials library](/references/partials/)
        2. Click the download button on any component page
        3. Extract and run the install script:
           ```bash
           unzip maps.zip
           cd maps
           ./install.sh
           ```

        **Option 2: Download the Complete Bundle**

        Get all components at once:

        1. Download the [complete bundle](/downloads/metalsmith-components.zip)
        2. Extract and run the master install script from your project root:
           ```bash
           # Navigate to your project root (where package.json is)
           cd /path/to/your/metalsmith-project

           # Extract the bundle
           unzip ~/Downloads/metalsmith-components.zip

           # Run the install script from project root
           ./metalsmith-components/install-all.sh
           ```

        The script offers two modes:
        - **Full install** - Installs all 52 components
        - **Update-only** - Only updates components you already have (22 components in the starter)

        For detailed installation instructions, see [Installing Metalsmith Components](/blog/installing-metalsmith-components/).

        ### Using Installed Components

        Once installed, components are immediately available for use in your pages. Simply add them to the `sections` array in your frontmatter:

        ```yaml
        sections:
          - sectionType: maps
            containerFields:
              inContainer: true
            mapProvider: 'leaflet'
            markers: 'office-locations'
        ```

        The build system automatically bundles the required CSS and JavaScript for components used on each page.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'customizing'
    isDisabled: false
    containerFields:
      inContainer: true
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
    text:
      leadIn: ''
      title: Customizing Your Site
      titleTag: 'h2'
      subTitle: ''
      prose: |
        Make the starter your own by customizing styling, metadata, and configuration. For more inspiration you may want to checkout how we built [this very website](https://github.com/wernerglinka/metalsmith-components).

        ### Site Metadata

        Update site information in `lib/data/site.json`:

        ```json
        {
          "name": "My Awesome Site",
          "description": "Building amazing things with Metalsmith",
          "url": "https://mysite.com",
          "author": "Your Name",
          "email": "you@mysite.com"
        }
        ```

        This data is available throughout your templates and used for SEO metadata.

        ### Styling and Design Tokens

        Global styles are in `lib/assets/styles/`:

        **Design tokens** (`_design-tokens.css`):
        ```css
        :root {
          /* Colors */
          --color-primary: #007bff;
          --color-secondary: #6c757d;

          /* Typography */
          --font-family-base: system-ui, sans-serif;
          --font-size-base: 1rem;

          /* Spacing */
          --spacing-unit: 1rem;
        }
        ```

        Edit these variables to customize colors, typography, and spacing throughout your site.

        **Base styles** (`_css-base.css`):
        Global element styles, resets, and utilities.

        ### Component Styles

        Each component has its own CSS file that's automatically bundled when the component is used. Edit component styles directly in their directories:

        ```bash
        lib/layouts/components/sections/hero/hero.css
        ```

        ### Build Configuration

        Customize the build process in `metalsmith.js`:
        - Add or remove plugins
        - Configure plugin options
        - Customize output directory
        - Add custom processing steps

        ### Adding Custom Plugins

        Create custom Metalsmith plugins in `lib/plugins/` and include them in your build configuration.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'deploying'
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
      title: Deploying Your Site
      titleTag: 'h2'
      subTitle: ''
      prose: |
        The starter works with all major static hosting services. Here's how to deploy to popular platforms.

        ### Netlify

        **Via Git Integration:**

        1. Push your project to GitHub, GitLab, or Bitbucket
        2. In Netlify, click "New site from Git"
        3. Connect your repository
        4. Set build settings:
           - Build command: `npm run build`
           - Publish directory: `build`
        5. Click "Deploy site"

        **Via Netlify CLI:**

        ```bash
        npm install -g netlify-cli
        npm run build
        netlify deploy --prod --dir=build
        ```

        ### Vercel

        **Via Git Integration:**

        1. Push your project to GitHub, GitLab, or Bitbucket
        2. Import your repository in Vercel
        3. Vercel auto-detects settings:
           - Build command: `npm run build`
           - Output directory: `build`
        4. Click "Deploy"

        **Via Vercel CLI:**

        ```bash
        npm install -g vercel
        npm run build
        vercel --prod
        ```

        ### Cloudflare Pages

        1. Push your project to GitHub or GitLab
        2. In Cloudflare Pages, click "Create a project"
        3. Connect your repository
        4. Set build configuration:
           - Build command: `npm run build`
           - Build output directory: `build`
        5. Click "Save and Deploy"

        ### GitHub Pages

        For GitHub Pages deployment to a subdirectory:

        1. Set the `BASE_PATH` environment variable:
           ```bash
           BASE_PATH=/my-repo npm run build
           ```

        2. Deploy the `build/` directory to the `gh-pages` branch

        The `metalsmith-safe-links` plugin automatically handles relative URLs for subdirectory deployments.

        ### Custom Server

        Deploy the `build/` directory to any static file server:

        ```bash
        npm run build
        rsync -avz build/ user@server:/var/www/html/
        ```

        Your site is pure HTML, CSS, and JavaScript with no server-side requirements.
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
      title: Next Steps
      titleTag: 'h2'
      subTitle: ''
      prose: |
        You now have a fully functional Metalsmith site. Here are some resources to continue your journey:

        **Learn the Architecture**
        - [Section Anatomy](/section-anatomy/) - Deep dive into component structure
        - [From YAML to HTML](/yaml-to-html/) - How frontmatter becomes pages
        - [Building Pages with Components](/blog/building-pages-with-components/) - Page construction patterns

        **Expand Your Component Library**
        - [Installing Components](/blog/installing-metalsmith-components/) - Installation guide
        - [Browse Sections](/references/sections/) - All available section components
        - [Browse Partials](/references/partials/) - All available partial components
        - [Download Complete Bundle](/downloads/metalsmith-components.zip) - Get everything

        **Advanced Topics**
        - [Building Interactive Components](/blog/building-interactive-components/) - Add JavaScript functionality
        - [Component Search System](/blog/building-component-search-system/) - Build powerful search features

        **Get Help**
        - [GitHub Repository](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) - Source code and issues
        - [Metalsmith Documentation](https://metalsmith.io) - Core Metalsmith docs
        - [Nunjucks Documentation](https://mozilla.github.io/nunjucks/) - Template engine reference

        **Share Your Work**

        Built something with the starter? We'd love to see it! Share your projects and help inspire others in the community.
    ctas:
      - url: 'https://github.com/wernerglinka/metalsmith2025-structured-content-starter'
        label: 'View on GitHub'
        isButton: true
        buttonStyle: 'primary'
      - url: '/references/sections/'
        label: 'Browse Components'
        isButton: true
        buttonStyle: 'secondary'
---
