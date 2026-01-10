---
layout: pages/sections-with-sidebar.njk
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
  - sectionType: text-only
    containerTag: section
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
      title: 'Image'
      titleTag: 'h1'
      prose: |
        The Image partial provides a simple, consistent way to render images with optional captions. It ensures proper semantic markup and accessibility attributes for all image display throughout the component system.

        ### Manifest

        ```json
        {
          "name": "image",
          "type": "_partials",
          "styles": ["image.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Sample demonstration image'
          caption: 'Example image rendered with the image partial'
        ```

        ### Configuration Options

        | Property | Type | Required  | Description |
        |----------|------|----------|-------------|
        | `src` | string | Yes | Image source path |
        | `alt` | string | Yes | Alternative text for accessibility |
        | `caption` | string | No | Image caption text |

        ### Example

  - sectionType: image-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    image:
      src: '/assets/images/sample10.jpg'
      alt: 'Sample demonstration image'
      caption: 'Example image rendered with the image partial'

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
        {% from "components/_partials/image/image.njk" import image %}

        {{ image({
          src: '/assets/images/sample10.jpg'
          alt: 'Sample demonstration image'
          caption: 'Example image rendered with the image partial'
        }) }}
        ```

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'image'
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
      title: 'Download Image Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete image component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/image.zip'
        label: 'Download Image Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
