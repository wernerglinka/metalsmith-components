---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Banner

navigation:
  navLabel: 'Banner'
  navIndex: 3

card:
  title: 'Banner'
  description: 'Create eye-catching CTA banners with background images or colors for prominent calls-to-action.'
  image: '/assets/images/sample9.jpg'
  tags: ['banner', 'cta', 'call-to-action', 'announcement', 'full-width']

seo:
  title: Banner Component - Metalsmith Call-to-Action Section
  description: 'Create eye-catching CTA banners with background images or colors. Flexible styling options for promotional sections and announcements on Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith banner, CTA section, call-to-action component, banner with background image, promotional banner, static site components'

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
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Banner'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A prominent call-to-action banner section that can use either a background image or color.

  - sectionType: banner
    containerTag: aside
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
        image: '/assets/images/sample8.jpg'
        imageScreen: 'light' # light, dark, none
    text:
      leadIn: 'With Background Image'
      title: CTA Banner Example
      titleTag: 'h2'
      subTitle: Uses light image screen for better text contrast
      prose: Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies.
    ctas:
      - url: 'https://apple.com'
        label: 'go to apple'
        isButton: true
        buttonStyle: 'primary'
      - url: 'https://ibm.com'
        label: 'go to big brother'
        isButton: false
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
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: banner
          containerTag: aside
          classes: ''
          id: ''
          isDisabled: false
          isReverse: false
          isAnimated: true
          containerFields:
            inContainer: false          # Stretch across viewport
            noMargin:
              top: true
              bottom: true
            noPadding:
              top: false
              bottom: false
            background:
              color: ''
              image: '/assets/images/sample8.jpg'
              imageScreen: 'light'     # Options: light, dark, none
          text:
            leadIn: 'With Background Image'
            title: CTA Banner Example
            titleTag: 'h2'
            subTitle: Uses light image screen for better text contrast
            prose: Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies.
          ctas:
            - url: 'https://apple.com'
              label: 'go to apple'
              isButton: true
              buttonStyle: 'primary'
            - url: 'https://ibm.com'
              label: 'go to big brother'
              isButton: false
              buttonStyle: 'primary'
        ```

        ### Configuration Options

        #### Container Layout

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `inContainer` | boolean | No | `true` restricts width to content width, `false` stretches banner across viewport |

        #### Background Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `image` | string | No | Background image URL |
        | `color` | string | No | Background color |
        | `isDark` | boolean | No | Indicates dark background for text color adjustment |
        | `imageScreen` | string | No | Screen overlay for better text readability ('light', 'dark', 'none') |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | Yes | Standard text block with leadIn, title, subtitle, and prose |
        | `ctas` | array | No | Array of call-to-action buttons or links |

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'banner'
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
      title: 'Download Banner Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete banner component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/banner.zip'
        label: 'Download Banner Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
