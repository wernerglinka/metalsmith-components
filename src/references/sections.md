---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

navigation:
  navLabel: 'Sections'
  navIndex: 3

seo:
  title: Metalsmith Sections Library
  description: 'Browse our comprehensive library of reusable Metalsmith section components. Explore hero sections, media layouts, content patterns, and more for building modern static sites with structured content.'
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith sections, page components, hero sections, content layouts, structured content components, static site sections'

card:
  title: 'Sections'
  description: 'Complete page sections for building structured content'
  pattern: 'simple-gray7'
  tags: ['sections', 'components', 'layouts', 'hero', 'content', 'media']

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-text-section'
    id: ''
    description: 'Introduction to section components'
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
        isDark: false
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Component Reference'
      title: 'Section Components'
      titleTag: 'h1'
      subTitle: ''
      prose: |
        Browse our collection of section components. Each section below includes live examples, configuration options, and implementation notes.

        Sections are complete, self-contained page components that you compose in your frontmatter to build pages. For architectural details, see [Section Anatomy](/section-anatomy/) and [From YAML to HTML](/yaml-to-html/).

        Use the sidebar to quickly navigate between different section types, or explore them all below.
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
