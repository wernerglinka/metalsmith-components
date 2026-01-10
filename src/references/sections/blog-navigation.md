---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Blog Navigation

navigation:
  navLabel: 'Blog Navigation'
  navIndex: 3

card:
  title: 'Blog Navigation'
  description: 'Sequential navigation component for blog posts, providing previous and next links between articles in a collection.'
  image: '/assets/images/sample16.jpg'
  tags: ['blog', 'navigation', 'pagination', 'collection', 'posts']

seo:
  title: Blog Navigation Component - Post Navigation for Metalsmith
  description: 'Navigation component that provides previous and next links between sequential blog posts. Automatically integrates with Metalsmith collections for chronological article navigation.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith blog navigation, post navigation, previous next links, blog pagination, collection navigation, article navigation'

sections:
  - sectionType: text-only
    containerTag: article
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
      leadIn: 'Section Component'
      title: 'Blog Navigation'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A navigation component that provides previous and next links between sequential blog posts. This component automatically integrates with Metalsmith's collections plugin to display contextual navigation at the end of blog articles.

        ## How It Works

        Unlike most section components, blog-navigation doesn't use frontmatter configuration for its content. Instead, it reads `previous` and `next` variables that are automatically populated by Metalsmith's collections plugin when processing blog posts.

        The component only renders when a page has previous or next posts available, making it safe to include in any blog post template.

        ## Live Example

        To see this component in action, visit any blog post on this site. For example, check the bottom of the [Sample Blog Post](/blog/sample-blogpost/) to see the previous and next navigation links.

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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: ''
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ## Usage

        Add the blog-navigation section to any blog post frontmatter:

        ```yaml
        - sectionType: blog-navigation
          containerTag: section
          classes: ""
          id: ""
          isDisabled: false
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
              color: ""
              image: ""
              imageScreen: "none"
        ```

        ## Collection Integration

        The component requires Metalsmith's collections plugin to be configured for blog posts:

        ```javascript
        // In metalsmith.js
        .use(collections({
          blog: {
            pattern: 'blog/**/*.md',
            sortBy: 'card.date',
            reverse: true
          }
        }))
        ```

        The collections plugin automatically adds `previous` and `next` properties to each page in the collection, which the component uses to generate navigation links.

        ## Conditional Rendering

        The component handles edge cases automatically:

        - **First post in collection**: Only shows "Next" link
        - **Last post in collection**: Only shows "Previous" link
        - **Single post**: Component doesn't render at all
        - **Non-collection page**: Component doesn't render

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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: ''
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ## Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `sectionType` | string | Yes | Must be `blog-navigation` |
        | `isDisabled` | boolean | No | Set to `true` to hide the section |
        | `containerFields` | object | No | Standard container configuration |

        Note that the navigation content (post titles and URLs) is automatically populated from the collection data and cannot be configured in frontmatter.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'blog-navigation'
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
      title: 'Download Blog Navigation Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete blog-navigation component package including template, styles, manifest, and installation script.'
    ctas:
      - url: '/downloads/sections/blog-navigation.zip'
        label: 'Download Blog Navigation Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
