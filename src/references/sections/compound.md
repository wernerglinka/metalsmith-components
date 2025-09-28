---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Compound

navigation:
  navLabel: 'Compound Section'
  navIndex: 10

card:
  title: 'Compound'
  description: 'Wrap multiple sections to share common fields and styling.'
  image: '/assets/images/sample18.jpg'
  tags: ['compound', 'wrapper', 'container', 'grouped', 'sections', 'layout']

seo:
  title: Compound Section - Wrap Multiple Sections for Metalsmith
  description: 'Compound section component for wrapping multiple sections with shared configuration and styling for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith compound section, section wrapper, shared configuration, multi-section component'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: "This is a full screen hero section with a background image and text overlay. The proporty 'isFullScreen' is set to true, which turn a standard hero section into full screen."
    isDisabled: false
    isReverse: false
    isAnimated: true
    isFullScreen: false
    targetId: 'first-section'
    date: ''
    author: ''
    containerFields:
      inContainer: false
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: true
        color: ''
        image: '/assets/images/under-construction.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components Library'
      title: Compound Section
      titleTag: 'h1'
      subTitle:
      prose: |-
        A wrapper section that groups multiple sections together, allowing them to share common configuration and styling properties. Perfect for organizing related content sections.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''

  - sectionType: compound
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
        color: '#f5f5f5'
        image: ''
        imageScreen: 'none'
    compoundSections:
      - sectionType: text-only
        isDisabled: false
        containerTag: section
        text:
          leadIn: ''
          title: 'First Compound Section'
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.

        ctas:
          - url: 'https://apple.com'
            label: 'Apples anyone?'
            isButton: true
            buttonStyle: 'primary'

      - sectionType: text-only
        isDisabled: false
        containerTag: aside
        text:
          leadIn: ''
          title: 'Second Compound Section'
          titleTag: 'h2'
          subTitle: ''
          prose: |-
            Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

        ctas:
          - url: 'https://ibm.com'
            label: 'Big Brother watching'
            isButton: true
            buttonStyle: 'primary'

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
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: compound
          compoundSections:
            - sectionType: text-only
              text:
                title: 'First Section'
                prose: 'Content for first section'
            - sectionType: text-only
              text:
                title: 'Second Section'
                prose: 'Content for second section'
        ```

        ### Configuration Options

        #### Wrapper Settings

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `compoundSections` | array | Yes | Array of sections to be wrapped and rendered together |

        #### Individual Section Properties

        Each section within `compoundSections` supports standard section properties:

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `sectionType` | string | Yes | Type of section ('text-only', 'media-image', etc.) |
        | `containerTag` | string | No | HTML tag for the section wrapper |
        | `isDisabled` | boolean | No | Disable the section |
        | `text` | object | No | Text content for the section |
        | `ctas` | array | No | Call-to-action buttons for the section |

        ### Notes

        All wrapped sections inherit the compound section's container fields while maintaining their individual configurations.
---
