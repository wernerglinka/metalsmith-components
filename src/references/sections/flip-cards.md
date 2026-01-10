---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Flip Cards

navigation:
  navLabel: 'Flip Cards'
  navIndex: 3

card:
  title: 'Flip Cards'
  description: 'Interactive flip card components with front and back content, icons, and CTAs.'
  image: '/assets/images/sample6.jpg'
  tags: ['flip-cards', 'interactive', 'cards', 'animation', 'hover-effects', 'cta']

seo:
  title: Flip Cards Component - Interactive Card UI for Metalsmith
  description: 'Interactive flip card components with front and back content, icons, and CTAs. Create engaging card-based interfaces for your Metalsmith static site.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith flip cards, interactive cards, card UI component, flip animation, card interface, hover cards, two-sided cards'

sections:
  - sectionType: text-only
    containerTag: article
    id: 'first-section'
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
      title: Flip Cards
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Interactive flip card components with front and back content, icons, and CTAs. The flip cards are rendered in a flex container with responsive layout and smooth flip animations.

  - sectionType: flip-cards
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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    cards:
      - front:
          icon: 'activity'
          text:
            leadIn: 'Simple Text Section'
            title: The Card Title
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        back:
          text:
            leadIn: ''
            title: This is the back
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
          ctas:
            - url: 'https://apple.com'
              label: 'Go Apple'
              isButton: false
              buttonStyle: 'primary'

      - front:
          icon: 'airplay'
          text:
            leadIn: 'Simple Text Section'
            title: The Second Card Title
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo.

        back:
          text:
            leadIn: ''
            title: The Back
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          ctas:
            - url: ''
              label: ''
              isButton: true
              buttonStyle: 'primary'

      - front:
          icon: 'paperclip'
          text:
            leadIn: 'Simple Text Section'
            title: The Third Card Title
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus.

        back:
          text:
            leadIn: ''
            title: The Back
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue.
          ctas:
            - url: ''
              label: ''
              isButton: true
              buttonStyle: 'primary'

      - front:
          icon: 'paperclip'
          text:
            leadIn: 'Simple Text Section'
            title: The Third Card Title
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna.

        back:
          text:
            leadIn: ''
            title: The Back Title
            titleTag: 'h4'
            subTitle: ''
            prose: |-
              Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
          ctas:
            - url: 'http://glinka.co'
              label: 'Learn More'
              isButton: true
              buttonStyle: 'primary small'

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
        - sectionType: flip-cards
          containerTag: aside
          #more settings

          cards:
            - front:
                icon: 'activity'
                text:
                  leadIn: 'Simple Text Section'
                  title: The Card Title
                  titleTag: 'h3'
                  subTitle: ''
                  prose: |-
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
              back:
                text:
                  leadIn: ''
                  title: This is the back
                  titleTag: 'h3'
                  subTitle: ''
                  prose: |-
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                ctas:
                  - url: 'https://apple.com'
                    label: 'Go Apple'
                    isButton: false
                    buttonStyle: 'primary'

            # other flipcards
        ```

        ### Configuration Options

        #### Card Layout

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `cards` | array | Yes | Array of flip card definitions |

        #### Individual Card Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `cards[n].front` | object | Yes | Front side content of the card |
        | `cards[n].back` | object | Yes | Back side content of the card |

        #### Front/Back Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `icon` | string | No | Icon name from lib/layouts/icons (front side only) |
        | `text` | object | No | Text content with leadIn, title, titleTag, subTitle, and prose |
        | `ctas` | array | No | Call-to-action buttons (typically on back side) |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'flip-cards'
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
      title: 'Download Flip Cards Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete flip-cards component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/flip-cards.zip'
        label: 'Download Flip Cards Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
