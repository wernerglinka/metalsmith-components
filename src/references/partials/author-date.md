---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Author-Date Partial - Metalsmith Components
  description: 'Author-Date partial component for displaying blog post metadata with author and publication date'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Author-Date'
  description: 'Blog post metadata displaying authors and publication date'
  pattern: 'simple-gray7'
  tags: ['author', 'date', 'metadata', 'blog', 'article', 'time']

sections:
  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: 'Partial Component'
      title: 'Author-Date'
      titleTag: 'h1'
      prose: |
        The Author-Date partial renders author information and publication dates for blog posts and articles. It handles both single authors and multiple co-authors, and formats dates using a blog-friendly format.

        Example:

        **By Albert Einstein , Isaac Newton | June 1, 2025**


        ## Usage in Templates

        ```liquid
        {% from "components/_partials/author-date/author-date.njk" import authorDate %}

        {{ authorDate(post) }}

        {# Custom object #}
        {{ authorDate({
          author: "Jane Doe",
          date: "2024-03-15"
        }) }}

        {# Multiple authors #}
        {{ authorDate({
          author: ["Jane Doe", "John Smith"],
          date: "2024-03-15"
        }) }}
        ```

        ## Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `author` | string or array | No | Single author name or array of names |
        | `date` | string | No | Publication date (processed by blogDate filter) |

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
      title: 'Examples'
      titleTag: 'h2'
      prose: |
        ## Single Author with Date

        ```html
        <span class="author">Jane Doe</span>
        <time datetime="2024-03-15">March 15, 2024</time>
        ```

        Input data:
        ```javascript
        {
          author: "Jane Doe",
          date: "2024-03-15"
        }
        ```

        ## Multiple Authors

        ```html
        <span class="author">Jane Doe, John Smith, Alice Johnson</span>
        <time datetime="2024-03-15">March 15, 2024</time>
        ```

        Input data:
        ```javascript
        {
          author: ["Jane Doe", "John Smith", "Alice Johnson"],
          date: "2024-03-15"
        }
        ```

        ## Author Only

        ```html
        <span class="author">Jane Doe</span>
        ```

        When only author is provided, date is omitted entirely.

        ## Date Only

        ```html
        <time datetime="2024-03-15">March 15, 2024</time>
        ```

        When only date is provided, author is omitted entirely.

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Integration with Articles'
      titleTag: 'h2'
      prose: |
        The Author-Date partial provides essential article metadata and works seamlessly with blog and content layouts.

        ### Used By
        - Blog post headers
        - Article cards in listing pages
        - Post footers with metadata
        - Search result snippets

        ### Works With
        - **Text partial** - Article content and headlines
        - **CTAs partial** - Social sharing and action buttons
        - **Tags partial** - Article categorization

        ### CSS Classes Generated
        - `.author` - Applied to author span element
        - No class on `<time>` element (use element selector)

        ### Date Formatting
        - Uses `blogDate` filter for consistent formatting
        - Typically formats as "Month Day, Year" (e.g., "March 15, 2024")
        - Filter configured in Metalsmith build process

        ### Semantic HTML
        - `<time>` element with `datetime` attribute for machine readability
        - Proper comma separation for multiple authors
        - Screen reader-friendly output

        ### Notes
        - **Multiple authors**: Automatically comma-separated in a single span
        - **Flexible input**: Handles both string and array author formats
        - **Conditional rendering**: Only renders elements when data is provided
        - **Performance**: All processing happens at build time
        - **Accessibility**: Uses semantic HTML5 time elements with proper attributes
---
