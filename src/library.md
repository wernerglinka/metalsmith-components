---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Library'
  navIndex: 3

seo:
  title: Component Library - Metalsmith Page Sections & Templates
  description: 'Browse our collection of reusable Metalsmith components including heroes, banners, sliders, testimonials, and more. Ready-to-use templates for building modern static websites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, component library, page sections, hero section, banner component, blog list, flip cards, testimonials, sliders, static site components'

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
        - [Multi Media](/library/multi-media)
        - [Simple Slider](/library/simple-slider)
        - [Testimonial](/library/testimonial)
        - [Text Only](/library/text-only)

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'
---
