---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: CTAs Partial - Metalsmith Components
  description: 'Call-to-action group component for managing multiple buttons and links'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'CTAs'
  description: 'Manages groups of call-to-action buttons and links'
  pattern: 'simple-gray2'
  tags: ['cta', 'buttons', 'actions', 'group', 'navigation']

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
      title: 'CTAs (Call-to-Actions)'
      titleTag: 'h1'
      prose: |
        The CTAs partial manages groups of call-to-action elements, providing consistent spacing and alignment for multiple buttons or links. It uses the Button partial internally for each CTA element.

        ### Manifest

        ```json
        {
          "name": "ctas",
          "type": "_partials",
          "styles": ["ctas.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        ctas:
          - url: '/'
            label: 'Get Started'
            isButton: true
            buttonStyle: 'primary'
          - url: '/learn-more'
            label: 'Learn More'
            isButton: true
            buttonStyle: 'secondary'
          - url: '/docs'
            label: 'View Documentation'
            isButton: false
        ```

        ### Configuration Options

        The CTAs partial accepts an array of CTA objects with the following properties:

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `url` | string | Yes | - | Link destination |
        | `label` | string | Yes | - | Button/link text |
        | `isButton` | boolean | No | false | Render as button or link |
        | `buttonStyle` | string | No | 'primary' | Button style variant (primary, secondary, tertiary) |
        | `isSmall` | boolean | No | false | Render as small button |

        ### Example

  - sectionType: hero
    containerTag: section
    isFullScreen: true
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        color: ''
    text:
      title: 'Hero with Multiple CTAs'
      titleTag: 'h1'
      prose: 'Demonstrating different CTA styles and configurations in a hero section.'
    ctas:
      - url: '/get-started'
        label: 'Get Started'
        isButton: true
        buttonStyle: 'primary'
      - url: '/learn-more'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'secondary'
      - url: '/docs'
        label: 'View Documentation'
        isButton: false

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      background:
        isDark: false
    text:
      title: 'Additional CTA Examples'
      titleTag: 'h2'
      prose: ''
    ctas:
      - url: '#primary-secondary'
        label: 'Small Primary'
        isButton: true
        buttonStyle: 'primary'
        isSmall: true
      - url: '#primary-secondary'
        label: 'Small Secondary'
        isButton: true
        buttonStyle: 'secondary'
        isSmall: true
      - url: '#primary-secondary'
        label: 'Tertiary Button'
        isButton: true
        buttonStyle: 'tertiary'
      - url: '#'
        label: 'or learn more about features'
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
        {% from "components/_partials/ctas/ctas.njk" import ctas %}

        {% if section.ctas | hasCtas %}
          {{ ctas(section.ctas) }}
        {% endif %}
        ```

        The `hasCtas` filter checks if a valid CTAs array exists before rendering.

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
      title: 'Features'
      titleTag: 'h2'
      prose: |
        - **Multiple Button Styles**: Primary, secondary, and tertiary button variants
        - **Mixed Content**: Combines buttons and text links in same group
        - **Size Variants**: Regular and small button options
        - **Flexible Layout**: Automatic spacing and alignment for multiple CTAs
        - **Helper Integration**: Uses Button partial for consistent styling
        - **Accessibility**: Full keyboard navigation and screen reader support
---
