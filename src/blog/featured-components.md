---
layout: pages/sections.njk
bodyClass: ''
draft: false

seo:
  title: Featured Components - Metalsmith Section Types Showcase
  description: 'Discover the full range of Metalsmith components: heroes, galleries, testimonials, CTAs, and more. See how structured content creates maintainable, scalable websites.'
  socialImage: 'https://res.cloudinary.com/glinkaco/image/upload/v1646849499/tgc2022/social_yitz6j.png'
  canonicalOverwrite: ''
  keywords: 'metalsmith components showcase, section types, component examples, hero sections, image galleries, testimonials, CTA components, structured content'

card:
  title: 'Featured Components'
  date: '2025-06-04'
  author:
    - Werner Heisenberg
  image: '/assets/images/sample8.jpg'
  featuredBlogpost: true
  featuredBlogpostOrder: 1
  excerpt: |-
    Explore the various section types included in this starter to see the component system in action.

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "This is a blog post hero section. The hero section has a class of 'blog-hero'."
    isDisabled: false
    isFullScreen: false
    isReverse: true
    date: '2025-06-04'
    author:
      - Werner Heisenberg
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
        isDark: true
        color: ''
        image: '/assets/images/sample8.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: 'Featured Components'
      titleTag: 'h1'
      subTitle: 'Sample Blog'
      prose: ''
    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: text-only
    containerTag: article
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
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h3'
      subTitle: ''
      prose: |-
        Explore the various section types included in this starter to see the component system in action. The hero section demonstrates how to create compelling page headers with configurable backgrounds, calls to action, and typography options. The content sections show how structured text can be more maintainable than traditional Markdown while still supporting rich formatting when needed.

        Image galleries showcase how media-rich components can be configured entirely through frontmatter, eliminating the need for complex shortcodes or embedded HTML. The testimonial sections illustrate how social proof elements can be standardized across your site while remaining flexible enough to accommodate different presentation needs.

        Call-to-action components demonstrate how conversion-focused elements can be deployed consistently throughout your site with centralized styling and behavior management. The contact sections show how even interactive elements can be integrated into the structured content approach.

    ctas:
      - url: ''
        label: ''
        isButton: false
        buttonStyle: 'primary'

  - sectionType: blog-author
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
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    name: 'Werner Heisenberg'
    logoWidth: 30

  - sectionType: blog-navigation
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
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
---
