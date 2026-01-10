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

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'overlay'
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
      title: 'Download Overlay Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete overlay component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/overlay.zip'
        label: 'Download Overlay Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
