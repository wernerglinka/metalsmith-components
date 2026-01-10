---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Image Grid

navigation:
  navLabel: 'Image Grid'
  navIndex: 3

card:
  title: 'Image Grid'
  description: 'Justified gallery layout where images in each row share the same height with varying widths. Shows details on hover with optional link indicators.'
  image: '/assets/images/sample16.jpg'
  tags: ['images', 'gallery', 'portfolio', 'art', 'justified', 'grid', 'hover']

seo:
  title: Image Grid Component - Portfolio Gallery for Metalsmith
  description: 'Justified gallery where images in each row share the same height with varying widths. Ideal for artist portfolios, photo galleries, and visual showcases. Data-driven from JSON files.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith image grid, portfolio gallery, justified gallery, artwork gallery, hover overlay, artist portfolio component, image list'

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
      title: 'Image Grid'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A justified gallery layout where images in each row share the same height but have varying widths based on their aspect ratios. Row heights may differ to ensure images fill the available width. Perfect for artist portfolios, photo galleries, and visual showcases.

        Data is loaded from JSON files in `/lib/data/`, making content management simple and reusable. Aspect ratios are calculated automatically from loaded images.

        On hover, a dark overlay appears showing the image title, details, and date. Items with a `link` property display an arrow icon indicating navigation to a detail page.

        ## Examples

  - sectionType: image-grid
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
    dataSource: sample-artworks
    text:
      title: 'Sample Gallery'
      titleTag: 'h3'
    settings:
      gap: '6'
      targetRowHeight: '180'

  - sectionType: image-grid
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
    dataSource: sample-artworks
    text:
      title: 'Larger Row Height'
      titleTag: 'h3'
    settings:
      gap: '8'
      targetRowHeight: '250'

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
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        ## Configuration

        ### Frontmatter

        ```yaml
        - sectionType: image-grid
          dataSource: artworks-2024
          text:
            title: "Sculptures 2024"
            titleTag: h2
          settings:
            gap: "6"
            targetRowHeight: "200"
        ```

        ### Data File Structure

        Create a JSON file in `/lib/data/` with your image data:

        ```json
        [
          {
            "image": "/assets/images/artworks/piece-1.jpg",
            "title": "#108",
            "details": "36.5 x 55 x 13 inches, painted resin",
            "date": "2023",
            "link": "/artworks/piece-108/"
          },
          {
            "image": "/assets/images/artworks/piece-2.jpg",
            "title": "#95",
            "details": "24 x 30 x 8 inches, bronze",
            "date": "2022"
          }
        ]
        ```

        Items without a `link` property will not show the arrow icon and won't be clickable.

        #### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `dataSource` | string | Yes | Name of the JSON file in `/lib/data/` (without .json extension) |
        | `text.title` | string | No | Optional section title |
        | `text.titleTag` | string | No | HTML heading tag (h1-h6), defaults to h2 |
        | `settings.gap` | string | No | Gap between images in pixels (default: 6) |
        | `settings.targetRowHeight` | string | No | Target height for rows in pixels (default: 200) |

        #### Data Item Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `image` | string | Yes | Path to the image file |
        | `title` | string | No | Title shown in hover overlay |
        | `details` | string | No | Details text (dimensions, materials, etc.) |
        | `date` | string | No | Date or year |
        | `link` | string | No | URL to detail page (shows arrow icon when present) |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'image-grid'
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
      title: 'Download Image Grid Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete image-grid component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/image-grid.zip'
        label: 'Download Image Grid Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
