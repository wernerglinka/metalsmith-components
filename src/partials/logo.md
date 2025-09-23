---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: Logo Partial - Metalsmith Components
  description: 'Logo partial component for rendering linked logo images with external link detection'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Logo'
  description: 'Linked logo image component with external link handling'
  pattern: 'simple-gray4'
  tags: ['logo', 'image', 'link', 'branding', 'external']

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
      title: 'Logo'
      titleTag: 'h1'
      prose: 'A lightweight component for rendering linked logo images'

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
        The Logo partial creates a linked image element with proper accessibility attributes. It automatically detects external URLs and adds appropriate attributes for security and user experience.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/logo/logo.njk" import logo %}

        {{ logo(logoItem) }}

        {# Common usage in loops #}
        {% for item in section.logos %}
          <div class="logo-item">
            {{ logo(item) }}
          </div>
        {% endfor %}
        ```

        ## Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `url` | string | Yes | Link destination URL |
        | `logo` | string | Yes | Path to logo image file |
        | `title` | string | Yes | Company name (used for alt text) |

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
        ## Internal Link Example

        When a logo links to an internal page, it renders as a standard link:

        ```html
        <a href="/about/">
          <img src="/assets/images/company-logo.svg" alt="About Us"/>
        </a>
        ```

        ## External Link Example

        When a logo links to an external URL, additional attributes are added:

        ```html
        <a href="https://example.com"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Example Company (opens in new window)">
          <img src="/assets/images/example-logo.svg" alt="Example Company"/>
        </a>
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Integration with Sections'
      titleTag: 'h2'
      prose: |
        The Logo partial is primarily used within the Logos List section component, which provides auto-scrolling functionality and handles data loading from JSON sources.

        ### Used By
        - Logos List sections
        - Partner showcases
        - Client galleries
        - Footer logo areas

        ### Automatic Features
        - **External link detection**: URLs starting with `http://` or `https://` automatically open in new windows
        - **Security attributes**: External links get `rel="noopener noreferrer"` for security
        - **Accessibility**: External links receive enhanced aria-labels indicating new window behavior
        - **Alt text**: Uses the title property for image accessibility

        ### Notes
        - **Logo sizing**: The partial renders the image at its natural size; sizing is controlled by CSS
        - **Image optimization**: Handled by build plugins, not the partial itself
        - **Data structure**: Works with data from `lib/data/` JSON files or direct arrays
---