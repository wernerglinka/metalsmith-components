---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Text Only

navigation:
  navLabel: 'Text Only'
  navIndex: 3

card:
  title: 'Text Only'
  description: 'Versatile text section for articles, documentation, code snippets, and content-heavy layouts. '
  image: '/assets/images/sample16.jpg'
  tags: ['text', 'content', 'article', 'documentation', 'prose', 'typography']

seo:
  title: Text Only Component - Content Sections for Metalsmith
  description: 'Versatile text section for articles, documentation, and content-heavy layouts. Supports markdown, headings, CTAs, and background styling for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith text section, content component, article section, markdown content, text-only layout, documentation component, prose section'

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
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Section Component'
      title: 'Text Only'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A section for displaying text content with optional CTAs. Essentially a section wrapper for the text partial. Supports lead-in text, titles, subtitles, markdown-formatted prose, and flexible background options.

        ## Examples

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Introduction'
      title: 'Welcome to Our Platform'
      titleTag: 'h3'
      subTitle: 'Everything you need to know'
      prose: |-
        This is an example of a text-only section with all text elements populated. Notice how the lead-in text appears above the title, providing context for what follows.

        The prose content supports **markdown formatting**, allowing you to create *emphasized text*, [hyperlinks](https://example.com), and structured content with ease.

        #### Key Features

        - Clean, semantic HTML output
        - Full markdown support in prose content
        - Flexible heading hierarchy
        - Optional CTAs for user engagement

        This section type is ideal for documentation, blog posts, or any content-heavy pages where text is the primary focus.
    ctas:
      - url: 'https://example.com/docs'
        label: 'Read Documentation'
        isButton: true
        buttonStyle: 'primary'
      - url: 'https://example.com/tutorial'
        label: 'View Tutorial'
        isButton: false
        buttonStyle: 'secondary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Styled Background Example'
      titleTag: 'h3'
      subTitle: 'With a subtle background color'
      prose: |-
        This text-only section demonstrates how background colors can be used to create visual separation between content blocks. The light gray background helps this section stand out from the surrounding content.

        Background options include solid colors or images with optional screening effects for better text readability.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
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
        isDark: true
        color: ''
        image: '/assets/images/sample8.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: ''
      title: 'Styled Background Example'
      titleTag: 'h3'
      subTitle: 'With an image, dark screen and full screen width'
      prose: |-
        This text-only section demonstrates how background images with screens can be used. The screen is used so text above the image has enough contrast to be readable. `containerFields.inContainer: false` will render the background accross the whole screen width.

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
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        ## Configuration

        ```yaml
        - sectionType: text-only
          containerTag: article
          # container settings

          text:
            leadIn: 'Introduction'
            title: 'Welcome to Our Platform'
            titleTag: 'h2'
            subTitle: 'Everything you need to know'
            prose: |-
              This is an example of a text-only section with all text elements populated.
              The prose content supports **markdown formatting**.
          ctas:
            - url: 'https://example.com/docs'
              label: 'Read Documentation'
              isButton: true
              buttonStyle: 'primary'
        ```

        #### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text.leadIn` | string | No | Optional introductory text above the title |
        | `text.title` | string | No | Main heading text |
        | `text.titleTag` | string | No | HTML heading tag (h1-h6) |
        | `text.subTitle` | string | No | Optional subtitle below the main title |
        | `text.prose` | string | No | Markdown-formatted body content |
        | `ctas` | array | No | [Optional array](/references/partials/ctas/) of call-to-action buttons or links |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'text-only'
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
      title: 'Download Text Only Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete text-only component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/text-only.zip'
        label: 'Download Text Only Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
