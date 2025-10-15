---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Collection Card Partial - Metalsmith Components
  description: 'Collection card component for displaying items in collection lists'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Collection Card'
  description: 'Linked card component for collection items with author/date metadata'
  pattern: 'simple-gray3'
  tags: ['card', 'collection', 'list', 'blog', 'article', 'thumbnail']

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
      title: 'Collection Card'
      titleTag: 'h1'
      prose: |
        The Collection Card partial renders linked cards for items in collection lists. Unlike the manual card component, this always creates a clickable link to the item. It's commonly used in blog lists, article collections, and other content listings.

        ### Manifest

        ```json
        {
          "name": "collection-card",
          "type": "_partials",
          "styles": ["collection-card.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration
        All members of a collection must have an card object in their frontmatter.

        ```yaml
        card:
          title: 'Sample Article Title'
          author: 'John Doe'
          date: '2023-12-01'
          excerpt: 'Brief excerpt of the article content...'
          thumbnail: '/assets/images/article-thumb.jpg'
          pattern: ''
        ```

        ### Configuration Options
        During the build the target permalink will be merged with the card object.

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `link` | string | Yes | Merged permalink  |
        | `title` | string | Yes | Card title text |
        | `author` | string | No | Author name |
        | `date` | string | No | Publication date |
        | `excerpt` | string | No | Short description text |
        | `thumbnail` | string | No | Thumbnail image URL |
        | `pattern` | string | No | Background pattern class |

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
        {% from "components/_partials/collection-card/collection-card.njk" import collectionCard %}

        <ul class="collection-list">
          {% for item in collection %}
            {% if loop.index > startPage and loop.index <= endPage %}
              <li
                class="collection-card{% if params.horizontal %} is-horizontal{% endif %}{% if item.card.pattern %} has-pattern{% endif %}"
                {% if item.card.pattern %}style="background: var(--{{ item.card.pattern }})"{% endif %}
              >
                {# Merge item permalink into card props for linking #}
                {% set item = item.card | merge({ link: item.permalink }) %}

                {{ collectionCard(item) }}
              </li>
            {% endif %}
          {% endfor %}
        </ul>
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
        - Entire card acts as a clickable link
        - Optional metadata display with author-date partial
        - Proper ARIA labels for screen readers
        - Optional background patterns for visual variety

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'collection-card'
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
      title: 'Download Collection Card Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete collection-card component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/collection-card.zip'
        label: 'Download Collection Card Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
