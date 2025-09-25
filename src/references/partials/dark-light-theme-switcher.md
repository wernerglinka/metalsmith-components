---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Dark Light Theme Switcher Partial - Metalsmith Components
  description: 'Toggle button for switching between dark and light themes'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Dark Light Theme Switcher'
  description: 'Interactive theme toggle with moon/sun icons'
  pattern: 'simple-gray4'
  tags: ['theme', 'dark-mode', 'toggle', 'switcher', 'accessibility']

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
      title: 'Dark Light Theme Switcher'
      titleTag: 'h1'
      prose: |
        The Dark Light Theme Switcher partial provides a toggle button for switching between dark and light theme modes. It uses moon and sun icons to indicate the current state and target mode. Sun, indicating light mode is the default. When clicking on it the icon will change to a moon and the class `dark-theme` will be added to the page `body`.

        ### Manifest

        ```json
        {
          "name": "dark-light-theme-switcher",
          "type": "_partials",
          "styles": ["dark-light-theme-switcher.css"],
          "scripts": ["dark-light-theme-switcher.js"],
          "requires": []
        }
        ```

        ### Example
        Click the theme switcher in the navigation above to see the toggle in action.

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
        {% from "components/_partials/dark-light-theme-switcher/dark-light-theme-switcher.njk" import darkLightThemeSwitcher %}

        {{ darkLightThemeSwitcher() }}
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
        - Moon icon for dark mode, sun icon for light mode
        - Proper ARIA labels and keyboard navigation
        - Click or keyboard activation
        - Maintains state via local storage between sessions
---
