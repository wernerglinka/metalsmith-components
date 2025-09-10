---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Audio Only

navigation:
  navLabel: 'Audio Only'
  navIndex: 6

card:
  title: 'Audio Only'
  description: 'Dedicated audio section for podcasts, music, and audio content with optional background images.'
  image: '/assets/images/sample24.jpg'

seo:
  title: Audio Only Component - Audio Sections for Metalsmith
  description: 'Dedicated audio section for podcasts, music, and audio content with optional background images. Perfect for audio-focused content in Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith audio section, audio component, podcast player, music section, audio-only layout, media section, audio content'

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
      leadIn: ''
      title: 'Audio Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A specialized section for audio content including podcasts, music, sound effects, or any audio media. Supports multiple audio formats with optional background imagery.

        ```yaml
        - sectionType: audio-only
          containerTag: section
          # container settings

          audio:
            ogg: '/assets/audio/podcast-episode.ogg'    # OGG audio file
            mpeg: '/assets/audio/podcast-episode.mp3'   # MP3 audio file
            bgImage: '/assets/images/podcast-cover.jpg' # Optional cover image
            alt: 'Podcast episode cover art'           # Alt text for cover image
          ctas:
            - url: 'https://example.com/podcast'
              label: 'Subscribe to Podcast'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Audio Format Support

        The audio component supports multiple formats for maximum browser compatibility:
        - **OGG**: Open-source audio format, excellent quality
        - **MP3**: Widely supported audio format
        - Browsers automatically choose the best supported format

        ### Visual Enhancement

        - **Background Image**: Optional cover art, album artwork, or related imagery
        - **Responsive Design**: Audio player adapts to different screen sizes
        - **Custom Styling**: Audio controls match your site's design theme

        ### Specific audio-only properties

        - `audio.ogg`: Path to OGG audio file (recommended for quality)
        - `audio.mpeg`: Path to MP3 audio file (required for compatibility)  
        - `audio.bgImage`: Optional background/cover image path
        - `audio.alt`: Alternative text for the background image
        - `ctas`: Optional array of call-to-action buttons

        This component is perfect for podcasts, music samples, audio testimonials, or any audio-focused content.

  - sectionType: audio-only
    containerTag: section
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
        top: true
        bottom: true
      background:
        isDark: true
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    audio:
      ogg: '/assets/audio/shattered-reflections.ogg'
      mpeg: '/assets/audio/shattered-reflections.mp3'
      bgImage: '/assets/images/sample8.jpg'
      alt: 'Music album cover'
    ctas:
      - url: 'https://suno.com/s/eQgA4HNfXWCFSPwK'
        label: 'Another Track'
        isButton: true
        buttonStyle: 'inverted'
---
