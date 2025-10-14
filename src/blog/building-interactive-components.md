---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building Interactive Components with JavaScript'
  description: 'Learn JavaScript patterns for interactive Metalsmith components. Master dynamic library loading, event handling, state management, and modular architecture without frameworks.'
  date: '2025-10-05'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample4.jpg'

seo:
  title: Building Interactive Components with JavaScript - Metalsmith
  description: 'Complete guide to JavaScript patterns in Metalsmith components. Learn module organization, dynamic loading, event handling, and building interactive components without frameworks.'
  socialImage: '/assets/images/sample4.jpg'
  canonicalURL: ''
  keywords: 'javascript components, metalsmith interactive, vanilla javascript, component patterns, event handling, state management, module loading, dynamic scripts'

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
        image: '/assets/images/sample4.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'JavaScript Patterns'
      title: Building Interactive Components
      titleTag: 'h1'
      subTitle: 'Vanilla JavaScript patterns for modern components'
      prose: 'Learn proven patterns for building interactive components without frameworks. From simple sliders to complex maps with multiple providers, discover how to write maintainable, performant JavaScript.'
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
      title: 'Why Vanilla JavaScript?'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Static sites don't need heavy frameworks. With modern JavaScript, you can build sophisticated interactive components using vanilla JS and ES modules.

        **Benefits:**
        - **Zero dependencies**: No framework to download
        - **Smaller bundles**: Only the code you actually use
        - **Browser-native**: Leverages platform features
        - **Future-proof**: Standards-based, not framework-dependent
        - **Performance**: No virtual DOM or runtime overhead

        This guide shows the patterns used in this component library's interactive components: sliders, image comparison, search, maps, and more.

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
      title: 'Component Lifecycle Pattern'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        All interactive components follow a consistent lifecycle:

        ```javascript
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', () => {
          // 1. Find component instances in the DOM
          const components = document.querySelectorAll('.your-component');

          // 2. Initialize each instance
          components.forEach(element => {
            initComponent(element);
          });
        });

        function initComponent(element) {
          // 3. Set up component state
          const state = {
            element,
            isActive: false,
            // ... other state
          };

          // 4. Set up event listeners
          setupEventListeners(state);

          // 5. Initial render/setup
          render(state);

          // 6. Return cleanup function (optional)
          return () => cleanup(state);
        }
        ```

        This pattern ensures:
        - Components initialize after DOM is ready
        - Multiple instances can coexist
        - Each instance has isolated state
        - Event listeners are properly attached

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
      title: 'Real Example: Slider Component'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The slider component demonstrates clean state management and navigation logic:

        ```javascript
        document.addEventListener('DOMContentLoaded', () => {
          const sliderElements = document.querySelectorAll('.slider-wrapper');

          sliderElements.forEach(sliderElement => {
            // Component state
            const slider = {
              element: sliderElement,
              slides: sliderElement.querySelectorAll('.slide'),
              pagination: sliderElement.querySelector('.slider-pagination'),
              currentSlide: 0
            };

            // Navigation functions
            const showNextSlide = () => {
              slider.currentSlide = (slider.currentSlide + 1) % slider.slides.length;
              updateSlider(slider);
            };

            const showPreviousSlide = () => {
              slider.currentSlide =
                (slider.currentSlide - 1 + slider.slides.length) % slider.slides.length;
              updateSlider(slider);
            };

            const showSlide = (slideIndex) => {
              slider.currentSlide = slideIndex;
              updateSlider(slider);
            };

            // Update UI based on state
            const updateSlider = (slider) => {
              // Update slide visibility
              slider.slides.forEach((slide, index) => {
                slide.classList.remove('is-selected');
                if (index === slider.currentSlide) {
                  slide.classList.add('is-selected');
                }
              });

              // Update pagination
              const buttons = slider.pagination.querySelectorAll('.slider-pagination-button');
              buttons.forEach((button, index) => {
                button.classList.toggle('active', index === slider.currentSlide);
                button.setAttribute('aria-disabled', index === slider.currentSlide);
              });
            };

            // Set up event listeners
            setupSliderListeners(slider, showNextSlide, showPreviousSlide, showSlide);

            // Initial state
            updateSlider(slider);
          });
        });
        ```

        **Key patterns:**
        - State object contains all component data
        - Pure functions handle state transitions
        - Single update function syncs UI with state
        - Event listeners trigger state changes

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
      title: 'Event Handling Best Practices'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Proper event handling prevents memory leaks and ensures good performance:

        **1. Event Delegation (for lists/collections):**
        ```javascript
        // Instead of attaching listeners to every button
        // Attach once to the container
        slider.pagination.addEventListener('click', (e) => {
          const button = e.target.closest('.slider-pagination-button');
          if (!button) return;

          const slideIndex = Array.from(buttons).indexOf(button);
          showSlide(slideIndex);
        });
        ```

        **2. Debouncing for frequent events:**
        ```javascript
        let debounceTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            handleResize();
          }, 250);
        });
        ```

        **3. Cleanup on component removal:**
        ```javascript
        const controller = new AbortController();

        element.addEventListener('click', handleClick, {
          signal: controller.signal
        });

        // Later, when removing component
        controller.abort(); // Removes all listeners
        ```

        **4. Passive listeners for scroll performance:**
        ```javascript
        window.addEventListener('scroll', handleScroll, {
          passive: true  // Improves scroll performance
        });
        ```

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
      title: 'Dynamic Library Loading Pattern'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        For components using external libraries (maps, search), load them dynamically to keep initial bundle size small:

        **The `loadScript()` helper:**
        ```javascript
        /**
         * Load JavaScript library from CDN
         * @param {string} src - Script source URL
         * @param {string} globalCheck - Global variable to check if loaded
         * @param {string} integrity - SRI hash (optional)
         * @returns {Promise} - Resolves when script is loaded
         */
        export const loadScript = (src, globalCheck, integrity = '') => {
          return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window[globalCheck]) {
              resolve();
              return;
            }

            const script = document.createElement('script');
            script.src = src;
            if (integrity) script.integrity = integrity;
            script.crossOrigin = 'anonymous';

            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));

            document.head.appendChild(script);
          });
        };
        ```

        **Using it in a component:**
        ```javascript
        import { loadScript } from './helpers/load-script.js';

        async function initSearchComponent() {
          try {
            // Load Fuse.js only when needed
            await loadScript(
              'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0',
              'Fuse',
              'sha384-...'
            );

            // Now use the library
            const fuse = new Fuse(data, options);
          } catch (error) {
            console.error('Failed to load search library:', error);
          }
        }
        ```

        **Benefits:**
        - Libraries only load when component is used
        - Deduplication (same library loaded once for multiple instances)
        - Error handling for network issues
        - Integrity checking for security

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
      title: 'Module Organization Pattern'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        For complex components, organize code into modules:

        ```
        maps/
        ├── maps.js              # Main entry point
        ├── maps.css
        ├── manifest.json
        └── modules/
            ├── providers/       # Provider implementations
            │   ├── leaflet.js
            │   └── openlayers.js
            └── helpers/         # Shared utilities
                ├── load-script.js
                ├── load-styles.js
                ├── maps-utils.js
                └── icon-loader.js
        ```

        **Main entry point** (`maps.js`):
        ```javascript
        import { loadScript } from './modules/helpers/load-script.js';
        import { initLeafletMap } from './modules/providers/leaflet.js';
        import { initOpenLayersMap } from './modules/providers/openlayers.js';

        document.addEventListener('DOMContentLoaded', () => {
          const mapElements = document.querySelectorAll('.maps-wrapper');

          mapElements.forEach(async (element) => {
            const provider = element.dataset.mapProvider;

            try {
              if (provider === 'leaflet') {
                await initLeafletMap(element);
              } else if (provider === 'openlayers') {
                await initOpenLayersMap(element);
              }
            } catch (error) {
              console.error('Map initialization failed:', error);
            }
          });
        });
        ```

        **Provider module** (`providers/leaflet.js`):
        ```javascript
        import { loadScript } from '../helpers/load-script.js';
        import { loadStyles } from '../helpers/load-styles.js';

        export async function initLeafletMap(element) {
          // Load Leaflet library
          await loadScript(
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
            'L'
          );
          await loadStyles(
            'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css'
          );

          // Initialize map with Leaflet API
          const mapData = JSON.parse(element.dataset.mapData);
          const map = L.map(element.querySelector('.map-container'));
          // ... Leaflet-specific setup
        }
        ```

        This organization:
        - Keeps related code together
        - Makes providers swappable
        - Shares helpers across providers
        - Simplifies testing and maintenance

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
      title: 'State Management Without Frameworks'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Complex components need state management. Here's a simple but effective pattern:

        ```javascript
        // Create component state object
        function createComponentState(element) {
          const state = {
            // DOM references
            element,
            handle: element.querySelector('.handle'),
            afterImage: element.querySelector('.after-image'),

            // State properties
            isDragging: false,
            currentPosition: 50,

            // Methods that modify state
            setDragging(value) {
              this.isDragging = value;
              this.render();
            },

            setPosition(value) {
              this.currentPosition = Math.max(0, Math.min(100, value));
              this.render();
            },

            // Render method syncs UI with state
            render() {
              this.afterImage.style.width = `${this.currentPosition}%`;
              this.handle.style.left = `${this.currentPosition}%`;
              this.handle.setAttribute('aria-valuenow', this.currentPosition);
            }
          };

          return state;
        }

        // Use the state
        const state = createComponentState(element);

        element.addEventListener('mousedown', () => {
          state.setDragging(true);
        });

        element.addEventListener('mousemove', (e) => {
          if (!state.isDragging) return;

          const rect = element.getBoundingClientRect();
          const position = ((e.clientX - rect.left) / rect.width) * 100;
          state.setPosition(position);
        });
        ```

        **Key principles:**
        - Single state object per instance
        - State changes through methods (not direct assignment)
        - Single render method updates all UI
        - Immutable-style updates prevent bugs

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
      title: 'Accessibility Patterns'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Interactive components must be accessible. Common patterns:

        **1. Screen reader announcements:**
        ```javascript
        const announceToScreenReader = (message) => {
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.setAttribute('aria-atomic', 'true');
          announcement.className = 'sr-only';
          announcement.style.cssText =
            'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';

          document.body.appendChild(announcement);
          announcement.textContent = message;

          setTimeout(() => {
            document.body.removeChild(announcement);
          }, 1000);
        };

        // Use it
        announceToScreenReader(`Now showing slide ${index + 1} of ${total}`);
        ```

        **2. Keyboard navigation:**
        ```javascript
        element.addEventListener('keydown', (e) => {
          switch(e.key) {
            case 'ArrowLeft':
              e.preventDefault();
              showPreviousSlide();
              break;
            case 'ArrowRight':
              e.preventDefault();
              showNextSlide();
              break;
            case 'Home':
              e.preventDefault();
              showSlide(0);
              break;
            case 'End':
              e.preventDefault();
              showSlide(slides.length - 1);
              break;
          }
        });
        ```

        **3. ARIA attributes:**
        ```javascript
        // Button states
        button.setAttribute('aria-pressed', isPressed);
        button.setAttribute('aria-disabled', isDisabled);
        button.setAttribute('aria-expanded', isExpanded);

        // Live regions
        status.setAttribute('aria-live', 'polite');
        status.setAttribute('aria-atomic', 'true');

        // Slider/range controls
        handle.setAttribute('role', 'slider');
        handle.setAttribute('aria-valuemin', '0');
        handle.setAttribute('aria-valuemax', '100');
        handle.setAttribute('aria-valuenow', currentValue);
        handle.setAttribute('aria-label', 'Image comparison');
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
      title: 'Performance Optimization'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Keep components performant with these techniques:

        **1. Intersection Observer (lazy initialization):**
        ```javascript
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              initComponent(entry.target);
              observer.unobserve(entry.target);
            }
          });
        });

        elements.forEach(el => observer.observe(el));
        ```

        **2. RequestAnimationFrame for animations:**
        ```javascript
        let animationFrame;

        function updatePosition(newPosition) {
          cancelAnimationFrame(animationFrame);

          animationFrame = requestAnimationFrame(() => {
            element.style.transform = `translateX(${newPosition}px)`;
          });
        }
        ```

        **3. Throttling expensive operations:**
        ```javascript
        let lastUpdate = 0;
        const throttleMs = 16; // ~60fps

        element.addEventListener('mousemove', (e) => {
          const now = Date.now();
          if (now - lastUpdate < throttleMs) return;

          lastUpdate = now;
          handleMouseMove(e);
        });
        ```

        **4. CSS for animations when possible:**
        ```javascript
        // Instead of animating with JS:
        element.style.left = position + 'px';

        // Use CSS transitions:
        element.classList.add('is-moving');
        // CSS handles the animation smoothly
        ```

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
      title: 'Error Handling and Resilience'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Components should gracefully handle errors:

        **1. Check for required elements:**
        ```javascript
        function initComponent(element) {
          const handle = element.querySelector('.handle');
          const target = element.querySelector('.target');

          if (!handle || !target) {
            console.warn('Component missing required elements', element);
            return null;
          }

          // Continue with initialization
        }
        ```

        **2. Try-catch for async operations:**
        ```javascript
        async function loadMapComponent() {
          try {
            await loadScript(mapLibraryUrl, 'MapLibrary');
            initMap();
          } catch (error) {
            console.error('Failed to load map:', error);
            showFallbackContent();
          }
        }
        ```

        **3. Fallback content:**
        ```javascript
        function showFallbackContent(element) {
          element.innerHTML = `
            <div class="fallback">
              <p>Unable to load interactive content.</p>
              <a href="${staticUrl}">View static version</a>
            </div>
          `;
        }
        ```

        **4. Feature detection:**
        ```javascript
        if ('IntersectionObserver' in window) {
          useLazyLoading();
        } else {
          loadAllImmediately();
        }
        ```

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
      title: 'Testing Interactive Components'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Test your components thoroughly:

        **1. Manual browser testing:**
        - Test in multiple browsers (Chrome, Firefox, Safari)
        - Test on mobile devices (touch events)
        - Test with keyboard only (tab, arrow keys, enter)
        - Test with screen reader (VoiceOver, NVDA)

        **2. Console debugging:**
        ```javascript
        // Add debug logging during development
        const DEBUG = true;

        function log(...args) {
          if (DEBUG) console.log('[Component]', ...args);
        }

        function initComponent(element) {
          log('Initializing component', element);
          // ...
        }
        ```

        **3. Test error conditions:**
        - Missing DOM elements
        - Invalid data
        - Network failures (block CDN in DevTools)
        - Rapid user interactions
        - Browser resize during interaction

        **4. Performance testing:**
        - Use DevTools Performance tab
        - Check for memory leaks
        - Monitor frame rate during animations
        - Test with many component instances

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
      title: 'Component Template'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Use this template as a starting point for new interactive components:

        ```javascript
        /**
         * Component Name
         * Brief description of what this component does
         */

        // Import any helpers
        import { loadScript } from '../helpers/load-script.js';

        // Wait for DOM
        document.addEventListener('DOMContentLoaded', () => {
          initComponents();
        });

        /**
         * Initialize all instances of this component
         */
        function initComponents() {
          const elements = document.querySelectorAll('.your-component');
          elements.forEach(element => initComponent(element));
        }

        /**
         * Initialize a single component instance
         * @param {HTMLElement} element - The component container
         */
        function initComponent(element) {
          // 1. Check for required elements
          const requiredElement = element.querySelector('.required');
          if (!requiredElement) {
            console.warn('Component missing required elements');
            return;
          }

          // 2. Create component state
          const state = {
            element,
            requiredElement,
            isActive: false
          };

          // 3. Set up event listeners
          setupEventListeners(state);

          // 4. Initial render
          render(state);
        }

        /**
         * Set up component event listeners
         */
        function setupEventListeners(state) {
          state.element.addEventListener('click', () => {
            state.isActive = !state.isActive;
            render(state);
          });
        }

        /**
         * Render component based on current state
         */
        function render(state) {
          state.element.classList.toggle('is-active', state.isActive);
          state.element.setAttribute('aria-expanded', state.isActive);
        }
        ```

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
        Building interactive components with vanilla JavaScript is straightforward when you follow proven patterns:

        - **Lifecycle**: Initialize on DOMContentLoaded, support multiple instances
        - **State management**: Single state object, update through methods, single render function
        - **Event handling**: Event delegation, debouncing, proper cleanup
        - **Module organization**: Separate providers and helpers for complex components
        - **Dynamic loading**: Load external libraries only when needed
        - **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
        - **Performance**: IntersectionObserver, RAF, CSS animations
        - **Error handling**: Graceful degradation and fallbacks

        These patterns scale from simple components (sliders) to complex ones (maps with multiple providers) without needing frameworks.

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
