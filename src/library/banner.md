---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Banner'
  navIndex: 3

seo:
  title: Banner Component - Metalsmith Call-to-Action Section
  description: 'Create eye-catching CTA banners with background images or colors. Includes accordion header functionality and flexible styling options for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith banner, CTA section, call-to-action component, accordion header, banner with background image, promotional banner, static site components'

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
        bottom: false
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
        A prominent call-to-action banner section that can use either a background image or color. Perfect for highlighting important messages, promotions, or calls to action.

        ```yaml
        - sectionType: banner
          containerTag: aside
          classes: ''
          id: ''
          isDisabled: false
          isReverse: false
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
        ```

        ### Specific banner properties

        - `containerFields.inContainer` : `true` restricts width to content width, `false` stretches banner accross viewport.
        - `containerFields.background.image`: Background image URL (optional)
        - `containerFields.background.color`: Background color (optional)
        - `containerFields.background.imageScreen`: Screen overlay for better text readability (`'light'`, `'dark'`, `'none'`)
        - `text`: Standard text block with leadIn, title, subtitle, and prose
        - `ctas`: Array of call-to-action buttons or links

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

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
        bottom: true
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

  - sectionType: banner
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: '#333333'
        isDark: true
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'With Background Color'
      title: CTA Banner Example
      titleTag: 'h2'
      subTitle: ''
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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Use as an Accordion Header'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        The banner can be used as a prominent accordion header. Add `accordion-header` to `classes`, select an appropriate background and an appropriate `imageScreen` and leave the other field empty.

        ```yaml
        - sectionType: banner
          containerTag: aside
          classes: 'accordion-header'
          #more settings

          containerFields:
            inContainer: false
            #more settings

            background:
              color: ''
              isDark: true
              image: '/assets/images/sample9.jpg'
              imageScreen: 'dark' # light, dark, none
          text:
            leadIn: ''
            title: Fancy Accordion Header
            titleTag: 'h3'
            subTitle: ''
            prose: ''
        ```

        Now add a `text-only` section underneath with `classes: 'accordion-content is-closed'`.

        ```yaml
        sectionType: text-only
        containerTag: article
        classes: 'accordion-content is-closed'
        # more settings

        containerFields:
          inContainer: false
          # more settings

        text:
          leadIn: ''
          title: ''
          titleTag: 'h1'
          subTitle: ''
          prose: |-
            Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod.

            Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

        ```

        ... **et voilà**.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: banner
    containerTag: aside
    classes: 'accordion-header'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        isDark: true
        image: '/assets/images/sample9.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: Fancy Accordion Header
      titleTag: 'h3'
      subTitle: ''
      prose: ''

  - sectionType: text-only
    containerTag: article
    classes: 'accordion-content is-closed'
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
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod.

        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: banner
    containerTag: aside
    classes: 'accordion-header'
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
        isDark: true
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: Second Fancy Accordion Header
      titleTag: 'h3'
      subTitle: ''
      prose: ''

  - sectionType: text-only
    containerTag: article
    classes: 'accordion-content is-closed'
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
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Etiam porta sem malesuada magna mollis euismod. Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod.

        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'
---
