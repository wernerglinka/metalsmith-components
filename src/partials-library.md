---
layout: pages/sections.njk
bodyClass: ''

navigation:
  navLabel: 'Partials'
  navIndex: 4

seo:
  title: Metalsmith Partials Library
  description: 'Browse our collection of reusable partial components. These building blocks are used within sections to create consistent UI elements across your Metalsmith site.'
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith partials, UI components, reusable elements, component building blocks, static site components'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "Hero section for the partials library"
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
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Component Building Blocks'
      title: Partials Library
      titleTag: 'h1'
      subTitle: ''
      prose: 'Explore the reusable UI elements that power our section components'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Introduction to partials'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
    text:
      title: 'Understanding Partials'
      titleTag: 'h2'
      prose: |
        Partials are the fundamental building blocks used within section components. They provide consistent, reusable UI elements that can be composed together to create more complex layouts. Each partial is self-contained with its own template, styles, and optional JavaScript behavior.

        ## Categories of Partials

        ### Content Partials
        - **Text**: Renders formatted text with title, subtitle, and prose
        - **Author & Date**: Displays authorship and publication information
        - **Breadcrumbs**: Shows navigation hierarchy

        ### Media Partials
        - **Image**: Responsive image rendering with lazy loading
        - **Video**: HTML5 video player with controls
        - **Audio**: Audio player with playlist support
        - **Lottie**: Animated vector graphics

        ### Interactive Elements
        - **Button**: Configurable CTA buttons
        - **CTAs**: Call-to-action groups
        - **Navigation**: Site navigation menus
        - **Search**: Search interface components

        ### Layout Components
        - **Collection Card**: Cards for displaying collections
        - **Flip Card**: Interactive cards with front/back content
        - **Manual Card**: Manually configured content cards
        - **Overlay**: Modal and overlay containers

        ### Utilities
        - **Icon**: Feather icon renderer
        - **Logo**: Brand logo display
        - **Dark/Light Theme Switcher**: Theme toggle control
        - **Slider Pagination**: Pagination for sliders

  - sectionType: search-only
    containerTag: section
    classes: 'partials-search'
    id: 'partials-search'
    description: 'Search partials library'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
    text:
      title: 'Find Partials'
      prose: 'Search our partials library to quickly find the UI elements you need.'
    placeholder: 'Search for partials (e.g., button, image, navigation...)'
    source: '/partials-search-index.json'
    searchType: 'partials'
    settings:
      maxResults: 10
      enableHighlighting: true

  - sectionType: collection-list
    collectionName: 'partials'
    domainName: 'partials'
    containerTag: section
    classes: ''
    id: ''
    description: 'List of all partial components'
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
        imageScreen: 'none'
    hasPagingParams: true
    pagingParams:
      numberOfBlogs: ''
      numberOfPages: ''
      pageLength: ''
      pageStart: ''
      pageNumber: ''
---