---
layout: pages/sections.njk
bodyClasses: 'home'
hasHero: true

topMessage:
  text: "New components available: pricing-table, team-grid, timeline, stats, and steps!"
  link:
    url: "/references/"
    label: "View the library"
  dismissible: true

navigation:
  navLabel: 'Home'
  navIndex: 0

seo:
  title: Metalsmith Components - Modular Page Building Framework
  description: 'Build dynamic web pages with reusable Metalsmith components. A modern component-based architecture for static site generation with structured content, flexible layouts, and composable sections.'
  socialImage: '/assets/images/sample2.jpg'
  canonicalURL: ''
  keywords: 'metalsmith, static site generator, components, modular design, web components, page builder, structured content, nunjucks templates, reusable sections'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'This is a hero section'

    isDisabled: false
    isFullScreen: false
    isReverse: true
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
        image: '/assets/images/sample4.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: Metalsmith Components
      titleTag: 'h1'
      subTitle: 'A collection of section components for Metalsmith in 2025 and beyond'
      prose: This website provides page sections components. The page sections are bare-bones interpretations of universal information presentation patterns that can be found on almost every website. Sections are composed of partials that are used to implement a variety of sections.
    ctas:
      - url: '/references'
        label: 'Browse Components'
        isButton: true
        buttonStyle: 'primary'
      - url: '/blog'
        label: 'Read the Guide'
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
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
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: Before We Start
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        ### Why This Approach?

        Metalsmith has always been exceptional at one thing: staying out of your way. Unlike opinionated frameworks that dictate how you must structure content, organize files, or build pages, Metalsmith provides the foundation and lets you make the architectural decisions. That's why I chose it years ago, and it's why I still use it today.

        This component library represents one way to use Metalsmith—specifically, a structured content approach where pages are composed from reusable sections defined in frontmatter rather than written in Markdown. Some might argue this is "too specific" for a tool designed to be flexible. I see it differently.

        Every tool becomes specific the moment you use it. The choices you make—how you organize content, structure templates, handle assets—these decisions define your project's architecture. The question isn't whether to make opinionated choices, but whether those choices align with modern web development practices and scale with your needs.

        Component-based architecture isn't just my preference—it's become a widely acknowledged pattern for building maintainable websites. React, Vue, and modern frontend frameworks have proven the value of composable, reusable components. This library brings that same paradigm to static site generation with Metalsmith, demonstrating that you can have both the flexibility of a minimal build tool and the structure of a component system.

        Metalsmith gives you the freedom to find your own way. This is mine. If you value component reusability, separation of concerns, and a clear content model that scales from simple landing pages to complex multi-section layouts, this approach might be yours too.

---
