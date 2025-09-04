---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Media Image

navigation:
  navLabel: 'Media Image'
  navIndex: 3

card:
  title: 'Media Image'
  description: 'Media section combining text, optional CTAs and images with reversible layouts.'
  image: '/assets/images/sample12.jpg'

seo:
  title: Media Image Component - Text & Image Layouts for Metalsmith
  description: 'Flexible media section combining text and images with reversible layouts. Create engaging content presentations with optional CTAs and captions for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith media image, text and image layout, content with images, media section, image caption, reversible layout, feature showcase'

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
      title: 'Media Image'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A flexible media section that combines text content with an image. Perfect for showcasing features, products, or any content that benefits from visual accompaniment. The layout can be reversed to alternate image/text positioning throughout your page.

        ```yaml
        - sectionType: media-image
          containerTag: aside
          
          isReverse: false
          # more settings

          text:
            leadIn: 'And what is this?'
            title: Media Section Example
            titleTag: 'h2'
            subTitle: ''
            prose: Example of a media section with text and image. Change the image/text positions by setting the 'isReverse' property in the section data. The text area has a lead-in, title, sub-title, and prose. The prose is markdown text. All of the text parts are optional. There can be multiple CTAs, which are optional and may be buttons or links.
          ctas:
            - url: 'https://metalsmith.io'
              label: 'Metalsmith Central'
              isButton: true
              buttonStyle: 'primary'
            - url: 'https://wernerglinka.substack.com/p/a-better-way-to-build-web-pages'
              label: 'Read more about this'
              isButton: false
              buttonStyle: 'primary'
          image:
            src: '/assets/images/sample7.jpg'
            alt: 'nunjucks'
            caption: 'Tortor Bibendum Sit Egestas'
        ```

        ### Specific media-image properties

        - `isReverse`: Boolean flag to reverse the image/text layout (default: false)
        - `text`: Standard text block with leadIn, title, subtitle, and prose
        - `text.isCentered`: Centers the text content within its container
        - `image.src`: Path to the image file
        - `image.alt`: Alternative text for accessibility
        - `image.caption`: Optional caption displayed below the image
        - `ctas`: Array of call-to-action buttons or links

    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'first-section'
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
      title: Standard Layout
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        A media section with the image positioned on the right and text content on the left. This is the default layout when `isReverse` is false.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: media-image
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
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
      leadIn: 'Feature Highlight'
      title: 'Flexible Content Layout'
      titleTag: 'h2'
      subTitle: 'Combine text and images seamlessly'
      prose: This media section demonstrates the standard layout with text on the left and image on the right. The prose supports full markdown formatting, allowing you to include **bold text**, *italics*, and even [links](https://example.com). All text elements are optional, giving you complete flexibility in your content presentation.
    ctas:
      - url: 'https://metalsmith.io'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'primary'
      - url: 'https://github.com/metalsmith/metalsmith'
        label: 'View on GitHub'
        isButton: false
        buttonStyle: 'secondary'
    image:
      src: '/assets/images/sample7.jpg'
      alt: 'Example media section image'
      caption: 'Images can include optional captions for additional context'

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
      title: Reversed Layout
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Setting `isReverse: true` flips the layout, positioning the image on the left and text on the right. This is useful for creating visual variety in pages with multiple media sections.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: media-image
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Reversed Layout'
      title: 'Reversed Content Flow'
      titleTag: 'h2'
      isCentered: false
      subTitle: 'Image on the left, text on the right'
      prose: This example shows the reversed layout with `isReverse` set to true. Notice how the image now appears on the left side while maintaining the same responsive behavior. This alternating pattern creates a dynamic, engaging page layout.
    ctas:
      - url: 'https://example.com/demo'
        label: 'View Demo'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: '/assets/images/sample8.jpg'
      alt: 'Reversed layout example'
      caption: 'The reversed layout maintains all the same features'

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
      title: Alternate Layout
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Layout with large background image and text. Screen for better text legibility. Setting `isReverse: true` flips the text position.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: media-image
    containerTag: aside
    classes: 'with-background-image'
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: '/assets/images/sample8.jpg'
        imageScreen: 'light' # light, dark, none
    text:
      leadIn: 'Alternative Layout'
      title: 'Large Background Image'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: This example shows a screened background image and no foreground image with `containerFields.inContainer:true`. With `containerFields.inContainer:false` this configuration may be used for yet another banner configuration.
    ctas:
      - url: 'https://example.com/demo'
        label: 'View Demo'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
