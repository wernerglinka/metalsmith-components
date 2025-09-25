---
layout: pages/sections-with-sidebar.njk
bodyClass: ''

seo:
  title: Flip Card Partial - Metalsmith Components
  description: 'Interactive flip card component with front and back content areas'
  socialImage: '/assets/images/metalsmith-starter-social.png'

card:
  title: 'Flip Card'
  description: 'Interactive card that flips to reveal additional content'
  pattern: 'simple-gray3'
  tags: ['card', 'interactive', 'flip', 'animation', 'hover']

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
      title: 'Flip Card'
      titleTag: 'h1'
      prose: |
        The Flip Card partial creates an interactive card that reveals additional content when hovered. It supports both front and back content areas with text -, icon -, and call-to-action partials. 

        ### Manifest

        ```json
        {
          "name": "flip-card",
          "type": "_partials",
          "styles": ["flip-card.css"],
          "scripts": ["flip-card.js"],
          "requires": ["ctas", "text", "image", "commons"]
        }
        ```

        ### Configuration

        ```yaml
        cards:
          - front:
              icon: 'paperclip'
              text:
                leadIn: 'Simple Text Section'
                title: The Card Title
                titleTag: 'h3'
                subTitle: ''
                prose: |-
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna.

            back:
              text:
                leadIn: ''
                title: The Back Title
                titleTag: 'h4'
                subTitle: ''
                prose: |-
                  Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
              ctas:
                - url: 'http://glinka.co'
                  label: 'Learn More'
                  isButton: true
                  buttonStyle: 'primary small'
        ```

        ### Configuration Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `front.icon` | object | No | [Icon](/references/partials/icon/) configuration for front side |
        | `front.text` | object | No | [Text](/references/partials/text/) content for front side |
        | `front.ctas` | array | No | [Call-to-action](/references/partials/ctas/) buttons for front |
        | `back.text` | object | No | Text content for back side |
        | `back.ctas` | array | No | Call-to-action buttons for back |


        ### Example

  - sectionType: flip-cards
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
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
        imageScreen: 'none' # light, dark, none
    cards:
      - front:
          icon: 'paperclip'
          text:
            leadIn: 'Simple Text Section'
            title: The Card Title
            titleTag: 'h3'
            subTitle: ''
            prose: |-
              Cras justo odio, dapibus ac facilisis in, egestas eget quam. Maecenas sed diam eget risus varius blandit sit amet non magna.

        back:
          text:
            leadIn: ''
            title: The Back Title
            titleTag: 'h4'
            subTitle: ''
            prose: |-
              Nullam id dolor id nibh ultricies vehicula ut id elit. Etiam porta sem malesuada magna mollis euismod. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
          ctas:
            - url: 'http://glinka.co'
              label: 'Learn More'
              isButton: true
              buttonStyle: 'primary small'

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
        {% from "components/_partials/flip-card/flip-card.njk" import flipCard %}

        <ul class="flip-cards-list">
          {% for card in section.cards %}
          <li class="flip-card-wrapper">{{ flipCard(card) }}</li>
          {% endfor %}
        </ul>
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
        - Full keyboard navigation and ARIA labels
        - Hover or press Enter/Space to flip
        - Rotate icon shows interactive nature
        - CSS-powered flip animation
---
