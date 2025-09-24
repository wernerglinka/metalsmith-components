---
layout: pages/sections-with-sidebar.njk
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
  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Breadcrumbs'
      titleTag: 'h1'
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
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Example'
      titleTag: 'h2'
      prose: |
        ### Standard Breadcrumb Trail

        **Home** › **Documentation** › **Components** › **Current Page**

        ```html
        <ul class="breadcrumbs" aria-label="Breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/documentation/">Documentation</a></li>
          <li><a href="/documentation/components/">Components</a></li>
          <li><span aria-current="page">Current Page</span></li>
        </ul>
        ```

        Common separator styles are implemented via CSS:
        - **Forward slash**: Home / Products / Widget
        - **Greater than**: Home > Products > Widget
        - **Chevron**: Home › Products › Widget
        - **Arrow**: Home → Products → Widget
        - **Bullet**: Home • Products • Widget

        Accessibility:
        - `aria-label="Breadcrumb"` for screen reader context
        - `aria-current="page"` for current page identification
        - Semantic list structure for navigation
        - Keyboard navigable links
---
