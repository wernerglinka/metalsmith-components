---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Image Only

navigation:
  navLabel: 'Image Only'
  navIndex: 4

card:
  title: 'Image Only'
  description: 'Dedicated image section for showcasing visuals with optional captions and CTAs.'
  image: '/assets/images/sample15.jpg'
  tags: ['image', 'media', 'visual', 'gallery', 'photo', 'picture']

seo:
  title: Image Only Component - Visual Sections for Metalsmith
  description: 'Dedicated image section for showcasing visuals with optional captions and CTAs. Perfect for featured images.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith image section, visual component, image gallery, featured image, photo section, image-only layout, visual content'

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
      title: 'Image Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A section for displaying images with optional captions and CTAs. Essentially a section wrapper for the image partial.

  - sectionType: image-only
    containerTag: section
    classes: ''
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
    image:
      src: '/assets/images/sample12.jpg'
      alt: 'Sample image demonstrating the image-only section'
      caption: 'This is an example caption that provides context for the image'
    ctas:
      - url: '#'
        label: 'View Gallery'
        isButton: true
        buttonStyle: 'primary'

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
        - sectionType: image-only
          containerTag: section
          # container settings

          image:
            src: '/assets/images/featured-photo.jpg'
            alt: 'Description of the image for accessibility'
            caption: 'Optional caption providing context or description'
          ctas:
            - url: 'https://example.com/gallery'
              label: 'View Full Gallery'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Configuration Options

        #### Image Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `image.src` | string | Yes | Path to the image file |
        | `image.alt` | string | Yes | Alternative text for accessibility |
        | `image.caption` | string | No | Optional caption text displayed below the image |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `ctas` | array | No | Optional array of call-to-action buttons or links |

  - sectionType: image-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    image:
      src: '/assets/images/sample6.jpg'
      alt: 'Image with dark background treatment'
      caption: 'Full-width background with overlay image'
    ctas:
      - url: ''
        label: 'Learn More'
        isButton: true
        buttonStyle: 'inverted'
---
