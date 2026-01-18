---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building Multi-Language Sites'
  description: 'A step-by-step guide to implementing internationalization with URL-based language switching in Metalsmith'
  date: '2026-01-18'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample7.jpg'

seo:
  title: 'Building Multi-Language Sites with Metalsmith'
  description: 'Complete beginner-friendly guide to adding multi-language support to the Metalsmith2025 Structured Content Starter'
  socialImage: '/assets/images/sample7.jpg'
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
        image: '/assets/images/sample7.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'How-To Tutorial'
      title: 'Building Multi-Language Sites'
      titleTag: 'h1'
      subTitle: 'From single language to multi-language in 8 steps'
      prose: 'Learn how to add multi-language support to your Metalsmith site using parallel content directories, a language switcher component, and proper SEO tags. This beginner-friendly guide walks through every step.'
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
      isCentered: false
      subTitle: ''
      prose: |-
        ## What You'll Build

        By the end of this tutorial, you'll have a complete multi-language site that includes:
        - A language switcher in the header that navigates between language versions
        - Parallel content directories for each language (`/de/`, `/fr/`, etc.)
        - Proper SEO `hreflang` tags linking language variants
        - Navigation that stays within the current language context
        - URL-based language detection (e.g., `/de/about/` serves German content)

        ## The Simple Approach

        Many i18n implementations involve complex plugins, translation mappings, and fallback logic. This guide takes a different approach: assume every page exists in every language, organized in parallel directory structures. Metalsmith builds these directories naturally, no special plugins required.

        This works because:
        - Metalsmith treats `src/de/` the same as any other content directory
        - URLs are predictable: `/about/` becomes `/de/about/`
        - No build-time translation mapping is needed
        - AI assistants make creating translated content straightforward

        ## Prerequisites

        Before starting, make sure you have:
        - The [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) set up and running
        - Access to the [Metalsmith Components library](https://github.com/wernerglinka/metalsmith-components)
        - Basic understanding of HTML, CSS, and JavaScript
        - A code editor and terminal access

        ## Step 1: Download and Install the Language Switcher

        First, download the language-switcher component from the component library.

        ### Download the Component Package

        Visit the [language-switcher reference page](/references/partials/language-switcher/) and click the download button at the bottom of the page. This downloads a ZIP file containing:
        - `language-switcher.njk` - The Nunjucks template macro
        - `language-switcher.css` - Component styles
        - `language-switcher.js` - Client-side language navigation
        - `manifest.json` - Component configuration
        - `README.md` - Complete implementation guide
        - `install.sh` - Automated installation script

        ### Install Using the Automated Script

        After downloading, move the zip file to your project root directory, then:

        ```bash
        # Navigate to your project root
        cd /path/to/your/project

        # Extract the component package
        unzip language-switcher.zip

        # Run the installation script
        ./language-switcher/install.sh
        ```

        The installation script will:
        1. Verify you're in a Metalsmith project directory
        2. Check for and install the required `icon` dependency
        3. Copy component files to `lib/layouts/components/_partials/language-switcher/`
        4. Copy the README.md for reference

        ## Step 2: Create the Languages Configuration

        Create a data file that defines your available languages.

        ### Create languages.json

        Create a new file at `lib/data/languages.json`:

        ```json
        {
          "defaultLang": "en",
          "fallbackUrl": "/404/",
          "available": [
            { "code": "en", "label": "English" },
            { "code": "de", "label": "Deutsch" },
            { "code": "fr", "label": "Français" }
          ]
        }
        ```

        **Configuration explained:**
        - `defaultLang` - The default language code (pages at root, no URL prefix)
        - `fallbackUrl` - Where to navigate when a localized page doesn't exist
        - `available` - Array of language objects with ISO 639-1 `code` and display `label`

        ## Step 3: Add the Language Switcher to Your Header

        Now we'll integrate the language switcher into your header component.

        ### Update header.njk

        Open `lib/layouts/components/sections/header/header.njk` and add the import and macro call.

        First, add the import at the top of the file:

        ```nunjucks
        {% from "components/_partials/language-switcher/language-switcher.njk" import languageSwitcher %}
        ```

        Then add the macro call inside the header, typically in a `.misc` container alongside other header utilities:

        ```nunjucks
        <div class="misc">
          {{ languageSwitcher(data.languages.available, data.languages.defaultLang, data.languages.fallbackUrl) }}
          {# Other header items like dark mode toggle, etc. #}
        </div>
        ```

        ### Update header manifest.json

        Open `lib/layouts/components/sections/header/manifest.json` and add `language-switcher` to the requires array:

        ```json
        {
          "name": "header",
          "type": "section",
          "styles": ["header.css"],
          "scripts": ["header.js"],
          "requires": ["branding", "navigation", "language-switcher"]
        }
        ```

        ### Update header.css

        Add the language toggle button to your button reset styles. In the `.misc` section of `header.css`:

        ```css
        .misc {
          display: flex;
          align-items: center;
          gap: clamp(var(--space-3xs), 2vw, var(--space-s));

          /* Reset button styles for header buttons */
          button.language-toggle,
          button.theme-toggle {
            background: transparent;
            box-shadow: none;
            padding: 0;
            border-radius: 0;
            backdrop-filter: none;

            &:hover {
              transform: none;
              background: transparent;
            }
          }
        }
        ```

        ## Step 4: Create Your Language Directories

        Now create the content structure for your additional languages.

        ### Copy the Content Tree

        For each language you want to support, copy your entire source directory:

        ```bash
        # Create German content
        cp -r src/ src/de/

        # Create French content
        cp -r src/ src/fr/
        ```

        Your directory structure should now look like:

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

        ### Translate the Content

        With AI assistance, translating content is straightforward. For each file in the language directories, translate the prose fields while keeping the structure identical.

        For example, an English page:

        ```yaml
        sections:
          - sectionType: text-only
            text:
              title: 'About Us'
              prose: |
                We build tools for the modern web.
        ```

        Becomes in German (`src/de/about.md`):

        ```yaml
        sections:
          - sectionType: text-only
            text:
              title: 'Über uns'
              prose: |
                Wir entwickeln Werkzeuge für das moderne Web.
        ```

        The structure, layout references, and metadata stay the same - only the human-readable text changes.

        ## Step 5: Add the SEO hreflang Filter

        Search engines need to know that `/about/` and `/de/about/` are the same content in different languages.

        ### Create the Filter

        Open `lib/nunjucks-filters/string-filters.js` and add this filter:

        ```javascript
        /**
         * Strip locale prefix from a path
         * /de/about/ becomes /about/
         * /about/ stays /about/
         * @param {string} path - The URL path
         * @param {Array} locales - Array of locale objects with code property
         * @param {string} defaultLocale - The default locale code
         * @returns {string} Path without locale prefix
         */
        function stripLocalePrefix(path, locales, defaultLocale) {
          if (!path || !locales) {
            return path;
          }
          for (const locale of locales) {
            const code = locale.code || locale;
            if (code !== defaultLocale && path.startsWith('/' + code + '/')) {
              return path.slice(code.length + 1);
            }
          }
          return path;
        }
        ```

        Export the filter in the same file:

        ```javascript
        module.exports = {
          // ... existing filters
          stripLocalePrefix
        };
        ```

        ### Register the Filter

        In your `metalsmith.js` where you configure Nunjucks, add the filter:

        ```javascript
        const { stripLocalePrefix } = require('./lib/nunjucks-filters/string-filters');

        // In your nunjucks configuration
        nunjucks.addFilter('stripLocalePrefix', stripLocalePrefix);
        ```

        ## Step 6: Add hreflang Tags to Your Head Template

        Now add the hreflang tags to tell search engines about language variants.

        ### Update head.njk

        Open `lib/layouts/components/_helpers/head.njk` and add the hreflang tags:

        ```nunjucks
        {# Language alternate links for SEO #}
        {% if data.languages and data.languages.available %}
          {% set basePath = urlPath | stripLocalePrefix(data.languages.available, data.languages.defaultLang) %}
          {% for lang in data.languages.available %}
            {% if lang.code == data.languages.defaultLang %}
              <link rel="alternate" hreflang="{{ lang.code }}" href="{{ metadata.site.url }}{{ basePath }}" />
            {% else %}
              <link rel="alternate" hreflang="{{ lang.code }}" href="{{ metadata.site.url }}/{{ lang.code }}{{ basePath }}" />
            {% endif %}
          {% endfor %}
          <link rel="alternate" hreflang="x-default" href="{{ metadata.site.url }}{{ basePath }}" />
        {% endif %}
        ```

        This generates tags like:

        ```html
        <link rel="alternate" hreflang="en" href="https://example.com/about/" />
        <link rel="alternate" hreflang="de" href="https://example.com/de/about/" />
        <link rel="alternate" hreflang="fr" href="https://example.com/fr/about/" />
        <link rel="alternate" hreflang="x-default" href="https://example.com/about/" />
        ```

        ## Step 7: Update Navigation for Language Context

        Internal links should stay within the current language context.

        ### Update Navigation Template

        In your navigation template or anywhere you render internal links, prepend the current locale:

        ```nunjucks
        {# Detect current locale from URL #}
        {% set localePrefix = '' %}
        {% if data.languages %}
          {% for lang in data.languages.available %}
            {% if lang.code != data.languages.defaultLang and urlPath.startsWith('/' + lang.code + '/') %}
              {% set localePrefix = '/' + lang.code %}
            {% endif %}
          {% endfor %}
        {% endif %}

        {# Use localePrefix when rendering links #}
        <a href="{{ localePrefix }}{{ item.url }}">{{ item.label }}</a>
        ```

        This ensures:
        - On `/about/`, links go to `/blog/`, `/contact/`, etc.
        - On `/de/about/`, links go to `/de/blog/`, `/de/contact/`, etc.

        ## Step 8: Build and Test

        Now let's test the complete multi-language system.

        ### Start Development Server

        ```bash
        npm start
        ```

        This builds the site and starts the development server at `http://localhost:3000`.

        ### Testing Checklist

        Test the following functionality:

        **Language Switcher:**
        1. **Visual Check** - The globe icon appears in the header
        2. **Open Dropdown** - Click the globe, the language dropdown appears
        3. **Language Selection** - Click a language, you're navigated to the correct URL
        4. **URL Structure** - Verify `/de/about/` shows German content
        5. **Keyboard Access** - Press Escape to close the dropdown

        **Navigation Context:**
        1. **Default Language** - On `/about/`, internal links go to `/blog/`, etc.
        2. **Other Languages** - On `/de/about/`, internal links go to `/de/blog/`, etc.
        3. **Language Switcher** - From any page, switching languages takes you to the equivalent page

        **SEO Tags:**
        1. **View Source** - Check page source for `hreflang` tags
        2. **Verify Links** - Confirm all language variants are listed
        3. **x-default** - Verify the default fallback is present

        **Browser DevTools Check:**
        1. Open Console and verify no JavaScript errors
        2. Check Network tab for proper page loads
        3. Verify localStorage stores the language preference

        ## Troubleshooting

        If something isn't working, here are common issues and solutions:

        ### Language Switcher Doesn't Appear

        - Verify `language-switcher` is in the header's `manifest.json` requires array
        - Check that the macro is imported and called in `header.njk`
        - Ensure `lib/data/languages.json` exists and is valid JSON
        - Rebuild and clear browser cache

        ### Clicking Language Does Nothing

        - Check browser Console for JavaScript errors
        - Verify the `data-default-lang` and `data-fallback-url` attributes are set
        - Ensure the language-switcher JavaScript is being bundled

        ### Wrong Language URLs

        - Verify your directory structure matches (`src/de/`, not `src/german/`)
        - Check that language codes in `languages.json` match directory names
        - Ensure the `defaultLang` is correct (usually `en`)

        ### hreflang Tags Missing

        - Verify the `stripLocalePrefix` filter is registered
        - Check that `data.languages` is available in templates
        - Ensure the head template includes the hreflang block

        ### Navigation Links Wrong Language

        - Verify the `localePrefix` detection logic is in your navigation template
        - Check that `urlPath` is available in the template context
        - Ensure you're prepending `localePrefix` to all internal links

        ## How the Language Switcher Works

        Understanding the JavaScript logic helps with customization:

        1. **URL Detection** - The switcher extracts the current locale from the URL path
        2. **Base Path Calculation** - It strips any locale prefix to get the base path
        3. **Target URL Building** - It constructs the URL for the selected language
        4. **Existence Check** - It makes a HEAD request to verify the page exists
        5. **Navigation** - If the page exists, it navigates there; otherwise, it uses the fallback URL

        This means the switcher works automatically once your content directories are in place.

        ## Summary

        Congratulations! You've successfully added multi-language support to your Metalsmith site. Here's what you accomplished:

        1. Installed the language-switcher component
        2. Created the languages configuration file
        3. Integrated the switcher into your header
        4. Created parallel content directories for each language
        5. Added the SEO hreflang filter
        6. Added hreflang tags to your page head
        7. Updated navigation to stay within language context
        8. Tested the complete multi-language workflow

        ### Key Takeaways

        - **No special plugins needed** - Metalsmith builds language directories naturally
        - **Parallel structure** - Every page exists in every language
        - **Predictable URLs** - `/about/` becomes `/de/about/`
        - **AI-assisted translation** - Use AI to translate prose fields
        - **SEO-friendly** - hreflang tags link language variants
        - **Graceful fallback** - Switcher handles missing pages

        ### Related Resources

        - [Language Switcher Component](/references/partials/language-switcher/)
        - [Metalsmith2025 Starter Repository](https://github.com/wernerglinka/metalsmith2025-structured-content-starter)
        - [Metalsmith Components Library](https://github.com/wernerglinka/metalsmith-components)
        - [Google hreflang Documentation](https://developers.google.com/search/docs/specialty/international/localized-versions)

        Happy internationalizing!

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
