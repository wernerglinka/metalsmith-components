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
      title: 'Author-Date'
      titleTag: 'h1'
      prose: |
        The Author-Date partial renders author information and publication dates for blog posts and articles. It handles both single authors and multiple co-authors, and formats dates using a blog-friendly format.

        ### Manifest

        ```json
        {
          "name": "author-date",
          "type": "_partials",
          "styles": ["author-date.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        author: "Jane Doe"
        date: "2024-03-15"
        # or for multiple authors:
        author:
          - "Jane Doe"
          - "John Smith"
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `author` | string or array | No | Single author name or array of names |
        | `date` | string | No | Publication date (processed by blogDate filter) |


        ### Example

  - sectionType: hero
    containerTag: section
    classes: 'has-demo-background'
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: 'Blog Post'
      title: 'Understanding Quantum Computing'
      titleTag: 'h1'
      subTitle: 'A deep dive into the future of computation'
      prose: ''
    author:
      - 'Jane Doe'
      - 'John Smith'
    date: '2024-03-15'

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
      leadIn: ''
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/author-date/author-date.njk" import authorDate %}

        {{ authorDate({ date: section.date, author: section.author }) }}
        ```

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Features'
      titleTag: 'h2'
      prose: |
        - **Multiple Authors**: Supports single or multiple author names
        - **Date Formatting**: Automatic blog-friendly date formatting
        - **Flexible Rendering**: Displays author, date, or both
        - **Semantic HTML**: Uses proper time elements with datetime attributes
        - **Accessibility**: Screen reader friendly markup
---
