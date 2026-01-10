---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Audio Partial - Metalsmith Components
  description: 'Audio partial component for embedding audio players with optional background images'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Audio'
  description: 'HTML5 audio player with multiple format support'
  pattern: 'simple-gray2'
  tags: ['audio', 'media', 'player', 'sound', 'music']

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
      title: 'Audio'
      titleTag: 'h1'
      prose: |
        The Audio partial provides a standard HTML5 audio player with support for multiple audio formats and optional background imagery. It ensures cross-browser compatibility by including both OGG and MPEG audio sources.

        ### Manifest

        ```json
        {
          "name": "audio",
          "type": "_partials",
          "styles": ["audio.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        audio:
          ogg: '/assets/audio/shattered-reflections.ogg'
          mpeg: '/assets/audio/shattered-reflections.mp3'
          bgImage: '/assets/images/sample12.jpg'
          title: 'Shattered Reflections'
          alt: 'Album cover art'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `ogg` | string | Yes | Path to OGG audio file |
        | `mpeg` | string | Yes | Path to MP3 audio file |
        | `title` | string | No | Audio title for accessibility label |
        | `bgImage` | string | No | Background image path |
        | `alt` | string | No | Alt text for background image |


        ### Example

  - sectionType: audio-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: false
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
        imageScreen: 'none'
    audio:
      ogg: '/assets/audio/shattered-reflections.ogg'
      mpeg: '/assets/audio/shattered-reflections.mp3'
      bgImage: ''
      title: 'Shattered Reflections - Audio Sample'
      alt: 'Album artwork'

  - sectionType: text-only
    containerTag: section
    containerFields:
      inContainer: false
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      leadIn: ''
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/audio/audio.njk" import audio %}

        {{ audio(section.audio) }}
        ```

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
      title: 'Features'
      titleTag: 'h2'
      prose: |
        - **HTML5 Audio**: Native browser controls for consistent playback
        - **Multi-Format**: Support for both OGG and MP3 formats
        - **Background Images**: Optional album art or visual accompaniment
        - **Accessible**: Proper ARIA labels and keyboard controls
        - **Responsive**: Adapts to container width

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'audio'
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
      title: 'Download Audio Partial'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete audio component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/partials/audio.zip'
        label: 'Download Audio Partial'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
