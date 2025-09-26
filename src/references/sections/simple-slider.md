---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Simple Slider

navigation:
  navLabel: 'Simple Slider'
  navIndex: 3

card:
  title: 'Simple Slider'
  description: 'Interactive slider component with standard pagination or tabbed interface.'
  image: '/assets/images/sample14.jpg'
  tags: ['slider', 'carousel', 'tabs', 'pagination', 'slideshow', 'interactive']

seo:
  title: Simple Slider Component - Carousel & Tabbed Content for Metalsmith
  description: 'Interactive slider component with standard pagination or tabbed interface. Display multiple content slides with images, text, and CTAs in your Metalsmith static site.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith slider, carousel component, image slider, tabbed content, content carousel, slideshow, interactive slider, tabbed interface'

sections:
  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Simple Slider'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Two examples of a simple slider section. One with a typical slider pagination and a second one with a tabbed interface.

        ```yaml
        config: '' # "" = default slides, isTabs
        slides:
          - slideClasses: ''
            image:
              src: '/assets/images/sample7.jpg'
              alt: 'nunjucks'
            text:
              leadIn: What's this?
              title: Slider Number 1
              titleTag: 'h2'
              subTitle: ''
              prose: |-
                Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis.
            ctas:
              - url: '/apple.com'
                label: 'go to apple'
                isButton: true
                buttonStyle: 'primary'

          - slideClasses: ''
            image:
              src: '/assets/images/sample4.jpg'
              alt: 'nunjucks'
            text:
              leadIn: And this?
              title: Slider Number 2
              titleTag: 'h2'
              subTitle: ''
              prose: |-
                Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis.

          - slideClasses: ''
            image:
              src: '/assets/images/sample5.jpg'
              alt: 'nunjucks'
            text:
              leadIn: Oh, one more!
              title: Slider Number 3
              titleTag: 'h2'
              subTitle: ''
              prose: |-
                Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna.

        ```
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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Configuration Options'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        #### Slider Settings

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `config` | string | No | Slider type - `""` for default pagination, `"isTabs"` for tabbed interface |

        #### Slide Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `slides` | array | Yes | Array of slide definitions |
        | `slides[n].slideClasses` | string | No | CSS classes for slide style variations |
        | `slides[n].image` | object | No | Image with src, alt, and caption |
        | `slides[n].text` | object | No | Text content with leadIn, title, titleTag, subTitle, and prose |
        | `slides[n].ctas` | array | No | Call-to-action buttons for the slide |
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'default-example'
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
      title: Default Render
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Slider with the default slider pagination. The pagination is rendered with `config: ''`.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: slider
    containerTag: section
    classes: ''
    id: ''
    description: 'Implements a manual slider section.'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        isDark: false
        color: ''
        image: ''
    config: '' # "" = default slides, isTabs
    slides:
      - slideClasses: ''
        image:
          src: '/assets/images/sample7.jpg'
          alt: 'nunjucks'
        text:
          leadIn: What's this?
          title: Slider Number 1
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis.
        ctas:
          - url: '/apple.com'
            label: 'go to apple'
            isButton: true
            buttonStyle: 'primary'

      - slideClasses: ''
        image:
          src: '/assets/images/sample4.jpg'
          alt: 'nunjucks'
        text:
          leadIn: And this?
          title: Slider Number 2
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis.

      - slideClasses: ''
        image:
          src: '/assets/images/sample5.jpg'
          alt: 'nunjucks'
        text:
          leadIn: Oh, one more!
          title: Slider Number 3
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna.
        ctas:
          - url: '/apple.com'
            label: 'go to apple'
            isButton: true
            buttonStyle: 'primary'
          - url: '/apple.com'
            label: 'where to go?'
            isButton: false
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
      title: Tabbed Render
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Slider with tabbed slider pagination. The pagination is rendered with `config: isTabs` and the tab titles are defined in `slides[n].text.title`.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: slider
    containerTag: section
    classes: ''
    id: ''
    description: 'Implements a manual slider section.'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        isDark: false
        color: ''
        image: ''
    isTabs: true
    slides:
      - slideClasses: ''
        image:
          src: '/assets/images/sample7.jpg'
          alt: 'nunjucks'
        text:
          leadIn: What's this?
          title: Stair Case
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis.
        ctas:
          - url: '/apple.com'
            label: 'go to apple'
            isButton: true
            buttonStyle: 'primary'

      - slideClasses: ''
        image:
          src: '/assets/images/sample4.jpg'
          alt: 'nunjucks'
        text:
          leadIn: And this?
          title: Drain Pipe
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis.

      - slideClasses: ''
        image:
          src: '/assets/images/sample5.jpg'
          alt: 'nunjucks'
        text:
          leadIn: Oh, one more!
          title: Overpass
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna.
        ctas:
          - url: '/apple.com'
            label: 'go to apple'
            isButton: true
            buttonStyle: 'primary'
          - url: '/apple.com'
            label: 'where to go?'
            isButton: false
            buttonStyle: 'primary'
---
