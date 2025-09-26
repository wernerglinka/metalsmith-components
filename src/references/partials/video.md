---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Video Partial - Metalsmith Components
  description: 'Video player component supporting YouTube, Vimeo and Cloudinary sources'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Video'
  description: 'Multi-platform video player with modal and in situ modes'
  pattern: ''
  tags: ['video', 'player', 'youtube', 'vimeo', 'modal', 'in situ', in place]

sections:
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
      leadIn: 'Partial Component'
      title: 'Video'
      titleTag: 'h1'
      prose: |
        The Video partial provides a flexible video player that supports YouTube, Vimeo, and Cloudinary video sources. It can display videos in modal overlays or in situ, with customizable thumbnails and play controls.

        ### Manifest

        ```json
        {
          "name": "video",
          "type": "_partials",
          "styles": ["video.css"],
          "scripts": ["video.js"],
          "requires": ["overlay"]
        }
        ```

        ### Configuration

        ```yaml
        video:
          id: 'dQw4w9WgXcQ'
          src: 'youtube'
          tn: '/assets/images/video-thumb.jpg'
          alt: 'Video description'
          inSitu: false
          start: 0
          end: null
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `id` | string | Yes | Video ID from the platform |
        | `src` | string | No | Platform: 'youtube', 'vimeo' (default: 'youtube') |
        | `tn` | string | Yes | Thumbnail image path |
        | `alt` | string | No | Alt text for thumbnail |
        | `inSitu` | boolean | No | Display in situ, not modal |
        | `cloudname` | string | No | Cloudinary cloud name (for Cloudinary videos) |
        | `start` | number | No | Start time in seconds |
        | `end` | number | No | End time in seconds |

        ### Example
        Here is a cheesy example of a video playing in a modal overlay.

  - sectionType: video-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    video:
      id: 'dQw4w9WgXcQ'
      src: 'youtube'
      tn: '/assets/images/dancing.jpg'
      alt: 'Demo video thumbnail'
      inSitu: false

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
      title: 'Usage in Templates'
      titleTag: 'h2'
      prose: |
        ```liquid
        {% from "components/_partials/video/video.njk" import video %}

        {# Modal video (default) #}
        {{ video({
          id: 'dQw4w9WgXcQ'
          src: 'youtube'
          tn: '/assets/images/dancing.jpg'
          alt: 'Demo video thumbnail'
          inSitu: false
        }) }}
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
      title: 'Notes'
      titleTag: 'h3'
      prose: |
        - Supports YouTube, Vimeo, and Cloudinary videos
        - Modal popup or in situ embedding
        - Start and end time parameters
        - Use your own thumbnails
---
