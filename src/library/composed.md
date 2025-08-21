---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Composed Section'
  navIndex: 3

seo:
  title: Metalsmith components library - Composed Section
  description: 'A Metalsmith Starter to build modern websites using structured data and reusable components.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''

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
      title: 'Composed Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A flexible multi-column section that allows custom layouts by composing different content blocks. Each column can contain multiple blocks.

        The example below can be used to merge with a previous hero section. The hero section has a class of `merge-with-next` which removes the bottom margin. The composed section has `containerFields.noMargin.top` set to true which removes the top margin. The composed section also has `inContainer` set to `true` which wraps the section in a container. This is a popular visual pattern in corporate and marketing websites.

        ```yaml
        - sectionType: composed
          containerTag: section
          classes: 'media-image hero-cta'
          # more settings

          contentClasses: 'glass-background'
          columns:
            - column:
              columnClasses: 'image'
              blocks:
                - image:
                    src: '/assets/images/sample3.jpg'
                    alt: 'sample image'
                    caption: ''
            - column:
              columnClasses: 'text flow'
              blocks:
                - text:
                    leadIn: This is different
                    title: The Power of Composable Pages
                    titleTag: 'h2'
                    subTitle: ''
                    prose: |-
                      This is an example of a composed section. Rather then using a monolithic section, the composed section allows for multiple columns of content. Allowing the composition of custom layouts.
        ```

        ### Specific composed section properties
        - `columns`: Array of column definitions
        - `column.columnClasses`: CSS classes for styling individual columns
        - `column.blocks`: Array of content blocks within a column
        - Block types include: `text`, `image`, `ctas`, and other partial types
        - Multiple blocks can be combined within a single column

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'first-section'
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
      title: Text-Image-CTA Layout
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        A horizontal layout combining text content, an image, and a call-to-action button.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: composed
    containerTag: section
    classes: 'media-image hero-cta'
    id: ''
    description: 'This is a composed section]'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
    contentClasses: 'glass-background'
    columns:
      - column:
        columnClasses: 'image'
        blocks:
          - image:
              src: '/assets/images/sample3.jpg'
              alt: 'sample image'
              caption: ''
      - column:
        columnClasses: 'text flow'
        blocks:
          - text:
              leadIn: This is different
              title: The Power of Composable Pages
              titleTag: 'h2'
              subTitle: ''
              prose: |-
                This is an example of a composed section. Rather then using a monolithic section, the composed section allows for multiple columns of content. Allowing the composition of custom layouts.
      - column:
        columnClasses: 'ctas align-center'
        blocks:
          - ctas:
              - url: 'https://glinka.co/blog/building-flexible-page-layouts/'
                label: 'Learn More'
                isButton: true
                buttonStyle: 'button'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'first-section'
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
      title: Image Gallery Layout
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        A three-column image gallery created using the composed section structure.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: composed
    containerTag: section
    classes: 'image-gallery'
    id: 'section-id'
    description: 'Implements a three column image gallery.'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        isDark: false
        color: ''
        image: ''
    columns:
      - column:
        columnClasses: 'image'
        blocks:
          - image:
              src: '/assets/images/sample11.jpg'
              alt: 'sample image 11'
              caption: ''

      - column:
        columnClasses: 'image'
        blocks:
          - image:
              src: '/assets/images/sample10.jpg'
              alt: 'sample image 10'
              caption: ''

      - column:
        columnClasses: 'image'
        blocks:
          - image:
              src: '/assets/images/sample9.jpg'
              alt: 'sample image 9'
              caption: ''
---
