---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building Multi-Language Sites'
  description: 'A simple approach to internationalization with URL-based language switching in Metalsmith'
  date: '2025-11-15'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample2.jpg'

seo:
  title: 'Building Multi-Language Sites with Metalsmith'
  description: 'Learn how to implement internationalization with URL-based language switching using parallel content directories and a simple language switcher'
  socialImage: '/assets/images/sample2.jpg'
  canonicalURL: ''
  keywords: 'metalsmith, i18n, internationalization, multi-language, language switcher, localization'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    isFullScreen: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample2.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Guide'
      title: 'Building Multi-Language Sites'
      titleTag: 'h1'
      subTitle: 'A simple approach to i18n with Metalsmith'
      prose: 'This guide walks through implementing internationalization with URL-based language switching. The approach is straightforward: mirror your content structure for each language and let Metalsmith build it naturally.'
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
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
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: ''
      titleTag: 'h2'
      subTitle: ''
      prose: |
        ## The Simple Approach

        Many i18n implementations involve complex plugins, translation mappings, and fallback logic. This guide takes a different approach: assume every page exists in every language, organized in parallel directory structures. Metalsmith builds these directories naturally, no special handling required.

        This works because:
        - Metalsmith treats `src/de/` the same as any other content directory
        - URLs are predictable: `/about/` becomes `/de/about/`
        - No build-time translation mapping is needed
        - AI assistants make creating translated content straightforward

        ## Content Structure

        Organize your source files with the default language at the root and other languages in subdirectories:

        ```bash
        src/
          index.md
          about.md
          blog/
            welcome-post.md
          de/
            index.md
            about.md
            blog/
              welcome-post.md
          fr/
            index.md
            about.md
            blog/
              welcome-post.md
        ```

        Each language directory mirrors the default structure exactly. The markdown files have identical frontmatter structure - only the prose content is translated.

        ## Creating Translated Content

        With AI assistance, generating translations is straightforward. Copy your default language directory:

        ```bash
        cp -r src/ src/de/
        ```

        Then ask your AI assistant to translate the prose fields. The structure, layout references, and metadata stay the same - only the human-readable text changes.

        For example, an English page:

        ```yaml
        sections:
          - sectionType: text-only
            text:
              title: 'About Us'
              prose: |
                We build tools for the modern web.
        ```

        Becomes in German:

        ```yaml
        sections:
          - sectionType: text-only
            text:
              title: 'Uber uns'
              prose: |
                Wir entwickeln Werkzeuge fur das moderne Web.
        ```

        ## Language Configuration

        Define your available languages in a data file (`lib/data/languages.json`):

        ```json
        {
          "defaultLang": "en",
          "fallbackUrl": "/404/",
          "available": [
            { "code": "en", "label": "English" },
            { "code": "de", "label": "Deutsch" },
            { "code": "fr", "label": "Francais" }
          ]
        }
        ```

        The `fallbackUrl` is where the language switcher navigates when a localized page doesn't exist. Set it to `/404/` for production sites, or a custom page explaining that translations are coming soon.

        This configuration drives both the language switcher UI and the SEO tags.

        ## The Language Switcher

        The [language-switcher component](/references/partials/language-switcher/) already includes URL-based navigation logic. When a user selects a language, it:

        1. Extracts the base path from the current URL (strips any locale prefix)
        2. Constructs the URL for the selected language
        3. Checks if that URL exists (via a HEAD request)
        4. Navigates there if it exists, or falls back to a configurable URL

        For example, on `/de/about/` selecting French:
        - Base path: `/about/`
        - Target URL: `/fr/about/`
        - If `/fr/about/` exists, navigate there
        - If not, navigate to the fallback URL

        On sites without language directories (like this reference site), the component gracefully falls back to this guide. Once you add your language directories, the switcher works automatically.

        ## SEO: hreflang Tags

        Search engines need to know that `/about/` and `/de/about/` are the same content in different languages. This is done with `hreflang` tags in the `<head>`.

        Add a Nunjucks filter to strip locale prefixes (`lib/nunjucks-filters/string-filters.js`):

        ```javascript
        /**
         * Strip locale prefix from a path
         * /de/about/ becomes /about/
         * /about/ stays /about/
         */
        function stripLocalePrefix(path, locales, defaultLocale) {
          for (const locale of locales) {
            if (locale !== defaultLocale && path.startsWith('/' + locale + '/')) {
              return path.slice(locale.length + 1);
            }
          }
          return path;
        }
        ```

        Then in your `<head>` template:

        ```html
        {% set basePath = urlPath | stripLocalePrefix(data.languages.available, data.languages.defaultLang) %}
        {% for lang in data.languages.available %}
          {% if lang.code == data.languages.defaultLang %}
            <link rel="alternate" hreflang="{{ lang.code }}"
                  href="{{ data.site.url }}{{ basePath }}" />
          {% else %}
            <link rel="alternate" hreflang="{{ lang.code }}"
                  href="{{ data.site.url }}/{{ lang.code }}{{ basePath }}" />
          {% endif %}
        {% endfor %}
        <link rel="alternate" hreflang="x-default"
              href="{{ data.site.url }}{{ basePath }}" />
        ```

        This tells search engines:
        - These pages are translations of each other
        - Show the appropriate version based on the searcher's language
        - The default language version is the fallback

        ## Setting the Document Language

        Each page should declare its language in the `<html>` tag. You can detect this from the URL path:

        ```nunjucks
        {% set currentLocale = data.languages.defaultLang %}
        {% for lang in data.languages.available %}
          {% if lang.code != data.languages.defaultLang and urlPath.startsWith('/' + lang.code + '/') %}
            {% set currentLocale = lang.code %}
          {% endif %}
        {% endfor %}

        <html lang="{{ currentLocale }}">
        ```

        Or add a `locale` field to each page's frontmatter if you prefer explicit control.

        ## Navigation Within a Language

        All internal links within a language context should stay in that context. A German page linking to the about page should link to `/de/about/`, not `/about/`.

        For navigation menus defined in data files, define menu items without locale prefixes and prepend the current locale in templates:

        ```nunjucks
        {% set localePrefix = '' %}
        {% for lang in data.languages.available %}
          {% if lang.code != data.languages.defaultLang and urlPath.startsWith('/' + lang.code + '/') %}
            {% set localePrefix = '/' + lang.code %}
          {% endif %}
        {% endfor %}

        <a href="{{ localePrefix }}{{ item.url }}">{{ item.label }}</a>
        ```

        ## What You Don't Need

        This approach deliberately avoids:

        - **Translation plugins** - Metalsmith builds the directories as-is
        - **Fallback logic** - Every page exists in every language
        - **Translation mapping** - URLs are predictable from the path structure
        - **Complex configuration** - Just a list of available languages

        The simplicity comes from the assumption that you maintain complete translations. If a page exists in English, it exists in German and French too.

        ## Trade-offs

        This approach works well when:
        - You have a manageable number of pages
        - You can maintain complete translations
        - You want simple, predictable URLs
        - AI assistance is available for translation work

        It may not suit:
        - Large sites with thousands of pages
        - Sites with frequently changing content that's hard to keep in sync
        - Situations where partial translations are necessary

        ## Summary

        Building a multi-language Metalsmith site doesn't require complex plugins or translation mapping. With parallel content directories, a simple language switcher, and proper SEO tags, you get full internationalization using patterns Metalsmith already supports.

        The key insight: Metalsmith doesn't care that `src/de/` contains German content. It's just another directory to build. The language-awareness comes from how you structure content and handle URLs in templates and JavaScript.

  - sectionType: blog-navigation
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
---
