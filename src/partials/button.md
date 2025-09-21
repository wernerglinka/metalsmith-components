---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: Button Partial - Metalsmith Components
  description: 'Button partial component for creating consistent call-to-action buttons across your site'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Button'
  description: 'Configurable button component with multiple styles and states'
  tags: ['button', 'cta', 'action', 'link', 'ui']

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
      title: 'Button'
      titleTag: 'h1'
      prose: 'A versatile button component for call-to-action elements'

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
    containerFields:
      inContainer: true
      isAnimated: true
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
      - url: '#'
        label: 'Small Button'
        isButton: true
        buttonStyle: 'primary'
        isSmall: true

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
        The Button partial is commonly used within the CTAs partial, which manages groups of buttons. Many section components include CTAs arrays that utilize the Button partial for rendering action elements.

        ### Used By
        - Hero sections
        - Banner sections
        - Text sections
        - Card components
        - And many more...

        ### Notes
        - **External links automatically detected**: URLs starting with `http://` or `https://` automatically open in new windows with proper `rel` attributes
        - **Accessibility built-in**: External links get automatic aria-labels and focus styles
        - **Button styles**: Defined in global design tokens for consistency
---
