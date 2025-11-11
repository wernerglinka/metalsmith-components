---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Adding Header Search to Your Site'
  description: 'A step-by-step guide to adding a header search form from the Metalsmith Components library to your starter project'
  date: '2025-11-04'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample15.jpg'

seo:
  title: 'Adding Header Search to Your Metalsmith Site'
  description: 'Complete beginner-friendly guide to adding a header search form with overlay to the Metalsmith2025 Structured Content Starter'
  socialImage: '/assets/images/sample15.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, search, header search, how-to tutorial, component integration'

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
        image: '/assets/images/sample15.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'How-To Tutorial'
      title: 'Adding Header Search'
      titleTag: 'h1'
      subTitle: 'From library to starter in 10 steps'
      prose: 'Learn how to add a complete search system to your Metalsmith site, including a header search form with overlay, search index generation, and a dedicated search results page. This beginner-friendly guide walks through every step.'
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

        By the end of this tutorial, you'll have a complete search system that includes:
        - A search icon button in your header that opens an overlay
        - A search form with keyboard shortcuts (Cmd/Ctrl + K)
        - Automatic redirection to a dedicated search results page
        - A search index generated at build time
        - A search results page powered by Fuse.js fuzzy matching
        - Persistent URL parameters for shareable search results

        ## Prerequisites

        Before starting, make sure you have:
        - The [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) set up and running
        - Access to the [Metalsmith Components library](https://github.com/wernerglinka/metalsmith-components) (either cloned locally or downloaded)
        - Basic understanding of HTML, CSS, and JavaScript
        - A code editor and terminal access

        ## Understanding the Search Architecture

        This search implementation uses a two-part architecture:

        ### Header Search Form
        A lightweight search form in the header that collects user input and redirects to a dedicated search page. It provides a clean, non-intrusive way to access search without cluttering every page.

        ### Search Results Page
        A dedicated page that performs the actual search using Fuse.js fuzzy matching against a search index generated at build time. This separation keeps the header lightweight while providing powerful search capabilities.

        ## Step 1: Install the metalsmith-search Plugin

        The first step is to install the plugin that generates the search index at build time.

        ### Install the Package

        Navigate to your project root and run:

        ```bash
        npm install metalsmith-search
        ```

        This plugin scans your pages during the build process and creates a JSON search index containing page titles, content, excerpts, and headings.

        ## Step 2: Configure the Search Plugin

        Now we need to add the plugin to the Metalsmith build pipeline.

        ### Update metalsmith.js

        Open `metalsmith.js` and add the search plugin configuration. The plugin should be placed **after** the layouts plugin but before any HTML manipulation plugins.

        ```javascript
        import search from 'metalsmith-search';

        export default (options = {}) => {
          // ... other configuration

          metalsmith
            // ... other plugins
            .use(layouts(layoutsOptions))

            // Add search index generation
            .use(
              search({
                ignore: [
                  '**/search.md',
                  '**/search-index.json'
                ]
              })
            )

            // ... remaining plugins
        }
        ```

        **Configuration explained:**
        - `ignore` - Excludes the search page itself and the generated index to prevent recursion
        - The plugin uses defaults for everything else, which is perfect for most use cases

        ### What the Plugin Does

        During the build, the plugin:
        1. Scans all HTML pages in your site
        2. Extracts titles, content, excerpts, and headings
        3. Creates a search index at `build/search-index.json`
        4. Generates metadata about the index (entry counts, average content length, etc.)

        ## Step 3: Download the Search Component

        Next, download the search partial component from the component library.

        ### Download the Component Package

        Visit the [search reference page](https://metalsmith-components.com/references/partials/search) and click the download button at the bottom of the page. This downloads a ZIP file containing:
        - `search.njk` - The Nunjucks template macro
        - `search.css` - Component styles
        - `search.js` - Client-side search implementation
        - `manifest.json` - Component configuration
        - `search.yaml` - Configuration examples
        - `README.md` - Component documentation
        - `install.sh` - Automated installation script
        - `modules/helpers/load-fuse.js` - Dynamic Fuse.js loader

        ### Install Using the Automated Script

        After downloading, move the zip file to your project root directory, then:

        ```bash
        # Navigate to your project root
        cd /path/to/your/project

        # Extract the component package
        unzip search.zip

        # Run the installation script
        ./search/install.sh
        ```

        The installation script will:
        1. Verify you're in a Metalsmith project directory
        2. Check for existing installations and compare versions
        3. Copy component files to `lib/layouts/components/_partials/search/`
        4. Report success

        ## Step 4: Update the Header Component

        Now we'll add the search toggle button and overlay form to your header.

        ### Update header.njk

        Open `lib/layouts/components/sections/header/header.njk`. Currently it looks something like this:

        ```liquid
        {% from "components/_partials/branding/branding.njk" import branding %}
        {% from "components/_partials/navigation/navigation.njk" import navigation %}

        <header>
            {% set link = '/' %}
            {% set img = { src: '/assets/images/metalsmith2025-logo-bug.png', alt: 'Metalsmith Starter' } %}

            {{ branding( link, img ) }}

            {{ navigation( mainMenu, urlPath )}}
        </header>
        ```

        Add the search toggle button and overlay form:

        ```liquid
        {% from "components/_partials/branding/branding.njk" import branding %}
        {% from "components/_partials/navigation/navigation.njk" import navigation %}

        <header>
            {% set link = '/' %}
            {% set img = { src: '/assets/images/metalsmith2025-logo-bug.png', alt: 'Metalsmith Starter' } %}

            {{ branding( link, img ) }}

            {{ navigation( mainMenu, urlPath )}}

            <div class="misc">
              <button type="button" class="search-icon-toggle" aria-label="Toggle search" aria-expanded="false">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
        </header>

        <div class="header-search-overlay">
          <form class="header-search-form" action="/search/" method="get" role="search">
            <input
              type="search"
              name="q"
              id="header-search-input"
              class="header-search-input"
              placeholder="Search..."
              autocomplete="off"
              aria-label="Search the site"
            />
            <button type="submit" class="none" aria-label="Submit search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </form>
        </div>
        ```

        **Key elements:**
        - `search-icon-toggle` - The button that opens the search overlay
        - `header-search-overlay` - The overlay container (hidden by default)
        - `header-search-form` - The form that submits to `/search/`
        - `header-search-input` - The search input field
        - Both buttons use inline SVG for the search icon (magnifying glass)

        ## Step 5: Add Header Search Styles

        The header search requires specific styles for the overlay and form.

        ### Update header.css

        Open `lib/layouts/components/sections/header/header.css` and add these styles at the end:

        ```css
        /* Hide search icon on the search page itself */
        .search-page header .misc .search-icon-toggle {
          display: none;
        }

        /* Header search overlay - positioned below header */
        .header-search-overlay {
          position: fixed;
          /* Matches fluid header height */
          top: clamp(3.25rem, 3.25rem + 1.75vw, 5rem);
          left: 0;
          right: 0;
          z-index: 90;
          background: rgb(255 255 255 / 60%);
          backdrop-filter: blur(var(--space-xs, 0.3125rem));
          padding: var(--space-s) var(--gutter);

          /* Hidden by default */
          opacity: 0;
          visibility: hidden;
          transform: translateY(-1rem);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            visibility 0s 0.3s;

          &.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            transition:
              opacity 0.3s ease,
              transform 0.3s ease;
          }

          .header-search-form {
            display: flex;
            align-items: center;
            gap: 0;
            max-width: 40rem;
            margin: 0 auto;
            border: 1px solid var(--color-border, #ddd);
            border-radius: var(--space-3xs, 0.25rem);
            overflow: hidden;
            background: var(--background-color-light, #fff);

            .header-search-input {
              flex: 1;
              padding: var(--space-2xs-xs, 0.5rem);
              border: none;
              font-size: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
              background: transparent;
              color: var(--color-text);

              &:focus {
                outline: none;
              }

              &::placeholder {
                color: var(--color-text-muted, #999);
              }
            }

            button[type='submit'] {
              padding: var(--space-2xs, 0.75rem);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: background 0.2s ease;

              &:hover {
                background: var(--background-color-link-hover, #f5f5f5);
              }

              svg {
                stroke: var(--color-link-navigation);
                stroke-width: 2px;
                width: 1.5rem;
                height: 1.5rem;
              }
            }
          }
        }
        ```

        Also update the `.misc` styles to include the search toggle button:

        ```css
        .misc {
          /* Cluster pattern for misc items */
          display: flex;
          align-items: center;
          gap: var(--space-s);

          /* Reset button styles for header buttons */
          button.search-icon-toggle,
          button[type='submit'] {
            background: transparent;
            box-shadow: none;
            padding: 0;
            border-radius: 0;
            backdrop-filter: none;

            &:hover {
              transform: none;
              background: transparent;
            }

            &:focus,
            &:focus-visible {
              outline: 2px solid var(--color-link-navigation);
              outline-offset: 2px;
              box-shadow: none;
            }
          }

          .search-icon-toggle {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--space-m-l);
            height: var(--space-m-l);
            transition: opacity 0.3s ease;

            svg {
              stroke: var(--color-link-navigation);
              stroke-width: 1px;
            }

            &.search-active {
              opacity: 0;
              pointer-events: none;
            }
          }
        }
        ```

        **Key features:**
        - Fixed positioning below the header
        - Smooth slide-down animation when opened
        - Glassmorphism effect with backdrop blur
        - Centered, max-width form for readability
        - Responsive fluid sizing
        - Search icon hidden on the search page itself

        ## Step 6: Add Header Search JavaScript

        Now we need to add the interactive behavior for the search overlay.

        ### Create header.js

        Create a new file at `lib/layouts/components/sections/header/header.js`:

        ```javascript
        /**
         * Header Component
         * Handles header search functionality
         */

        /**
         * Initialize header functionality when DOM loads
         */
        document.addEventListener('DOMContentLoaded', () => {
          initHeaderSearch();
        });

        /**
         * Initialize header search form
         * Handles search overlay toggle, form submission, and keyboard shortcuts
         */
        function initHeaderSearch() {
          const searchToggle = document.querySelector('.search-icon-toggle');
          const searchOverlay = document.querySelector('.header-search-overlay');
          const searchForm = document.querySelector('.header-search-form');
          const searchInput = document.querySelector('#header-search-input');

          if (!searchToggle || !searchOverlay || !searchForm || !searchInput) {
            return;
          }

          // Toggle search overlay visibility
          searchToggle.addEventListener('click', () => {
            const isActive = searchOverlay.classList.contains('active');

            if (isActive) {
              closeSearch();
            } else {
              openSearch();
            }
          });

          // Open search overlay
          function openSearch() {
            searchOverlay.classList.add('active');
            searchToggle.classList.add('search-active');
            searchToggle.setAttribute('aria-expanded', 'true');

            // Focus input after animation completes
            setTimeout(() => {
              searchInput.focus();
            }, 300);
          }

          // Close search overlay
          function closeSearch() {
            searchOverlay.classList.remove('active');
            searchToggle.classList.remove('search-active');
            searchToggle.setAttribute('aria-expanded', 'false');
            searchInput.value = '';
          }

          // Close search when clicking outside
          document.addEventListener('click', (e) => {
            const isClickInsideOverlay = searchOverlay.contains(e.target);
            const isClickOnToggle = searchToggle.contains(e.target);

            if (!isClickInsideOverlay && !isClickOnToggle && searchOverlay.classList.contains('active')) {
              closeSearch();
            }
          });

          // Close search on Escape key
          document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
              closeSearch();
            }
          });

          // Handle form submission
          searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const query = searchInput.value.trim();

            if (query.length === 0) {
              // Focus input if empty
              searchInput.focus();
              return;
            }

            // Redirect to search page with query parameter
            const searchURL = `/search/?q=${encodeURIComponent(query)}`;
            window.location.href = searchURL;
          });

          // Handle keyboard shortcut (Cmd/Ctrl + K) to open search
          document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              if (!searchOverlay.classList.contains('active')) {
                openSearch();
              }
            }
          });
        }
        ```

        **Key functionality:**
        - Opens overlay when clicking the search icon
        - Closes overlay when clicking outside, pressing Escape, or submitting
        - Keyboard shortcut (Cmd/Ctrl + K) opens search
        - Auto-focuses the input when overlay opens
        - Redirects to `/search/?q=query` on form submission
        - Proper ARIA attributes for accessibility

        ### Update header manifest.json

        Open `lib/layouts/components/sections/header/manifest.json` and add the JavaScript file to the scripts array:

        ```json
        {
          "name": "header",
          "type": "section",
          "styles": ["header.css"],
          "scripts": ["header.js"],
          "requires": ["branding", "navigation"]
        }
        ```

        This tells the bundler to include `header.js` when the header component is used.

        ## Step 7: Create the Search Results Page

        Now we need to create a dedicated page for displaying search results.

        ### Create search.md

        Create a new file at `src/search.md`:

        ```yaml
        ---
        layout: pages/sections.njk
        bodyClasses: 'search-page'
        hasHero: false

        seo:
          title: Search - Your Site Name
          description: 'Search the site for content, documentation, and guides.'
          socialImage: ''
          canonicalURL: ''
          keywords: 'search, find content'

        sections:
          - sectionType: hero
            containerTag: section
            classes: 'first-section'
            id: ''
            isDisabled: false
            isFullScreen: false
            isReverse: false
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
                isDark: false
                color: ''
                image: ''
                imageScreen: 'none'
            text:
              leadIn: ''
              title: Search Results
              titleTag: 'h1'
              subTitle: 'Search across all site content.'
            ctas:
              - url: ''
                label: ''
                isButton: false
                buttonStyle: 'primary'
            image:
              src: ''
              alt: ''
              caption: ''

          - sectionType: search-only
            containerTag: section
            classes: 'search-page-section'
            id: ''
            isDisabled: false
            isReverse: false
            containerFields:
              inContainer: true
              isAnimated: false
              noMargin:
                top: true
                bottom: false
              noPadding:
                top: false
                bottom: false
              background:
                color: ''
                image: ''
                imageScreen: 'none'
            title: ''
            subtitle: ''
            placeholder: 'Search the entire site...'
            settings:
              maxResults: 50
              minCharacters: 2
              enableHighlighting: true
              searchType: 'site'
        ---
        ```

        **Configuration explained:**
        - `bodyClasses: 'search-page'` - Allows CSS to hide the header search icon on this page
        - `sectionType: search-only` - Uses the search section component
        - `placeholder` - Text shown in the search input
        - `maxResults: 50` - Maximum number of results to display
        - `minCharacters: 2` - Minimum characters before searching begins
        - `enableHighlighting: true` - Highlights matched terms in results
        - `searchType: 'site'` - Searches across all site content

        ## Step 8: Download the search-only Section Component

        The search results page requires the `search-only` section component.

        ### Download the Component Package

        Visit the [search-only reference page](https://metalsmith-components.com/references/sections/search-only) and click the download button. This downloads a ZIP file containing:
        - `search-only.njk` - Section template
        - `search-only.css` - Section-specific styles
        - `manifest.json` - Component configuration
        - `search-only.yml` - Configuration examples
        - `README.md` - Documentation
        - `install.sh` - Installation script

        ### Install Using the Automated Script

        ```bash
        # Extract the component package
        unzip search-only.zip

        # Run the installation script
        ./search-only/install.sh
        ```

        The script will copy files to `lib/layouts/components/sections/search-only/`.

        ## Step 9: Build and Test

        Now let's test the complete search system.

        ### Start Development Server

        ```bash
        npm start
        ```

        This builds the site and starts the development server at `http://localhost:3000`.

        During the build, you should see:
        - The metalsmith-search plugin generating the search index
        - The bundler detecting both `search` and `search-only` components
        - CSS and JavaScript being bundled for both components

        ### Testing Checklist

        Test the following functionality:

        **Header Search Form:**
        1. **Visual Check** - The search icon appears in the header
        2. **Open Overlay** - Click the search icon, the overlay slides down smoothly, the input is auto-focused
        3. **Keyboard Shortcut** - Press Cmd/Ctrl + K, the overlay opens
        4. **Close Overlay** - Press Escape or click outside, the overlay closes
        5. **Submit Search** - Type "test" and press Enter, you should be redirected to `/search/?q=test`

        **Search Results Page:**
        1. **Page Loads** - Visit `/search/`, the page loads with a search input
        2. **URL Parameter** - Visit `/search/?q=test`, the search executes automatically with "test"
        3. **Search Works** - Type in the search input, results appear as you type
        4. **Highlighting** - Matched terms are highlighted in results
        5. **No Results** - Search for nonsense text, see "no results" message

        **Browser DevTools Check:**
        1. Open Console and verify no JavaScript errors
        2. Check Network tab for `/search-index.json` loading successfully
        3. Verify Fuse.js loads from CDN (only on search page)
        4. Inspect the search index structure in the Response tab

        ## Step 10: Troubleshooting

        If something isn't working, here are common issues and solutions:

        ### Search Icon Doesn't Appear

        - Verify `header.js` was created and added to manifest.json
        - Check that the search icon button was added to `header.njk`
        - Clear your browser cache and hard refresh
        - Restart the development server

        ### Overlay Doesn't Open

        - Open browser Console and check for JavaScript errors
        - Verify the class names match exactly: `search-icon-toggle`, `header-search-overlay`
        - Check that `header.js` is loading in the Network tab
        - Ensure the button has the correct click event listener

        ### Search Index Not Generated

        - Verify `metalsmith-search` is installed: `npm list metalsmith-search`
        - Check that the plugin is configured in `metalsmith.js`
        - Ensure the plugin is placed after the layouts plugin
        - Look for error messages during the build
        - Check if `build/search-index.json` exists after building

        ### Search Page Shows No Results

        - Verify the search index exists at `/search-index.json`
        - Open the search index in your browser to confirm it has entries
        - Check browser Console for Fuse.js loading errors
        - Verify the search component JavaScript is loading
        - Ensure the query parameter is being read correctly

        ### Fuse.js Doesn't Load

        - Check browser Console for CDN errors
        - Verify your internet connection (Fuse.js loads from CDN)
        - Try a different browser to rule out extensions blocking CDN
        - Check the CDN URL in `modules/helpers/load-fuse.js`

        ### Keyboard Shortcut Doesn't Work

        - Verify the keyboard event listener is in `header.js`
        - Try both Cmd (Mac) and Ctrl (Windows/Linux) keys
        - Ensure you're pressing the lowercase 'k' key
        - Check that another extension isn't capturing the same shortcut

        ## Understanding What Happened

        Let's review the key concepts you just implemented:

        ### Build-Time Index Generation

        The `metalsmith-search` plugin runs during the build process and creates a comprehensive search index. This happens once at build time, not on every page load, making searches fast and efficient.

        ### Header-Based Search Entry Point

        Rather than putting a search form on every page, you created a lightweight search icon in the header that opens an overlay. This provides quick access to search without cluttering your pages.

        ### Dedicated Search Results Page

        The actual search functionality lives on a dedicated page, keeping the header simple and the search feature powerful. The URL parameters make search results shareable.

        ### Two-Layer Search Algorithm

        The search uses Fuse.js for fuzzy matching (handles typos) and then applies strict filtering to eliminate false positives. This provides both flexibility and accuracy.

        ### Component-Based Architecture

        You used three components working together: the header component (with search form), the search partial (search UI and logic), and the search-only section (page wrapper). Each component is self-contained and reusable.

        ## Next Steps

        Now that you have working search functionality, consider these enhancements:

        ### Customize Search Weighting

        Adjust which fields are more important in search results by modifying the Fuse.js configuration in `search.js`. You can give higher weight to titles versus content.

        ### Add Search Analytics

        Track what users search for by adding analytics events when searches are performed. This helps you understand what content users are looking for.

        ### Enhance the Search Index

        Configure the metalsmith-search plugin to include additional metadata like categories, tags, or dates in the search index for more refined searching.

        ### Add Search Filters

        Create category or content-type filters on the search results page to help users narrow down results.

        ### Improve Mobile Experience

        Consider a full-screen search overlay on mobile devices for better usability on small screens.

        ## Summary

        Congratulations! You've successfully added a complete search system to your Metalsmith site. Here's what you accomplished:

        1. Installed and configured the metalsmith-search plugin
        2. Added a search toggle button to the header
        3. Created a search overlay form with animations
        4. Implemented search form JavaScript with keyboard shortcuts
        5. Created a dedicated search results page
        6. Installed the search component from the library
        7. Tested the complete search workflow

        ### Key Takeaways

        - **Build-time indexing** - Search index generated once during build, not on every request
        - **Progressive enhancement** - Form works even if JavaScript fails, redirecting to search page
        - **Keyboard accessibility** - Cmd/Ctrl + K provides quick access
        - **URL parameters** - Shareable search results via query strings
        - **Component composition** - Multiple components working together seamlessly
        - **Fuzzy matching** - Fuse.js handles typos and approximate matches

        ### Related Resources

        - [Search Component Documentation](/references/partials/search)
        - [Search-Only Section Documentation](/references/sections/search-only)
        - [metalsmith-search Plugin](https://www.npmjs.com/package/metalsmith-search)
        - [Fuse.js Documentation](https://fusejs.io/)
        - [Metalsmith2025 Starter Repository](https://github.com/wernerglinka/metalsmith2025-structured-content-starter)
        - [Metalsmith Components Library](https://github.com/wernerglinka/metalsmith-components)

        Happy searching!

  - sectionType: blog-navigation
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
---
