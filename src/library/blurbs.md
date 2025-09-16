---
layout: pages/sections.njk
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
      title: 'Blurbs'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The blurb section is a short description of a subject written for promotional purposes and appearing in a card with an image or icon. An optional CTA provides a link to more info.

        The `isReverse` property switches the feature/blurbs column order. The component handles responsive layouts automatically and includes lazy loading for media assets.

        ```yaml
        - sectionType: blurbs
          containerTag: aside
          
          isReverse: false
          # more settings

          
        ```

        ### Common Properties (all media types)

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
        top: true
        bottom: true
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
      subTitle: ''
      prose: 'Use the included feather icons or add your own'

    blurbs:
      source: 'inline-icon-example' # data file in 'lib/assets/data/blurbs'
      layout: 'inline' # inline, featurePlus,
---
