---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Manual Card Partial - Metalsmith Components
  description: 'Versatile card component with flexible content and layout options'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Manual Card'
  description: 'Flexible card component with image, text, and CTA support'
  pattern: 'simple-gray4'
  tags: ['card', 'manual', 'flexible', 'image', 'text', 'cta']

sections:
  - sectionType: text-only
    containerTag: section
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
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Manual Card'
      titleTag: 'h1'
      prose: |
        The Manual Card is a versatile card component that can display content with optional images, text, and CTAs. Unlike collection cards, this can be used standalone or as a non-linked card. It supports both horizontal and vertical layouts with flexible background options.

        ### Manifest

        ```json
        {
          "name": "manual-card",
          "type": "_partials",
          "styles": ["manual-card.css"],
          "scripts": [],
          "requires": ["text", "ctas", "image", "icon"]
        }
        ```

        ### Configuration

        ```yaml
        cards:
          - link: ''
            background:
              hasImage: false
              pattern: ''
              isDark: false
            image:
              src: '/assets/images/sample8.jpg'
              alt: ''
            icon:
              url: ''
              icon: ''
              title: ''
            text:
              leadIn: 'Image Decoration'
              title: 'Full Text Section'
              titleTag: 'h3'
              subTitle: 'With Sub Title'
              prose: |
                Simple text section with markdown text and a single CTA.
            ctas:
              - url: '/library/'
                label: 'Go to Library Page'
                isButton: false
                buttonStyle: 'primary'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `link` | string | No | URL to make entire card clickable |
        | `background` | object | No | Background properties
        | `image` | object | No | Image configuration object |
        | `icon` | string | No | Icon name for decoration |
        | `text` | object | No | Text content configuration |
        | `ctas` | array | No | Call-to-action buttons |

  - sectionType: cards-list
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Example'
      titleTag: 'h3'
      prose: ''
    cards:
      - link: ''
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample8.jpg'
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Simple text section with markdown text and a single CTA.
        ctas:
          - url: '/library/'
            label: 'Go to Library Page'
            isButton: false
            buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/manual-card/manual-card.njk" import manualCard %}

        {{ manualCard(section.cards) }}
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - Vertical or horizontal orientations
        - image or CSS pattern backgrounds
        - Entire card can be clickable (CTAs ignored)

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'manual-card'
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
      title: 'Download Manual Card Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete manual-card component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/manual-card.zip'
        label: 'Download Manual Card Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
