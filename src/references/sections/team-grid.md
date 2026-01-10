---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Team Grid

navigation:
  navLabel: 'Team Grid'
  navIndex: 26

card:
  title: 'Team Grid'
  description: 'A responsive grid section for displaying team members with photos, roles, bios, and social links. Supports full and compact layout variants.'
  image: '/assets/images/sample24.jpg'
  tags: ['team', 'grid', 'people', 'staff']

seo:
  title: Team Grid Component for Metalsmith.
  description: 'A responsive grid section for displaying team members with photos, roles, bios, and social links. Supports full and compact layout variants.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith team grid, staff directory, team members, people grid, company team'

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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Team Grid'
      titleTag: 'h1'
      subTitle: ''
      prose: |-
        The team grid section displays team members in a responsive grid layout. It supports two variants: a full _grid_ layout with photos, names, roles, bios, and social links, and a _compact_ layout for larger teams that omits bios and uses smaller photos.

  - sectionType: team-grid
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: false
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Leadership Team'
      titleTag: 'h2'
      subTitle: 'Meet the people driving our vision forward'
      prose: ''
    team:
      source: 'team-example'
      layout: 'grid'

  - sectionType: team-grid
    containerTag: aside
    classes: ''
    id: ''
    isDisabled: false
    containerFields:
      inContainer: true
      isAnimated: true
      noMargin:
        top: false
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Our Team'
      titleTag: 'h2'
      subTitle: 'A compact view for larger teams'
      prose: ''
    team:
      source: 'team-example'
      layout: 'compact'

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
        - sectionType: team-grid
          containerTag: aside
          text:
            title: 'Our Team'
            prose: 'Meet the talented people behind our success.'
          team:
            source: 'team-example'     # Loads from lib/data/team/team-example.json
            layout: 'grid'             # Options: grid, compact
        ```

        ### Configuration Options

        #### Layout Options

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `team.layout` | string | No | Layout type ('grid', 'compact'). Defaults to 'grid' |
        | `team.source` | string | Yes | Data file name in `lib/data/team/` directory |

        #### Content

        | Property | Type | Required | Description |
        |----------|------|----------|-------------|
        | `text` | object | No | Optional intro text with title, subtitle, and prose |

        ### Team Member Data Structure

        Each member in the data file should follow this structure:

        ```json
        {
          "name": "Sarah Chen",
          "role": "CEO & Founder",
          "bio": "Passionate about building products that make a difference.",
          "extendedBio": "<p>Extended biography with HTML markup...</p>",
          "image": {
            "src": "/assets/images/team/sarah.jpg",
            "alt": "Sarah Chen"
          },
          "social": [
            { "platform": "linkedin", "url": "https://linkedin.com/in/sarah" },
            { "platform": "twitter", "url": "https://twitter.com/sarah" },
            { "platform": "github", "url": "https://github.com/sarah" },
            { "platform": "email", "url": "mailto:sarah@example.com" },
            { "platform": "website", "url": "https://sarah.dev" }
          ]
        }
        ```

        #### Profile Dialog

        When `extendedBio` is provided (grid layout only), the short bio displays with an ellipsis and a "More" link that opens a modal dialog with the full biography. The dialog uses the native HTML `<dialog>` element for accessibility (focus trapping, backdrop click, Escape key to close).

        Supported social platforms: twitter, linkedin, github, email, website.

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'team-grid'
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
      title: 'Download Team Grid Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete team grid component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/team-grid.zip'
        label: 'Download Team Grid Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
