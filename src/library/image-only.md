---
layout: pages/sections.njk
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
      title: 'Image Only Section'
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

        ### Specific image-only properties

        - `image.src`: Path to the image file (required)
        - `image.alt`: Alternative text for accessibility (required)
        - `image.caption`: Optional caption text displayed below the image
        - `ctas`: Optional array of call-to-action buttons or links

        This component is ideal for hero images, featured content, portfolio pieces, or any scenario where the image is the primary content focus.

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
