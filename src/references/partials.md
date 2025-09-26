---
layout: pages/sections-with-sidebar.njk
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

card:
  title: 'Partials'
  description: 'Partials for composing section components'
  pattern: 'simple-gray7'
  tags: ['author', 'date', 'metadata', 'blog', 'article', 'time']

sections:
  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    description: 'Introduction to partials'
    isDisabled: false
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
    text:
      leadIn: 'Component Building Blocks'
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
        - **Dark/Light Theme Switcher**: Theme toggle control
        - **Slider Pagination**: Pagination for sliders
---
