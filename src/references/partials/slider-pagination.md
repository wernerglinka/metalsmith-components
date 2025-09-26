---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Slider Pagination Partial - Metalsmith Components
  description: 'Navigation controls for slider and carousel components'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Slider Pagination'
  description: 'Interactive pagination buttons for slider navigation'
  pattern: ''
  tags: ['slider', 'pagination', 'carousel', 'navigation', 'tabs']

sections:
  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Slider Pagination'
      titleTag: 'h1'
      prose: |
        The Slider Pagination partial creates navigation controls for sliders and carousels. It can display as numbered buttons or as named tabs, with proper accessibility support and active state management. The numbered buttons are rendered under the slider, while tabs are rendered above to keep with common usage patterns.

        ### Manifest

        ```json
        {
          "name": "slider-pagination",
          "type": "_partials",
          "styles": ["slider-pagination.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        isTabs: true
        slides:
          - text:
              title: 'First Slide'
          - text:
              title: 'Second Slide'
          - text:
              title: 'Third Slide'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `slides` | array | Yes | Array of slide objects |
        | `isTabs` | boolean | No | Display as tabs (true) or numbers (false) |

        ### Example
        For a real live example please visit the [simple slider page](/references/sections/simple-slider/#default-example).

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
        {% from "components/_partials/slider-pagination/slider-pagination.njk" import sliderPagination %}

        {{ sliderPagination(section.slides, section.isTabs) }}
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
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - Numbered buttons or named tabs
        - ARIA labels and disabled state management
        - First slide is active by default
---
