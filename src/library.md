---
layout: pages/sections.njk
bodyClass: ''

navigation:
  navLabel: 'Library'
  navIndex: 3

seo:
  title: Metalsmith Components Library
  description: ''
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'static site tutorials, component architecture, structured content, web development articles, metalsmith patterns, static site best practices'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "This is a blog post hero section. The hero section has a class of 'blog-hero'."
    isDisabled: false
    isFullScreen: false
    isReverse: false
    date: ''
    author: ''
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
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: Component Library
      titleTag: 'h1'
      subTitle: 'Read on'
      prose: 'Explore the many components available'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: cards
    containerTag: section # section || article || aside
    classes: ''
    id: ''
    description: 'section with all library components'
    isDisabled: false
    isFullScreen: false
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
        isDark: true
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    hasPagingParams: true
    pagingParams:
      numberOfBlogs: '' # updated by plugin
      numberOfPages: '' # updated by plugin
      pageLength: '' # updated by plugin
      pageStart: '' # updated by plugin
      pageNumber: '' # updated by plugin
---
