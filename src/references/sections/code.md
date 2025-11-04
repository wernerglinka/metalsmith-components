---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Code
date: 2024-09-06

navigation:
  navLabel: 'Code'
  navIndex: 3

card:
  title: 'Code'
  description: 'Syntax-highlighted code blocks with language tabs, copy-to-clipboard functionality, and dynamic Prism theme loading.'
  image: '/assets/images/sample17.jpg'
  tags: ['code', 'syntax-highlighting', 'prism', 'code-block', 'copy-paste', 'programming', 'snippets']

seo:
  title: Code Component - Syntax Highlighted Code Blocks for Metalsmith
  description: 'Display syntax-highlighted code snippets with language labels, copy functionality, and dynamic theme loading. Perfect for documentation, tutorials, and technical content.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith code component, syntax highlighting, prism themes, code snippets, copy to clipboard, programming documentation, code display'

sections:
  - sectionType: text-only
    containerTag: article
    classes: 'first-text-section'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Code Component'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A specialized component for displaying syntax-highlighted code blocks with enhanced features. Extends the existing [Prism.js](https://prismjs.com/) implementation used in text-only sections with additional functionality.

  - sectionType: code
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
    code:
      language: 'javascript'
      theme: 'prism'
      filename: 'example.js'
      showCopy: true
      content: |-
        ```javascript
        /**
         * Example JavaScript function with JSDoc comments
         * @param {string} name - The name to greet
         * @returns {string} Greeting message
         */
        function greet(name) {
          return `Hello, ${name}!`;
        }

        // Usage example
        const message = greet('World');
        console.log(message); // Output: Hello, World!

        // ES6 arrow function version
        const greetArrow = (name) => `Hello, ${name}!`;
        ```

  - sectionType: code
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
    code:
      language: 'css'
      theme: 'tomorrow'
      filename: 'styles.css'
      showCopy: true
      content: |
        ```css
        /* Modern CSS Grid Layout */
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        /* Dark theme support */
        @media (prefers-color-scheme: dark) {
          .card {
            background: #1a1a1a;
            color: white;
          }
        }
        ```

  - sectionType: code
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
    code:
      language: 'yaml'
      theme: 'coy'
      filename: 'example.md'
      showCopy: true
      content: |
        ```yaml
        ---
        layout: pages/sections-with-sidebar.njk
        title: 'My Page Title'
        sections:
          - sectionType: hero
            text:
              title: 'Welcome'
              prose: 'This is a hero section'
          - sectionType: code
            code:
              language: 'javascript'
              theme: 'tomorrow'
              filename: 'main.js'
              content: |
                console.log('Hello from Metalsmith!');
        ---
        ```

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
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
    text:
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: code
          containerTag: section
          containerFields:
            inContainer: true
            isAnimated: true
          code:
            language: "javascript"      # Programming language for highlighting
            theme: "default"           # Prism theme (default, tomorrow, okaidia, etc.)
            filename: "app.js"         # Optional filename display
            showCopy: true             # Enable/disable copy button
            content: |                 # The code content
              function example() {
                console.log('Hello, World!');
              }
        ```

        ### Configuration Options

        #### Code Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `language` | string | Yes | Programming language for syntax highlighting (javascript, css, html, python, etc.) |
        | `content` | string | Yes | The actual code content using YAML literal block syntax |
        | `theme` | string | No | Prism theme to load dynamically from CDN (default: 'default') |
        | `filename` | string | No | Optional filename to display in the header |
        | `showCopy` | boolean | No | Show/hide the copy button (default: true) |

        ### Notes

        #### Supported Languages

        The component supports all languages available in [Prism.js](https://prismjs.com/) including:
        - JavaScript, TypeScript, JSX
        - HTML, CSS, SCSS, Less
        - Python, PHP, Ruby, Java
        - Go, Rust, C++, C#
        - YAML, JSON, Markdown
        - Bash, PowerShell, SQL
        - And many more...

        #### Available Themes

        The component supports multiple Prism themes that are loaded dynamically:
        - `default` - Uses the existing theme from text-only component
        - `tomorrow` - GitHub-style dark theme
        - `okaidia` - Monokai-inspired theme
        - `twilight` - TextMate twilight theme
        - `prism` - Clean light theme
        - `dark` - High contrast dark theme
        - `solarizedlight` - Solarized light theme
        - `coy` - Minimal light theme

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'code'
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
      title: 'Download Code Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete code component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/code.zip'
        label: 'Download Code Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
