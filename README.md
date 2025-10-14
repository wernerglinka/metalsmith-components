<p align="center">
  <a href="https://www.metalsmith.io">
    <img alt="Metalsmith" src="https://www.glinka.co/assets/images/metalsmith2025-logo-bug.png" width="80" />
  </a>
</p>
<h1 align="center">
  Metalsmith Components
</h1>

A comprehensive showcase and documentation site for building modern websites with Metalsmith using a component-based architecture. This website demonstrates how to create scalable, maintainable static sites using structured content in frontmatter instead of traditional Markdown. Each component is self-contained with its own styles and scripts, which are automatically bundled only when used.

This library serves as the component reference for the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter). Components showcased here can be imported into your starter-based projects to enhance and extend your website's functionality.

[View the live site](https://ms-components-library.netlify.app/)

## What This Site Offers

### Component Library

Explore a comprehensive collection of production-ready components:

- **Hero Sections**: Full-screen and standard hero components with background images and CTAs
- **Banner Components**: Versatile call-to-action sections with background options and accordion functionality
- **Media Sections**: Flexible image and text combinations with reversible layouts
- **Content Blocks**: Text-only sections, testimonials, and blog listings
- **Interactive Elements**: Sliders, flip cards, and logo carousels
- **Mapping Components**: Interactive maps with Leaflet and OpenLayers support, JSON data files, custom markers, and clustering
- **Composed Sections**: Multi-column layouts for custom content arrangements
- **Search Functionality**: Real-time component search with fuzzy matching across titles, descriptions, and tags

### Documentation & Learning

- **Section Anatomy**: Deep dive into component structure and properties
- **Build Process Guide**: Understanding the journey from YAML to HTML
- **Template Hierarchy**: Learn how components compose into complete pages
- **Best Practices**: Component configuration and optimization techniques
- **Sample Blog**: See the component system in action with real content

### Technical Features

- **Component Dependency Bundling**: Automatically bundles only the CSS and JavaScript needed for components used on each page
- **PostCSS Processing**: Built-in autoprefixing and CSS optimization
- **True Component Encapsulation**: Each component manages its own styles, scripts, and templates
- **No Framework Overhead**: Pure HTML/CSS/JS output without React, Vue, or other runtime dependencies
- **Searchable Component Library**: Build-time search index generation with component tagging system

## Getting Started with Metalsmith Components

### For Metalsmith2025 Starter Users

If you're building a website with the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter):

1. **Browse this library** to discover available components
2. **Copy component code** from this repository to your starter project
3. **Import components** into your `lib/layouts/components/sections/` directory
4. **Customize styles and behavior** to match your design needs
5. **Use the component** by adding it to your page's frontmatter sections

### Use as a Reference

This site serves as a living documentation and reference implementation for building component-based Metalsmith sites. Browse the component library, examine the source code, and learn from the implementation patterns.

### Build Your Own Component Library

You can also fork this repository to create your own component library:

1. Fork or clone the repository
2. Create new components following the established patterns
3. Document your components with live examples
4. Share your library with the Metalsmith community

## Installation & Development

### Prerequisites

- Node.js version 18 or higher
- npm or yarn package manager

### Local Development

1.  **Clone the repository**

    ```shell
    git clone https://github.com/wernerglinka/metalsmith-components.git
    cd metalsmith-components
    ```

2.  **Install dependencies**

    ```shell
    npm install
    ```

3.  **Start the development server**

    ```shell
    npm start
    ```

    Your site will be running at `http://localhost:3000` with live reloading enabled.

4.  **Build for production**

    ```shell
    npm run build
    ```

    The production-ready site will be in the `build` directory.

### Available Scripts

```shell
npm start      # Start development server with live reloading
npm run dev    # Run a development build
npm run build  # Create a production build
npm run serve  # Serve the build directory with Browser-Sync
npm run format # Format code with Prettier
npm run lint   # Lint and fix code with ESLint
npm run fix    # Run both format and lint in sequence
```

## Project Structure

```
.
├── src/                        # Source content pages
│   ├── index.md               # Homepage showcasing components
│   ├── library.md             # Component library index
│   ├── library/               # Individual component documentation
│   │   ├── banner.md          # Banner component examples
│   │   ├── hero.md            # Hero section examples
│   │   ├── media-image.md     # Media section examples
│   │   ├── maps.md            # Interactive maps examples
│   │   └── ...                # More component examples
│   ├── section-anatomy.md     # Component structure documentation
│   ├── yaml-to-html.md        # Build process documentation
│   ├── blog.md                # Blog index with pagination
│   └── blog/                  # Sample blog posts
├── lib/                       # Templates and assets
│   ├── assets/                # Images, fonts, global styles
│   ├── data/                  # Site configuration (site.json, etc.)
│   │   └── maps/              # Map data JSON files
│   │       ├── london-landmarks.json
│   │       ├── paris-monuments.json
│   │       └── nyc-clustering-demo.json
│   └── layouts/
│       ├── components/
│       │   ├── _partials/     # Reusable UI elements
│       │   └── sections/      # Page section components
│       │       └── maps/      # Interactive maps component
│       │           ├── modules/
│       │           │   ├── providers/    # Leaflet & OpenLayers providers
│       │           │   └── helpers/      # Utilities & icon registry
│       └── pages/             # Page templates
├── plugins/                   # Custom build plugins
│   └── generate-maps-icons.js     # Dynamic icon registry generator
├── metalsmith.js              # Build configuration
└── package.json               # Project dependencies
```

## How It Works

### Relationship with Metalsmith2025 Starter

This component library demonstrates the same paradigm used by the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter). While the starter provides the foundation and build system for creating component-based Metalsmith sites, this library showcases the full potential of what can be built with that approach.

