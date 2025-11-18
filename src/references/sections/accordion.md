---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Accordion

navigation:
  navLabel: 'Accordion'
  navIndex: 24

card:
  title: 'Accordion'
  description: 'Interactive accordion component for FAQs with expand/collapse functionality and flexible data loading.'
  image: '/assets/images/sample24.jpg'
  tags: ['faq', 'accordion', 'collapse', 'questions', 'expandable']

seo:
  title: Accordion Component - FAQ Section for Metalsmith
  description: 'Interactive accordion component for displaying FAQs with smooth expand/collapse animations. Supports selective data loading and multiple configuration options for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith accordion, FAQ component, collapsible content, accordion section, FAQ accordion, expandable panels, question answer component'

sections:
  - sectionType: text-only
    containerTag: article
    classes: 'first-text-section'
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
      title: 'Accordion Section'
      titleTag: 'h1'
      subTitle: ''
      prose: 'An interactive accordion component for displaying frequently asked questions or any collapsible content. Features smooth animations, accessibility support, and flexible data loading from JSON files.'
    ctas: []

  - sectionType: accordion
    containerTag: section
    classes: ''
    id: 'demo-all-faqs'
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Example 1'
      title: 'All FAQs'
      titleTag: 'h2'
      subTitle: ''
      prose: 'This example shows all available FAQs from the data source with a background color. The first accordion id open by default. Open a new accordion will close the old one.'
    faqs:
      scope: 'all'
      source: 'faqs'
      selections: []
    expandIndex: 0
    allowMultiple: false
    hasCenteredContent: false
    ctas: []

  - sectionType: accordion
    containerTag: section
    classes: ''
    id: 'demo-selected-faqs'
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
        color: 'var(--color-surface)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Example 2'
      title: 'Selected FAQs'
      titleTag: 'h2'
      subTitle: 'Curated Content'
      prose: 'This example shows only selected FAQs, allows multiple items to be expanded, and has no background color. Note the OPEN/CLOSE ALL link above the first accordion. '
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

  - sectionType: accordion
    containerTag: section
    classes: ''
    id: 'demo-fancy-accordion'
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
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Example 3'
      title: 'Fancy Accordion with Background Images'
      titleTag: 'h2'
      subTitle: 'Visual Enhancement'
      prose: 'This example demonstrates fancy accordion items with full-width background images. Each accordion header displays a striking visual that enhances the content presentation. Perfect for feature showcases, testimonials, or visually-driven content.'
    faqs:
      scope: 'all'
      source: 'faqs-fancy'
      selections: []
    expandIndex: null
    allowMultiple: true
    hasCenteredContent: false
    ctas: []

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Implementation Notes'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Data Structure

        For our examples, FAQ data files are stored in `lib/data/` as JSON files. Each FAQ file should have the following structure:

        **Basic FAQ structure:**
        ```json
        {
          "id": "unique-id",
          "title": "Your question here?",
          "answer": "Your detailed answer here."
        }
        ```

        **Fancy FAQ with background image:**
        ```json
        {
          "id": "unique-id",
          "title": "Your question here?",
          "answer": "Your detailed answer here.",
          "isFancy": true,
          "background": {
            "image": "/assets/images/sample9.jpg"
          }
        }
        ```

        **Fancy FAQ with background color:**
        ```json
        {
          "id": "unique-id",
          "title": "Your question here?",
          "answer": "Your detailed answer here.",
          "isFancy": true,
          "background": {
            "color": "#3498db"
          }
        }
        ```

        ### JavaScript Functionality

        The accordion uses `requestAnimationFrame` for animations rather than CSS transitions. This approach enables simultaneous animation of multiple panels, which is essential for smooth visual transitions when one panel closes while another opens (in single-panel mode) or when using the "toggle all" functionality.

        CSS transitions would schedule these animations sequentially, resulting in janky, staggered motion. By using `requestAnimationFrame` with a batched animations array, all height changes occur frame-perfect synchronized, creating a polished user experience.

        The JavaScript handles:
        - Simultaneous expand/collapse animations for multiple panels
        - Click events on accordion headers
        - Managing ARIA attributes for accessibility (aria-expanded)
        - Screen reader announcements when panels open/close
        - Single or multiple item expansion based on configuration
        - Initial state management (expand specific item if configured)
        - Full keyboard navigation (Arrow keys, Home, End, Enter, Space)
        - Toggle all functionality with dynamic button text updates

        ### Styling

        The component includes responsive styles with:
        - Height manipulation via JavaScript for smooth synchronized animations
        - Custom easing function (cubic bezier) for natural motion
        - Hover and focus states for accessibility
        - Customizable through CSS variables

  - sectionType: text-only
    containerTag: section
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
        faqs:
          scope: "all"
          source: "faqs"
          selections:
            - "getting-started"
            - "component-structure"
        expandIndex: 0
        allowMultiple: false
        ```

        ### Notes

        - Load all FAQs or select specific ones by ID
        - Control expand behavior and multiple item expansion
        - Full keyboard navigation and screen reader support
        - CSS-based transitions for expand/collapse

        | Property | Type | Description |
        |----------|------|-------------|
        | `faqs.scope` | string | "all" or "selections" - determines data loading |
        | `faqs.source` | string | data source in lib/data/ (e.g., "faqs") |
        | `faqs.selections` | array | array of IDs when scope is "selections" |
        | `expandIndex` | number | index of item to expand by default (0-based) |
        | `allowMultiple` | boolean | allow multiple expanded items |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'accordion'
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
      title: 'Download Accordion Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete accordion component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/accordion.zip'
        label: 'Download Accordion Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
