---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Language Switcher Partial - Metalsmith Components
  description: 'Dropdown language preference selector with localStorage persistence'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Language Switcher'
  description: 'Language preference selector with dropdown menu'
  pattern: 'simple-gray4'
  tags: ['language', 'i18n', 'internationalization', 'locale', 'switcher', 'dropdown']

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
      title: 'Language Switcher'
      titleTag: 'h1'
      prose: |
        > This component manages language *preference* only. For a full internationalization implementation, see [Building Multi-Language Sites](/blog/building-multi-language-sites/).

        The Language Switcher partial provides a dropdown menu for selecting a language preference. It stores the selected language in localStorage and sets the `lang` attribute on the `<html>` element.

        ### Manifest

        ```json
        {
          "name": "language-switcher",
          "type": "partial",
          "styles": ["language-switcher.css"],
          "scripts": ["language-switcher.js"],
          "requires": ["icon"]
        }
        ```

        ### Example
        Click the globe icon in the header navigation to see the language switcher in action.

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
      title: 'Configuration'
      titleTag: 'h2'
      prose: |
        Languages are configured in `lib/data/languages.json`:

        ```json
        {
          "defaultLang": "en",
          "available": [
            { "code": "en", "label": "English" },
            { "code": "de", "label": "Deutsch" },
            { "code": "es", "label": "Espanol" },
            { "code": "fr", "label": "Francais" }
          ]
        }
        ```

        Add or remove languages by editing this file. Each language object should have:
        - `code` - ISO 639-1 language code (e.g., 'en', 'de', 'fr')
        - `label` - Display name (e.g., 'English', 'Deutsch', 'Francais')

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
        {% from "components/_partials/language-switcher/language-switcher.njk" import languageSwitcher %}

        {{ languageSwitcher(data.languages.available, data.languages.defaultLang) }}
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
      titleTag: 'h3'
      prose: |
        - Dropdown language selector with globe icon
        - Stores preference in localStorage under `language` key
        - Sets `lang` attribute on `<html>` element
        - Persists across page loads and sessions
        - Keyboard accessible (Escape to close)
        - Click outside to close dropdown
        - Dark theme compatible
        - SWUP page transitions compatible

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'language-switcher'
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
      title: 'Download Language Switcher Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete language-switcher component package including template, styles, scripts, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/language-switcher.zip'
        label: 'Download Language Switcher Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
