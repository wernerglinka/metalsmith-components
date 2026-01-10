---
layout: pages/sections-with-sidebar.njk
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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Logos List'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A flexible section for displaying logo collections from various sources. Can be used for client logos, partner organizations, awards, social proof, or social media links.'

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
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Art Museum Example'
      titleTag: 'h2'
      subTitle: ''
      prose: 'Display logos from art museums collection with 200px width. The width of all museum logos is wider than the max container, so this list always scrolls'
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
      prose: 'Display social media links with smaller 90px width icons and reversed animation for small screens. These icons fit on a wide screen, no scrolling needed but for smaller screen they start scrolling.'
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
        bottom: true
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
        top: true
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
        color: 'var(--color-background-light)'
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

        ### Notes

        - Lists auto scroll horizontally when viewport width is smaller than list width
        - Display all logos or curated selections
        - Configurable maximum width for consistent display
        - Optional titles under logos (useful for awards)
        - Optional intro text and call-to-action buttons
        - Adapts to different screen sizes with smooth scrolling

        #### Layout Settings

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `isReverse` | boolean | No | Defines scrolling direction, `false` is right-to-left |
        | `hasCenteredContent` | boolean | No | Centers text and CTAs when `true` |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | No | Optional text block with leadIn, title, titleTag, subTitle, and prose |
        | `ctas` | array | No | Optional array of call-to-action buttons |

        #### Logo Configuration

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `source` | string | Yes | Data source for logos ('artMuseums', 'socialLinks', 'awards', or custom) |
        | `logoWidth` | number | Yes | Maximum width for logos in pixels |
        | `scope` | string | Yes | 'all' to display all logos, or 'selections' for subset |
        | `selections` | array | No | Array of specific logo selections (required if scope is 'selections') |
        | `showTitle` | boolean | No | Display title under each logo (useful for awards) |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'logos-list'
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
      title: 'Download Logos List Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete logos-list component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/logos-list.zip'
        label: 'Download Logos List Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
