---
layout: pages/sections.njk
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
    text:
      leadIn: ''
      title: 'Icon Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A focused section for displaying images with optional captions and call-to-action buttons. Perfect for showcasing featured images.

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

        ### Key Features

        - Clean, centered image display
        - Optional image captions
        - Support for multiple CTA buttons
        - Responsive image sizing
        - Accessibility-focused alt text support

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

  - sectionType: icon-only
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
    icon:
      icon: 'feather'
      title: 'Feather'
      url: ''

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
