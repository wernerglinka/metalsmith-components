---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Video Only

navigation:
  navLabel: 'Video Only'
  navIndex: 5

card:
  title: 'Video Only'
  description: 'Dedicated video section supporting YouTube, Vimeo, and Cloudinary with modal and inSitu playback options.'
  image: '/assets/images/sample21.jpg'
  tags: ['video', 'youtube', 'vimeo', 'cloudinary', 'media', 'player', 'modal']

seo:
  title: Video Only Component - Video Sections for Metalsmith
  description: 'Dedicated video section supporting YouTube, Vimeo, and Cloudinary with modal and inSitu playback options. Perfect for video content, tutorials, and media-rich Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith video section, video component, youtube embed, vimeo player, video-only layout, media section, video content'

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
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Video Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A section for displaying video content from YouTube, Vimeo, and Cloudinary with modal and inSitu playback options. Essentially a section wrapper for the video partial.

  - sectionType: video-only
    containerTag: section
    classes: 'inSitu-example'
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
    video:
      inSitu: true
      src: youtube
      id: 'OorZcOzNcgE'
      tn: '/assets/images/sample13.jpg'
      alt: 'YouTube video tutorial - inSitu playback example'
    ctas:
      - url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'tertiary'

  - sectionType: video-only
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
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    video:
      inSitu: false
      src: vimeo
      id: '347119375'
      tn: '/assets/images/sample10.jpg'
      alt: 'Vimeo video showcase - click to open in modal'
    ctas:
      - url: 'https://metalsmith.io'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'inverted'

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
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        ### Configuration

        ```yaml
        - sectionType: video-only
          containerTag: section
          # container settings

          video:
            id: 'dQw4w9WgXcQ'            # Video ID from the platform
            src: 'youtube'               # Platform: youtube, vimeo, cloudinary
            tn: '/path/to/thumbnail.jpg' # Thumbnail image
            inSitu: false                # Modal (false) or inSitu (true) playback
            cloudname: 'your-cloud'      # Required for Cloudinary videos
            start: 30                    # Optional start time in seconds
            end: 120                     # Optional end time in seconds
          ctas:
            - url: 'https://example.com/playlist'
              label: 'View Playlist'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Configuration Options

        #### Video Properties

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `video.id` | string | Yes | Video identifier from the platform |
        | `video.src` | string | Yes | Video platform - 'youtube', 'vimeo', or 'cloudinary' |
        | `video.tn` | string | Yes | Thumbnail image path |
        | `video.inSitu` | boolean | No | Boolean for inSitu vs modal playback |
        | `video.cloudname` | string | Conditional | Cloudinary cloud name (required for Cloudinary) |
        | `video.start` | number | No | Start time in seconds |
        | `video.end` | number | No | End time in seconds |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `ctas` | array | No | Optional array of call-to-action buttons |

        ### Notes

        - Supports YouTube, Vimeo, and Cloudinary
        - Supports modal overlay (default) or inSitu Playback
---
