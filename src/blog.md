---
layout: pages/sections.njk
bodyClass: ''

navigation:
  navLabel: 'Blog'
  navIndex: 2

seo:
  title: Blog - Component-Based Architecture Guide
  description: 'Learn how to build modern websites with Metalsmith components. Guides, tutorials, and deep dives into component-based architecture, structured content, and build processes.'
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith blog, static site tutorials, component architecture, structured content, web development articles, metalsmith patterns, static site best practices'

sections:
  - sectionType: hero
    containerTag: section
    classes: ''
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
      leadIn: 'Component-Based Architecture'
      title: Blog
      titleTag: 'h1'
      subTitle: 'Guides and tutorials for building modern websites'
      prose: 'Learn how to build, structure, and optimize component-based Metalsmith sites. From architecture fundamentals to advanced techniques.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: collection-list
    collectionName: 'blog'
    domainName: 'blog'
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
