---
layout: pages/sections.njk
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

seo:
  title: Compound Section - Wrap Multiple Sections for Metalsmith
  description: 'Compound section component for wrapping multiple sections with shared configuration and styling for Metalsmith sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith compound section, section wrapper, shared configuration, multi-section component'

sections:
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
          titleTag: 'h21'
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
---
