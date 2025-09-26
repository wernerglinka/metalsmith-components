---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Simple Accordion

navigation:
  navLabel: 'Simple Accordion'
  navIndex: 24

card:
  title: 'Simple Accordion'
  description: 'Interactive accordion component for FAQs with expand/collapse functionality and flexible data loading.'
  image: '/assets/images/sample24.jpg'
  tags: ['faq', 'accordion', 'collapse', 'questions', 'expandable']

seo:
  title: Simple Accordion Component - FAQ Section for Metalsmith
  description: 'Interactive accordion component for displaying FAQs with smooth expand/collapse animations. Supports selective data loading and multiple configuration options for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith accordion, FAQ component, collapsible content, accordion section, FAQ accordion, expandable panels, question answer component'

sections:
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
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Simple Accordion Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        An interactive accordion component for displaying frequently asked questions or any collapsible content. Features smooth animations, accessibility support, and flexible data loading from JSON files.

        ## Features

        - **Dynamic Data Loading**: Load all FAQs or select specific ones by ID
        - **Flexible Configuration**: Control expand behavior and multiple item expansion
        - **Accessible**: Full keyboard navigation and screen reader support
        - **Smooth Animations**: CSS-based transitions for expand/collapse
        - **Responsive Design**: Adapts to mobile and desktop screens

        ## Configuration Options

        | Property | Type | Description |
        |----------|------|-------------|
        | `faqs.scope` | string | "all" or "selections" - determines data loading |
        | `faqs.source` | string | data source in lib/data/ (e.g., "faqs") |
        | `faqs.selections` | array | array of IDs when scope is "selections" |
        | `expandIndex` | number | index of item to expand by default (0-based) |
        | `allowMultiple` | boolean | allow multiple expanded items |

        **Example:**
        ```yaml
        faqs:
          scope: "all"
          source: "faqs"
          selections:
            - "getting-started"
            - "component-structure"
        expandIndex: 0
        allowMultiple: false
        ```
    ctas: []

  - sectionType: simple-accordion
    containerTag: section
    classes: ''
    id: 'demo-all-faqs'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Example 1'
      title: 'All FAQs'
      titleTag: 'h2'
      subTitle: ''
      prose: 'This example shows all available FAQs from the data source.'
    faqs:
      scope: 'all'
      source: 'faqs'
      selections: []
    expandIndex: 0
    allowMultiple: false
    hasCenteredContent: false
    ctas: []

  - sectionType: simple-accordion
    containerTag: section
    classes: ''
    id: 'demo-selected-faqs'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-surface)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Example 2'
      title: 'Selected FAQs'
      titleTag: 'h2'
      subTitle: 'Curated Content'
      prose: 'This example shows only selected FAQs, allows multiple items to be expanded, and has a background color.'
    faqs:
      scope: 'selections'
      source: 'faqs'
      selections:
        - 'How do I get started with Metalsmith Components?'
        - 'What is the structure of a component?'
        - 'Can I create custom components?'
    expandIndex: null
    allowMultiple: true
    hasCenteredContent: false
    ctas:
      - url: '/library'
        text: 'View All Components'
        type: 'primary'
        isExternal: false

  - sectionType: text-only
    containerTag: section
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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Implementation Notes'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ## Data Structure

        FAQ data files are stored in `lib/data/faqs/` as JSON files. Each FAQ file should have the following structure:

        ```json
        {
          "id": "unique-id",
          "question": "Your question here?",
          "answer": "Your detailed answer here."
        }
        ```

        ## JavaScript Functionality

        The accordion JavaScript handles:
        - Click events on accordion headers
        - Expanding/collapsing panels with proper ARIA attributes
        - Single or multiple item expansion based on configuration
        - Initial state management (expand first item if configured)

        ## Styling

        The component includes responsive styles with:
        - Smooth CSS transitions for expand/collapse animations
        - Hover and focus states for accessibility
        - Customizable through CSS variables
        - Mobile-optimized spacing and typography
    ctas: []
---
