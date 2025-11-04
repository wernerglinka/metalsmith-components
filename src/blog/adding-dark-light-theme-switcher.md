---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Adding Dark/Light Theme Switcher'
  description: 'A step-by-step guide to adding a dark/light theme toggle from the Metalsmith Components library to your starter project'
  date: '2025-10-30'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample10.jpg'

seo:
  title: 'Adding Dark/Light Theme Switcher to Your Metalsmith Site'
  description: 'Complete beginner-friendly guide to adding a dark/light theme switcher component to the Metalsmith2025 Structured Content Starter'
  socialImage: '/assets/images/sample10.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, dark mode, theme switcher, how-to tutorial, component integration'

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
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'How-To Tutorial'
      title: 'Adding Dark/Light Theme Switcher'
      titleTag: 'h1'
      subTitle: 'From library to starter in 9 steps'
      prose: 'Learn how to add a complete dark/light theme system to your Metalsmith site by importing a component from the library and integrating it with your existing header. This beginner-friendly guide walks through every step.'
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

        By the end of this tutorial, you'll have a working theme switcher that:
        - Toggles between light and dark modes with a single click
        - Persists the user's theme preference in localStorage
        - Shows appropriate sun/moon icons based on current theme
        - Works seamlessly with your existing site design

        ## Prerequisites

        Before starting, make sure you have:
        - The [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) set up and running
        - Access to the [Metalsmith Components library](https://github.com/wernerglinka/metalsmith-components) (either cloned locally or downloaded)
        - Basic understanding of HTML, CSS, and JavaScript
        - A code editor and terminal access

        ## Understanding the Component Architecture

        The theme switcher is a **partial component** - a small, reusable UI element that can be embedded in larger sections. In Metalsmith's component-based architecture, components are self-contained with their own:
        - Template file (`.njk`) - defines the HTML structure
        - Styles (`.css`) - component-specific styling
        - Scripts (`.js`) - interactive behavior
        - Manifest (`manifest.json`) - defines dependencies and metadata

        The component bundling system automatically includes only the CSS and JavaScript needed for components you actually use, keeping your site lean and fast.

        ## Step 1: Download the Theme Switcher Component

        First, download the `dark-light-theme-switcher` component package from the component library.

        ### Download the Component Package

        Visit the [dark-light-theme-switcher reference page](https://metalsmith-components.com/references/partials/dark-light-theme-switcher) and click the download button at the bottom of the page. This downloads a ZIP file containing:
        - `dark-light-theme-switcher.njk` - The Nunjucks template
        - `dark-light-theme-switcher.css` - Component styles
        - `dark-light-theme-switcher.js` - Toggle functionality
        - `manifest.json` - Component configuration
        - `dark-light-theme-switcher.yaml` - Configuration examples
        - `README.md` - Component documentation
        - `install.sh` - Automated installation script

        ### Install Using the Automated Script
        - After downloading the zip file move it to the project root directory
        - Then navigate to the project root directory
        - Extract the package
        - Run the installation script:

        ```bash
        # Navigate to your project's partials directory
        cd /path/to/your/project root

        # Extract the component package
        unzip dark-light-theme-switcher.zip

        # Run the installation script
        ./dark-light-theme-switcher/install.sh ..
        ```

        **Note:** For section components, use `lib/layouts/components/sections/` instead.

        The installation script will:
        1. Verify you're in a Metalsmith project directory
        2. Check for existing installations and compare versions
        3. Validate that required dependencies are installed
        4. Copy component files to `lib/layouts/components/_partials/dark-light-theme-switcher/`
        5. Report any missing dependencies with download links

        ### Handle Missing Dependencies

        The theme switcher requires the `icon` partial component to display the moon and sun icons. The Metalsmith2025 Structured Content Starter already includes this component, so the installation will complete successfully without any warnings. You can proceed to Step 2.

        ## Step 2: Understanding the Component Files

        Let's look at what each file does.

        ### The Template
        `dark-light-theme-switcher.njk`

        This file defines a Nunjucks macro that creates the toggle button. It imports the icon macro for displaying SVG icons, creates a button with both moon (for light mode) and sun (for dark mode) icons, uses semantic HTML with proper ARIA labels for accessibility, and the `js-theme-toggle` class is used for JavaScript targeting.

        ### The JavaScript
        `dark-light-theme-switcher.js`

        This handles the toggle interaction. The script waits for the DOM to load, finds the toggle button, toggles the `dark-theme` class on `<body>` when clicked, and saves the preference to localStorage.

        **Note:** You'll need to add theme restoration code to your `main.js` file in Step 7 to read from localStorage and apply the saved theme on page load.

        ### The Styles
        `dark-light-theme-switcher.css`

        Component-specific styling that shows the moon icon by default and switches to the sun icon when dark mode is active.

        ## Step 3: Verify Required Dependencies

        The theme switcher requires two things that are already included in the Metalsmith2025 Structured Content Starter:

        ### Icon Partial Component

        The `icon` partial component is already installed in the starter at `lib/layouts/components/_partials/icon/`. This component renders SVG icons from the icon library.

        ### Moon and Sun Icons

        The required moon and sun icons are already available in the starter's icon library at `lib/layouts/icons/moon.njk` and `lib/layouts/icons/sun.njk`. The starter includes a complete set of 299 Feather icons.

        ## Step 4: Integrate with Your Header

        Now we need to add the theme switcher to your site's header component.

        ### Update header.njk

        Open your header template at `lib/layouts/components/sections/header/header.njk`. It will look something like this:

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

        Include the theme switcher partial in your header markup. Then add the theme switcher macro in a new div with class `misc`

        ```liquid
        {% from "components/_partials/branding/branding.njk" import branding %}
        {% from "components/_partials/navigation/navigation.njk" import navigation %}
        {% from "components/_partials/dark-light-theme-switcher/dark-light-theme-switcher.njk" import darkLightThemeSwitcher %}

        <header>

            {% set link = '/' %}
            {% set img = { src: '/assets/images/metalsmith2025-logo-bug.png', alt: 'Metalsmith Starter' } %}

            {{ branding( link, img ) }}

            {{ navigation( mainMenu, urlPath )}}

            <div class="misc">
              {{ darkLightThemeSwitcher() }}
            </div>
        </header>

        ```

        ### Update header manifest.json

        Open `lib/layouts/components/sections/header/manifest.json`

        Add `"dark-light-theme-switcher"` to the `requires` array. This tells the bundler to include the theme switcher's CSS and JavaScript when the header is used.

        ## Step 5: Style the Header Layout

        `header.css` already includes styles for the theme switcher and a search form.

        Open `lib/layouts/components/sections/header/header.css`

        The header styles create a horizontal layout with the logo on the left, navigation in the middle, and theme switcher on the right. Change the styles as needed for your implementation.

        ## Step 6: Add Dark Mode CSS Variables

        Now we need to define the color scheme for dark mode.

        ### Understanding CSS Custom Properties for Theming

        The starter uses CSS custom properties (variables) for colors, making theme switching straightforward. We just need to redefine these variables when the `dark-theme` class is present on the `<body>`.

        ### Add Dark Mode Styles

        Open your main CSS file at `lib/assets/styles/_design-tokens.css`

        At the end of the file, add the dark theme styles. Here's an example from the Metalsmith Components library:

        ```css
        /* Dark Theme */
        body.dark-theme {
          /* Core Colors */
          --color-primary: #ff6b6b;
          --color-secondary: #ff8787;
          --color-text: #e5e5e5;
          --color-text-light: #161616;
          --color-text-dark: #999;
          --color-text-highlight: #ffa94d;
          --color-text-highlight-light: #ffc078;
          --color-text-inactive: #888;

          /* Link Colors */
          --color-link-inactive: #aaa;
          --color-link-in-path: #999;
          --background-color-link-hover: rgb(255 255 255 / 10%);
          --color-pagination-active: #ccc;

          /* Background Colors */
          --color-background: #1a1a1a;
          --color-background-light: #2d2d2d;
          --color-highlight-background: #4a3020;
          --color-dark-background: #0d0d0d;

          /* Borders and Shadows */
          --color-border-light: #404040;
          --color-border: #e0e0e0;
          --color-shadow: 0px 0px 20px 3px rgb(0 0 0 / 50%);

          /* Interactive Surface Colors */
          --color-surface-hover: rgb(255 255 255 / 5%);
          --color-surface-focus: rgb(255 255 255 / 8%);
          --color-icon-default: #999;

          /* Code Syntax Highlighting */
          --code-bg: #2d2d2d;
          --code-text: #e5e5e5;
          --code-selection-bg: #4a4a4a;
          --token-comment: #8e9aaf;
          --token-punctuation: #b3b3b3;
          --token-property: #ff8787;
          --token-string: #a8e6a1;
          --token-function: #ff6b9d;
          --token-keyword: #66b3ff;
        }
        ```

        **Key Points:**
        - Redefine only the color variables that need to change for dark mode
        - Keep button colors consistent unless you want different styling in dark mode
        - Use lighter text colors (`#e5e5e5`) on darker backgrounds (`#1a1a1a`)
        - Adjust syntax highlighting colors for better readability on dark backgrounds
        - The primary and secondary brand colors can be adjusted for better contrast

        ### Customize for Your Design

        You can adjust these values to match your brand colors and design preferences. The example above uses:
        - A dark charcoal background (`#1a1a1a`) instead of pure black for reduced eye strain
        - Slightly desaturated accent colors for better dark mode aesthetics
        - Adjusted shadow opacity for visibility on dark backgrounds

        ## Step 7: Add Theme Persistence

        The component's JavaScript saves the theme preference to localStorage when toggled, but we need to restore that preference when the page loads.

        ### Update main.js

        Open `lib/assets/main.js`

        Add this code to restore the saved theme on page load:

        ```javascript
        /**
         * Theme switcher - restore saved theme preference
         */
        document.addEventListener('DOMContentLoaded', () => {
          const theme = localStorage.getItem('theme') || 'light';
          document.body.classList.toggle('dark-theme', theme === 'dark');
        });
        ```

        **How it works:**
        - Runs when the DOM is ready
        - Reads the saved theme from localStorage (defaults to 'light' if none saved)
        - Applies the `dark-theme` class to `<body>` if the saved theme is 'dark'
        - This executes before the page fully renders, preventing flash of wrong theme

        ## Step 8: Build and Test

        Now let's test the theme switcher in development mode.

        ### Start Development Server

        ```bash
        npm start
        ```

        This command builds the site and starts the development server with watch mode and live reloading at `http://localhost:3000`.

        During the build, the bundler will:
        - Detect that the header component requires `dark-light-theme-switcher`
        - Include the theme switcher's CSS and JavaScript in the bundle
        - Include the icon component (a dependency of the theme switcher)
        - Process all CSS through PostCSS

        **Note:** For production builds, use `npm run build` followed by `npm run serve` to preview the production site.

        ### Testing Checklist

        Open your browser and test:

        1. **Visual Check** - The theme toggle button appears in the header and shows a moon icon initially
        2. **Toggle Functionality** - Click the toggle button, the page should switch to dark mode, the icon should change from moon to sun, and colors should update throughout the page
        3. **Persistence** - Refresh the page, the dark theme should remain active, navigate to another page, the theme preference should persist
        4. **Switch Back** - Click the toggle again, the page should return to light mode
        5. **Browser DevTools Check** - Open DevTools and check the Console for any errors, inspect the `<body>` element and verify the `dark-theme` class toggles, and check Application → Local Storage to see the `theme` value

        ## Step 9: Troubleshooting

        If something isn't working, here are common issues and solutions:

        ### Theme Switcher Button Doesn't Appear

        - Verify the component files were copied to `lib/layouts/components/_partials/dark-light-theme-switcher/`
        - Check that the theme switcher macro was added to `header.njk`
        - Make sure the import statement is at the top of the file
        - If you made changes while the dev server was running, the page should auto-reload. If not, restart the development server (stop and run `npm start` again)

        ### Icons Not Showing

        - Verify icon template files exist in `lib/layouts/icons/` (specifically `moon.njk` and `sun.njk`)
        - Check that the `icon` partial component exists in `lib/layouts/components/_partials/icon/`
        - Open browser DevTools and check for 404 errors in the Console
        - Verify the icon file names match exactly (case-sensitive)

        ### Clicking Does Nothing

        - Open browser Console and check for JavaScript errors
        - Verify `dark-light-theme-switcher.js` was copied correctly
        - Confirm the button has the class `js-theme-toggle`
        - Check that the component bundler processed the JavaScript file
        - Try a hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)

        ### Dark Mode Styles Don't Apply

        - Verify you added the dark theme CSS variables to `lib/assets/styles/_design-tokens.css`
        - Check that custom properties use consistent naming (e.g., `--color-*`)
        - Inspect an element in DevTools to see which CSS variables are applied
        - Make sure your components use CSS variables, not hardcoded colors
        - Check that the `dark-theme` class is being added to `<body>` when toggling

        ### Theme Doesn't Persist

        - Verify you added the theme restoration code to `main.js` in Step 7
        - Check that `main.js` is being bundled correctly (look in browser DevTools Network tab)
        - Open browser Console and check for localStorage errors
        - Ensure localStorage is enabled in your browser settings
        - Try in an incognito/private window to rule out browser extensions interfering

        ## Understanding What Happened

        Let's review the key concepts you just implemented:

        ### Component-Based Architecture

        You copied a self-contained component with all its files (template, styles, scripts, manifest). This is the core principle of the Metalsmith Components library - everything a component needs travels together.

        ### Dependency Management

        By updating the header's `manifest.json` to include `dark-light-theme-switcher` in its `requires` array, you told the bundler to automatically include the theme switcher's assets. The bundler then traced that component's dependencies (the `icon` component) and included those too.

        ### Automatic Asset Bundling

        The `metalsmith-bundled-components` plugin scanned your pages to find which components are used, found that pages use the `header` section, saw that `header` requires `dark-light-theme-switcher`, bundled the theme switcher's CSS and JavaScript, applied PostCSS processing (autoprefixer, minification), and generated optimized bundles with no unused code.

        ### CSS Custom Properties for Theming

        Using CSS variables (custom properties) makes theming elegant. When you toggle the `dark-theme` class, all elements using these variables automatically update.

        ## Next Steps

        Now that you have a working theme switcher, consider these enhancements:

        ### Add System Preference Detection

        Respect the user's operating system theme preference by checking `window.matchMedia('(prefers-color-scheme: dark)')` if no saved preference exists.

        ### Add Smooth Transitions

        Make theme changes smoother with CSS transitions on background-color, color, and border-color properties.

        ### Expand Dark Mode Coverage

        Review all your components and ensure they work well in dark mode: forms and inputs, cards and borders, images (consider using different images for dark mode), shadows and overlays, and code blocks with syntax highlighting.

        ## Summary

        Congratulations! You've successfully added a dark/light theme switcher to your Metalsmith site. Here's what you accomplished:

        1. Downloaded and installed the theme switcher component from the library
        2. Verified required dependencies (icon component and icons) were already in the starter
        3. Integrated the switcher with your header component
        4. Updated the header's manifest to declare dependencies
        5. Styled the header layout to position the theme switcher
        6. Added dark mode CSS variables
        7. Added theme persistence code to `main.js`
        8. Tested the complete functionality

        ### Key Takeaways

        - **Components are portable**: You copied files from one project to another and they just worked
        - **Dependencies are explicit**: The manifest system makes requirements clear
        - **Bundling is automatic**: The build system handles asset management
        - **CSS variables enable theming**: Redefining variables is cleaner than overriding rules
        - **localStorage enables persistence**: User preferences survive page refreshes

        ### Related Resources

        - [Component Structure Documentation](/references/partials/dark-light-theme-switcher)
        - [Working with Partials Guide](/blog/building-interactive-components)
        - [Theming Architecture](/blog/theming-architecture)
        - [Metalsmith2025 Starter Repository](https://github.com/wernerglinka/metalsmith2025-structured-content-starter)
        - [Metalsmith Components Library](https://github.com/wernerglinka/metalsmith-components)

        Happy theming!

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
