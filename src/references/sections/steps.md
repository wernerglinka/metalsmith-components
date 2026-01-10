---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Steps

navigation:
  navLabel: 'Steps'
  navIndex: 29

card:
  title: 'Steps'
  description: 'Display a process or how-it-works section with numbered steps, icons, and optional connector lines.'
  image: '/assets/images/sample26.jpg'
  tags: ['steps', 'process', 'how-it-works', 'numbered']

seo:
  title: Steps Component for Metalsmith.
  description: 'Display a process or how-it-works section with numbered steps, icons, and optional connector lines.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith steps, process section, how-it-works, numbered steps, workflow component'

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
      title: 'Steps'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The steps section displays a process or how-it-works flow with numbered or icon-based steps. It supports three layout variants: _horizontal_ (responsive grid), _vertical_ (stacked with side markers), and _cards_ (boxed horizontal). Optional connector lines visually link steps together.

  - sectionType: steps
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
      title: 'How It Works'
      titleTag: 'h2'
      subTitle: 'Get started in three easy steps'
      prose: ''
    steps:
      layout: 'horizontal'
      showNumbers: true
      items:
        - title: 'Sign Up'
          description: 'Create your free account in seconds. No credit card required.'
          icon: 'user-plus'
        - title: 'Configure'
          description: 'Set up your preferences and connect your integrations.'
          icon: 'settings'
        - title: 'Launch'
          description: 'Go live and start seeing results immediately.'
          icon: 'rocket'

  - sectionType: steps
    containerTag: aside
    classes: 'has-connectors'
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
      title: 'With Connectors'
      titleTag: 'h2'
      subTitle: 'Visual flow between steps'
      prose: ''
    steps:
      layout: 'horizontal'
      showNumbers: true
      items:
        - title: 'Research'
          description: 'Understand the problem and gather requirements.'
          icon: 'search'
        - title: 'Design'
          description: 'Create wireframes and prototypes.'
          icon: 'pen-tool'
        - title: 'Build'
          description: 'Develop the solution with clean code.'
          icon: 'code'
        - title: 'Deploy'
          description: 'Ship to production with confidence.'
          icon: 'upload-cloud'

  - sectionType: steps
    containerTag: aside
    classes: 'has-connectors'
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
      title: 'Vertical Layout'
      titleTag: 'h2'
      subTitle: 'Steps stacked with side markers'
      prose: ''
    steps:
      layout: 'vertical'
      showNumbers: true
      items:
        - title: 'Discovery Call'
          description: 'We start with a conversation to understand your goals, challenges, and vision for the project.'
          icon: 'phone'
        - title: 'Proposal & Planning'
          description: 'Based on our discussion, we create a detailed proposal with timeline, deliverables, and investment.'
          icon: 'file-text'
        - title: 'Development'
          description: 'Our team builds your solution with regular check-ins and progress updates throughout.'
          icon: 'terminal'
        - title: 'Launch & Support'
          description: 'We deploy your project and provide ongoing support to ensure long-term success.'
          icon: 'rocket'

  - sectionType: steps
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
      title: 'Cards Layout'
      titleTag: 'h2'
      subTitle: 'Boxed steps with borders'
      prose: ''
    steps:
      layout: 'cards'
      showNumbers: true
      items:
        - title: 'Choose a Plan'
          description: 'Select the plan that fits your needs.'
          icon: 'check-square'
        - title: 'Add Your Team'
          description: 'Invite collaborators to join your workspace.'
          icon: 'users'
        - title: 'Start Building'
          description: 'Create your first project in minutes.'
          icon: 'layers'

  - sectionType: steps
    containerTag: aside
    classes: 'is-outlined'
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
      title: 'Icons Only (No Numbers)'
      titleTag: 'h2'
      subTitle: 'Clean icon-based steps'
      prose: ''
    steps:
      layout: 'horizontal'
      showNumbers: false
      items:
        - title: 'Connect'
          description: 'Link your accounts and data sources.'
          icon: 'link'
        - title: 'Analyze'
          description: 'Get insights from your data.'
          icon: 'bar-chart'
        - title: 'Optimize'
          description: 'Improve based on recommendations.'
          icon: 'trending-up'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Basic Structure

        ```yaml
        sectionType: steps
        classes: ''              # Optional: 'has-connectors', 'is-outlined'
        text:
          title: 'How It Works'
          subTitle: 'Get started easily'
        steps:
          layout: 'horizontal'   # 'horizontal', 'vertical', or 'cards'
          showNumbers: true      # Show numbered circles
          items:
            - title: 'Step One'
              description: 'Description text'
              icon: 'user-plus'  # Optional icon
        ```

        ### Configuration Options

        #### Layout Options

        | Layout | Description |
        |--------|-------------|
        | `horizontal` | Responsive grid layout (default) |
        | `vertical` | Stacked with markers on the left |
        | `cards` | Boxed horizontal with borders |

        #### Style Modifiers (via classes)

        | Class | Description |
        |-------|-------------|
        | `has-connectors` | Adds visual lines between steps |
        | `is-outlined` | Outlined number circles instead of filled |

        #### Step Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `title` | string | Yes | Step title |
        | `description` | string | No | Step description |
        | `icon` | string | No | Icon name from the icon library |

        ### Icons

        The steps section uses the site's icon library from `lib/layouts/icons/`. Common icons for steps include: `user-plus`, `settings`, `rocket`, `search`, `pen-tool`, `code`, `upload-cloud`, `check-square`, `users`, `layers`, `link`, `bar-chart`, `trending-up`.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'steps'
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
      title: 'Download Steps Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete steps component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/steps.zip'
        label: 'Download Steps Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
