---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Lottie Partial - Metalsmith Components
  description: 'Lottie animation player component for interactive animations'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Lottie'
  description: 'Animation player for Lottie JSON animations'
  pattern: 'simple-gray3'
  tags: ['lottie', 'animation', 'interactive', 'json', 'player']

sections:
  - sectionType: text-only
    containerTag: section
    classes: 'first-text-section'
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
      title: 'Lottie'
      titleTag: 'h1'
      prose: |
        The Lottie partial integrates Lottie animations into components. It loads the Lottie player library and creates an animation player with configurable settings for speed, looping, and autoplay.

        ### Manifest

        ```json
        {
          "name": "lottie",
          "type": "_partials",
          "styles": ["lottie.css"],
          "scripts": [],
          "requires": []
        }
        ```

        ### Configuration

        ```yaml
        lottie:
          src: '/assets/lotties/example4.json'
          speed: 1
          control:
            autoplay: true
            loop: true
        ```

        ### Configuration Options

        | Property | Type | Required | Default | Description |
        |----------|------|----------|---------|-------------|
        | `src` | string | Yes | - | Path to Lottie JSON file |
        | `speed` | number | No | 1 | Animation playback speed |
        | `control.autoplay` | boolean | No | false | Start playing automatically |
        | `control.loop` | boolean | No | false | Loop the animation |


        ### Example

  - sectionType: lottie-only
    containerTag: section
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: true
        bottom: true
      background:
        isDark: false
    text:
      title: 'Lottie Animation Demo'
      titleTag: 'h2'
      prose: 'This component supports Lottie animations for enhanced visual experiences.'
    lottie:
      src: '/assets/lotties/example4.json'
      speed: 1
      control:
        autoplay: true
        loop: true

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
        {% from "components/_partials/lottie/lottie.njk" import lottie %}

        {{ lottie(section.lottie) }}
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
        - Loads Lottie player from CDN
        - Speed, loop, and autoplay configuration
        - Uses the modern lottie-player web component
---
