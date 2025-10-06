---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Branding Partial - Metalsmith Components
  description: 'Branding partial component for displaying site logo with homepage link'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Branding'
  description: 'Site logo component with home page linking'
  pattern: 'simple-gray4'
  tags: ['branding', 'logo', 'navigation', 'home', 'header']

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
      title: 'Branding'
      titleTag: 'h1'
      prose: |
        The Branding partial provides a simple, consistent way to display your site logo as a clickable link back to the homepage.

        ### Manifest

        ```json
        {
          "name": "branding",
          "type": "_partials",
          "styles": ["branding.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        branding:
          link: '/'
          logo:
            src: '/assets/images/logo.svg'
            alt: 'Metalsmith Components'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `link` | string | Yes | URL path for the home link (typically '/') |
        | `logo.src` | string | Yes | Logo image source path |
        | `logo.alt` | string | Yes | Alt text for the logo image |


        ### Example

        The branding element can be seen in the upper left corner of this page

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
      leadIn: ''
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/branding/branding.njk" import branding %}

        {% set link = '/' %}
        {% set img = { src: '/assets/images/metalsmith2025-logo-bug.png', alt: 'Metalsmith Starter' } %}

        {{ branding( link, img ) }}
        ```
---
