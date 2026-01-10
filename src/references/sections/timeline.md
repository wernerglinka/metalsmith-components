---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Timeline

navigation:
  navLabel: 'Timeline'
  navIndex: 27

card:
  title: 'Timeline'
  description: 'A chronological timeline section for displaying milestones, history, or process steps with visual markers and optional icons.'
  image: '/assets/images/sample24.jpg'
  tags: ['timeline', 'history', 'milestones', 'chronological']

seo:
  title: Timeline Component for Metalsmith.
  description: 'A chronological timeline section for displaying milestones, history, or process steps with visual markers and optional icons.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith timeline, company history, milestones, chronological display, timeline component'

sections:
  - sectionType: text-only
    containerTag: article
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Timeline'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The timeline section displays chronological events or milestones. It supports two layout variants: a _vertical_ layout (default) with optional alternating left/right positioning, and a _horizontal_ scrollable layout for compact displays.

  - sectionType: timeline
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Our Journey'
      titleTag: 'h2'
      subTitle: 'Key milestones that shaped our story'
      prose: ''
    timeline:
      layout: 'vertical'
      alternating: true
      events:
        - year: '2020'
          title: 'Company Founded'
          description: 'Started with a vision to transform how teams build websites.'
          icon: 'rocket'
        - year: '2021'
          title: 'First Major Release'
          description: 'Launched our component library to the public.'
          icon: 'package'
        - year: '2022'
          title: 'Community Growth'
          description: 'Reached 10,000 developers using our tools.'
          icon: 'users'
        - year: '2023'
          title: 'Enterprise Launch'
          description: 'Introduced enterprise features and support.'
          icon: 'award'
        - year: '2024'
          title: 'Global Recognition'
          description: 'Named a top static site tool by industry analysts.'
          icon: 'star'

  - sectionType: timeline
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Horizontal Timeline'
      titleTag: 'h2'
      subTitle: 'A compact scrollable view'
      prose: ''
    timeline:
      layout: 'horizontal'
      events:
        - year: 'Q1'
          title: 'Planning'
          description: 'Define goals and requirements.'
          icon: 'flag'
        - year: 'Q2'
          title: 'Development'
          description: 'Build core features.'
          icon: 'zap'
        - year: 'Q3'
          title: 'Testing'
          description: 'Quality assurance and refinement.'
          icon: 'check-circle'
        - year: 'Q4'
          title: 'Launch'
          description: 'Release to production.'
          icon: 'rocket'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
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
    text:
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: timeline
          containerTag: section
          text:
            title: 'Our History'
            subTitle: 'Milestones that define us'
          timeline:
            layout: 'vertical'       # Options: vertical, horizontal
            alternating: true        # Alternate left/right (vertical only)
            events:
              - year: '2020'
                title: 'Founded'
                description: 'Company was established.'
                icon: 'rocket'       # Optional icon
        ```

        ### Configuration Options

        #### Layout Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `timeline.layout` | string | No | Layout type ('vertical', 'horizontal'). Defaults to 'vertical' |
        | `timeline.alternating` | boolean | No | Alternate left/right in vertical layout. Defaults to true |

        #### Event Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `year` | string | No | Year or time label (e.g., '2024', 'Q1') |
        | `title` | string | Yes | Event title |
        | `description` | string | No | Event description |
        | `icon` | string | No | Icon name for the marker |

        ### Icons

        The timeline uses the site's icon library from `lib/layouts/icons/`. Any icon name matching a file in that directory can be used (e.g., `rocket`, `package`, `trending-up`, `globe`, `users`, `star`, `award`, `flag`, `zap`, `check-circle`). If no icon is specified, a simple `circle` marker is shown.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'timeline'
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Download Timeline Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete timeline component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/timeline.zip'
        label: 'Download Timeline Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
