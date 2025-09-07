---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true
title: Podcast

navigation:
  navLabel: 'Podcast'
  navIndex: 7

card:
  title: 'Podcast'
  description: 'Professional podcast player with RSS feed integration, Shikwasa player, progressive loading, and episode selection.'
  image: '/assets/images/sample16.jpg'

seo:
  title: Podcast Component - RSS-Powered Player for Metalsmith
  description: 'Dynamic podcast component with RSS feed parsing, Shikwasa player integration, progressive episode loading, and professional audio controls for Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith podcast player, RSS feed parser, shikwasa audio player, podcast component, dynamic episodes, progressive loading, podcast website'

sections:
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
      title: 'Podcast Section'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        A comprehensive podcast player component that dynamically fetches episodes from RSS feeds using the professional Shikwasa audio player. Features a single main player with episode selection, progressive loading, and fallback support for optimal user experience.

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

        ### Key Features

        - **Dynamic RSS Parsing** - Automatically fetches episodes from podcast RSS feeds
        - **Professional Audio Player** - Powered by Shikwasa with advanced controls and speed adjustment
        - **Progressive Loading** - Shows 5 episodes initially with "Load More" functionality  
        - **Single Main Player** - Clean UI with one player and episode selection list
        - **CORS Proxy Fallback** - Handles cross-origin RSS feeds automatically
        - **iTunes Metadata Support** - Full support for iTunes podcast tags and namespaces
        - **Mobile Optimized** - Touch-friendly controls and responsive design
        - **Graceful Fallbacks** - HTML5 audio fallback when Shikwasa fails to load

        ### Player Features (Shikwasa)

        - **Advanced Controls** - Play/pause, progress bar, volume, speed control
        - **Speed Options** - 0.75x, 1x, 1.25x, 1.5x, 2x playback speeds
        - **Keyboard Navigation** - Space (play/pause), arrow keys (seek), M (mute)
        - **Chapter Support** - Displays chapters if available in podcast
        - **Download Option** - Built-in download functionality
        - **Theme Support** - Light, dark, and auto (system preference) themes

        ### Progressive Loading

        1. **Initial Load** - Shows first 5 episodes (configurable)
        2. **Load More Button** - Displays remaining episode count
        3. **Batch Loading** - Loads 5 more episodes per click
        4. **Auto-removal** - Button disappears when all episodes loaded

        ### Specific podcast properties

        - `podcast`: Name of JSON file in `data/podcasts/` (required)
        - `options.showEpisodeList`: Display episode selection list (default: true)
        - `options.initialEpisodes`: Episodes shown initially (default: 5)
        - `options.maxEpisodes`: Maximum episodes to fetch from RSS (default: 50)
        - `options.autoplay`: Auto-play first episode on load (default: false)
        - `options.theme`: Player theme - 'light', 'dark', 'auto' (default: 'auto')
        - `options.themeColor`: Player accent color in hex (default: '#007aff')
        - `ctas`: Optional array of call-to-action buttons

        This component is perfect for professional podcasts, educational content, company communications, or any audio content that benefits from RSS automation and professional playback controls.

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
        bottom: true
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
      title: 'Podcast Section'
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        A minimal internal example with:

        ```yml
        showHeader: false
        showEpisodeList: false
        autoplay: false
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
        bottom: true
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
    ctas: []

  - sectionType: podcast
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
    podcast: 'anthropic'
    options:
      showHeader: false
      showEpisodeList: true
      autoplay: false
    ctas: []
---
