---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Search

navigation:
  navLabel: 'Search'
  navIndex: 6

card:
  title: 'Search'
  description: 'Interactive search component with fuzzy search, filtering, and real-time results using Fuse.js and metalsmith-search plugin.'
  image: '/assets/images/sample15.jpg'

seo:
  title: Search Component - Interactive Search for Metalsmith
  description: 'Interactive search component with fuzzy search, filtering, and real-time results. Perfect for component libraries, documentation sites, and content-heavy Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith search, fuzzy search, search component, fuse.js, interactive search, site search, content discovery'

sections:
  - sectionType: search
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      title: 'Search Components'
      subtitle: 'Find components, examples, and documentation'
      placeholder: 'Search components, features, or documentation...'
    settings:
      showCategories: true
      maxResults: 15
      enableHighlighting: true
      showRelevanceScore: true

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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Search Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        An interactive search component that provides fuzzy search functionality across your Metalsmith site content using Fuse.js and the metalsmith-search plugin.

        ```yaml
        - sectionType: search
          containerTag: section
          # container settings

          text:
            title: 'Search Components'                    # Main heading (optional)
            subtitle: 'Find what you need'               # Subtitle text (optional)
            placeholder: 'Search...'                     # Input placeholder (default: "Search...")
          
          settings:
            showCategories: true                         # Show filter dropdowns (default: false)
            maxResults: 20                               # Maximum results to display (default: 20)
            enableHighlighting: true                     # Highlight matching terms (default: true)
            showRelevanceScore: true                     # Show relevance percentage (default: true)
            minCharacters: 2                             # Min characters to trigger search (default: 2)
        ```

        ### Features

        - **Fuzzy Search**: Powered by Fuse.js for intelligent search matching
        - **Component-Aware**: Understands your site's component-based architecture
        - **Multi-Level Search**: Search both page-level and section-level content
        - **Real-time Results**: Instant search with debounced input (300ms)
        - **Filtering**: Filter by content type and component type
        - **Keyboard Shortcuts**: Ctrl/Cmd+K to focus search, Escape to clear
        - **Match Highlighting**: Visually highlights matching terms in results
        - **Accessibility**: Full ARIA support and screen reader compatibility
        - **Responsive**: Works seamlessly across all device sizes

        ### Prerequisites

        1. **metalsmith-search plugin** must be installed and configured in your Metalsmith build
        2. **Fuse.js** is loaded from CDN automatically when the search component is used
        3. The plugin must generate a `/search-index.json` file during build

        ### Search Properties

        - `text.title`: Main heading for the search section (optional)
        - `text.subtitle`: Subtitle or description text (optional)
        - `text.placeholder`: Placeholder text for search input (default: "Search...")
        - `settings.showCategories`: Show filter dropdowns (default: false)
        - `settings.maxResults`: Maximum number of results to display (default: 20)
        - `settings.enableHighlighting`: Highlight matching terms (default: true)
        - `settings.showRelevanceScore`: Show relevance percentage (default: true)
        - `settings.minCharacters`: Minimum characters to trigger search (default: 2)

  - sectionType: search
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: '#f0f4f8'
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      title: 'Basic Search Example'
      placeholder: 'Type to search...'
    settings:
      showCategories: false
      maxResults: 10
      enableHighlighting: true

  - sectionType: search
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
        top: true
        bottom: true
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      title: 'Advanced Search with Filters'
      subtitle: 'Search with category and component type filtering'
      placeholder: 'Search components, guides, examples...'
    settings:
      showCategories: true
      maxResults: 20
      enableHighlighting: true
      showRelevanceScore: true
---