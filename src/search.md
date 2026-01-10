---
layout: pages/sections.njk
bodyClasses: 'search-page'
hasHero: false

seo:
  title: Search - Metalsmith Components
  description: 'Search the Metalsmith Components library for sections, partials, documentation, and guides.'
  socialImage: ''
  canonicalURL: ''
  keywords: 'search, find components, metalsmith search'

sections:
  - sectionType: hero
    containerTag: section
    classes: ''
    id: ''
    description: 'This is a hero section for the search page'
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
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample20.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: Search Results
      titleTag: 'h1'
      subTitle: 'Search across all components, documentation, and guides.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: search-only
    containerTag: section
    classes: 'search-page-section'
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: false
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    title: ''
    subtitle: ''
    placeholder: 'Search the entire site...'
    settings:
      maxResults: 50
      minCharacters: 2
      enableHighlighting: true
      searchType: 'site'
---
