---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Testimonial

navigation:
  navLabel: 'Testimonial'
  navIndex: 3

card:
  title: 'Testimonial'
  description: 'Display customer testimonials with quotes, citations, portraits, and company logos.'
  image: '/assets/images/sample23.jpg'
  tags: ['testimonial', 'review', 'quote', 'customer', 'feedback', 'social-proof']

seo:
  title: Testimonial Component - Customer Quotes & Reviews for Metalsmith
  description: 'Display customer testimonials with quotes, citations, portraits, and company logos. Professional testimonial section for building trust in Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith testimonial, customer quotes, review component, blockquote section, testimonial with portrait, client feedback, social proof'

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
      title: Testimonial
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The testimonial section renders a blockquote with a quotee and an optional cite. The quotee can have a portrait, name, title, company, and logo.

  - sectionType: testimonial
    containerTag: aside
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
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none' # light, dark, none
    quote:
      text: "You've got to be very careful if you don't know where you are going, because you might not get there."
      cite: 'https://en.wikipedia.org/wiki/Yogi_Berra'
    quotee:
      portrait:
        src: '/assets/images/yogi-berra-baseball-great.jpg'
        alt: "Lawrence Peter 'Yogi' Berra"
      name: 'Yogi Berra'
      title: 'Baseball Great'
      company: 'New York Yankees'
      logo: '/assets/images/new-york-yankees-logo.svg'

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
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: Configuration
      titleTag: 'h2'
      subTitle: ''
      prose: |-

        ```yaml
        - sectionType: testimonial
          containerTag: aside
          classes: ''
          id: ''
          isDisabled: false
          isReverse: false
          containerFields:
            inContainer: false
            isAnimated: true
            noMargin:
              top: true
              bottom: false
            noPadding:
              top: false
              bottom: false
            background:
              color: 'var(--color-background-light)'
              image: ''
              imageScreen: 'none' # light, dark, none
          quote:
            text: "You've got to be very careful if you don't know where you are going, because you might not get there."
            cite: 'https://en.wikipedia.org/wiki/Yogi_Berra'
          quotee:
            portrait:
              src: '/assets/images/yogi-berra-baseball-great.jpg'
              alt: "Lawrence Peter 'Yogi' Berra"
            name: 'Yogi Berra'
            title: 'Baseball Great'
            company: 'New York Yankees'
            logo: '/assets/images/new-york-yankees-logo.svg'
        ```
        ### Configuration Options

        #### Quote Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `quote.text` | string | Yes | The testimonial quote text |
        | `quote.cite` | string | No | Optional URL for quote citation |

        #### Quotee Information

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `quotee.portrait.src` | string | No | Path to portrait image |
        | `quotee.portrait.alt` | string | No | Alt text for portrait image |
        | `quotee.name` | string | No | Name of the person quoted |
        | `quotee.title` | string | No | Job title or role |
        | `quotee.company` | string | No | Company or organization name |
        | `quotee.logo` | string | No | Path to company logo image |

        **Note**: Background color is applied via `containerFields.background.color`, this ensures that the background is applied across the whole viewport if `inContainer: false`
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'testimonial'
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
      title: 'Download Testimonial Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete testimonial component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/testimonial.zip'
        label: 'Download Testimonial Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
