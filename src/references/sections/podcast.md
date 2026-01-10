---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Podcast

navigation:
  navLabel: 'Podcast'
  navIndex: 7

card:
  title: 'Podcast'
  description: 'Professional podcast player with RSS feed integration, Shikwasa player, progressive loading, and episode selection.'
  image: '/assets/images/sample20.jpg'
  tags: ['podcast', 'audio', 'rss', 'player', 'episodes', 'shikwasa', 'streaming']

seo:
  title: Podcast Component - RSS-Powered Player for Metalsmith
  description: 'Dynamic podcast component with RSS feed parsing, Shikwasa player integration, progressive episode loading, and professional audio controls for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith podcast player, RSS feed parser, shikwasa audio player, podcast component, dynamic episodes, progressive loading, podcast website'

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
      title: 'Podcast Section'
      titleTag: 'h1'
      subTitle: ''
      prose: 'A comprehensive podcast player component that dynamically fetches episodes from RSS feeds using the professional Shikwasa audio player. Features a single main player with episode selection, progressive loading, and fallback support for optimal user experience.'

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
      title: 'Podcast Section Examples'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        #### The default section using these options:

        ```yml
          options:
            showEpisodeList: true # Display episode list (default: true)
            initialEpisodes: 5 # Episodes shown initially (default: 5)
            maxEpisodes: 20 # Max episodes to fetch (default: 50)
            autoplay: false # Auto-play first episode (default: false)
            theme: 'dark' # Player theme: 'light', 'dark', 'auto'
            themeColor: '#007aff' # Player accent color
        ```

  - sectionType: podcast
    containerTag: section
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
    podcast: 'ai-fireside-chat'
    options:
      showEpisodeList: true
      autoplay: false
      theme: 'dark'
    ctas:
      - url: ''
        label: ''
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
      title: 'A minimal internal example'
      titleTag: 'h4'
      subTitle: ''
      prose: |-
        ```yml
        options:
          showHeader: false
          showEpisodeList: false 
          initialEpisodes: 5
          maxEpisodes: 20
          autoplay: false
          theme: 'auto'
          themeColor: '#666'
        ```

  - sectionType: podcast
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: false
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    podcast: 'internal-show'
    options:
      showHeader: false
      showEpisodeList: false
      autoplay: false
      themeColor: '#666'
    ctas: []

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
      title: 'Example with image background'
      titleTag: 'h4'
      subTitle: ''
      prose: |-
        ```yml
        options:
          showHeader: false
          showEpisodeList: true 
          initialEpisodes: 3
          simpleEpisodesList: true
          maxEpisodes: 20
          autoplay: false
          theme: 'auto'
          themeColor: '#666'
        ```

  - sectionType: podcast
    containerTag: section
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
        isDark: true
        color: ''
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark' # light, dark, none
    podcast: 'ezra-klein-show'
    options:
      showHeader: false
      showEpisodeList: true
      initialEpisodes: 3
      simpleEpisodesList: true
      maxEpisodes: 20
      autoplay: false
      theme: 'auto'
      themeColor: '#666'
    ctas: []

  - sectionType: text-only
    containerTag: section
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
        - sectionType: podcast
          containerTag: section
          # container settings

          podcast: 'ai-fireside-chat'    # references data/podcasts/ai-fireside-chat.json
          options:
            showEpisodeList: true        # Display episode list (default: true)
            initialEpisodes: 5           # Episodes shown initially (default: 5)
            maxEpisodes: 50              # Max episodes to fetch (default: 50)
            autoplay: false              # Auto-play first episode (default: false)
            theme: 'auto'                # Player theme: 'light', 'dark', 'auto'
            themeColor: '#007aff'        # Player accent color
          ctas:
            - url: 'https://example.com/subscribe'
              label: 'Subscribe to Podcast'
              isButton: true
              buttonStyle: 'primary'
        ```

        ### Data Structure - RSS-Based (Recommended)

        Create podcast data files in `lib/data/podcasts/[name].json` with RSS URL:

        ```json
        {
          "title": "AI Fireside Chat",
          "description": "Conversations about artificial intelligence and technology",
          "coverImage": "/assets/images/ai-fireside-cover.jpg",
          "rssUrl": "https://media.rss.com/fire-side-chat-brady-bunch-shoots-the-shit-1/feed.xml",
          "platform": "apple",
          "podcastUrl": "https://podcasts.apple.com/us/podcast/ai-fireside-chat/id1780606504"
        }
        ```

        ### Data Structure - Static Episodes (Alternative)

        For internal or curated content:

        ```json
        {
          "title": "Internal Tech Talk",
          "description": "Weekly discussions about web development",
          "coverImage": "/assets/images/internal-cover.jpg",
          "platform": "internal",
          "episodes": [
            {
              "id": "episode-1",
              "title": "Getting Started with Static Sites",
              "episodeNumber": "001",
              "publishDate": "2024-01-20",
              "duration": "12:45",
              "audioFile": "/assets/audio/episode-001.mp3",
              "thumbnail": "/assets/images/episode-001.jpg",
              "description": "An introduction to static site generators."
            }
          ]
        }
        ```

        ### Player Features (Shikwasa)

        - **Advanced Controls** - Play/pause, progress bar, volume, speed control
        - **Speed Options** - 0.75x, 1x, 1.25x, 1.5x, 2x playback speeds
        - **Keyboard Navigation** - Space (play/pause), arrow keys (seek), M (mute)
        - **Chapter Support** - Displays chapters if available in podcast
        - **Download Option** - Built-in download functionality
        - **Theme Support** - Light, dark, and auto (system preference) themes


        #### Podcast Data

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `podcast` | string | Yes | Name of JSON file in `data/podcasts/` directory |

        #### Player Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `showEpisodeList` | boolean | No | Display episode selection list (default: true) |
        | `initialEpisodes` | number | No | Episodes shown initially (default: 5) |
        | `maxEpisodes` | number | No | Maximum episodes to fetch from RSS (default: 50) |
        | `autoplay` | boolean | No | Auto-play first episode on load (default: false) |
        | `theme` | string | No | Player theme - 'light', 'dark', 'auto' (default: 'auto') |
        | `themeColor` | string | No | Player accent color in hex format (default: '#007aff') |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `ctas` | array | No | Optional array of call-to-action buttons |

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'podcast'
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
      title: 'Download Podcast Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete podcast component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/podcast.zip'
        label: 'Download Podcast Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
