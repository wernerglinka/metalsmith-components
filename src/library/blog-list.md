---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Blog List

navigation:
  navLabel: 'Blog List'
  navIndex: 10

card:
  title: 'Collection List'
  description: 'Universal collection listing component with pagination and card-based layout. Works with any collection (blog, components, etc.).'
  image: '/assets/images/sample4.jpg'
  tags: ['blog', 'collection', 'list', 'grid', 'cards', 'pagination', 'archive']

seo:
  title: Collection List Component - Universal Paginated Collection Grid for Metalsmith
  description: 'Universal collection listing component with automatic pagination, card-based layout, and support for any collection type. Display collections in an organized grid with Metalsmith.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith blog list, blog pagination, post grid, blog cards, collection display, paginated blog, blog archive component, metalsmith collections'

sections:
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
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Collection List'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A universal collection listing component that displays a grid of items with pagination support. Works with any collection (blog posts, components, products, etc.) and automatically detects available fields like author and date.

        ```yaml
        - sectionType: collection-list
          collectionName: 'blog'  # Required: name of collection to display
          containerTag: section  # section, article, or aside
          disabled: false
          id: ""
          classes: ""
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
              color: ""
              image: ""
              imageScreen: "none"  # light, dark, none
          hasPagingParams: true
          pagingParams:
            numberOfBlogs: ""       # Total number of items (auto-populated)
            numberOfPages: ""       # Total pages needed (auto-populated)
            pageLength: ""          # Items per page (auto-populated)
            pageStart: ""           # Starting index for current page (auto-populated)
            pageNumber: ""          # Current page number (auto-populated)
        ```

        ### Collection List Properties

        - `collectionName`: **Required** - Name of the collection to display ('blog', 'components', 'products', etc.)
        - `hasPagingParams`: Enables pagination functionality
        - `pagingParams.*`: Auto-populated pagination parameters

        The component automatically includes author/date information if present in collection items.

        **Note:** This component requires the `metalsmith-sectioned-blog-pagination` plugin to calculate and populate pagination parameters automatically.

        #### About `hasPagingParams`
        1. Marks the target section: In templates with multiple sections, hasPagingParams: true identifies which specific section should receive the pagination metadata (page number, total pages, current list of posts).
        2. Validation requirement: The plugin requires at least one section with hasPagingParams: true in the main template file. If missing, it throws an error: "blog.md must contain a section with  hasPagingParams: true" (src/index.js:50-51).
        3. Parameter injection point: When generating pagination pages, the plugin finds the section with hasPagingParams: true and injects the pagination parameters into that section's params object, including:
          - pageNumber: Current page number
          - numberOfPages: Total number of pages
          - currentList: Array of blog posts for the current page

          This allows the plugin to work with modular page builders where content is organized in sections, ensuring pagination data goes to the correct section rather than being added globally.

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: collection-list
    collectionName: 'blog'
    containerTag: section
    disabled: false
    id: ''
    classes: ''
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: ''
        image: ''
        imageScreen: 'none'
    hasPagingParams: true
    pagingParams:
      numberOfBlogs: ''
      numberOfPages: ''
      pageLength: ''
      pageStart: ''
      pageNumber: ''

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
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Blog Post Data Structure'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Each blog post in the collection needs specific frontmatter fields for the blog-list component to render properly:

        ```yaml
        # In individual blog post frontmatter
        card:
        title: 'Architecture Philosophy'
        date: '2025-06-02'
        author:
          - Albert Einstein
          - Isaac Newton
        image: '/assets/images/sample9.jpg'
        featuredBlogpost: true
        featuredBlogpostOrder: 1
        excerpt: |-
          This starter embodies several key principles that make structured content management both powerful and approachable.

        ```

        Option settings for the `collections` plugin determine the sort order of the cards. In `metalsmith.js`:

        ```javascript
        .use(
          collections( {
            blog: {
              pattern: 'blog/*.md',
              sortBy: 'card.date',
              reverse: false
            }
          } )
        )
        ```

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

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
        imageScreen: 'light' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h3'
      isCentered: false
      subTitle: ''
      prose: ''
    ctas:
      - url: '/blog'
        label: 'See the sample blog'
        isButton: true
        buttonStyle: 'primary'
---
