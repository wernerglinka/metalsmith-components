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
    classes: 'first-text-section'
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
      title: 'Simple Slider'
      titleTag: 'h1'
      subTitle: ''
      prose: 'Interactive slider component with standard pagination or tabbed interface options for displaying multiple content slides.'

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
    config: 'isTabs'
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
    classes: 'first-text-section'
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

        - **Two Interface Types**: Standard pagination dots or tabbed navigation
        - **Flexible Content**: Each slide supports images, text, and CTAs
        - **Responsive Design**: Adapts to different screen sizes automatically
        - **Interactive Navigation**: Click pagination dots or tabs to navigate
        - **Smooth Transitions**: CSS-based slide transitions for smooth user experience
---