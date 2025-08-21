---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Library'
  navIndex: 3

seo:
  title: Metalsmith components library
  description: 'A Metalsmith Starter to build modern websites using structured data and reusable components.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'Hero section of the library page'
    isDisabled: false
    isReverse: true
    isAnimated: true
    isFullScreen: false
    targetId: ''
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
        isDark: true
        color: ''
        image: '/assets/images/legos.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: Library
      titleTag: 'h1'
      subTitle:
      prose: ''
    ctas:
      - url: ''
        label: ''
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
      title: Section Components
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        - [Banner](/library/banner)
        - [Blog List](/library/blog-list)
        - [Composed](/library/composed)
        - [Flip Cards](/library/flip-cards)
        - [Hero](/library/hero)
        - [Logos List](/library/logos-list)
        - [Media Image](/library/media-image)
        - [Simple Slider](/library/simple-slider)
        - [Testimonial](/library/testimonial)
        - [Text Only](/library/text-only)

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'
---
