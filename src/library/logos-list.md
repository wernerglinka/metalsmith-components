---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Logos List'
  navIndex: 3

seo:
  title: Metalsmith components library - Logos List
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
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Logos List'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A flexible section for displaying logo collections from various sources. Can be used for client logos, partner organizations, or social media links. Lists will start scrolling horizontally if viewport width is smaller then list width. 

        ```yaml
        isReverse: false

        logos:
          source: 'artMuseums' # name of the data file 
          logoWidth: 200 # width in pixels
          scope: 'all'
          selections: []
        ```

        ### Specific logos list properties

        - `isReverse`: Defines scrolling direction, `false` is right-to-left
        - `logos.source`: Data source for logos - `'artMuseums'`, `'socialLinks'` or custom source
        - `logos.logoWidth`: Maximum width for logos in pixels
        - `logos.scope`: `'all'` to display all logos, or specify subset
        - `logos.selections`: Array of specific logo selections if not using all

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
      title: Art Museums Example
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Display logos from art museums collection with 200px width.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: logos-list
    containerTag: aside
    classes: ''
    id: 'logosList'
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
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
    logos:
      source: 'artMuseums'
      logoWidth: 200
      scope: 'all'
      selections: []

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
      title: Social Links Example
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Display social media links with smaller 90px width icons and reversed animation for small screens.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: logos-list
    containerTag: aside
    classes: ''
    id: 'logosList'
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
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
    logos:
      source: 'socialLinks'
      logoWidth: 90
      scope: 'all'
      selections: []

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
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: Social Links Example
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Limited icons, show only three.

        ```yaml
        isReverse: true

        logos:
          source: 'socialLinks' # name of the data file 
          logoWidth: 90 # width in pixels
          scope: 'selections'
          selections:
            - 'LinkedIn'
            - 'Behance'
            - 'GitHub'
        ```

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: logos-list
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
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
    logos:
      source: 'socialLinks'
      logoWidth: 90
      scope: 'selections'
      selections:
        - 'LinkedIn'
        - 'Behance'
        - 'Github'
---
