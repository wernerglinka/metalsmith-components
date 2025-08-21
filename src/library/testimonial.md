---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Testimonial'
  navIndex: 3

seo:
  title: Metalsmith components library - Testimonial
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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: Testimonial
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Below is an example of a testimonial section. The section renders a blockquote with a quotee and an optional cite. The quotee can have a portrait, name, title, company, and logo. The quotee is rendered in a flex container, so the portrait, name, title, company, and logo can be rendered in any order.

        ```yaml
        - sectionType: testimonial
          containerTag: aside
          classes: ''
          id: ''
          isDisabled: false
          isReverse: false
          containerFields:
            inContainer: false
            isAnimated: true
            noMargin:
              top: true
              bottom: false
            noPadding:
              top: false
              bottom: false
            background:
              color: 'lightgray'
              image: ''
              imageScreen: 'none' # light, dark, none
          quote:
            text: "You've got to be very careful if you don't know where you are going, because you might not get there."
            cite: 'https://en.wikipedia.org/wiki/Yogi_Berra'
          quotee:
            portrait:
              src: '/assets/images/yogi-berra-baseball-great.jpg'
              alt: "Lawrence Peter 'Yogi' Berra"
            name: 'Yogi Berra'
            title: 'Baseball Great'
            company: 'New York Yankees'
            logo: '/assets/images/new-york-yankees-logo.svg'
        ```
        ### Specific testimonial properties

        - `quote`: The quote and an optional 'cite' URL
        - `quotee`: All properties of the person who is quoted

        **Note**: Background color is applied via `containerFields.background.color`, this insures that the background is applied accross the whole viewport if `inContainer: false`
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: testimonial
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: lightgray
        image: ''
        imageScreen: 'none' # light, dark, none
    quote:
      text: "You've got to be very careful if you don't know where you are going, because you might not get there."
      cite: 'https://en.wikipedia.org/wiki/Yogi_Berra'
    quotee:
      portrait:
        src: '/assets/images/yogi-berra-baseball-great.jpg'
        alt: "Lawrence Peter 'Yogi' Berra"
      name: 'Yogi Berra'
      title: 'Baseball Great'
      company: 'New York Yankees'
      logo: '/assets/images/new-york-yankees-logo.svg'
---
