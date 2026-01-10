---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Blurbs

navigation:
  navLabel: 'Blurbs'
  navIndex: 3

card:
  title: 'Blurbs'
  description: 'A short description of a subject written for promotional purposes and appearing in a card with an image or icon. An optional CTA provides a link to more info.'
  image: '/assets/images/sample24.jpg'
  tags: ['image', 'icon', 'overview', 'content']

seo:
  title: Blurbs Component for Metalsmith.
  description: 'A short description of a subject written for promotional purposes and appearing in a card with an image or icon. An optional CTA provides a link to more info.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith text blurbs layout, excerps with thumbnail image, text, optional cta, reversible layout, feature showcase'

sections:
  - sectionType: text-only
    containerTag: article
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Blurbs'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The blurb section is a short description of a subject written for promotional purposes and appearing in a card with an image or icon. It supports _inline_ and _featurePlus_ layout options.

  - sectionType: blurbs
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text: # intro text
      leadIn: ''
      title: 'Inline blurbs with Icons'
      titleTag: 'h2'
      subTitle: 'Use the included feather icons or add your own'
      prose: ''
    ctas:
      - url: '/'
        label: 'See All'
        isButton: true
        buttonStyle: 'primary'
    blurbs:
      source: 'inline-icon-example' # data file in 'lib/assets/data/blurbs'
      layout: 'inline' # inline, featurePlus,

  - sectionType: blurbs
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text: # intro text
      leadIn: ''
      title: 'Grid with Feature with Images'
      titleTag: 'h2'
      subTitle: ''
      prose: 'This could all be done with icons as well'
    blurbs:
      source: 'grid-with-feature-example' # data file in 'lib/assets/data/blurbs'
      layout: 'featurePlus' # inline, featurePlus,

  - sectionType: text-only
    containerTag: article
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
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: blurbs
          containerTag: aside
          isReverse: false              # Default column order
          text:
            title: 'Inline blurbs with Icons'
            prose: 'Use the included feather icons or add your own'
          blurbs:
            source: 'features-list'     # Loads from lib/data/blurbs/features-list.json
            layout: 'inline'            # Options: inline, featurePlus
        ```

        ### Configuration Options

        #### Layout Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `isReverse` | boolean | No | Switches the feature/blurbs column order |
        | `blurbs.layout` | string | Yes | Layout type ('inline', 'featurePlus') |

        #### Data Loading

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `blurbs.source` | string | Yes | Data file name in `lib/data/blurbs/` directory |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | No | Optional intro text with title, subtitle, and prose |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'blurbs'
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
      title: 'Download Blurbs Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete blurbs component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/blurbs.zip'
        label: 'Download Blurbs Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
