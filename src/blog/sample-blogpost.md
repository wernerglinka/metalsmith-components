---
layout: pages/sections.njk
bodyClass: ''
draft: false

seo:
  title: Sample Blog Post Structure - Example Template
  description: 'Example blog post demonstrating the structure with hero section, multiple authors, and blog navigation. Use this as a template for creating new blog posts.'
  socialImage: '/assets/images/sample9.jpg'
  canonicalOverwrite: ''
  keywords: 'blog post example, template structure, author cards, blog navigation'

card:
  title: 'Sample Blog Post Structure'
  date: '2025-06-02'
  author:
    - Albert Einstein
    - Isaac Newton
  thumbnail: '/assets/images/sample9.jpg'
  excerpt: |-
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui nullam quis risus eget urna mollis ornare.

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "This is a blog post hero section. The hero section has a class of 'blog-hero'."
    isDisabled: false
    isFullScreen: false
    isReverse: true
    date: '2025-06-02'
    author:
      - Albert Einstein
      - Isaac Newton
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
        image: '/assets/images/sample9.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: Sample Blog Post Structure
      titleTag: 'h1'
      subTitle: 'Example Template'
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
      title: 'Lorem Ipsum Dolor'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla.

        Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod.

        ```css
        /* Light theme - white gradient */
        .mask::before {
          background-image: linear-gradient(
            to right,
            rgb(255 255 255 / 100%) 0%,
            transparent 100%
          );
        }

        /* Dark theme - dark gradient */
        .dark-theme .mask::before {
          background-image: linear-gradient(
            to right,
            rgb(26 26 26 / 100%) 0%,
            transparent 100%
          );
        }
        ```

        Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.

        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.

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
      inContainer: true
      isAnimated: true
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
    name: 'Albert Einstein'
    logoWidth: 30

  - sectionType: blog-author
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isReverse: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: true
        bottom: true
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    name: 'Isaac Newton'
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
