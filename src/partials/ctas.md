---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: CTAs Partial - Metalsmith Components
  description: 'Call-to-action group component for managing multiple buttons and links'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'CTAs'
  description: 'Manages groups of call-to-action buttons and links'
  tags: ['cta', 'buttons', 'actions', 'group', 'navigation']

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
      title: 'CTAs (Call-to-Actions)'
      titleTag: 'h1'
      prose: 'Flexible component for managing groups of action elements'

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
        The CTAs partial manages groups of call-to-action elements, providing consistent spacing and alignment for multiple buttons or links. It uses the Button partial internally for each CTA element.

        ## Usage in Section Components

        When creating new section components, import and use the CTAs partial like this:

        ```njk
        {% from "components/_partials/ctas/ctas.njk" import ctas %}

        {% if section.ctas | hasCtas %}
          {{ ctas(section.ctas) }}
        {% endif %}
        ```

        The `hasCtas` filter checks if a valid CTAs array exists before rendering.

        ## Configuration

        The CTAs partial accepts an array of CTA objects:

        ```yaml
        ctas:
          - url: '/contact'
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

        ### CTA Object Properties

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `url` | string | Yes | - | Link destination |
        | `label` | string | Yes | - | Button/link text |
        | `isButton` | boolean | No | false | Render as button or link |
        | `buttonStyle` | string | No | 'primary' | Button style variant |
        | `isExternal` | boolean | No | false | Open in new window |

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
      prose: 'Different CTA group configurations:'
    ctas:
      - url: '#primary-secondary'
        label: 'Primary Action'
        isButton: true
        buttonStyle: 'primary'
      - url: '#primary-secondary'
        label: 'Secondary Action'
        isButton: true
        buttonStyle: 'secondary'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Multiple CTAs Example'
      prose: 'CTAs can include a mix of buttons and text links:'
    ctas:
      - url: '#'
        label: 'Start Free Trial'
        isButton: true
        buttonStyle: 'primary'
      - url: '#'
        label: 'View Pricing'
        isButton: true
        buttonStyle: 'tertiary'
      - url: '#'
        label: 'or learn more about features'
        isButton: false

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Integration & Usage'
      titleTag: 'h2'
      prose: |
        ### Composition Pattern
        The CTAs partial demonstrates the composition pattern in our component system:
        - Uses the Button partial for individual elements
        - Manages layout and spacing between buttons
        - Provides consistent behavior across all sections

        ### Used By
        Most section components support CTAs:
        - Hero sections
        - Banner sections
        - Text sections
        - Media sections
        - Card components
        - And many more...

        ### Styling Notes
        - CTAs are typically displayed inline with spacing
        - Responsive stacking on mobile devices
        - Consistent alignment with section content
        - Follows design system spacing tokens
---
