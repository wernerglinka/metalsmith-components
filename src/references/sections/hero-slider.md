---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Hero Slider

navigation:
  navLabel: 'Hero Slider'
  navIndex: 4

card:
  title: 'Hero Slider'
  description: 'Hero slider with various background media, smooth transitions, and autoplay.'
  image: '/assets/images/sample7.jpg'
  tags: ['hero', 'slider', 'carousel', 'slideshow', 'autoplay', 'fullscreen', 'media']

seo:
  title: Hero Slider Component - Multi-Slide Hero Sections for Metalsmith
  description: 'Create dynamic hero sections with multiple slides, background media, smooth transitions, and autoplay. Perfect for showcasing multiple messages or features on your Metalsmith site.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith hero slider, carousel hero, slideshow hero, hero carousel, multi-slide hero, hero with transitions, autoplay hero'

sections:
  - sectionType: text-only
    containerTag: article
    classes: 'first-text-section'
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
      title: 'Hero Slider'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        Hero slider with various background media, smooth transitions, and autoplay functionality. Each slide can contain combinations of text, images, and backgrounds.

  - sectionType: hero-slider
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'Hero slider with multiple slides, each featuring unique content, backgrounds, and navigation controls'
    isDisabled: false
    isFullScreen: false
    containerFields:
      inContainer: true
      isAnimated: false
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
    autoplay: true
    autoPlayDelay: 6000
    slides:
      - navLabel: 'Welcome'
        isReverse: false
        text:
          leadIn: 'Metalsmith Components Library'
          title: 'Hero Slider Component'
          titleTag: 'h1'
          subTitle: 'Dynamic Multi-Slide Heroes'
          prose: 'Create engaging hero sections with multiple slides, smooth transitions, and rich media backgrounds. Perfect for showcasing multiple messages or features.'
          isCentered: true
        ctas:
          - url: '#features'
            label: 'View Features'
            isButton: true
            buttonStyle: 'primary'
          - url: '/library'
            label: 'Back to Library'
            isButton: true
            buttonStyle: 'secondary'
        background:
          color: ''
          isDark: false
          image:
            src: '/assets/images/sample13.jpg'
            alt: 'Hero background'
          imageScreen: 'none'
      - navLabel: 'Features'
        isReverse: true
        text:
          leadIn: 'Powerful Capabilities'
          title: 'Built for Performance'
          titleTag: 'h2'
          subTitle: 'Optimized for Modern Web'
          prose: 'Hardware-accelerated animations, lazy loading, and intelligent resource management ensure smooth performance across all devices.'
          isCentered: false
        ctas:
          - url: '#examples'
            label: 'See Examples'
            isButton: true
            buttonStyle: 'primary'
        image:
          src: '/assets/images/old-tractor.png'
          alt: 'Feature showcase'
          caption: ''
        background:
          color: '#f0f0f0'
          isDark: false
          image:
            src: ''
            alt: ''
          imageScreen: 'none'
      - navLabel: 'Customizable'
        isReverse: false
        text:
          leadIn: ''
          title: 'Fully Customizable'
          titleTag: 'h2'
          subTitle: 'Adapt to Your Brand'
          prose: 'Extensive configuration options allow you to customize colors, transitions, timing, and layouts to match your design requirements.'
          isCentered: true
        ctas:
          - url: '#'
            label: 'Get Started'
            isButton: true
            buttonStyle: 'primary'
        background:
          color: ''
          isDark: true
          image:
            src: '/assets/images/sample12.jpg'
            alt: 'Customization background'
          imageScreen: 'dark'
      - navLabel: 'Video BG'
        isReverse: false
        text:
          leadIn: 'Dynamic Backgrounds'
          title: 'Video Background Support'
          titleTag: 'h2'
          subTitle: 'Bring Your Slides to Life'
          prose: 'Add engaging video backgrounds to create immersive experiences. Videos play automatically when the slide is active and pause when transitioning.'
          isCentered: true
        ctas:
          - url: '#'
            label: 'Watch Demo'
            isButton: true
            buttonStyle: 'primary'
        background:
          color: ''
          isDark: true
          video:
            inline: true
            src: 'cloudinary'
            cloudname: 'glinkaco'
            id: 'walking-feet_2_bblav0'
            tn: ''
          imageScreen: 'none'

  - sectionType: hero-slider
    containerTag: section
    classes: 'demo'
    id: ''
    description: 'Example with different background types and content layouts'
    isDisabled: false
    containerFields:
      inContainer: false
      isAnimated: false
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
    autoplay: false
    autoPlayDelay: 5000
    slides:
      - navLabel: 'Solid BG'
        isReverse: false
        text:
          leadIn: ''
          title: 'Solid Color Background'
          titleTag: 'h2'
          subTitle: 'Simple and Clean'
          prose: 'This slide demonstrates a solid color background with centered text content and call-to-action buttons.'
          isCentered: true
        ctas:
          - url: '#'
            label: 'Primary Action'
            isButton: true
            buttonStyle: 'primary'
        background:
          color: '#3498db'
          isDark: true
      - navLabel: 'Image BG'
        isReverse: false
        text:
          leadIn: ''
          title: 'Image Background'
          titleTag: 'h2'
          subTitle: 'With Dark Overlay'
          prose: 'Background images can include optional screen overlays to improve text readability.'
          isCentered: true
        ctas:
          - url: '#'
            label: 'Learn More'
            isButton: true
            buttonStyle: 'primary'
        background:
          color: ''
          isDark: true
          image:
            src: '/assets/images/sample10.jpg'
            alt: 'Background image'
          imageScreen: 'dark'
      - navLabel: 'Split Layout'
        isReverse: false
        text:
          leadIn: ''
          title: 'Split Layout'
          titleTag: 'h2'
          subTitle: 'Text and Image Side by Side'
          prose: 'Slides can include content images that display alongside text for more visual interest.'
          isCentered: true
        image:
          src: '/assets/images/old-tractor-2.png'
          alt: 'Content image'
        background:
          color: '#ecf0f1'
          isDark: false
      - navLabel: 'Vimeo BG'
        isReverse: false
        text:
          leadIn: ''
          title: 'Vimeo Video Background'
          titleTag: 'h2'
          subTitle: 'Multiple Video Providers'
          prose: 'Support for YouTube, Vimeo, and Cloudinary video backgrounds with automatic playback control.'
          isCentered: true
        ctas:
          - url: '#'
            label: 'Explore Videos'
            isButton: true
            buttonStyle: 'primary'
        background:
          color: '#2c3e50'
          isDark: true
          video:
            inline: true
            src: 'vimeo'
            id: '76979871'
            tn: '/assets/images/vimeo-thumb.jpg'
            alt: 'Vimeo background video for hero slider'
          imageScreen: 'dark'

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: ''
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
        ```yaml
        sections:
          - sectionType: hero-slider
            # other settings

            autoplay: true
            autoPlayDelay: 5000
            slides:
              - navLabel: 'Welcome'
                isReverse: false
                text:
                  title: 'Welcome to Our Site'
                  titleTag: 'h1'
                  prose: 'Engaging content that captures attention'
                  isCentered: true
                ctas:
                  - url: '/get-started'
                    label: 'Get Started'
                    isButton: true
                    buttonStyle: 'primary'
                background:
                  color: '#2c3e50'
                  isDark: true
                  image:
                    src: '/assets/images/hero-bg.jpg'
                    alt: 'Hero background'
                  imageScreen: 'dark'
              - navLabel: 'Features'
                isReverse: true
                text:
                  title: 'Amazing Features'
                  prose: 'Discover what makes us different'
                image:
                  src: '/assets/images/feature.jpg'
                  alt: 'Feature image'
                background:
                  color: '#34495e'
                  isDark: true
        ```

        ### Configuration Options

        | Property | Type | Description |
        |----------|------|-------------|
        | `navLabel` | string | Text shown in navigation |
        | `isReverse` | boolean | Reverse content layout direction |
        | `text` | object | Text content (title, subtitle, prose, etc.) |
        | `ctas` | array | Call-to-action buttons |
        | `image` | object | Content image (shown alongside text) |
        | `background` | object | Background configuration with color, image, or video |

        #### Notes

        - Keep to 3-5 slides for optimal user experience
        - Use short, descriptive labels (1-2 words)
        - 5-7 seconds per slide is recommended
        - Content images automatically hide on mobile devices

        #### Accessibility
        - ARIA labels on navigation elements
        - Keyboard navigation support
        - Pause autoplay on user interaction
---
