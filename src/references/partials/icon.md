---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Icon Partial - Metalsmith Components
  description: 'Icon partial component for displaying SVG icons with optional linking'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Icon'
  description: 'SVG icon component with optional link functionality'
  pattern: 'simple-gray1'
  tags: ['icon', 'svg', 'graphic', 'link', 'visual']

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-text-section'
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
      title: 'Icon'
      titleTag: 'h1'
      prose: |
        The Icon partial renders SVG icons from the project's icon library. Icons are mostly from https://feathericons.com/. Icons can be standalone or wrapped in links.

        ### Manifest

        ```json
        {
          "name": "icon",
          "type": "_partials",
          "styles": ["icon.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        icon:
          icon: 'feather'
          url: ''
          title: 'Feather Icon'
        ```

        or

        ```yaml
        icon: 'feather'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `icon` | string | Yes | Icon name (matches filename in icons/) |
        | `url` | string | No | Link URL for clickable icons |
        | `title` | string | No | Title/alt text for accessibility |

        ### Example

  - sectionType: icon-only
    containerTag: section
    classes: 'demo'
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
        imageScreen: 'none' # light, dark, none
    icon: 'feather'

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
        {% from "components/_partials/icon/icon.njk" import icon %}

        {# Standalone icon #}
        {{ icon('feather') }}

        {# Linked icon #}
        {{ icon({
          icon: 'external-link',
          url: 'https://example.com',
          title: 'Visit Example'
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
        - Uses SVG icons from `/lib/layouts/icons/`
        - Optional linking
        - ARIA labels for linked external icons
        - External links get `rel="noopener noreferrer"`

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'icon'
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
      title: 'Download Icon Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete icon component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/icon.zip'
        label: 'Download Icon Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
