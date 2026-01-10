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
      noPadding:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Button'
      titleTag: 'h1'
      prose: |
        The Button partial is a base UI element used throughout the component system. It provides consistent styling and behavior for call-to-action elements, supporting multiple visual styles.

        ### Manifest

        ```json
        {
          "name": "button",
          "type": "_partials",
          "styles": ["button.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

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
            isSmall: true
        ```

        ### Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `url` | string | Yes | - | Link destination URL |
        | `label` | string | Yes | - | Button text |
        | `isButton` | boolean | No | true | Render as button vs text link |
        | `buttonStyle` | string | No | 'primary' | Visual style: 'primary', 'secondary', 'tertiary' |
        | `isSmall` | boolean | No | false | Render as small button |

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: 'Examples'
      titleTag: 'h2'
      prose: 'Standard button sizes in all three styles:'
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

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: ''
      titleTag: 'h2'
      prose: 'Small buttons for compact UI elements:'
    ctas:
      - url: '#'
        label: 'Small Primary'
        isButton: true
        buttonStyle: 'primary'
        isSmall: true
      - url: '#'
        label: 'Small Secondary'
        isButton: true
        buttonStyle: 'secondary'
        isSmall: true
      - url: '#'
        label: 'Small Tertiary'
        isButton: true
        buttonStyle: 'tertiary'
        isSmall: true

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
        {% from "components/_partials/button/button.njk" import button %}

        {{ button(cta) }}
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
        - Primary, secondary, and tertiary visual styles
        - Standard and small button sizes
        - External Links open new window handling with proper rel attributes
        - ARIA labels and keyboard navigation support
        - Interactive visual feedback

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'button'
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Download Button Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete button component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/button.zip'
        label: 'Download Button Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
