---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Columns

navigation:
  navLabel: 'Columns Section'
  navIndex: 3

card:
  title: 'Columns'
  description: 'Create custom multi-column layouts. Combine text, images, and CTAs in flexible column arrangements.'
  image: '/assets/images/sample5.jpg'
  tags: ['columns', 'layout', 'grid', 'multi-column', 'flexible', 'responsive']

seo:
  title: Columns Section - Flexible Multi-Column Layouts for Metalsmith
  description: 'Create custom multi-column layouts with the columns section component. Combine text, images, and CTAs in flexible column arrangements for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith columns section, multi-column layout, flexible layouts, custom sections, column blocks, image gallery component, composable layouts'

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
      title: 'Columns Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A flexible multi-column section that allows custom layouts by composing different content blocks. Each column can contain multiple blocks.

        The example below can be used to merge with a previous hero section. The hero section has a class of `merge-with-next` which removes the bottom margin. The columns section has `containerFields.noMargin.top` set to true which removes the top margin. The columns section also has `inContainer` set to `true` which wraps the section in a container. This is a popular visual pattern in corporate and marketing websites.

        ```yaml
        - sectionType: columns
          containerTag: section
          classes: 'media-image hero-cta'
          # more settings

          contentClasses: ''
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

        ### Configuration Options

        #### Column Layout

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `contentClasses` | string | No | CSS classes applied to the content wrapper |
        | `columns` | array | Yes | Array of column definitions |

        #### Column Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `column.columnClasses` | string | No | CSS classes for styling individual columns |
        | `column.blocks` | array | Yes | Array of content blocks within a column |

        #### Block Types

        | Block Type | Description |
        |------------|-------------|
        | `text` | Text content block with leadIn, title, titleTag, subTitle, and prose |
        | `image` | Image block with src, alt, and caption |
        | `ctas` | Call-to-action buttons or links |

        Multiple blocks can be combined within a single column to create custom layouts.

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

  - sectionType: columns
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
    contentClasses: ''
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

  - sectionType: columns
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
