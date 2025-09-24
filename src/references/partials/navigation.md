---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: Navigation Partial - Metalsmith Components
  description: 'Navigation partial component with active page detection and responsive mobile menu'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Navigation'
  description: 'Responsive navigation menu with active state detection and mobile support'
  pattern: 'simple-gray5'
  tags: ['navigation', 'menu', 'responsive', 'hamburger', 'active-state']

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section partial-hero'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Partial Component'
      title: 'Navigation'
      titleTag: 'h1'
      prose: 'Smart navigation component with active page detection and responsive design'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Overview'
      titleTag: 'h2'
      prose: |
        The Navigation partial provides a complete menu system with automatic active state detection, path-based highlighting, and a responsive hamburger menu for mobile devices. It intelligently highlights both exact page matches and parent sections.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/navigation/navigation.njk" import navigation %}

        {{ navigation(mainMenu, page.path) }}

        {# Typical header implementation #}
        <header>
          <div class="container">
            {{ branding(site.title) }}
            {{ navigation(data.navigation.main, page.path) }}
          </div>
        </header>
        ```

        ## Configuration Options

        | Parameter | Type | Required | Description |
        |-----------|------|----------|-------------|
        | `mainMenu` | array | Yes | Array of menu items with title and path |
        | `urlPath` | string | Yes | Current page path for active state detection |

        ### Menu Item Structure

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `title` | string | Yes | Display text for menu link |
        | `path` | string | Yes | URL path (absolute from site root) |

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Active State Detection'
      titleTag: 'h2'
      prose: |
        The navigation partial provides intelligent active state detection with two distinct levels:

        ## Exact Match (class: "active")
        - Current page exactly matches menu item path
        - Link receives `aria-current="page"` attribute
        - Typically styled as disabled/current page indicator

        ```html
        <li class="active">
          <a href="/about/" class="active" aria-current="page">
            About
          </a>
        </li>
        ```

        ## Path Match (class: "active-path")
        - Current page is within menu item's section
        - Example: `/products/widgets/` highlights "Products"
        - Styled differently, remains clickable

        ```html
        <li class="active-path">
          <a href="/products/" class="active-path">
            Products
          </a>
        </li>
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Responsive Features'
      titleTag: 'h2'
      prose: |
        ## Mobile Menu Support

        The navigation includes a hamburger menu button for mobile devices:

        ```html
        <button class="hamburger-menu" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        ```

        ## JavaScript Behavior

        The included `navigation.js` script provides:
        - Toggle functionality for mobile menu
        - Smooth animations for menu transitions
        - Keyboard navigation support
        - Focus management for accessibility

        ## CSS Responsive Design

        The `navigation.css` file includes:
        - Desktop horizontal menu layout
        - Mobile vertical menu with slide-out drawer
        - Hamburger icon animations
        - Breakpoint-based layout switching

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Integration with Headers'
      titleTag: 'h2'
      prose: |
        The Navigation partial is typically used within site headers and works seamlessly with other header components.

        ### Used By
        - Site headers
        - Mobile menu overlays
        - Sidebar navigation
        - Footer navigation

        ### Works With
        - **Branding partial** - Logo and site title
        - **Search partial** - Site search functionality
        - **Theme switcher** - Dark/light mode toggle

        ### CSS Classes Generated
        - `.main-menu` - Primary navigation list
        - `.active` - Exact page match
        - `.active-path` - Section match
        - `.hamburger-menu` - Mobile toggle button

        ### Accessibility Features
        - Semantic `<nav>` element structure
        - `aria-current="page"` for active page
        - `aria-label` for hamburger button
        - Keyboard navigation support
        - Focus management in mobile menu

        ### Notes
        - **Active states**: Detected server-side during build for performance
        - **External links**: Can be added to menu data but don't receive active states
        - **Mobile breakpoint**: Typically set at 768px but customizable via CSS
        - **Data source**: Menu data usually stored in `lib/data/navigation.json`
---