---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Video Only

navigation:
  navLabel: 'Video Only'
  navIndex: 5

card:
  title: 'Video Only'
  description: 'Dedicated video section supporting YouTube, Vimeo, and Cloudinary with modal and inline playback options.'
  image: '/assets/images/sample16.jpg'

seo:
  title: Video Only Component - Video Sections for Metalsmith
  description: 'Dedicated video section supporting YouTube, Vimeo, and Cloudinary with modal and inline playback options. Perfect for video content, tutorials, and media-rich Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith video section, video component, youtube embed, vimeo player, video-only layout, media section, video content'

sections:
  - sectionType: video-only
    containerTag: section
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
    video:
      id: 'dQw4w9WgXcQ'
      src: 'youtube'
      tn: '/assets/images/video-thumbnail.jpg'
      inline: false
    ctas:
      - url: 'https://example.com/videos'
        label: 'More Videos'
        isButton: true
        buttonStyle: 'primary'

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
      title: 'Video Only Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A specialized section for displaying video content from multiple sources including YouTube, Vimeo, and Cloudinary. Supports both modal and inline video playback options.

        ```yaml
        - sectionType: video-only
          containerTag: section
          # container settings

          video:
            id: 'dQw4w9WgXcQ'          # Video ID from the platform
            src: 'youtube'             # Platform: youtube, vimeo, cloudinary
            tn: '/path/to/thumbnail.jpg' # Thumbnail image
            inline: false              # Modal (false) or inline (true) playback
            cloudname: 'your-cloud'    # Required for Cloudinary videos
            start: 30                  # Optional start time in seconds
            end: 120                   # Optional end time in seconds
          ctas:
            - url: 'https://example.com/playlist'
              label: 'View Playlist'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Video Sources Supported

        - **YouTube**: Use video ID from YouTube URL
        - **Vimeo**: Use video ID from Vimeo URL  
        - **Cloudinary**: Requires cloudname parameter for video delivery

        ### Playback Options

        - **Modal**: Video opens in a modal overlay (default)
        - **Inline**: Video embeds directly in the page

        ### Specific video-only properties

        - `video.id`: Video identifier from the platform (required)
        - `video.src`: Video platform - 'youtube', 'vimeo', or 'cloudinary' (required)
        - `video.tn`: Thumbnail image path (required)
        - `video.inline`: Boolean for inline vs modal playback
        - `video.cloudname`: Cloudinary cloud name (required for Cloudinary)
        - `video.start`: Start time in seconds (optional)
        - `video.end`: End time in seconds (optional)
        - `ctas`: Optional array of call-to-action buttons

  - sectionType: video-only
    containerTag: section
    classes: ''
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
        color: '#f0f4f8'
        image: ''
        imageScreen: 'none' # light, dark, none
    video:
      inline: true
      src: youtube
      id: 'OorZcOzNcgE'
      tn: '/assets/images/sample13.jpg'
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
        top: true
        bottom: true
      background:
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    video:
      inline: false
      src: vimeo
      id: '347119375'
      tn: '/assets/images/sample10.jpg'
    ctas:
      - url: 'https://metalsmith.io'
        label: 'Learn More'
        isButton: true
        buttonStyle: 'inverted'
---