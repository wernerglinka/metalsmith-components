---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Pricing Table

navigation:
  navLabel: 'Pricing Table'
  navIndex: 25

card:
  title: 'Pricing Table'
  description: 'A pricing comparison section with multiple tiers, features lists, and call-to-action buttons. Supports card and comparison table layouts.'
  image: '/assets/images/sample24.jpg'
  tags: ['pricing', 'comparison', 'tiers', 'commercial']

seo:
  title: Pricing Table Component for Metalsmith.
  description: 'A pricing comparison section with multiple tiers, features lists, and call-to-action buttons. Supports card and comparison table layouts.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith pricing table, tier comparison, pricing cards, feature comparison, SaaS pricing, subscription tiers'

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
      title: 'Pricing Table'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The pricing table section displays pricing tiers with features comparison. It supports two layout options: _cards_ for a traditional side-by-side card layout, and _comparison_ for a feature comparison table format.

  - sectionType: pricing-table
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
      subTitle: 'Traditional pricing cards with featured tier highlight'
      prose: ''
    tiers:
      source: 'pricing-example'
      layout: 'cards'

  - sectionType: pricing-table
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
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Comparison Table Layout'
      titleTag: 'h2'
      subTitle: 'Side-by-side feature comparison across all tiers'
      prose: ''
    tiers:
      source: 'pricing-example'
      layout: 'comparison'

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
        - sectionType: pricing-table
          containerTag: aside
          text:
            title: 'Choose Your Plan'
            prose: 'Select the plan that best fits your needs.'
          tiers:
            source: 'pricing-example'     # Loads from lib/data/pricing/pricing-example.json
            layout: 'cards'               # Options: cards, comparison
        ```

        ### Configuration Options

        #### Layout Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `tiers.layout` | string | Yes | Layout type ('cards', 'comparison') |
        | `tiers.source` | string | Yes | Data file name in `lib/data/pricing/` directory |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | No | Optional intro text with title, subtitle, and prose |

        ### Tier Data Structure

        Each tier in the data file should follow this structure:

        ```json
        {
          "name": "Professional",
          "description": "Best for growing teams",
          "icon": "award",
          "isFeatured": true,
          "featuredLabel": "Most Popular",
          "price": {
            "prefix": "$",
            "amount": "29",
            "suffix": "/month"
          },
          "features": [
            { "text": "Unlimited projects" },
            { "text": "API access", "isExcluded": true },
            { "text": "Storage", "value": "10 GB" }
          ],
          "ctas": [
            {
              "url": "/signup",
              "label": "Get Started",
              "isButton": true,
              "buttonStyle": "primary"
            }
          ]
        }
        ```

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'pricing-table'
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
      title: 'Download Pricing Table Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete pricing table component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/pricing-table.zip'
        label: 'Download Pricing Table Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
