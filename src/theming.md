---
layout: pages/sections.njk
bodyClasses: 'documentation-page'
title: Theming

seo:
  title: Theming Architecture - Dark Mode Implementation for Metalsmith Components
  description: 'Comprehensive guide to implementing dark mode in component-based static sites. Learn about semantic color tokens, adaptive vs. design choice sections, and component-level theme considerations.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'dark mode, theming, CSS variables, semantic tokens, component architecture, metalsmith theming, dark theme implementation'

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
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample23.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Theming Architecture'
      title: 'Theming'
      titleTag: 'h1'
      subTitle: 'Dark Mode Implementation for Component-Based Sites'
      prose: 'A guide of how we implemented dark mode for this component-based static site, covering semantic color tokens, adaptive sections, and practical patterns for building theme-aware components.'
    ctas:
      - url: '#philosophy'
        label: 'Get Started'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'philosophy'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Theming Philosophy'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Core Principles

        Our theming system is built on three fundamental principles:

        1. **Semantic Color Tokens** - Colors are defined by their purpose, not their appearance
        2. **Build-time vs Runtime** - Understanding when design decisions are made vs. when themes are applied
        3. **Component Cooperation** - Components must actively participate in theming, not just receive it passively

        ### Adaptive vs. Design Choice

        A critical distinction in our theming system is between **adaptive sections** and **design choices**:

        **Adaptive Sections** naturally adjust to feel appropriate in both themes:
        - Sections without explicit `isDark: true` configuration
        - Text and background colors automatically invert with theme
        - Screen overlays (light/dark) invert to maintain proper contrast

        **Design Choices** maintain their intentional styling regardless of theme:
        - Sections with `isDark: true` are deliberate design decisions
        - These sections stay "dark" in both light and dark themes
        - They don't invert because they represent the designer's intent

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'design-tokens'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Design Tokens System'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Semantic Variables

        The foundation of our theming system is semantic CSS variables defined in `_design-tokens.css`:

        ```css
        /* Light theme (default) */
        :root {
          --color-text: #161616;
          --color-text-light: #f4f4f4;
          --color-background: #fff;
          --color-background-light: #f4f4f4;

          /* Contrast colors - automatically select appropriate contrast */
          --contrast-text-on-light: var(--color-text);
          --contrast-text-on-dark: var(--color-text-light);
        }

        /* Dark theme */
        body.dark-theme {
          --color-text: #e5e5e5;
          --color-text-light: #161616;
          --color-background: #1a1a1a;
          --color-background-light: #2d2d2d;

          /* Contrast colors - inverted for dark theme */
          --contrast-text-on-light: var(--color-text-light);
          --contrast-text-on-dark: var(--color-text);
        }
        ```

        ### Fixed vs. Variable Colors

        Some colors remain fixed regardless of theme:

        ```css
        /* Screen overlays - always use same values */
        --light-screen: rgb(255 255 255 / 90%);
        --dark-screen: rgb(0 0 0 / 60%);

        /* Button text colors - hardcoded for consistency */
        --primary-button-text-color: #f4f4f4;
        --secondary-button-text-color: #f4f4f4;
        --tertiary-button-text-color: #161616;
        ```

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'inversion-logic'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Smart Inversion Logic'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Section Wrapper Behavior

        The section wrapper in `commons.css` handles adaptive theming:

        ```css
        /* Default behavior - light theme */
        .section-wrapper {
          &.has-dark-screen {
            color: var(--contrast-text-on-dark);
            .background-image::after {
              background: var(--dark-screen);
            }
          }

          &.has-light-screen {
            color: var(--contrast-text-on-light);
            .background-image::after {
              background: var(--light-screen);
            }
          }
        }

        /* Dark theme: invert ONLY if not a design choice */
        .dark-theme {
          .section-wrapper {
            &.has-light-screen:not(.is-dark) {
              /* Invert: light screen becomes dark */
              color: var(--contrast-text-on-dark);
              .background-image::after {
                background: var(--dark-screen);
              }
            }
            /* Sections with .is-dark stay dark (don't invert) */
          }
        }
        ```

        The `:not(.is-dark)` selector is crucial - it prevents inverting sections that are intentionally dark as a design choice.

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'component-patterns'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Component-Level Patterns'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Using Semantic Variables

        Components should use semantic variables instead of hardcoded colors:

        ```css
        /* Don't use hardcoded colors */
        .component {
          color: #161616;
          background: #f8f8f8;
        }

        /* Use semantic variables */
        .component {
          color: var(--color-text);
          background: var(--color-background-light);
        }
        ```

        ### Inheriting Parent Colors

        For nested elements, inherit when appropriate:

        ```css
        .podcast-info h2 {
          color: inherit; /* Inherits from parent section */
        }

        .podcast-description {
          color: inherit;
          opacity: 0.9; /* Use opacity for hierarchy */
        }
        ```

        ### Locked Styling for Design Integrity

        Some components need to maintain their styling regardless of theme:

        ```css
        /* Hero slider slides lock colors per-slide */
        .dark-theme .hero-slide {
          &.is-dark {
            /* Always light text on dark slides */
            color: #f4f4f4;
          }

          &:not(.is-dark) {
            /* Always dark text on light slides */
            color: #161616;
          }
        }
        ```

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'special-cases'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Special Cases & Solutions'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Logo Visibility

        Dark logos can disappear on dark backgrounds. Solution: subtle background in dark theme:

        ```css
        .logo {
          padding: var(--space-s);
          border-radius: 8px;
          transition: background-color 0.3s ease;
        }

        .dark-theme .logo {
          background-color: rgb(255 255 255 / 15%);
        }
        ```

        ### SVG Icons

        SVG icons should use theme-aware stroke/fill colors:

        ```css
        svg {
          stroke: var(--color-text);
          fill: none;
        }

        svg * {
          stroke: var(--color-text);
          fill: none;
        }
        ```

        ### Third-Party Components

        External components (like Shikwasa player) need explicit dark theme overrides:

        ```css
        /* Override Shikwasa when our dark theme is active */
        .dark-theme .shk[data-theme='auto'] {
          --color-theme: #333;
          --color-text: #fff;
          --color-title: #fff;
        }
        ```

        ### Gradient Masks

        Gradient overlays (like on the [Logos List](/references/sections/logos-list/) page) need to match the background color:

        ```css
        /* Light theme - white gradient */
        .mask::before {
          background-image: linear-gradient(
            to right,
            rgb(255 255 255 / 100%) 0%,
            transparent 100%
          );
        }

        /* Dark theme - dark gradient */
        .dark-theme .mask::before {
          background-image: linear-gradient(
            to right,
            rgb(26 26 26 / 100%) 0%,
            transparent 100%
          );
        }
        ```

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'implementation-guide'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Implementation Guide'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Step 1: Audit Components

        Review each new component for:
        1. Hardcoded colors
        2. Context-specific requirements (always light/dark elements)
        3. Third-party dependencies with theme support

        ### Step 2: Replace Hardcoded Colors

        Convert hardcoded values to semantic variables:


        ### Step 3: Add Dark Theme Overrides

        Create dark theme rules for special cases:

        ```css
        .dark-theme .component {
          /* Only add overrides for special cases */
          /* Most styling should work via semantic variables */
        }
        ```

        ### Step 4: Test Thoroughly

        - Test all components in both themes
        - Check sections with `isDark: true` don't invert inappropriately
        - Verify logo/icon visibility in dark theme
        - Test third-party components (audio players, etc.)

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'best-practices'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Best Practices'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### DO

        - Use semantic CSS variables
        - Distinguish between adaptive sections and design choices
        - Use `inherit` and `opacity` for text hierarchy
        - Test logos and icons in dark theme
        - Evaluate build-time vs. runtime decisions
        - Document special cases in component CSS
        - Use theme-aware variables for borders, shadows, and backgrounds

        ### DON'T

        - Hardcode colors in component CSS
        - Assume all sections should invert in dark theme
        - Use colors directly from design mockups
        - Ignore about third-party components styling
        - Mix build-time configuration with runtime theme switching
        - Create per-component color tokens (use global semantic tokens)
        - Add dark theme overrides when semantic variables would work

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'limitations'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Known Limitations'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Build-time vs. Runtime Trade-offs

        Some configurations are made at build time (`isDark: true`, `imageScreen: 'dark'`) while theme switching happens at runtime. This creates limitations:

        - A section with `isDark: true` and dark screen stays dark in both themes
        - This can look out of place in dark theme but maintains design intent
        - The alternative (runtime inversion) would break the original design

        ### Logo Assets

        Logos are often designed for specific backgrounds:
        - Dark logos may be hard to see in dark theme
        - Solutions include subtle backgrounds or CSS filters
        - Ideally, provide light/dark logo variants in the design system

        ### Third-Party Components

        External components may have limited theme support:
        - CSS variable overrides may be needed
        - Some components use inline styles that can't be themed
        - Test thoroughly and document workarounds

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: 'conclusion'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: false
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
      title: 'Conclusion'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### The Reality of Theming

        A dark theme implementation inevitably touches component-level code. While the goal of keeping theming separate is admirable, practical considerations require component cooperation:

        - Components need semantic variables
        - Special cases (fixed colors, logos, third-party components) need attention
        - The distinction between adaptive and design choice sections requires understanding

        ### Pragmatic Approach

        The approach demonstrated in this library is pragmatic:
        - Core theme logic lives in design tokens and commons.css
        - Components cooperate by using semantic variables
        - Special cases are documented and handled explicitly
        - Build-time and runtime concerns are clearly separated

        This balance between centralized theming and component-level awareness creates a maintainable, flexible theming system that respects both design intent and user preference.

  - sectionType: banner
    containerTag: aside
    classes: 'cta-banner'
    id: ''
    isDisabled: false
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
        color: ''
        image: '/assets/images/sample7.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h3'
      isCentered: false
      subTitle: ''
      prose: ''
    ctas:
      - url: '/library'
        label: 'Explore Components'
        isButton: true
        buttonStyle: 'primary'
      - url: '/'
        label: 'Back to Home'
        isButton: true
        buttonStyle: 'secondary'
---
