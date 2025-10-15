---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Image Only

navigation:
  navLabel: 'Icon Only'
  navIndex: 4

card:
  title: 'Icon Only'
  description: 'Dedicated icon section for showcasing complex svg visuals with optional captions and CTAs.'
  image: '/assets/images/sample15.jpg'
  tags: ['image', 'media', 'visual', 'gallery', 'photo', 'picture']

seo:
  title: Icon Only Component - Visual Sections for Metalsmith
  description: 'Dedicated icon section for showcasing complex svg visuals with optional captions and CTAs.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith icom section, visual component, image gallery, featured image, photo section, image-only layout, visual content'

sections:
  - sectionType: text-only
    containerTag: article
    classes: 'first-text-section'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Icon Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A section for displaying SVG icons with optional links. Essentially a section wrapper for the icon partial.

  - sectionType: icon-only
    containerTag: section
    classes: 'demo'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    icon:
      icon: 'feather'
      title: 'Feather'
      url: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        ### Configuration

        ```yaml
        - sectionType: icon-only
          containerTag: section
          # container settings

          icon:
            icon: 'feather'  # Name of the Feather icon
            title: 'Feather'
            url: ''          # Optional link URL
        ```

        ### Configuration Options

        #### Icon Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `icon.icon` | string | Yes | Name of the Feather icon to display |
        | `icon.title` | string | No | Title/tooltip text for the icon |
        | `icon.url` | string | No | Optional URL to make the icon clickable |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'icon-only'
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
      title: 'Download Icon Only Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete icon-only component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/icon-only.zip'
        label: 'Download Icon Only Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
