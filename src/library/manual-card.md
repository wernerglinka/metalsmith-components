---
layout: pages/sections.njk
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
    classes: ''
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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: 'Manual Cards List Component'
      titleTag: h1
      subTitle: ''
      prose: |
        Manual Cards provide complete control over content and presentation. Unlike the collection-card which automatically displays collection items, the manual-card allows for custom combinations of images, text, icons, and CTAs with various layout options.

        Key features include support for background images, decorative icons, pattern backgrounds, horizontal layouts, and the ability to make the entire card clickable with a link wrapper.

        ### Implementation Example

        ```yaml
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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      title: 'Configuration Options'
      titleTag: h2
      prose: |
        ### Properties

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
      title: 'Background Image Cards'
      titleTag: h2
      prose: |
        Cards can use images as full backgrounds with content overlays. When `hasImageBackground` is true, the image spans the entire card as a background layer.

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
        image:
          src: '/assets/images/sample10.jpg'
          alt: 'Hero component'
        text:
          title: 'Hero Component'
          prose: 'Click anywhere on this card to navigate to the Hero component page.'
      - link: '/library/flip-cards'
        icon: 'layers'
        text:
          title: 'Flip Cards'
          prose: 'This entire card is a link to the Flip Cards component demo.'
      - link: '/library/simple-slider'
        hasImageBackground: true
        image:
          src: '/assets/images/sample11.jpg'
          alt: 'Slider'
        icon: 'play'
        text:
          title: 'Slider Component'
          prose: 'Background image card that links to the Slider demo.'

  - sectionType: columns
    containerTag: article
    classes: 'demo-section'
    id: 'horizontal-layout'
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
      title: 'Horizontal Layout'
      titleTag: h2
      prose: 'Cards can be displayed in a horizontal layout where the image/icon and text content are arranged side by side rather than stacked vertically.'
    columns:
      - text:
          prose: |
            ### Horizontal Card Example

            When `isHorizontal: true` is set, the card switches to a horizontal layout. This is ideal for feature lists, testimonials, or any content that benefits from a wider format.
        classes: 'col-span-6'
      - text:
          prose: |
            ### Use Cases

            - Feature highlights with descriptions
            - Team member profiles
            - Product showcases
            - Service offerings
        classes: 'col-span-6'
---
