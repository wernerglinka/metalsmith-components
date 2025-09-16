---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Logos List

navigation:
  navLabel: 'Logos List'
  navIndex: 3

card:
  title: 'Logos List'
  description: 'Display collections of logos, client brands, partner organizations, or social media icons with auto-scrolling support.'
  image: '/assets/images/sample10.jpg'
  tags: ['logos', 'brands', 'partners', 'clients', 'sponsors', 'auto-scroll', 'carousel']

seo:
  title: Logos List Component - Client & Partner Logo Display for Metalsmith
  description: 'Display collections of logos, client brands, partner organizations, or social media icons with auto-scrolling support. Flexible logo grid for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith logos list, client logos, partner logos, logo grid, social media icons, brand showcase, logo carousel, scrolling logos'

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
        A flexible section for displaying logo collections from various sources. Can be used for client logos, partner organizations, awards, social proof, or social media links. Lists will start scrolling horizontally if viewport width is smaller than list width. Now supports optional text content and CTAs.

        ```yaml
        - sectionType: logos-list
          isReverse: false
          hasCenteredContent: false
          
          text:
            leadIn: ''
            title: 'Our Partners'
            titleTag: 'h2'
            subTitle: ''
            prose: 'We work with industry-leading organizations'
          
          logos:
            source: 'artMuseums' # name of the data file 
            logoWidth: 200 # width in pixels
            scope: 'all'
            selections: []
            showTitle: false # display title under logo
          
          ctas:
            - url: '/partners'
              label: 'View All Partners'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Specific logos list properties

        - `isReverse`: Defines scrolling direction, `false` is right-to-left
        - `hasCenteredContent`: Centers text and CTAs when `true`
        - `text`: Optional text block with leadIn, title, titleTag, subTitle, and prose
        - `logos.source`: Data source for logos - `'artMuseums'`, `'socialLinks'`, `'awards'` or custom source
        - `logos.logoWidth`: Maximum width for logos in pixels
        - `logos.scope`: `'all'` to display all logos, or `'selections'` for subset
        - `logos.selections`: Array of specific logo selections if scope is `'selections'`
        - `logos.showTitle`: Display title under each logo (useful for awards)
        - `ctas`: Optional array of call-to-action buttons

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
      title: 'Art Museum Example'
      titleTag: 'h2'
      subTitle: ''
      prose: 'Display logos from art museums collection with 200px width.'
    logos:
      source: 'artMuseums'
      logoWidth: 200
      scope: 'all'
      selections: []
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
      title: Social Links Example
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Display social media links with smaller 90px width icons and reversed animation for small screens.
    logos:
      source: 'socialLinks'
      logoWidth: 90
      scope: 'all'
      selections: []
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

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
        - sectionType: logos-list
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
        bottom: true
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Awards & Recognition Example'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Display awards with titles shown under each logo/icon. Great for social proof.

        ```yaml
        - sectionType: logos-list
          hasCenteredContent: true
          
          text:
            title: 'Awards & Recognition'
            titleTag: 'h2'
            prose: 'Our commitment to excellence has been recognized by industry leaders'
          
          logos:
            source: 'awards'
            logoWidth: 160
            scope: 'all'
            showTitle: true  # Shows award names
          
          ctas:
            - url: '/about/awards'
              label: 'Learn More'
              isButton: true
              buttonStyle: 'secondary'
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
    hasCenteredContent: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: '#f8f8f8'
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Awards & Recognition'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Our commitment to excellence has been recognized by leading industry organizations
    logos:
      source: 'awards'
      logoWidth: 160
      scope: 'all'
      selections: []
      showTitle: true
    ctas:
      - url: '/about/awards'
        label: 'Learn More About Our Awards'
        isButton: true
        buttonStyle: 'secondary'
---
