---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: Breadcrumbs Partial - Metalsmith Components
  description: 'Breadcrumbs partial component for hierarchical navigation with accessibility support'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Breadcrumbs'
  description: 'Hierarchical breadcrumb navigation with accessibility support'
  pattern: 'simple-gray6'
  tags: ['breadcrumbs', 'navigation', 'hierarchy', 'accessibility', 'semantic']

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
      title: 'Breadcrumbs'
      titleTag: 'h1'
      prose: 'Hierarchical navigation showing the current page location'

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
        The Breadcrumbs partial provides a semantic navigation trail that helps users understand their location within the site hierarchy. It automatically handles the current page display and includes proper accessibility attributes for screen readers.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/breadcrumbs/breadcrumbs.njk" import breadcrumbs %}

        {{ breadcrumbs(page.breadcrumbs) }}

        {# Typical page implementation #}
        <main>
          <div class="container">
            {{ breadcrumbs(page.breadcrumbs) }}
            <article>
              <!-- Page content -->
            </article>
          </div>
        </main>
        ```

        ## Configuration Options

        | Parameter | Type | Required | Description |
        |-----------|------|----------|-------------|
        | `breadcrumbs` | array | Yes | Array of breadcrumb items |

        ### Breadcrumb Item Structure

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `title` | string | Yes | Display text for breadcrumb |
        | `path` | string | Yes | URL path (not used for current page) |

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Examples'
      titleTag: 'h2'
      prose: |
        ## Standard Breadcrumb Trail

        A typical breadcrumb trail showing three levels of hierarchy:

        **Home** › **Documentation** › **Components** › **Current Page**

        ```html
        <ul class="breadcrumbs" aria-label="Breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/documentation/">Documentation</a></li>
          <li><a href="/documentation/components/">Components</a></li>
          <li><span aria-current="page">Current Page</span></li>
        </ul>
        ```

        ## Two-Level Breadcrumb

        The minimum breadcrumb trail (home + one level):

        **Home** › **About**

        ```html
        <ul class="breadcrumbs" aria-label="Breadcrumb">
          <li><a href="/">Home</a></li>
          <li><span aria-current="page">About</span></li>
        </ul>
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Conditional Rendering'
      titleTag: 'h2'
      prose: |
        ## Smart Display Logic

        The breadcrumbs partial includes built-in logic to prevent unnecessary display:

        - **Only renders if breadcrumbs array exists**
        - **Only renders if there are 2 or more items** (prevents single-item breadcrumbs)
        - **Returns nothing for home page or invalid data**

        This prevents cluttered navigation on pages where breadcrumbs don't add value.

        ## Visual Separators

        Common separator styles implemented via CSS:
        - **Forward slash**: Home / Products / Widget
        - **Greater than**: Home > Products > Widget
        - **Chevron**: Home › Products › Widget
        - **Arrow**: Home → Products → Widget
        - **Bullet**: Home • Products • Widget

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Integration with Pages'
      titleTag: 'h2'
      prose: |
        The Breadcrumbs partial provides essential navigation context and works seamlessly with page layouts.

        ### Used By
        - Content pages
        - Documentation sites
        - Product catalogs
        - Blog post pages

        ### Works With
        - **Navigation partial** - Primary site navigation
        - **Page headers** - Contextual page information
        - **Collection pages** - Category/tag hierarchies

        ### CSS Classes Generated
        - `.breadcrumbs` - Main container list
        - Individual `<li>` elements for each breadcrumb
        - `[aria-current="page"]` selector for current page

        ### Accessibility Features
        - `aria-label="Breadcrumb"` for screen reader context
        - `aria-current="page"` for current page identification
        - Semantic list structure for navigation
        - Keyboard navigable links

        ### SEO Benefits
        - Helps search engines understand site structure
        - Can appear in search results as rich snippets
        - Improves internal linking structure
        - Reduces bounce rates by providing navigation context

        ### Notes
        - **Data generation**: Breadcrumb data typically generated by build plugins or manual configuration
        - **Performance**: All rendering happens at build time with no client-side JavaScript
        - **Responsive**: Relies on CSS for mobile optimization and truncation
        - **Schema markup**: Consider adding structured data for enhanced SEO
---