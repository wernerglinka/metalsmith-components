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
  pattern: 'simple-gray2'
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
        The Slider Pagination partial creates navigation controls for sliders and carousels. It can display as numbered buttons or as named tabs, with proper accessibility support and active state management.

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
        slides:
          - text:
              title: 'First Slide'
          - text:
              title: 'Second Slide'
          - text:
              title: 'Third Slide'
        isTabs: false  # or true for tab-style
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `slides` | array | Yes | Array of slide objects |
        | `isTabs` | boolean | No | Display as tabs (true) or numbers (false) |

        ### Example

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Slider Pagination Demo'
      titleTag: 'h2'
      prose: 'This component creates navigation controls for slider and carousel components.'

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

        {# Numbered pagination #}
        {{ sliderPagination(section.slides, false) }}

        {# Tab-style pagination #}
        {{ sliderPagination(section.slides, true) }}
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
        - **Dual Modes**: Numbered buttons or named tabs
        - **Accessibility**: ARIA labels and disabled state management
        - **Active State**: First slide is active by default
        - **Keyboard Support**: Proper button roles and navigation
        - **Dynamic Labels**: Uses slide titles for meaningful navigation
        - **JavaScript Integration**: Works with slider controllers for navigation
---