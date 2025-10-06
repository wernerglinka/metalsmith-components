---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Text Link Partial - Metalsmith Components
  description: 'Simple text link component with external link handling'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Text Link'
  description: 'Styled text link with automatic external link detection'
  pattern: 'simple-gray2'
  tags: ['link', 'text', 'external', 'navigation', 'cta']

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-text-section'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Text Link'
      titleTag: 'h1'
      prose: |
        The Text Link partial creates a styled text link with automatic external link detection. It handles security attributes and accessibility for external links automatically.

        ### Manifest

        ```json
        {
          "name": "text-link",
          "type": "_partials",
          "styles": ["text-link.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        ctas:
          - url: '/about'
            label: 'Learn More'
            isButton: false  # Creates a text link
          - url: 'https://example.com'
            label: 'Visit Example'
            isButton: false
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `url` | string | Yes | Link destination URL |
        | `label` | string | Yes | Link text content |
        | `isButton` | boolean | Yes | Must be `false` |

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
      title: 'Examples'
      titleTag: 'h3'
      prose: 'Examples of text links used in CTA configurations.'
    ctas:
      - url: '/internal-page'
        label: 'Internal Text Link'
        isButton: false
      - url: 'https://example.com'
        label: 'External Text Link'
        isButton: false

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/text-link/text-link.njk" import textLink %}

        {# Direct usage #}
        {{ textLink({
          url: '/about',
          label: 'Learn More'
        }) }}

        {# Used within CTAs partial #}
        {% for cta in section.ctas %}
          {% if not cta.isButton %}
            {{ textLink(cta) }}
          {% endif %}
        {% endfor %}
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - Automatically detects external URLs and adds target="_blank' and `rel="noopener noreferrer"`
        - ARIA labels for external links
        - Used within CTAs partial for non-button links
---
