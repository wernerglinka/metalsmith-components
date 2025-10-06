---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Text Partial - Metalsmith Components
  description: 'Text partial component for structured content with headlines, subtitles, and prose'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Text'
  description: 'Flexible text content partial for headlines, subtitles, and prose'
  pattern: 'simple-gray3'
  tags: ['text', 'content', 'typography', 'headlines', 'prose', 'markdown']

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-text-section'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Text'
      titleTag: 'h1'
      prose: |
        The Text partial provides flexible text rendering with support for lead-ins, titles, subtitles, and markdown-formatted prose content. It is the primary text building block for most section components.

        ### Manifest

        ```json
        {
          "name": "text",
          "type": "_partials",
          "styles": ["text.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        text:
          leadIn: 'Introduction'
          title: 'Main Heading'
          titleTag: 'h2'
          subTitle: 'Supporting text'
          prose: |
            Main content with **markdown** support including lists, links, and formatting.
        ```

        ### Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `leadIn` | string | No | - | Short introductory text above title |
        | `title` | string | No | - | Main heading text |
        | `titleTag` | string | No | 'h2' | HTML tag for title (h1-h6) |
        | `subTitle` | string | No | - | Supporting text below title |
        | `prose` | string | No | - | Main content with markdown support |

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      background:
        isDark: false
    text:
      title: 'Examples'
      titleTag: 'h2'
      prose: 'Below are examples of the text partial with different configurations:'

  - sectionType: text-only
    containerTag: section
    classes: 'has-demo-background'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      background:
        color: '#fafafa'
        isDark: false
    text:
      leadIn: 'Complete Example'
      title: 'All Properties Configured'
      titleTag: 'h3'
      subTitle: 'This shows all text properties together'
      prose: |
        This example demonstrates the text partial with all properties configured. The lead-in provides context, the title grabs attention, the subtitle adds detail, and the prose delivers the main content.

        The prose supports **markdown formatting** including *italics*, [links](#), and lists:
        - Bullet points
        - Multiple items
        - Clean formatting

  - sectionType: text-only
    containerTag: section
    classes: 'has-demo-background'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      background:
        color: '#fafafa'
        isDark: false
    text:
      title: 'Minimal Configuration'
      titleTag: 'h3'
      prose: |
        This example shows the text partial with just a title and prose content. No lead-in or subtitle is provided, demonstrating the flexibility of optional properties.

        The partial gracefully handles missing properties without rendering empty elements.

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - Prose content is processed through the `mdToHTML` filter
        - Uses appropriate heading tags and semantic structure
---
