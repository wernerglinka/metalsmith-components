---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Hero'
  navIndex: 3

seo:
  title: Starter Sections Library - Hero
  description: 'A Metalsmith Starter to build modern websites using structured data and reusable components.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "This is a full screen hero section with a background image and text overlay. The proporty 'isFullScreen' is set to true, which turn a standard hero section into full screen."
    isDisabled: false
    isReverse: false
    isAnimated: true
    isFullScreen: true
    targetId: 'first-section'
    date: ''
    author: ''
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: ''
        image: '/assets/images/sample13.jpg'
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Metalsmith Components Library'
      title: Hero
      titleTag: 'h1'
      subTitle:
      prose: Examples of hero sections including full page. Click the down arrow at the bottom of the screen to scroll down.
    ctas:
      - url: '/'
        label: 'go home'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

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
      title:
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        ---
        hasHero: true
        # other settings

        sections:
          - sectionType: hero
            containerTag: section
            classes: 'first-section'
            id: ''
            description: "This is a full screen hero section with a background image and text overlay. The proporty 'isFullScreen' is set to true, which turn a standard hero section into full screen."
            isDisabled: false
            isReverse: false
            isAnimated: true
            isFullScreen: true
            targetId: 'first-section'
            date: ''
            author: ''
            containerFields:
              inContainer: false
              noMargin:
                top: true
                bottom: true
              noPadding:
                top: false
                bottom: false
              background:
                isDark: false
                color: ''
                image: '/assets/images/sample13.jpg'
                imageScreen: 'none' # light, dark, none
            text:
              leadIn: 'Metalsmith Components Library'
              title: Hero
              titleTag: 'h1'
              subTitle:
              prose: Examples of hero sections including full page. Click the down arrow at the bottom of the screen to scroll down. That requires 'targetId' to be set to the id of the next section, in this case 'first-section' and the id of the next section is set to 'first-section'. Also, notice the up-arrow in the bottom right screen corner, when scrolling starts, to return to the top of the page.
            ctas:
              - url: '/'
                label: 'go home'
                isButton: true
                buttonStyle: 'primary'
            image:
              src: ''
              alt: ''
              caption: ''

        # other sections
        ---
        ```

        ### Specific slider properties
        - `hasHero` needs to be `true` for the breadcrumbs to be placed inside the hero, which will extend to the top of the screen
        - `isFullScreen` Must be set to `true` for full screen
        - `targetId` must be set to the `id` of the section to scroll to when the down arrow in the Full Screen Hero is clicked. This is typically the section immediately following the hero.

        Notice the up-arrow in the bottom right screen corner, when scrolling starts, to return to the top of the page.

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
      title: Default Hero
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        In this case `isFullScreen` is set to `false`

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: hero
    containerTag: section
    classes: 'first-section demo'
    id: ''
    description: 'This is a regular hero section with a background image and text overlay.'
    isDisabled: false
    isReverse: false
    isAnimated: true
    isFullScreen: false
    targetId: ''
    date: ''
    author: ''
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components Library'
      title: Hero
      titleTag: 'h1'
      subTitle: 'Default Hero'
      prose: This hero sports a dark screen and white text color. All other properties are same as above.
    ctas:
      - url: '/'
        label: 'go home'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
