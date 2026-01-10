---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Manual Cards List

navigation:
  navLabel: 'Manual Cards List'
  navIndex: 20

card:
  title: 'Manual Cards List'
  description: 'A list of manual configurable cards with custom content combinations including images, text, icons, and CTAs.'
  image: '/assets/images/sample12.jpg'
  tags: ['card', 'flexible', 'image', 'icon', 'cta', 'link']

seo:
  title: Manual Cards List for Metalsmith
  description: 'A list of manual configurable cards with custom content combinations including images, text, icons, CTAs, and link wrappers.'
  socialImage: '/assets/images/sample12.jpg'
  canonicalURL: ''
  keywords: 'metalsmith manual card, flexible card component, card with image background, clickable card, icon card'

sections:
  - sectionType: text-only
    containerTag: article
    id: ''
    isDisabled: false
    isAnimated: true
    inContainer: true
    containerFields:
      inContainer: false
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: 'Manual Cards List Component'
      titleTag: h1
      subTitle: ''
      prose: 'Manual Cards provide complete control over content and presentation. Unlike the collection-card which automatically displays collection items, the manual-card allows for custom combinations of images, text, icons, and CTAs with various layout options.'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'configuration'
    isDisabled: false
    isAnimated: true
    inContainer: true
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: 'Configuration'
      titleTag: h2
      prose: |
        ```yaml
        hasHorizontalCards: false # true for horizontal card layout
        cards:
          - link: ''
            background:
              hasImage: true
              pattern: ''
              isDark: false
            image:
              src: '/assets/images/sample8.jpg'
              alt: ''
            icon:
              url: ''
              icon: ''
              title: ''
            text:
              leadIn: 'Condimentum Sollicitudin'
              title: 'Text Only Section'
              titleTag: 'h3'
              subTitle: 'Ornare Malesuada Ipsum'
              prose: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'
            ctas:
              - url: ''
                label: ''
                isButton: true
                buttonStyle: 'primary'
        # other manual cards
        ```

        ### Notes

        - Support for background images, decorative icons, pattern backgrounds, horizontal layouts
        - Entire card can be made clickable with a link wrapper
        - Complete control over content and presentation
        - Custom combinations of images, text, icons, and CTAs

        #### Properties

        | Property | Type | Description |
        |----------|------|-------------|
        | `link` | string | Makes entire card clickable |
        | `background` |object | background properties |
        | `image` | object | Image configuration |
        | `icon` | string | Icon name to display |
        | `text` | object | Text content (title, prose) |
        | `ctas` | array | Call-to-action buttons |
        | `classes` | string | Custom CSS classes |
        | `isHorizontal` | boolean | Render horizontal layout |

        #### Background Properties
        | Property | Type | Description |
        |----------|------|-------------|
        | `hasImage` | boolean | Use image as card background |
        | `pattern` | string | Pattern name for background |
        | `isDark` | boolean | Set according to background shade |

  - sectionType: cards-list
    containerTag: article
    classes: ''
    id: 'basic-cards'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
      title: 'Basic Card Variations'
      titleTag: h2
      prose: 'Standard card configurations with image, text, and CTA combinations.'
    cards:
      - link: ''
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample8.jpg'
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Simple text section with markdown text and a single CTA.
        ctas:
          - url: '/library/'
            label: 'Go to Library Page'
            isButton: false
            buttonStyle: 'primary'
      - link: ''
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: 'feather'
          title: ''
        text:
          leadIn: 'Icon Decoration'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Simple text section with markdown text and a single CTA.
        ctas:
          - url: '/blog/'
            label: 'Go to Sample Blog'
            isButton: false
            buttonStyle: 'primary'
      - link: ''
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample6.jpg'
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            **Simple text** section, markdown text, [inline link](/) and an single CTA.
        ctas:
          - url: '/library/'
            label: 'Go to Library Page'
            isButton: false
            buttonStyle: 'primary'
      - link: ''
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: 'cloud-lightning'
          title: ''
        text:
          leadIn: 'Icon Decoration'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Text restricted to three lines.Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor.
        ctas:
          - url: '/blog/'
            label: 'Go to Sample Blog'
            isButton: false
            buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: 'demo-section'
    id: 'background-image-cards'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
      title: 'Various Backgrounds'
      titleTag: h2
      prose: |
        Cards can use images or CSS patterns as full backgrounds with content overlays. When `hasImageBackground` is true, the image spans the entire card as a background layer.

        This creates visually striking cards perfect for featured content, hero sections, or any design that benefits from rich imagery with text overlays.

  - sectionType: cards-list
    containerTag: article
    classes: 'demo-section background-cards'
    id: 'background-examples'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
    cards:
      - link: ''
        background:
          hasImage: true
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample14.jpg'
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background Image'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            **More text. Seven lines enforced in CSS, but you can make this more!**. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor.
        ctas:
          - url: '/blog/'
            label: 'Go to Sample Blog'
            isButton: false
            buttonStyle: 'primary'
      - link: ''
        background:
          hasImage: false
          pattern: 'pattern1'
          isDark: false
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Simple text section with _markdown text_ and a couple of bottons.
        ctas:
          - url: '/blog/'
            label: 'Go to Sample Blog'
            isButton: true
            buttonStyle: 'primary small'
          - url: 'https://ibm.com'
            label: 'Go to Big Brother'
            isButton: true
            buttonStyle: 'tertiary small'
      - link: ''
        background:
          hasImage: true
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample6.jpg'
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background Image'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            **Simple text** section, markdown text, [inline link](/) and an single CTA. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.
        ctas:
          - url: '/library/'
            label: 'Go to Library Page'
            isButton: false
            buttonStyle: 'primary'
      - link: ''
        background:
          hasImage: false
          pattern: 'pattern2'
          isDark: true
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Full Text Section'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            **More text. Seven lines enforced in CSS, but you can make this more!**. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Sed posuere consectetur est at lobortis. Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor.
        ctas:
          - url: '/blog/'
            label: 'Go to Sample Blog'
            isButton: false
            buttonStyle: 'primary'

  - sectionType: text-only
    containerTag: article
    classes: 'demo-section'
    id: 'linked-cards'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
      title: 'Linked Cards'
      titleTag: h2
      prose: |
        When a `link` property is provided, the entire card becomes clickable and wraps in an anchor tag. In this mode, individual CTAs are ignored since the whole card acts as a single link. This is perfect for navigation cards or content previews.

  - sectionType: cards-list
    containerTag: article
    classes: 'demo-section linked-cards'
    id: 'linked-examples'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
    cards:
      - link: '/library/hero'
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Hero component'
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Hero Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Hero component page.

      - link: '/library/hero-slider'
        background:
          hasImage: true
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Hero component'
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Hero Slider Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Hero Slider component page.

      - link: '/library/flip-cards'
        background:
          hasImage: false
          pattern: 'pattern3'
          isDark: true
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Flip Card Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Flip Cards component page.

      - link: '/library/accordion'
        background:
          hasImage: false
          pattern: 'pattern4'
          isDark: true
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: 'feather'
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Simple Accordion Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Siomple Accordion component page.

  - sectionType: text-only
    containerTag: article
    classes: 'demo-section'
    id: 'horizontal-cards'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
      title: 'Horizontal Layout Cards'
      titleTag: h2
      prose: |
        For a horizontal card layout all that is needed, set the `isHorizontal: true`.

  - sectionType: cards-list
    containerTag: article
    classes: 'demo-section linked-cards'
    id: 'linked-examples'
    isDisabled: false
    isAnimated: true
    inContainer: true
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
    hasHorizontalCards: true
    cards:
      - link: '/library/hero'
        isHorizontal: true
        background:
          hasImage: false
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Hero component'
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Hero Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Hero component page.

      - link: '/library/hero-slider'
        isHorizontal: true
        background:
          hasImage: true
          pattern: ''
          isDark: false
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Hero component'
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Image Decoration'
          title: 'Hero Slider Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Hero Slider component page.

      - link: '/library/flip-cards'
        isHorizontal: true
        background:
          hasImage: false
          pattern: 'pattern3'
          isDark: true
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: ''
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Flip Card Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Flip Cards component page.

      - link: '/library/accordion'
        isHorizontal: true
        background:
          hasImage: false
          pattern: 'pattern4'
          isDark: true
        image:
          src: ''
          alt: ''
        icon:
          url: ''
          icon: 'feather'
          title: ''
        text:
          leadIn: 'Background CSS Pattern'
          title: 'Simple Accordion Component'
          titleTag: 'h3'
          subTitle: 'With Sub Title'
          prose: |
            Click `anywhere` on this card to navigate to the Simple Accordion component page.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'manual-card'
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
      title: 'Download Manual Card Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete manual-card component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/manual-card.zip'
        label: 'Download Manual Card Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
