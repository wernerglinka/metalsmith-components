---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Overlay Partial - Metalsmith Components
  description: 'CSS-based overlay component for modal backgrounds and transitions'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Overlay'
  description: 'Styling component for modal overlays and backgrounds'
  pattern: 'simple-gray3'
  tags: ['overlay', 'modal', 'background', 'css', 'transition']

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
      title: 'Overlay'
      titleTag: 'h1'
      prose: |
        The Overlay partial is a CSS-only component that provides styling for modal overlays and background elements. It contains no template markup - all functionality is defined through CSS classes and transitions.

        ### Manifest

        ```json
        {
          "name": "overlay",
          "type": "_partials",
          "styles": ["overlay.css"],
          "scripts": [],
          "requires": []
        }
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
        - No template markup, styling only
        - Background overlays for modal dialogs
        - Used by video component
---
