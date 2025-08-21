---
layout: pages/sections.njk
bodyClass: ''

navigation:
  navLabel: 'Sample Blog'
  navIndex: 4

seo:
  title: Blog - Metalsmith Components & Architecture Examples
  description: 'Explore articles about building with Metalsmith components, structured content patterns, and modern static site architecture. Learn best practices for component-based development.'
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith blog, static site tutorials, component architecture, structured content, web development articles, metalsmith patterns, static site best practices'

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
      title: Blog Example
      titleTag: 'h1'
      subTitle: 'Read on'
      prose: 'This blog section demonstrates a blog with five blog posts from the Metalsmith2025 starter. Blog index pages feature pagination. For this demo each index page shows three blogs using a card metaphor.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: blog-list
    containerTag: section # section || article || aside
    classes: ''
    id: ''
    description: 'section with all blogposts'
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
