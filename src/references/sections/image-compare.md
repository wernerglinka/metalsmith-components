---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Image Only

navigation:
  navLabel: 'Image Compare'
  navIndex: 4

card:
  title: 'Image Compare'
  description: 'Compare a before and after image'
  image: '/assets/images/sample19.jpg'
  tags: ['image', 'media', 'visual', 'image comparison', 'photo', 'picture']

seo:
  title: Image Compare - Compare a before and after image Section for Metalsmith
  description: 'Compare a before and after image'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith image section, visual component, image compare, featured image, photo section, visual content'

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
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Image compare Section'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A section for comparing before and after images.'

  - sectionType: image-compare
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
    imageBefore:
      src: '/assets/images/before.jpg'
      alt: 'Description of the image for accessibility'
      caption: ''
    imageAfter:
      src: '/assets/images/after.jpg'
      alt: 'Description of the image for accessibility'
      caption: ''

  - sectionType: text-only
    containerTag: section
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: image-compare
          containerTag: section
          # container settings

          imageBefore:
            src: '/assets/images/before-photo.jpg'
            alt: 'Description of the image for accessibility'
            caption: ''
          imageAfter:
            src: '/assets/images/after-photo.jpg'
            alt: 'Description of the image for accessibility'
            caption: ''
        ```

        ### Image Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `imageBefore` | object | Yes | the before image |
        | `imageAfter` | object | Yes | the after image |


        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `src` | string | Yes | Path to the image file |
        | `alt` | string | Yes | Alternative text for accessibility |
        | `caption` | string | No | Optional caption text displayed below the image |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'image-compare'
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
      title: 'Download Image Compare Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete image-compare component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/image-compare.zip'
        label: 'Download Image Compare Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
