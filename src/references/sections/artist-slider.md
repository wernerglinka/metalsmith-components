---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Artist Slider

navigation:
  navLabel: 'Artist Slider'
  navIndex: 5

card:
  title: 'Artist Slider'
  description: 'Full-screen image slider for artist portfolios with artwork info overlays, auto-cycling, and fade transitions.'
  image: '/assets/images/artworks/test1.jpg'
  tags: ['slider', 'gallery', 'portfolio', 'artist', 'fullscreen', 'artwork', 'fade']

seo:
  title: Artist Slider Component - Full-Screen Artwork Gallery for Metalsmith
  description: 'Create immersive full-screen artwork galleries with info overlays, auto-cycling, fade transitions, and navigation dots. Perfect for artist portfolio websites built with Metalsmith.'
  socialImage: '/assets/images/artworks/test1.jpg'
  canonicalURL: ''
  keywords: 'metalsmith artist slider, artwork gallery, portfolio slider, fullscreen gallery, artwork showcase, artist portfolio'

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
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Artist Slider'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Full-screen image slider designed for artist portfolio websites. Features artwork info overlays with glassmorphism styling, configurable auto-cycling with fade transitions, navigation dots, and a scroll-down indicator.

  - sectionType: artist-slider
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    containerFields:
      inContainer: false
      isAnimated: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        isDark: true
    artworks:
      source: example-artworks
      imageFolder: artworks
    cycleTime: 5000
    showDots: false
    scrollTarget: '#configuration'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'configuration'
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
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ### Frontmatter

        ```yaml
        sections:
          - sectionType: artist-slider
            containerFields:
              inContainer: false
              background:
                isDark: true
            artworks:
              source: example-artworks
              imageFolder: artworks
            cycleTime: 5000
            showDots: true
            scrollTarget: '#first-section'
        ```

        ### Configuration Options

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `artworks.source` | string | required | JSON filename in `/lib/data/artworks/` (without .json) |
        | `artworks.imageFolder` | string | required | Subfolder in `/lib/assets/images/` containing artwork images |
        | `cycleTime` | number | 5000 | Auto-cycle interval in milliseconds |
        | `showDots` | boolean | true | Show/hide navigation dots |
        | `scrollTarget` | string | - | Anchor for scroll-down icon (e.g., '#first-section') |

        ### JSON Data Structure

        Create a JSON file in `/lib/data/artworks/` with an array of artwork objects:

        ```json
        [
          {
            "image": "artwork-1.jpg",
            "alt": "Description for screen readers",
            "title": "Artwork Title",
            "description": "Brief description of the artwork.",
            "size": "48 x 36 inches",
            "year": "2024",
            "materials": "Oil on canvas",
            "link": "/works/artwork-1"
          }
        ]
        ```

        | Field | Type | Required | Description |
        |-------|------|----------|-------------|
        | `image` | string | yes | Filename of the image in the imageFolder |
        | `alt` | string | yes | Alt text for accessibility |
        | `title` | string | yes | Artwork title (displayed in info panel) |
        | `description` | string | yes | Artwork description |
        | `size` | string | yes | Dimensions of the artwork |
        | `year` | string | yes | Year created |
        | `materials` | string | yes | Medium/materials used |
        | `link` | string | no | Optional URL to artwork detail page |

        ### Features

        - **Full-screen display** - Images fill the entire viewport
        - **Fade transitions** - Smooth 0.8s opacity transitions between slides
        - **Info panel overlay** - Glassmorphism panel with artwork details
        - **Auto-cycling** - Configurable interval, pauses when info panel is open
        - **Navigation dots** - Click to jump to any slide
        - **Keyboard navigation** - Arrow keys to navigate, Escape to close info
        - **Scroll indicator** - Optional scroll-down icon to jump to next section

        ### Behavior Notes

        - The info panel stays open when navigating between slides and updates to show the current artwork's information
        - Auto-cycling pauses when the info panel is open and resumes when closed
        - The "View Details" link only appears when a `link` is provided in the JSON data

        ### Accessibility

        - ARIA labels on all interactive elements
        - Screen reader announcements on slide changes
        - Keyboard navigation support
        - Semantic HTML structure

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'artist-slider'
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
      title: 'Download Artist Slider Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete artist-slider component package including template, styles, JavaScript, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/artist-slider.zip'
        label: 'Download Artist Slider Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