Components from this library are designed to be compatible with the starter's architecture, allowing developers to:

- Import individual components as needed
- Study implementation patterns
- Extend their starter projects with proven components
- Learn best practices for component development

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

### Component Architecture

Each component is self-contained with:

- **Template** (`.njk`): Defines the HTML structure
- **Styles** (`.css`): Component-specific CSS
- **Scripts** (`.js`): Interactive behavior (optional)
- **Manifest** (`manifest.json`): Dependencies and metadata

### Component Dependency Bundler

The system automatically manages component assets:

1. **Scans pages** to identify which components are used
2. **Bundles only required CSS/JS** for optimal performance
3. **Applies PostCSS processing** for autoprefixing and minification
4. **Generates per-page assets** with no unused code

### JSON Data Architecture

For complex components like maps, the system uses external JSON files for data management:

- **Clean Separation**: UI configuration stays in page frontmatter, content data in JSON files
- **Scalable Data**: Handle large datasets (many markers, locations, etc.) without cluttering pages
- **Reusable Content**: Same JSON data can be used across multiple pages
- **Build Integration**: JSON files in `/lib/data/` are automatically loaded and accessible as `data.maps.filename`

## Available Components

### Content Sections

- **Hero**: Full-screen or standard hero sections with background images
- **Banner**: Call-to-action sections with flexible backgrounds
- **Text Only**: Pure content sections with markdown support
- **Media Image**: Image and text combinations with reversible layouts

### Interactive Components

- **Simple Slider**: Carousel with pagination or tabbed interface
- **Flip Cards**: Interactive cards with front/back content
- **Logos List**: Auto-scrolling logo carousels
- **Testimonial**: Customer quotes with attribution
- **Search**: Real-time fuzzy search with Fuse.js integration

### Mapping Components

- **Interactive Maps**: Dual provider support (Leaflet and OpenLayers)
- **JSON Data Architecture**: External data files for clean separation of content and configuration
- **Custom Markers**: Dynamic icon registry with Feather icons
- **Marker Clustering**: Performance optimization for large datasets
- **Responsive Design**: Mobile-optimized touch interactions

### Layout Components

- **Composed**: Multi-column custom layouts
- **Blog List**: Paginated blog post grids
- **Blog Navigation**: Previous/next post navigation

View live examples in the [Component Library](/library).

## Deployment

Deploy to any static hosting service:

- [Netlify](https://www.netlify.com) (recommended)
- [Vercel](https://vercel.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- GitHub Pages

### Subdirectory Deployment

For deployment to subdirectories (e.g., GitHub Pages), the [metalsmith-safe-links](https://github.com/wernerglinka/metalsmith-safe-links) plugin automatically handles path prefixing for all assets and links.

## Resources

### Related Projects

- [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) - The starter template that uses this component paradigm
- [Metalsmith Documentation](https://www.metalsmith.io) - Official Metalsmith documentation

### Documentation

- [Component Library](/library) - Browse all available components with live examples
- [Section Anatomy](/section-anatomy) - Deep dive into component structure and properties
- [Build Process Guide](/yaml-to-html) - Understanding the YAML to HTML rendering pipeline
- [Sample Blog](/blog) - See components in action with real content

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details.

## Community

Join the Metalsmith community:

- [Gitter Chat](https://gitter.im/metalsmith/community)
- [GitHub Discussions](https://github.com/metalsmith/metalsmith/discussions)

## Acknowledgments

Built with [Metalsmith](https://www.metalsmith.io) - a pluggable static site generator.
