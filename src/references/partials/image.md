---
layout: pages/sections.njk
bodyClass: ''

seo:
  title: Image Partial - Metalsmith Components
  description: 'Image partial component for responsive, optimized image rendering'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Image'
  description: 'Responsive image component with lazy loading and optimization'
  pattern: 'simple-gray3'
  tags: ['image', 'media', 'responsive', 'lazy-load', 'picture']

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
      title: 'Image'
      titleTag: 'h1'
      prose: 'Optimized responsive image rendering with modern formats'

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
        The Image partial provides a simple, consistent way to render images with optional captions. It ensures proper semantic markup and accessibility attributes for all image display throughout the component system.

        ## Usage in Templates

        ```njk
        {% from "components/_partials/image/image.njk" import image %}

        {{ image({
          src: '/assets/images/hero.jpg',
          alt: 'Hero image description',
          caption: 'Optional image caption'
        }) }}
        ```

        ## Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `src` | string | Yes | - | Image source path |
        | `alt` | string | Yes | - | Alternative text for accessibility |
        | `caption` | string | No | - | Image caption text |

  - sectionType: multi-media
    mediaType: image
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      background:
        isDark: false
    text:
      title: 'Example Usage'
      titleTag: 'h2'
      prose: |
        This section demonstrates the image partial in use. The partial renders a simple image with semantic markup.

        Any image optimization, responsive sizing, or format conversion is handled by the build process, not the partial itself.
    image:
      src: '/assets/images/sample8.jpg'
      alt: 'Sample demonstration image'
      caption: 'Example image rendered with the image partial'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: true
      background:
        isDark: false
    text:
      title: 'Features & Benefits'
      titleTag: 'h2'
      prose: |
        ### What the Image Partial Does
        - **Simple Image Rendering**: Outputs basic `<img>` tag with proper attributes
        - **Optional Captions**: Adds semantic `<p class="caption">` when caption is provided
        - **Accessibility**: Requires alt text for screen readers
        - **Consistent Markup**: Standardizes image output across all components

        ### Used By
        - Hero sections
        - Media sections
        - Card components
        - Gallery displays
        - Banner sections
        - And throughout the component system

        ### Notes
        - Image optimization, lazy loading, and responsive features are handled by the metalsmith-optimize-images plugin, not this partial
        - This partial focuses on semantic markup and consistency
        - Always provide meaningful alt text for accessibility
        - The partial ensures all images follow the same HTML structure
---
