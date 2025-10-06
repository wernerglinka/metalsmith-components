---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Collection Pagination Partial - Metalsmith Components
  description: 'Pagination component for navigating through collection pages'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Collection Pagination'
  description: 'Navigation component for paginated collection content'
  pattern: 'simple-gray2'
  tags: ['pagination', 'navigation', 'collection', 'paging', 'blog']

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
      title: 'Collection Pagination'
      titleTag: 'h1'
      prose: |
        The Collection Pagination partial provides navigation controls for paginated content collections. It includes first/last, previous/next, and numbered page links with proper accessibility support.

        ### Manifest

        ```json
        {
          "name": "collection-pagination",
          "type": "_partials",
          "styles": ["collection-pagination.css"],
          "scripts": [],
          "requires": [],
          "requiredPlugins": ["metalsmith-sectioned-blog-pagination"]
        }
        ```

        ### Configuration

        ```yaml
        hasPagingParams: true
        pagingParams:
          numberOfBlogs: '' # updated by plugin
          numberOfPages: '' # updated by plugin
          pageLength: '' # updated by plugin
          pageStart: '' # updated by plugin
          pageNumber: '' # updated by plugin
        ```

        ### Configuration Options

        This partial requires the `metalsmith-sectioned-blog-pagination` plugin. During build the plugin will add all configuration according to its setup.

        ### Example
        For a fully functional live exaple please see the [sample blog](/blog/).

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
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
          {% from "components/_partials/collection-pagination/collection-pagination.njk" import collectionPagination %}

          {% set params = section.pagingParams %}
          {% if params.numberOfPages > 1 %}
            {{ collectionPagination(params.numberOfPages, params.pageNumber, section.domainName) }}
          {% endif %}
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
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - First, previous, numbered pages, next, last controls
        - Proper ARIA labels and screen reader support
        - Works with metalsmith-sectioned-blog-pagination plugin
---
