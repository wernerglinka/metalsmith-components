---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Stats

navigation:
  navLabel: 'Stats'
  navIndex: 28

card:
  title: 'Stats'
  description: 'Display impact numbers and key metrics in a visually striking grid layout with optional icons and descriptions.'
  image: '/assets/images/sample25.jpg'
  tags: ['stats', 'metrics', 'numbers', 'impact']

seo:
  title: Stats Component for Metalsmith.
  description: 'Display impact numbers and key metrics in a visually striking grid layout with optional icons and descriptions.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith stats, impact numbers, metrics display, statistics component, key figures'

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
      title: 'Stats'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The stats section displays impact numbers and key metrics in a visually striking layout. It supports three layout variants: _grid_ (responsive auto-fit grid), _row_ (centered flex row), and _compact_ (tighter spacing for smaller displays). Optional class modifiers add card styling or highlighted backgrounds.

  - sectionType: stats
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
      title: 'Our Impact'
      titleTag: 'h2'
      subTitle: 'Numbers that speak for themselves'
      prose: ''
    stats:
      layout: 'grid'
      items:
        - value: '10K+'
          label: 'Active Users'
          icon: 'users'
          description: 'Developers building with our tools'
        - value: '99.9%'
          label: 'Uptime'
          icon: 'activity'
          description: 'Rock-solid reliability'
        - value: '50M'
          label: 'API Requests'
          icon: 'zap'
          description: 'Processed every month'
        - value: '24/7'
          label: 'Support'
          icon: 'headphones'
          description: 'Always here to help'

  - sectionType: stats
    containerTag: aside
    classes: 'has-cards'
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
      title: 'With Cards'
      titleTag: 'h2'
      subTitle: 'Boxed style with borders'
      prose: ''
    stats:
      layout: 'grid'
      items:
        - value: '150+'
          label: 'Components'
          icon: 'package'
        - value: '12'
          label: 'Integrations'
          icon: 'link'
        - value: '5 min'
          label: 'Setup Time'
          icon: 'clock'

  - sectionType: stats
    containerTag: aside
    classes: 'is-highlighted'
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
      title: 'Highlighted Style'
      titleTag: 'h2'
      subTitle: 'Primary color background'
      prose: ''
    stats:
      layout: 'row'
      items:
        - value: '4.9'
          label: 'Rating'
          icon: 'star'
        - value: '1M+'
          label: 'Downloads'
          icon: 'download'
        - value: '500+'
          label: 'Contributors'
          icon: 'heart'

  - sectionType: stats
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
      title: 'Compact Layout'
      titleTag: 'h2'
      subTitle: 'Tighter spacing for secondary stats'
      prose: ''
    stats:
      layout: 'compact'
      items:
        - value: '30+'
          label: 'Countries'
        - value: '8'
          label: 'Languages'
        - value: '100%'
          label: 'Open Source'
        - value: 'MIT'
          label: 'License'

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
        sectionType: stats
        classes: ''           # Optional: 'has-cards' or 'is-highlighted'
        text:
          title: 'Our Impact'
          subTitle: 'Numbers that matter'
        stats:
          layout: 'grid'      # 'grid', 'row', or 'compact'
          items:
            - value: '10K+'
              label: 'Active Users'
              icon: 'users'        # Optional icon
              description: 'Text'  # Optional description
        ```

        ### Configuration Options

        #### Layout Options

        | Layout | Description |
        |--------|-------------|
        | `grid` | Responsive auto-fit grid (default) |
        | `row` | Centered flex row with even spacing |
        | `compact` | Tighter spacing, smaller text for secondary stats |

        #### Style Modifiers (via classes)

        | Class | Description |
        |-------|-------------|
        | `has-cards` | Adds border and background to each stat item |
        | `is-highlighted` | Primary color background with white text |

        #### Item Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `value` | string | Yes | The metric value (e.g., '10K+', '99.9%') |
        | `label` | string | No | Label beneath the value |
        | `icon` | string | No | Icon name from the icon library |
        | `description` | string | No | Additional context text |

        ### Icons

        The stats section uses the site's icon library from `lib/layouts/icons/`. Common icons for stats include: `users`, `activity`, `zap`, `star`, `download`, `heart`, `clock`, `package`, `globe`, `trending-up`.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'stats'
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
      title: 'Download Stats Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete stats component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/stats.zip'
        label: 'Download Stats Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
