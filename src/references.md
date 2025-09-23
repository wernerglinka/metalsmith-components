---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

navigation:
  navLabel: 'References'
  navIndex: 5

seo:
  title: Metalsmith Component Library References
  description: 'Browse our collection of reusable partial components. These building blocks are used within sections to create consistent UI elements across your Metalsmith site.'
  socialImage: '/assets/images/metalsmith-starter-social.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith partials, UI components, reusable elements, component building blocks, static site components'

sections:
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
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        isDark: false
    text:
      title: 'Metalsmith Components Reference Overview'
      titleTag: 'h2'
      prose: |
        This section provides detailed reference documentation for working with Metalsmith Components. For an introduction to Metalsmith Components, please visit the [Home](/) page, followed by [Section Anatomy](/section-anatomy/) and finally [From YAML to HTML](/yaml-to-html/).

        The Metalsmith Components reference documentation is divided into two subsections:

        ### Partials
        Partials are the smallest template building units that are used to compose page sections.

        ### Sections
        Sections are self contained page components, built from smaller, reusable partials.
---
