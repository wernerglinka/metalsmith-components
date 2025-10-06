---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Navigation Partial - Metalsmith Components
  description: 'Navigation partial component with active page detection and responsive mobile menu'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Navigation'
  description: 'Responsive navigation menu with active state detection and mobile support'
  pattern: 'simple-gray5'
  tags: ['navigation', 'menu', 'responsive', 'hamburger', 'active-state']

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
      title: 'Navigation'
      titleTag: 'h1'
      prose: |
        The Navigation partial provides a complete menu system with automatic active state detection, path-based highlighting, and a responsive hamburger menu for narrow screen widths. It highlights both exact page matches and parent sections.

        ### Manifest

        ```json
        {
          "name": "navigation",
          "type": "_partials",
          "styles": ["navigation.css"],
          "scripts": ["navigation.js"],
          "requires": []
        }
        ```

        ### Configuration
        The navigation partial uses a navigation object in the Metalsmith metadata. The name of the object is specified as a Metalsmith Menu Plus plugin option. In thhis case the object `mainMenu` is available via the metadata.

        ```json
        [
          {"title":"Home","path":"/","navIndex":0,"children":[]},
          {"title":"Section Anatomy","path":"/section-anatomy/","navIndex":1,"children":[]},
          {"title":"From YAML to HTML","path":"/yaml-to-html/","navIndex":2,"children":[]},
          {"title":"Sample Blog","path":"/blog/","navIndex":4,"children":[...]},
          {"title":"References","path":"/references/","navIndex":5,"children":[...}]
        ```

        ### Example
        See the navigation in action in the header above.

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
        {% from "components/_partials/navigation/navigation.njk" import navigation %}

        {{ navigation( mainMenu, urlPath )}}
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
        - Hamburger menu for mobile devices
        - ARIA labels, keyboard navigation, and focus management
        - Mobile menu toggle and keyboard support
        - Proper nav element structure for screen readers
---
