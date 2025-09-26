---
layout: pages/sections-with-sidebar.njk
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
  tags: ['audio', 'music', 'podcast', 'sound', 'media', 'player']

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
      title: 'Audio Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A section for audio content with an optional CTA. Essentially a section wrapper for the audio partial.

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
      - url: 'https://suno.com/'
        label: 'Make your own Music'
        isButton: true
        buttonStyle: 'tertiary'

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
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        ### Configuration

        ```yaml
        - sectionType: audio-only
          containerTag: section
          # container settings

          audio:
            ogg: '/assets/audio/shattered-reflections.ogg'
            mpeg: '/assets/audio/shattered-reflections.mp3'
            bgImage: '/assets/images/sample8.jpg'
            alt: 'Music album cover'
          ctas:
            - url: 'https://suno.com/'
              label: 'Make your own Music'
              isButton: true
              buttonStyle: 'tertiary'
        ```

        ### Configuration Options

        #### Audio Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `audio.ogg` | string | One required* | Path to OGG audio file (recommended for quality) |
        | `audio.mpeg` | string | One required* | Path to MP3 audio file (widely supported) |
        | `audio.bgImage` | string | No | Optional background/cover image path |
        | `audio.alt` | string | No | Alternative text for the background image |

        **At least one audio format (OGG or MP3) must be provided**
---
