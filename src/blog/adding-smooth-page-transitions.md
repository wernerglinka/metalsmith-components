---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Adding Smooth Page Transitions with SWUP'
  description: 'Learn how to implement smooth, app-like page transitions in your Metalsmith site using SWUP. Includes component re-initialization patterns, prefetching for instant navigation, and backwards-compatible implementation.'
  date: '2026-01-07'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample1.jpg'
  tags:
    - page transitions
    - SWUP
    - JavaScript
    - performance
    - user experience

seo:
  title: Adding Smooth Page Transitions with SWUP - Metalsmith Components
  description: 'Complete guide to implementing smooth page transitions in Metalsmith sites using SWUP. Learn component re-initialization, prefetching, cleanup patterns, and backwards-compatible implementation.'
  socialImage: '/assets/images/sample1.jpg'
  canonicalURL: ''
  keywords: 'swup, page transitions, metalsmith, smooth navigation, prefetching, component lifecycle, spa-like navigation, static site'

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
        image: '/assets/images/sample1.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'User Experience'
      title: Smooth Page Transitions
      titleTag: 'h1'
      subTitle: 'App-like navigation for static sites'
      prose: 'Transform your static Metalsmith site into a smooth, app-like experience with SWUP. Learn how to implement page transitions, prefetch pages on hover, and properly re-initialize components after navigation.'
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
      title: 'Why Page Transitions?'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Traditional static sites reload the entire page on every navigation. This works fine, but users have come to expect the smooth, instant transitions they experience in single-page applications (SPAs).

        SWUP bridges this gap by intercepting link clicks, fetching pages in the background, and smoothly swapping content without a full page reload. The result is:

        - **Instant perceived navigation**: Pages appear to load instantly
        - **Smooth visual transitions**: Fade effects between pages
        - **Preserved state**: Scroll position, audio playback, and other state can persist
        - **Prefetching**: Hover over links to preload pages before clicking
        - **Better performance**: Only changed content is updated, not the entire page

        Best of all, SWUP is entirely progressive enhancement. If JavaScript fails to load or a user has it disabled, your site works exactly as it always did with traditional navigation.

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
      title: 'How SWUP Works'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        SWUP operates by:

        1. **Intercepting link clicks**: When a user clicks an internal link, SWUP prevents the default navigation
        2. **Fetching the new page**: The target page is fetched via AJAX in the background
        3. **Extracting content**: SWUP extracts content from designated containers
        4. **Animating the transition**: CSS animations fade out old content and fade in new content
        5. **Swapping content**: The old content is replaced with new content
        6. **Updating the URL**: The browser's address bar and history are updated
        7. **Firing lifecycle hooks**: Events are dispatched for components to respond to

        The key insight is that SWUP only replaces content inside designated containers. Elements outside these containers (like your header, footer, and navigation) remain untouched, providing visual continuity during transitions.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Installation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Install SWUP and its essential plugins:

        ```bash
        npm install swup @swup/head-plugin @swup/scroll-plugin @swup/preload-plugin
        ```

        **What each package does:**

        - **swup**: Core library for page transitions
        - **@swup/head-plugin**: Updates `<head>` tags (title, meta, styles) during transitions
        - **@swup/scroll-plugin**: Handles scroll position and smooth scrolling to anchors
        - **@swup/preload-plugin**: Prefetches pages on link hover for instant navigation

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Setting Up the HTML Structure'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        SWUP needs to know which content to replace during transitions. Wrap your main content in a container with a specific ID:

        ```html
        <!doctype html>
        <html>
          <head>...</head>
          <body>
            <!-- Header stays outside - won't be replaced -->
            <header>...</header>

            <!-- Main content container - SWUP replaces this -->
            <main class="transition-fade" id="swup">
              <!-- Page content goes here -->
              {% block body %}{% endblock %}
            </main>

            <!-- Footer stays outside - won't be replaced -->
            <footer>...</footer>

            <!-- SWUP initialization script -->
            <script src="/assets/page-transitions.js"></script>
          </body>
        </html>
        ```

        **Key points:**

        - The `id="swup"` attribute tells SWUP which container to swap
        - The `class="transition-fade"` enables CSS animations (you'll define these)
        - Everything outside `#swup` persists across page transitions
        - The breadcrumbs, if you have them, should be inside the SWUP container since they change per page

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'The Page Transitions Module'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Create a JavaScript module that initializes SWUP and provides a registry for component re-initialization:

        ```javascript
        /**
         * Page Transitions Module
         *
         * Implements smooth page transitions using SWUP.
         * Provides a registry for component initialization functions that need
         * to run after each page transition.
         */

        import Swup from 'swup';
        import SwupHeadPlugin from '@swup/head-plugin';
        import SwupScrollPlugin from '@swup/scroll-plugin';
        import SwupPreloadPlugin from '@swup/preload-plugin';

        /**
         * Registry of component initialization functions
         * @type {Map<string, Function>}
         */
        const componentRegistry = new Map();

        /**
         * Cleanup function registry for components that need teardown
         * @type {Map<string, Function>}
         */
        const cleanupRegistry = new Map();

        /**
         * Register a component's initialization function
         * @param {string} name - Unique component name
         * @param {Function} initFn - Initialization function to call
         */
        function registerComponent(name, initFn) {
          componentRegistry.set(name, initFn);
        }

        /**
         * Register a cleanup function for a component
         * @param {string} name - Unique component name
         * @param {Function} cleanupFn - Cleanup function to call before page transition
         */
        function registerCleanup(name, cleanupFn) {
          cleanupRegistry.set(name, cleanupFn);
        }

        /**
         * Initialize all registered components
         */
        function initAllComponents() {
          componentRegistry.forEach((initFn, name) => {
            try {
              initFn();
            } catch (error) {
              console.error(`Error initializing component "${name}":`, error);
            }
          });
        }

        /**
         * Run all registered cleanup functions
         */
        function cleanupAllComponents() {
          cleanupRegistry.forEach((cleanupFn, name) => {
            try {
              cleanupFn();
            } catch (error) {
              console.error(`Error cleaning up component "${name}":`, error);
            }
          });
        }

        /**
         * Initialize SWUP page transitions
         */
        function initSwup() {
          const swup = new Swup({
            containers: ['#swup'],
            animationSelector: '[class*="transition-"]',
            // Ignore download links and other non-HTML resources
            ignoreVisit: (url) => {
              const path = url.pathname || url;
              return /\.(zip|pdf|png|jpg|jpeg|gif|svg|webp|ico|mp3|mp4|webm)$/i.test(path);
            },
            plugins: [
              new SwupHeadPlugin({
                persistAssets: true,
                awaitAssets: true
              }),
              new SwupScrollPlugin({
                doScrollingRightAway: false,
                animateScroll: {
                  betweenPages: true,
                  samePageWithHash: true,
                  samePage: true
                },
                offset: 0
              }),
              new SwupPreloadPlugin({
                preloadHoveredLinks: true,
                preloadVisibleLinks: false,
                preloadInitialPage: true
              })
            ]
          });

          // Run cleanup before content is replaced
          swup.hooks.on('content:replace', () => {
            cleanupAllComponents();
          });

          // Re-initialize components after page transition completes
          swup.hooks.on('visit:end', () => {
            initAllComponents();
          });

          // Store swup instance on window for debugging
          window.swup = swup;

          return swup;
        }

        // Export registry functions for components to use
        window.PageTransitions = {
          registerComponent,
          registerCleanup
        };

        // Initialize SWUP when DOM is ready
        document.addEventListener('DOMContentLoaded', initSwup);
        ```

        **Important timing note:** We use the `visit:end` hook rather than `page:view` because `visit:end` fires after the transition animation completes. This ensures the new DOM content is fully rendered before components try to initialize.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'CSS Transition Styles'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        SWUP uses CSS for animations. Define your transition styles:

        ```css
        /**
         * Page transition animations
         * SWUP adds/removes 'is-animating' and 'is-leaving' classes
         */

        /* Base state - content visible */
        .transition-fade {
          opacity: 1;
          transition: opacity 0.25s ease-in-out;
        }

        /* During transition - content fades out/in */
        html.is-animating .transition-fade {
          opacity: 0;
        }

        /* Optional: different timing for leaving vs entering */
        html.is-leaving .transition-fade {
          transition-duration: 0.2s;
        }

        /* Prevent content flash during transition */
        html.is-animating {
          pointer-events: none;
        }
        ```

        You can create more elaborate transitions (slide, scale, etc.) by targeting different animation classes. The `animationSelector` option in SWUP config determines which elements receive animation classes.

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
      title: 'The Component Re-initialization Challenge'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Here's the key challenge with page transitions: JavaScript that runs on `DOMContentLoaded` only runs once - when the page first loads. After SWUP swaps in new content, that event doesn't fire again.

        This means components inside the SWUP container (sliders, accordions, search, etc.) won't initialize on the new page unless we explicitly re-run their initialization code.

        **The solution:** Components register their initialization functions with the PageTransitions registry. After each page transition, the registry calls all registered init functions.

        Components outside the SWUP container (header, footer, navigation) don't need to register because they're never replaced.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Making Components SWUP-Compatible'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Here's the pattern for making any component work with SWUP page transitions:

        ```javascript
        /**
         * Initialize the component
         */
        function initMyComponent() {
          const elements = document.querySelectorAll('.my-component');

          elements.forEach((element) => {
            // Prevent double-initialization
            if (element.dataset.initialized) return;
            element.dataset.initialized = 'true';

            // Component setup code here
            setupEventListeners(element);
            initializeState(element);
          });
        }

        /**
         * Register with PageTransitions if available (SWUP support)
         * This is optional - component works without SWUP too
         */
        if (window.PageTransitions) {
          window.PageTransitions.registerComponent('my-component', initMyComponent);
        }

        /**
         * Initialize on page load (traditional behavior)
         */
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initMyComponent);
        } else {
          initMyComponent();
        }
        ```

        **Key patterns:**

        1. **`data-initialized` attribute**: Prevents double-initialization if the component persists across transitions
        2. **Conditional registration**: `if (window.PageTransitions)` ensures backwards compatibility - the component works identically without SWUP
        3. **Immediate initialization check**: The `document.readyState` check handles cases where the script loads after DOM is ready

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Setting Up the Entry Point'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When using a bundler like esbuild, Webpack, or Rollup, the entry point script runs first. To ensure `PageTransitions` exists before any component tries to register, initialize it at the very top of your main entry file:

        ```javascript
        /**
         * Initialize PageTransitions registry at the very top of the entry point.
         * This ensures it exists before any component scripts try to register.
         */
        if (!window.PageTransitions) {
          const componentRegistry = new Map();
          const cleanupRegistry = new Map();

          window.PageTransitions = {
            registerComponent: (name, initFn) => componentRegistry.set(name, initFn),
            registerCleanup: (name, cleanupFn) => cleanupRegistry.set(name, cleanupFn),
            // Expose registries for page-transitions.js to use
            _componentRegistry: componentRegistry,
            _cleanupRegistry: cleanupRegistry
          };
        }

        // Rest of your main.js code...
        ```

        The `page-transitions.js` module then uses these existing registries when initializing SWUP:

        ```javascript
        // In page-transitions.js
        const componentRegistry = window.PageTransitions?._componentRegistry || new Map();
        const cleanupRegistry = window.PageTransitions?._cleanupRegistry || new Map();
        ```

        This approach is simpler than deferring registration - the registry exists from the start, so all components can register immediately without timing concerns.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Components with Cleanup Requirements'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Some components need cleanup before the page transitions away. This is essential for:

        - **Intervals/timeouts**: Auto-playing sliders, carousels
        - **Observers**: ResizeObserver, IntersectionObserver, MutationObserver
        - **Event listeners**: Window-level listeners like resize or scroll
        - **Media players**: Audio/video that should stop on navigation
        - **Third-party libraries**: Maps, charts, or other libraries that need disposal

        Here's the pattern for components with cleanup:

        ```javascript
        // Store references for cleanup
        let activeIntervals = [];
        let activeObservers = [];

        function initSlider() {
          const sliders = document.querySelectorAll('.slider');

          sliders.forEach((slider) => {
            if (slider.dataset.initialized) return;
            slider.dataset.initialized = 'true';

            // Auto-advance slides every 5 seconds
            const intervalId = setInterval(() => {
              advanceSlide(slider);
            }, 5000);

            // Track for cleanup
            activeIntervals.push(intervalId);

            // ResizeObserver for responsive behavior
            const observer = new ResizeObserver(() => {
              recalculateLayout(slider);
            });
            observer.observe(slider);

            // Track for cleanup
            activeObservers.push(observer);
          });
        }

        /**
         * Cleanup function - called before page transition
         */
        function cleanupSlider() {
          // Clear all intervals
          activeIntervals.forEach(id => clearInterval(id));
          activeIntervals = [];

          // Disconnect all observers
          activeObservers.forEach(observer => observer.disconnect());
          activeObservers = [];
        }

        // Register both init and cleanup
        if (window.PageTransitions) {
          window.PageTransitions.registerComponent('slider', initSlider);
          window.PageTransitions.registerCleanup('slider', cleanupSlider);
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initSlider);
        } else {
          initSlider();
        }
        ```

        Without proper cleanup, you'll experience:
        - Memory leaks from accumulating intervals/observers
        - Ghost callbacks trying to update removed DOM elements
        - Audio/video continuing to play after navigation
        - Performance degradation over time

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Real Example: Making main.js SWUP-Compatible'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Here's how we made the site's main.js file work with SWUP. This file handles theme switching, heading IDs, search term highlighting, and table wrappers:

        ```javascript
        /**
         * Initialize theme from localStorage
         */
        function initTheme() {
          const theme = localStorage.getItem('theme') || 'light';
          document.body.classList.toggle('dark-theme', theme === 'dark');
        }

        /**
         * Generate IDs for headings without them
         */
        function initHeadingIds() {
          const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

          headings.forEach(heading => {
            if (heading.id) return;

            const text = heading.textContent.trim();
            const slug = text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');

            if (slug) {
              heading.id = slug;
            }
          });
        }

        /**
         * Highlight search terms from URL parameters
         */
        function initHighlights() {
          const urlParams = new URLSearchParams(window.location.search);
          const highlightTerm = urlParams.get('highlight');

          if (highlightTerm && highlightTerm.trim().length >= 2) {
            highlightPageContent(highlightTerm.trim());
            showClearButton();
          }
        }

        /**
         * Wrap tables in scrollable containers
         */
        function initTableWrappers() {
          const tables = document.querySelectorAll('table');

          tables.forEach(table => {
            if (table.parentElement.classList.contains('table-scroll')) return;
            // ... wrapper creation code
          });
        }

        /**
         * Cleanup highlights before transition
         */
        function cleanupHighlights() {
          const clearBtn = document.getElementById('clear-highlights-btn');
          if (clearBtn) {
            clearBtn.remove();
          }
        }

        /**
         * Initialize all main.js functionality
         */
        function initMain() {
          initTheme();
          initHeadingIds();
          initHighlights();
          initTableWrappers();
        }

        // Register with page transitions for SWUP support
        if (window.PageTransitions) {
          window.PageTransitions.registerComponent('main', initMain);
          window.PageTransitions.registerCleanup('main', cleanupHighlights);
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initMain);
        } else {
          initMain();
        }
        ```

        The key refactor was extracting all the initialization logic from inline `DOMContentLoaded` callbacks into named functions, then calling them from a single `initMain()` function.

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
      title: 'Plugin Configuration Deep Dive'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Let's examine each SWUP plugin and its configuration options:

        **HeadPlugin** - Updates `<head>` content during transitions:

        ```javascript
        new SwupHeadPlugin({
          persistAssets: true,  // Keep script/style tags between pages
          awaitAssets: true     // Wait for new CSS to load before showing page
        })
        ```

        - `persistAssets: true` prevents re-downloading shared CSS/JS
        - `awaitAssets: true` prevents flash of unstyled content

        **ScrollPlugin** - Manages scroll behavior:

        ```javascript
        new SwupScrollPlugin({
          doScrollingRightAway: false,  // Wait for animation before scrolling
          animateScroll: {
            betweenPages: true,     // Smooth scroll to top on page change
            samePageWithHash: true, // Smooth scroll to anchors
            samePage: true          // Smooth scroll within same page
          },
          offset: 0  // Offset from top (useful for sticky headers)
        })
        ```

        **PreloadPlugin** - Prefetches pages for instant navigation:

        ```javascript
        new SwupPreloadPlugin({
          preloadHoveredLinks: true,   // Preload on hover (key feature!)
          preloadVisibleLinks: false,  // Don't preload all visible links
          preloadInitialPage: true     // Cache current page for back navigation
        })
        ```

        The `preloadHoveredLinks` option is the magic that makes navigation feel instant. When users hover over a link, the target page starts loading immediately.

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Excluding Non-HTML Resources'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        By default, SWUP intercepts all internal link clicks and tries to handle them as page transitions. This causes problems when clicking links to downloadable files (ZIP archives, PDFs) or direct media files, because SWUP expects HTML content with a `#swup` container.

        The `ignoreVisit` option tells SWUP which URLs to skip entirely, allowing the browser's default behavior:

        ```javascript
        const swup = new Swup({
          containers: ['#swup'],
          animationSelector: '[class*="transition-"]',
          // Ignore download links and other non-HTML resources
          ignoreVisit: (url) => {
            const path = url.pathname || url;
            return /\.(zip|pdf|png|jpg|jpeg|gif|svg|webp|ico|mp3|mp4|webm)$/i.test(path);
          },
          plugins: [...]
        });
        ```

        **How it works:**

        - SWUP calls `ignoreVisit` for every link click
        - The function receives the URL object for the target
        - Return `true` to skip SWUP handling (browser handles normally)
        - Return `false` to let SWUP handle the navigation

        **Common use cases:**

        - **Download links**: ZIP, PDF, DOCX, and other downloadable files
        - **Direct media**: Images, audio, and video files
        - **External resources**: Files that trigger browser downloads

        Without `ignoreVisit`, clicking a download button throws an error because SWUP fetches the file, can't find the `#swup` container in the binary content, and fails. With this configuration, download links work exactly as expected while page navigation remains smooth.

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
      title: 'SWUP Hooks Reference'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        SWUP provides several hooks for responding to different stages of the transition lifecycle:

        | Hook | When it fires | Common use case |
        |------|---------------|-----------------|
        | `visit:start` | Navigation begins | Show loading indicator |
        | `content:replace` | Before DOM swap | Run cleanup functions |
        | `content:scroll` | After scrolling | Adjust for fixed headers |
        | `page:view` | After content swap | Analytics tracking |
        | `visit:end` | Transition complete | Re-initialize components |

        We use `content:replace` for cleanup (runs before old content is removed) and `visit:end` for initialization (runs after transition animation completes and new content is stable).

        ```javascript
        // Example: Analytics tracking
        swup.hooks.on('page:view', () => {
          if (window.gtag) {
            gtag('event', 'page_view', {
              page_path: window.location.pathname
            });
          }
        });

        // Example: Loading indicator
        swup.hooks.on('visit:start', () => {
          document.body.classList.add('is-loading');
        });

        swup.hooks.on('visit:end', () => {
          document.body.classList.remove('is-loading');
        });
        ```

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Handling Multiple Layouts'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Sites often have multiple page layouts - for example, a default layout and a sidebar layout for documentation pages. SWUP only replaces content inside its container (`#swup`), so elements outside the container (like a sidebar) persist during transitions.

        This creates a problem: navigating from a sidebar page to a non-sidebar page leaves the sidebar visible because SWUP only swapped the main content.

        **The Solution: Detect Layout Changes**

        The cleanest approach is to detect when the layout changes and force a full page reload. SWUP provides access to the incoming page's document before the transition completes:

        ```javascript
        /**
         * Check if a page has the sidebar layout
         */
        function hasSidebarLayout(doc) {
          return doc.body.classList.contains('with-sidebar');
        }

        // Inside initSwup():
        swup.hooks.on('page:view', (visit) => {
          const currentHasSidebar = hasSidebarLayout(document);
          const newHasSidebar = hasSidebarLayout(visit.to.document);

          if (currentHasSidebar !== newHasSidebar) {
            // Layout changed - force full page reload
            window.location.href = visit.to.url;
            return;
          }
        });
        ```

        This gives you the best of both worlds:
        - **Same layout transitions**: Smooth SWUP animations (sidebar→sidebar, default→default)
        - **Cross-layout transitions**: The current page fades out, then a full reload brings in the new layout

        The fade-out before reload creates a pleasant effect - it feels intentional rather than jarring, providing a graceful handoff between layout types.

        **Layout Setup**

        Each layout template needs the SWUP container on its main content area:

        ```html
        {# default.njk #}
        <body class="{{ bodyClasses }}">
          {% include "header.njk" %}
          <main class="transition-fade" id="swup">
            {{ content }}
          </main>
          {% include "footer.njk" %}
        </body>

        {# with-sidebar.njk #}
        <body class="with-sidebar {{ bodyClasses }}">
          {% include "header.njk" %}
          <aside class="sidebar">...</aside>
          <main class="transition-fade" id="swup">
            {{ content }}
          </main>
        </body>
        ```

        The `with-sidebar` class on the body element is what the layout detection checks for.

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
      title: 'Backwards Compatibility'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        One of the best aspects of this implementation is complete backwards compatibility. Sites using these components can choose whether to include SWUP - the components work identically either way.

        The magic is in the conditional check:

        ```javascript
        if (window.PageTransitions) {
          window.PageTransitions.registerComponent('my-component', initMyComponent);
        }
        ```

        **Without SWUP:**
        - `window.PageTransitions` is `undefined`
        - The conditional is skipped
        - Component initializes on `DOMContentLoaded` as usual
        - Traditional full-page navigation occurs

        **With SWUP:**
        - `window.PageTransitions` exists
        - Component registers its init function
        - Init runs on initial load AND after each page transition
        - Smooth transitions occur between pages

        This means you can:
        - Add SWUP to existing sites without modifying components
        - Remove SWUP later without breaking anything
        - Use the same components in projects with or without SWUP

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
      title: 'Debugging Tips'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When implementing SWUP, you may encounter issues. Here's how to debug common problems:

        **Component not initializing after transition:**
        - Check if the component is inside the `#swup` container
        - Verify the component registered with `PageTransitions.registerComponent()`
        - Add console.log to your init function to confirm it's being called
        - Check browser console for errors during initialization
        - Ensure `PageTransitions` registry is initialized at the top of your entry point (see "Setting Up the Entry Point" section)

        **Content flashing or jumping:**
        - Ensure CSS transitions have `opacity: 0` for `.is-animating` state
        - Check that `awaitAssets: true` is set on HeadPlugin
        - Verify transition timing in CSS matches SWUP animation duration

        **Memory leaks / performance degradation:**
        - Components with intervals, observers, or global event listeners need cleanup functions
        - Register cleanup with `PageTransitions.registerCleanup()`
        - Check for accumulating listeners with browser DevTools

        **SWUP instance access for debugging:**
        ```javascript
        // The SWUP instance is stored on window
        console.log(window.swup);

        // Check registered hooks
        console.log(window.swup.hooks);

        // Manually trigger navigation (for testing)
        window.swup.navigate('/some-page/');
        ```

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
      title: 'Integration Checklist'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Follow this checklist when adding SWUP to your Metalsmith site:

        **1. Install packages:**
        ```bash
        npm install swup @swup/head-plugin @swup/scroll-plugin @swup/preload-plugin
        ```

        **2. Update your layout template:**
        - Add `id="swup"` and `class="transition-fade"` to your main content container
        - Ensure header/footer are outside the SWUP container
        - Move any per-page elements (breadcrumbs) inside the SWUP container

        **3. Create the page-transitions module:**
        - Set up SWUP with plugins
        - Configure `ignoreVisit` to exclude download links and media files
        - Create the component registry
        - Hook into `content:replace` for cleanup
        - Hook into `visit:end` for re-initialization

        **4. Add CSS transitions:**
        - Define `.transition-fade` base styles
        - Define `.is-animating` state styles

        **5. Update components:**
        - Extract initialization into named functions
        - Add `data-initialized` checks to prevent double-init
        - Register with `PageTransitions.registerComponent()` if available
        - Add cleanup functions for components with intervals/observers

        **6. Test thoroughly:**
        - Navigate between pages, check component initialization
        - Use browser back/forward buttons
        - Test search highlighting and other URL-based features
        - Verify no console errors during navigation
        - Check for memory leaks with DevTools

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
      title: 'Summary'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        SWUP transforms static Metalsmith sites into smooth, app-like experiences:

        - **Instant navigation**: Prefetching on hover makes pages load before users click
        - **Smooth transitions**: CSS animations provide visual continuity between pages
        - **Component re-initialization**: Registry pattern ensures JavaScript components work after transitions
        - **Proper cleanup**: Cleanup functions prevent memory leaks and ghost callbacks
        - **Backwards compatible**: Components work identically with or without SWUP

        The implementation requires careful attention to component lifecycle - initialization must be idempotent, cleanup must be thorough, and the `visit:end` hook timing is critical. But once set up, users enjoy a dramatically improved browsing experience.

        All components in this library are SWUP-compatible out of the box. Whether you choose to enable page transitions is entirely up to you - the components adapt automatically.

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
