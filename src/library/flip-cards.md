---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Flip Cards'
  navIndex: 3

seo:
  title: Metalsmith components library - Flip Cards
  description: 'A Metalsmith Starter to build modern websites using structured data and reusable components.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''

sections:
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
        And here is an example of group of flip cards. The flip cards are rendered in a flex container, so they can be rendered in any order. Flip card content may include an icon, lead-in, title, and prose. The title and image are optional. The prose is markdown text. A CTA may be added to the back of the card.

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
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
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
                    Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

              back:
                text:
                  leadIn: ''
                  title: The Back
                  titleTag: 'h3'
                  subTitle: ''
                  prose: |-
                    Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
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
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo.

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
        ```

        ### Specific Flip Card Properties

        - `cards[n].icon`: Add the icon name here. All icons are located in lib/layouts/icons
        - `front`: The front of the card
        - `back`: The back of the card

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

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
        bottom: false
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
              Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper.
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
              Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

        back:
          text:
            leadIn: ''
            title: The Back
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
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
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo.

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
---
