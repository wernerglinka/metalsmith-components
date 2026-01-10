---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Search Partial - Metalsmith Components
  description: 'Interactive search component with customizable data sources'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Search'
  description: 'Configurable search interface with live results'
  pattern: 'simple-gray1'
  tags: ['search', 'interactive', 'filter', 'live-results', 'fuse']

sections:
  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Search'
      titleTag: 'h1'
      prose: |
        The Search partial provides an interactive search interface that can work with different data sources. It includes live search results, accessibility features, and customizable configuration options.

        ### Manifest

        ```json
        {
          "name": "search",
          "type": "partial",
          "styles": ["search.css"],
          "scripts": ["search.js"],
          "validation": {
            "properties": {
              "placeholder": {
                "type": "string",
                "default": "Search..."
              },
              "settings.maxResults": {
                "type": "number",
                "default": 20
              },
              "settings.minCharacters": {
                "type": "number",
                "default": 2
              }
            }
          }
        }
        ```

        ### Configuration

        ```yaml
        searchIndex: '/library-search-index.json'
        placeholder: 'Search components...'
        title: 'Search Components'
        subtitle: 'Find the component you need'
        settings:
          maxResults: 20
          minCharacters: 2
          enableHighlighting: true
        ```

        ### Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `title` | string | No | - | Search section title |
        | `subtitle` | string | No | - | Search section subtitle |
        | `searchIndex` | string | No | '/search-index.json' | JSON data source URL |
        | `placeholder` | string | No | 'Search...' | Input placeholder text |
        | `settings.maxResults` | number | No | 20 | Maximum search results |
        | `settings.minCharacters` | number | No | 2 | Minimum characters to trigger search |

        ### Example

  - sectionType: search-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    title: 'Component Search Demo'
    subtitle: 'Search through the component library'
    searchIndex: '/library-search-index.json'
    placeholder: 'Search components...'
    settings:
      maxResults: 10
      minCharacters: 2

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/search/search.njk" import search %}

        {{ search({
          title: 'Search Components',
          subtitle: 'Find the component you need',
          searchIndex: '/library-search-index.json',
          placeholder: 'Search components...'
        }) }}
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Features'
      titleTag: 'h2'
      prose: |
        - **Live Search**: Real-time results with fuzzy matching (Fuse.js)
        - **Accessibility**: ARIA labels, live regions, and keyboard navigation
        - **Multiple Sources**: Different JSON data sources supported
        - **Clear Function**: Built-in clear button for search input
        - **Status Updates**: Search status announcements for screen readers
        - **Configurable Results**: Limit results and minimum character thresholds
        - **Search Highlighting**: Optional highlighting of matching terms

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'search'
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
      title: 'Download Search Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete search component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/search.zip'
        label: 'Download Search Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
