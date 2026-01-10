---
layout: pages/sections-with-sidebar.njk
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
      title: 'Simple Slider'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Interactive slider component with standard pagination or tabbed interface options for displaying multiple content slides.

        ## Slider as Tabs
        Uses the slide title as tab text

  - sectionType: slider
    containerTag: section
    classes: ''
    id: ''
    description: 'Implements a manual slider section.'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
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
        imageScreen: 'none' # light, dark, none
    isTabs: true
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
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Traditional Slider'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Uses the traditional slider pagination

  - sectionType: slider
    containerTag: section
    classes: ''
    id: ''
    description: 'Implements a manual slider section.'
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
        isDark: false
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    isTabs: false
    slides:
      - slideClasses: ''
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'nunjucks'
        text:
          leadIn: What's this?
          title: Tab Number 1
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
        ctas:
          - url: '/apple.com'
            label: 'go to apple'
            isButton: true
            buttonStyle: 'primary'
          - url: '/apple.com'
            label: 'where to go?'
            isButton: false
            buttonStyle: 'primary'

      - slideClasses: ''
        image:
          src: '/assets/images/sample11.jpg'
          alt: 'nunjucks'
        text:
          leadIn: And this?
          title: Tab Number 2
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

      - slideClasses: ''
        image:
          src: '/assets/images/sample12.jpg'
          alt: 'nunjucks'
        text:
          leadIn: Oh, one more!
          title: Tab Number 3
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

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
        - sectionType: slider
          containerTag: section
          # container settings

          config: '' # "" = default slides, "isTabs" for tabbed interface
          slides:
            - slideClasses: ''
              image:
                src: '/assets/images/sample7.jpg'
                alt: 'Slider image description'
              text:
                leadIn: What's this?
                title: Slider Number 1
                titleTag: 'h2'
                subTitle: ''
                prose: |-
                  Slide content description text goes here...
              ctas:
                - url: '/example.com'
                  label: 'Learn More'
                  isButton: true
                  buttonStyle: 'primary'
        ```

        ### Configuration Options

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

        ### Notes

        - Standard pagination dots or tabbed navigation
        - Each slide supports images, text, and CTAs
        - Adapts to different screen sizes
        - CSS-based slide transitions for smooth user experience

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'simple-slider'
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
      title: 'Download Simple Slider Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete simple-slider component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/simple-slider.zip'
        label: 'Download Simple Slider Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
