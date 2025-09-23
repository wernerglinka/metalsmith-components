---
layout: pages/sections.njk
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
  - sectionType: hero
    containerTag: section
    classes: 'first-section partial-hero'
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Partial Component'
      title: 'Text'
      titleTag: 'h1'
      prose: 'A versatile text content component for structured typography'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Overview'
      titleTag: 'h2'
      prose: |
        The Text partial is the foundational content component that provides flexible text rendering with support for lead-ins, titles, subtitles, and markdown-formatted prose content. It serves as the primary text building block for most section components.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/text/text.njk" import text %}

        {{ text(section.text) }}

        {# With conditional rendering #}
        {% if hasText(section.text) %}
          <div class="text-wrapper">
            {{ text(section.text) }}
          </div>
        {% endif %}
        ```

        ## Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `leadIn` | string | No | - | Short introductory text above title |
        | `title` | string | No | - | Main heading text |
        | `titleTag` | string | No | 'h2' | HTML tag for title (h1-h6) |
        | `subTitle` | string | No | - | Supporting text below title |
        | `prose` | string | No | - | Main content with markdown support |
        | `isCentered` | boolean | No | false | Centers the title text |

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Examples'
      titleTag: 'h2'
      prose: 'Below are examples of the text partial with different configurations:'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
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
    containerFields:
      inContainer: true
      background:
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
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Integration with Sections'
      titleTag: 'h2'
      prose: |
        The Text partial is used extensively throughout the component system and works seamlessly with other partials.

        ### Used By
        - Hero sections
        - Banner sections
        - Text-only sections
        - Media sections
        - And virtually all content sections

        ### Helper Function
        The `hasText` helper function is commonly used to conditionally render text content:

        ```njk
        {% if hasText(section.text) %}
          {{ text(section.text) }}
        {% endif %}
        ```

        ### CSS Classes Generated
        - `.lead-in` - Applied to lead-in paragraph
        - `.title` - Applied to title element
        - `.is-centered` - Added when isCentered is true
        - `.sub-title` - Applied to subtitle paragraph
        - `.prose` - Applied to prose content wrapper
        - `.flow` - Added for vertical rhythm

        ### Notes
        - **Markdown processing**: Prose content is processed through the `mdToHTML` filter
        - **Semantic HTML**: Uses appropriate heading tags and semantic structure
        - **Flexible layout**: Works with any container or background configuration
---