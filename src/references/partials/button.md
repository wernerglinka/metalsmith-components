---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Button Partial - Metalsmith Components
  description: 'Button partial component for creating consistent call-to-action buttons across your site'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Button'
  description: 'Configurable button component with multiple styles and states'
  pattern: 'simple-gray1'
  tags: ['button', 'cta', 'action', 'link', 'ui']

sections:
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
      leadIn: 'Partial Component'
      title: 'Button'
      titleTag: 'h1'
      prose: |
        The Button partial is a fundamental UI element used throughout the component system. It provides consistent styling and behavior for call-to-action elements, supporting multiple visual styles and states.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/button/button.njk" import button %}

        {{ button({
          url: '/contact',
          label: 'Get Started',
          isButton: true,
          buttonStyle: 'primary'
        }) }}

        {# Small button example #}
        {{ button({
          url: '/contact',
          label: 'Small Button',
          isButton: true,
          buttonStyle: 'secondary',
          isSmall: true
        }) }}
        ```

        ## Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `url` | string | Yes | - | Link destination URL |
        | `label` | string | Yes | - | Button text |
        | `isButton` | boolean | No | false | Render as button (true) or link (false) |
        | `buttonStyle` | string | No | 'primary' | Visual style: 'primary', 'secondary', 'tertiary' |
        | `isSmall` | boolean | No | false | Render as small button |

  - sectionType: text-only
    containerTag: section
    classes: 'example-left-align'
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
      titleTag: 'h2'
      prose: 'Below are examples of the button partial with different configurations:'
    ctas:
      - url: '#'
        label: 'Primary Button'
        isButton: true
        buttonStyle: 'primary'
      - url: '#'
        label: 'Secondary Button'
        isButton: true
        buttonStyle: 'secondary'
      - url: '#'
        label: 'Tertiary Button'
        isButton: true
        buttonStyle: 'tertiary'
      - url: '#'
        label: 'Text Link'
        isButton: false

  - sectionType: text-only
    containerTag: section
    classes: 'example-left-align'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: ''
      titleTag: 'h2'
      prose: 'And the small variety:'
    ctas:
      - url: '#'
        label: 'Small Button'
        isButton: true
        buttonStyle: 'primary'
        isSmall: true
      - url: '#'
        label: 'Small Button'
        isButton: true
        buttonStyle: 'secondary'
        isSmall: true
      - url: '#'
        label: 'Small Button'
        isButton: true
        buttonStyle: 'tertiary'
        isSmall: true

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
      titleTag: 'h2'
      prose: |
        - **External links automatically detected**: URLs starting with `http://` or `https://` automatically open in new windows with proper `rel` attributes
        - **Accessibility built-in**: External links get automatic aria-labels and focus styles
---
