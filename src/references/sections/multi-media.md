---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Multi Media

navigation:
  navLabel: 'Multi Media'
  navIndex: 3

card:
  title: 'Multi Media'
  description: 'Flexible media section combining text, optional CTAs, and various multi media with reversible layouts.'
  image: '/assets/images/sample13.jpg'
  tags: ['media', 'video', 'image', 'audio', 'multimedia', 'flexible', 'content']

seo:
  title: Multi Media Component - Text & Image, Video, Icon, Audio and Lottie Animation  Layouts for Metalsmith
  description: 'Flexible media section combining text and multi media with reversible layouts. Create engaging content presentations with optional CTAs and captions for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith media image, text and image layout, content with images, media section, image caption, reversible layout, feature showcase'

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
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Multi Media'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A section component that renders text content alongside media. Supports five media types: image, video, audio, icon, and Lottie animations with flexible layout options.'

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Image Example'
      title: 'Rich Visual Content with Images'
      titleTag: 'h2'
      subTitle: 'Enhance your message with compelling visuals'
      prose: Images are the cornerstone of visual storytelling on the web. This section showcases how images integrate with text content, creating engaging layouts that capture attention. The component supports images with optional captions for additional context. Use **markdown formatting** to emphasize key points, add *subtle emphasis*, or include [relevant links](https://example.com). Perfect for product showcases, feature highlights, or any content that benefits from visual support.
    ctas:
      - url: 'https://metalsmith.io'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'primary'
    mediaType: image
    image:
      src: '/assets/images/sample7.jpg'
      alt: 'Example media section image'
      caption: 'Images can include optional captions for additional context'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
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
      title: 'Image Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `image.src` | string | Yes | Path to the image file |
        | `image.alt` | string | Yes | Alternative text for accessibility |
        | `image.caption` | string | No | Optional caption displayed below the image |

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Audio Example'
      title: 'Immersive Audio Experiences'
      titleTag: 'h2'
      subTitle: 'Engage users with sound and visuals'
      prose: Audio content adds a powerful dimension to your web experience. This component combines an audio player with a background image, creating an immersive presentation for podcasts, music samples, or audio narrations. The dual-format support (OGG and MP3) ensures broad browser compatibility.
    ctas:
      - url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'secondary'
    mediaType: audio
    audio:
      bgImage: '/assets/images/sample12.jpg'
      ogg: '/assets/audio/shattered-reflections.ogg'
      mpeg: '/assets/audio/shattered-reflections.mp3'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
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
      leadIn: ''
      title: 'Audio Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `audio.bgImage` | string | No | Background image displayed with audio player |
        | `audio.ogg` | string | One required* | Path to OGG audio file |
        | `audio.mpeg` | string | One required* | Path to MP3 audio file |

        *At least one audio format must be provided

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'inSitu Video'
      title: 'Seamless Video Integration'
      titleTag: 'h2'
      subTitle: 'Play videos directly in the page flow'
      prose: inSitu video playback keeps users engaged without disrupting their browsing experience. This configuration embeds videos directly within your content layout, perfect for tutorials, product demonstrations, or promotional content. The component supports YouTube, Vimeo, and self-hosted videos, automatically handling responsive sizing and providing a clean, distraction-free viewing experience.
    ctas:
      - url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'tertiary'
    mediaType: video
    video:
      inSitu: true
      src: 'youtube'
      id: 'OorZcOzNcgE'
      tn: '/assets/images/sample13.jpg'
      alt: 'YouTube tutorial video demonstrating inSitu video integration'

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Modal Video'
      title: 'Cinematic Modal Video Experience'
      titleTag: 'h2'
      subTitle: 'Focus attention with full-screen playback'
      prose: Modal video presentation creates a theater-like viewing experience that commands full attention. When activated, the video opens in an elegant overlay that dims the background, eliminating distractions and maximizing impact. Ideal for feature films, detailed demonstrations, or any content that deserves the spotlight. The thumbnail preview entices viewers while maintaining fast page load times.
    ctas:
      - url: 'https://metalsmith.io'
        label: 'Learn More'
        isButton: false
        buttonStyle: 'primary'
    mediaType: video
    video:
      inSitu: false
      src: 'vimeo'
      id: '347119375'
      tn: '/assets/images/sample10.jpg'
      alt: 'Vimeo video demonstration - cinematic modal experience'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
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
      title: 'Video Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `video.inSitu` | boolean | No | Display inSitu (true) or in modal (false) |
        | `video.src` | string | Yes | Video source ('youtube', 'vimeo', or 'cloudinary') |
        | `video.id` | string | Yes | Video ID for YouTube/Vimeo |
        | `video.cloudname` | string | Conditional | Required for Cloudinary videos only |
        | `video.tn` | string | Yes | Thumbnail image path for modal display |

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Icon Example'
      title: 'Symbolic Visual Communication'
      titleTag: 'h2'
      subTitle: 'Express concepts with scalable vector graphics'
      prose: Icons provide instant visual recognition and enhance user understanding through symbolic representation. This lightweight alternative to images loads instantly and scales perfectly across all screen sizes. Choose from an extensive library of icons to represent features, services, or concepts. The clean, minimalist aesthetic works beautifully in modern designs while maintaining clarity and purpose.
    ctas:
      - url: 'https://feathericons.com/'
        label: 'Check out feather Icons'
        isButton: true
        buttonStyle: 'primary'
    mediaType: icon
    icon:
      url: ''
      icon: 'feather'
      title: 'Feather'

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
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
      title: 'Icon Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `icon.icon` | string | Yes | Icon identifier from the icon library |
        | `icon.title` | string | Yes | Icon title for accessibility |
        | `icon.url` | string | No | Optional link URL for the icon |

  - sectionType: multi-media
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: true
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: 'Lottie Animation'
      title: 'Dynamic Motion Graphics'
      titleTag: 'h2'
      subTitle: 'Bring your content to life with smooth animations'
      prose: Lottie animations deliver stunning, lightweight motion graphics that captivate visitors and enhance user engagement. These resolution-independent animations maintain crisp quality at any size while keeping file sizes minimal. Perfect for loading states, interactive illustrations, or adding delightful micro-interactions that make your site memorable. With built-in controls for autoplay and looping, you have complete control over the animation experience.
    ctas:
      - url: 'https://lottiefiles.com/'
        label: 'Learn More About Lottie Animations'
        isButton: false
        buttonStyle: 'primary'
    mediaType: lottie
    lottie:
      src: '/assets/lotties/example4.json'
      control:
        autoplay: true
        loop: true

  - sectionType: text-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: false
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
      title: 'Lottie Animation Properties'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `lottie.src` | string | Yes | Path to Lottie JSON animation file |
        | `lottie.control.autoplay` | boolean | No | Start animation automatically (default: true) |
        | `lottie.control.loop` | boolean | No | Loop the animation (default: true) |

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
        ```yaml
        - sectionType: multi-media
          containerTag: aside
          isReverse: false
          # more settings

          text:
            leadIn: 'Image Example'
            title: Rich Visual Content with Images
            titleTag: 'h2'
            subTitle: 'Enhance your message with compelling visuals'
            prose: Images are the cornerstone of visual storytelling on the web...
          ctas:
            - url: 'https://metalsmith.io'
              label: 'Learn More'
              isButton: true
              buttonStyle: 'primary'
          mediaType: image # may be 'audio', 'icon', lottie','image', or 'video',
          image:
            # image properties
          audio:
            # audio properties
          icon:
            # icon properties
          lottie:
            # lottie properties
          video:
            # video properties
        ```

        ### Configuration Options

        #### Layout Settings

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `isReverse` | boolean | No | Reverse the media/text layout (default: false) |
        | `mediaType` | string | Yes | Type of media ('image', 'video', 'audio', 'icon', 'lottie') |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | No | Standard text block with leadIn, title, subtitle, and prose |
        | `text.isCentered` | boolean | No | Centers the text content within its container |
        | `ctas` | array | No | Array of call-to-action buttons or links |

        ### Notes

        - Image, video, audio, icon, and Lottie animation support
        - YouTube, Vimeo, and Cloudinary integration
        - Viedeo modal overlays or inSitu embedding
        - Audio players with background images
        - Scalable vector icons from comprehensive library
        - JSON-based animations with playback controls

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'multi-media'
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
      title: 'Download Multi Media Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete multi-media component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/multi-media.zip'
        label: 'Download Multi Media Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
