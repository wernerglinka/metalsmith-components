---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

topMessage:
  text: 'This is an example top message bar. Try dismissing it!'
  link:
    url: '/references/'
    label: 'View the library'
  dismissible: true

card:
  title: 'Adding a Top Message Bar to Your Header'
  description: 'A step-by-step guide to adding a dismissible announcement bar above your header with cookie persistence and smooth animations'
  date: '2025-12-22'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample16.jpg'

seo:
  title: 'Adding a Top Message Bar to Your Metalsmith Site'
  description: 'Learn how to add a dismissible announcement bar above your header with cookie-based persistence, smooth animations, and dark mode support'
  socialImage: '/assets/images/sample16.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, top message, announcement bar, header, cookie persistence, dismissible, dark mode'

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
        image: '/assets/images/sample16.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'How-To Tutorial'
      title: 'Adding a Top Message Bar'
      titleTag: 'h1'
      subTitle: 'Dismissible announcements above your header'
      prose: 'Learn how to add a top message bar to your site for announcements, promotions, or important notices. The message is dismissible with cookie persistence and reappears when you change the content.'
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
        > **Using the Metalsmith2025 Starter?** This feature is already built in! Simply add the `topMessage` configuration to your page's frontmatter and it works out of the box. This tutorial is for those building from scratch or using a custom setup.

        ## What You'll Build

        By the end of this tutorial, you'll have a top message bar that:
        - Displays above the header with configurable text and optional link
        - Can be dismissed with a smooth height collapse animation
        - Remembers dismissal state via cookie (expires after 7 days)
        - Automatically reappears when message content changes
        - Supports dark mode with appropriate color tokens
        - Is configured per-page via frontmatter

        ## Understanding the Architecture

        The top message bar integrates directly into the header component rather than being a standalone component. This approach keeps the header and message tightly coupled for proper positioning and animation coordination.

        The implementation consists of three parts:
        - **Template (header.njk)**: Renders the message bar conditionally based on frontmatter
        - **Styles (header.css)**: Handles layout, animation, and theme support
        - **JavaScript (header.js)**: Manages dismiss functionality and cookie persistence

        ## Step 1: Add Design Tokens

        First, add the color tokens for the top message bar. This ensures proper theming support.

        ### Update _design-tokens.css

        Add the following tokens to your `:root` selector:

        ```css
        /* Top Message Bar */
        --color-top-message-background: #161616;
        --color-top-message-text: #f4f4f4;
        ```

        And add the corresponding dark mode tokens in `body.dark-theme`:

        ```css
        /* Top Message Bar */
        --color-top-message-background: #f4f4f4;
        --color-top-message-text: #161616;
        ```

        This provides a dark bar with light text in light mode, and a light bar with dark text in dark mode.

        ## Step 2: Update the Header Template

        Modify your header template to include the top message bar.

        ### Update header.njk

        Wrap your header in a container div and add the top message markup:

        ```liquid
        {% from "components/_partials/branding/branding.njk" import branding %}
        {% from "components/_partials/navigation/navigation.njk" import navigation %}

        <div class="header-wrapper{% if topMessage %} has-top-message{% endif %}">
          {% if topMessage %}
            <div class="top-message">
              <p class="top-message-text">
                {{ topMessage.text }}
                {% if topMessage.link %}
                  <a href="{{ topMessage.link.url }}">{{ topMessage.link.label }}</a>
                {% endif %}
              </p>
              {% if topMessage.dismissible !== false %}
                <button type="button" class="top-message-close" aria-label="Dismiss message">
                  {% include "icons/x.njk" %}
                </button>
              {% endif %}
            </div>
          {% endif %}

          <header>
              {% set link = '/' %}
              {% set img = { src: '/assets/images/logo.png', alt: 'Site Logo' } %}

              {{ branding( link, img ) }}
              {{ navigation( mainMenu, urlPath )}}
          </header>
        </div>
        ```

        Key elements:
        - `header-wrapper` contains both the message and header for coordinated positioning
        - `has-top-message` class enables CSS adjustments when message is present
        - `topMessage.dismissible !== false` allows non-dismissible messages (defaults to dismissible)
        - The close button uses an X icon (create one at `icons/x.njk` if needed)

        ### Create the X Icon

        If you don't have an X icon, create `lib/layouts/icons/x.njk`:

        ```html
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        ```

        ## Step 3: Add Header Styles

        Add the CSS for the top message bar to your header stylesheet.

        ### Update header.css

        Add these styles for the wrapper and top message:

        ```css
        /* Header wrapper - contains top-message and header */
        .header-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
        }

        /* Top Message Bar */
        .top-message {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-s);
          min-height: 2.5rem;
          max-height: 10rem; /* Allow for text wrapping on small screens */
          padding-block: var(--space-2xs);
          padding-inline: var(--gutter);
          padding-right: calc(var(--gutter) + 2rem); /* Room for close button */
          background: var(--color-top-message-background);
          color: var(--color-top-message-text);
          font-size: var(--font-xs, 0.875rem);
          overflow: hidden;
          transition:
            max-height 0.3s ease,
            min-height 0.3s ease,
            padding-block 0.3s ease;
        }

        .header-wrapper.is-dismissed .top-message {
          min-height: 0;
          max-height: 0;
          padding-block: 0;
        }

        .top-message-text {
          margin: 0;
          text-align: center;

          a {
            color: var(--color-top-message-text);
            text-decoration: underline;
            text-underline-offset: 2px;

            &:hover {
              text-decoration-thickness: 2px;
            }
          }
        }

        .top-message-close {
          position: absolute;
          right: var(--gutter);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          backdrop-filter: none;
          color: var(--color-top-message-text);
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 1;
            transform: none;
            background: transparent;
          }

          &:focus {
            outline: 2px solid var(--color-top-message-text);
            outline-offset: 2px;
            box-shadow: none;
          }

          svg {
            width: 1.25rem;
            height: 1.25rem;
            stroke: var(--color-top-message-text);
            stroke-width: 2;
          }
        }
        ```

        Note the close button styles explicitly reset properties that may be inherited from global button styles (background, box-shadow, border-radius, backdrop-filter). This ensures the button appears as a clean X icon.

        ### Adjust Related Elements

        If you have elements that position relative to the header (like a search overlay), you'll need to adjust them:

        ```css
        /* Adjust search overlay when top-message is present */
        .header-wrapper.has-top-message ~ .header-search-overlay {
          top: calc(clamp(3.25rem, 3.25rem + 1.75vw, 5rem) + 2.5rem);
        }

        /* Adjust search overlay when top-message is dismissed */
        .header-wrapper.has-top-message.is-dismissed ~ .header-search-overlay {
          top: clamp(3.25rem, 3.25rem + 1.75vw, 5rem);
        }
        ```

        You can also expose the top message height as a CSS custom property for page content adjustment:

        ```css
        /* Expose top-message height as CSS custom property */
        :root:has(.header-wrapper.has-top-message:not(.is-dismissed)) {
          --top-message-offset: 2.5rem;
        }

        :root:has(.header-wrapper.has-top-message.is-dismissed),
        :root:not(:has(.header-wrapper.has-top-message)) {
          --top-message-offset: 0rem;
        }
        ```

        ## Step 4: Add JavaScript Functionality

        Add the dismiss functionality and cookie persistence to your header JavaScript.

        ### Update header.js

        Add these constants and functions:

        ```javascript
        /**
         * Header Component
         * Handles mobile menu toggle, header search, and top message functionality
         */

        /** Cookie name for dismissed top message */
        const TOP_MESSAGE_COOKIE_NAME = 'topMessageDismissed';

        /** Cookie expiration in days */
        const TOP_MESSAGE_COOKIE_DAYS = 7;

        /**
         * Initialize header functionality when DOM loads
         */
        document.addEventListener('DOMContentLoaded', () => {
          initTopMessage();
        });

        /**
         * Initialize top message bar
         * Handles dismiss button and cookie persistence
         */
        function initTopMessage() {
          const headerWrapper = document.querySelector('.header-wrapper');
          const topMessage = document.querySelector('.top-message');
          const closeButton = document.querySelector('.top-message-close');

          if (!headerWrapper || !topMessage) {
            return;
          }

          // Check if message was previously dismissed
          const messageId = getMessageId();
          const isDismissed = getCookie(TOP_MESSAGE_COOKIE_NAME) === messageId;

          if (isDismissed) {
            // Hide immediately without animation
            headerWrapper.classList.add('is-dismissed');
            topMessage.style.display = 'none';
            return;
          }

          // Handle close button click
          if (closeButton) {
            closeButton.addEventListener('click', () => {
              dismissTopMessage(headerWrapper, messageId);
            });
          }
        }

        /**
         * Dismiss the top message with animation
         * @param {HTMLElement} headerWrapper - The header wrapper element
         * @param {string} messageId - Unique identifier for the message
         */
        function dismissTopMessage(headerWrapper, messageId) {
          headerWrapper.classList.add('is-dismissed');

          // Store dismissal in cookie with expiration
          setCookie(TOP_MESSAGE_COOKIE_NAME, messageId, TOP_MESSAGE_COOKIE_DAYS);
        }

        /**
         * Generate a simple hash from the message text for identification
         * This allows the message to reappear when content changes
         * @returns {string} Hash of the message content
         */
        function getMessageId() {
          const topMessage = document.querySelector('.top-message-text');
          if (!topMessage) {
            return 'default';
          }

          const text = topMessage.textContent.trim();
          let hash = 0;
          for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
          }
          return hash.toString();
        }

        /**
         * Set a cookie with expiration
         * @param {string} name - Cookie name
         * @param {string} value - Cookie value
         * @param {number} days - Days until expiration
         */
        function setCookie(name, value, days) {
          const expires = new Date();
          expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
          document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
        }

        /**
         * Get a cookie value by name
         * @param {string} name - Cookie name
         * @returns {string|null} Cookie value or null if not found
         */
        function getCookie(name) {
          const nameEQ = `${name}=`;
          const cookies = document.cookie.split(';');

          for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
              return decodeURIComponent(cookie.substring(nameEQ.length));
            }
          }
          return null;
        }
        ```

        Key implementation details:
        - **Content-based hash**: The `getMessageId()` function creates a hash from the message text, so changing the message content will make it reappear even if previously dismissed
        - **Cookie persistence**: Dismissed state is stored in a cookie that expires after 7 days
        - **Immediate hide on load**: If the message was dismissed, it's hidden immediately without animation to prevent a flash of content
        - **Smooth animation**: The dismiss animation uses CSS transitions on height and padding

        ## Step 5: Configure the Message in Frontmatter

        Add the top message configuration to any page's frontmatter.

        ### Update your page's frontmatter

        ```yaml
        ---
        layout: pages/sections.njk
        bodyClasses: 'home'
        hasHero: true

        topMessage:
          text: "New components available: pricing-table, team-grid, timeline, stats, and steps!"
          link:
            url: "/references/"
            label: "View the library"
          dismissible: true

        # ... rest of your frontmatter
        ---
        ```

        Configuration options:
        - `text` (required): The message text to display
        - `link` (optional): An object with `url` and `label` for an inline link
        - `dismissible` (optional): Set to `false` to hide the close button (defaults to `true`)

        ## Step 6: Build and Test

        Build your site and test the functionality.

        ### Testing Checklist

        1. **Message appears**: The top message bar shows above the header
        2. **Link works**: If configured, the link navigates correctly
        3. **Dismiss works**: Clicking the X closes the message with animation
        4. **Cookie persists**: Refresh the page - message should stay hidden
        5. **Cookie expires**: Clear cookies or wait 7 days - message reappears
        6. **Content change**: Change the message text and rebuild - message reappears
        7. **Dark mode**: Toggle dark mode - colors invert appropriately
        8. **Responsive**: On narrow screens, text wraps properly with padding

        ### Troubleshooting

        **Message doesn't appear:**
        - Verify `topMessage` is in the page frontmatter
        - Check that the template correctly checks for `{% if topMessage %}`
        - Ensure the page is using a layout that renders the header

        **Close button has background color:**
        - Add explicit style resets to `.top-message-close` (background, box-shadow, border-radius)
        - These override any global button styles

        **Cookie not being set:**
        - Ensure proper spacing in the cookie string: `; expires=` not `;expires=`
        - Check browser dev tools under Application > Cookies
        - Verify JavaScript is loading without errors

        **Animation jumps:**
        - Use min-height/max-height animation instead of height
        - Ensure padding-block is also animated to 0

        ## Summary

        You've successfully added a top message bar to your header with:

        - Per-page configuration via frontmatter
        - Optional dismiss functionality with smooth animation
        - Cookie-based persistence with 7-day expiration
        - Content-based identification so messages reappear when changed
        - Dark mode support with design tokens
        - Responsive text wrapping on small screens

        The implementation integrates directly into the header component rather than being standalone, which keeps positioning and animation coordinated. The cookie persistence uses a content hash, so updating your message automatically shows it to users who previously dismissed the old version.

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
