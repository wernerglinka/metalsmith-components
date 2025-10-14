---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building Pages with Metalsmith Components'
  description: 'Learn how to construct pages from reusable components defined in structured frontmatter. A practical guide to the component-based approach with real examples.'
  date: '2025-06-09'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample7.jpg'

seo:
  title: Building Pages with Metalsmith Components
  description: 'Complete guide to building pages with Metalsmith components. Learn structured frontmatter, component composition, and template implementation patterns.'
  socialImage: '/assets/images/sample7.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, page construction, structured frontmatter, component composition, template patterns'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    isDisabled: false
    isFullScreen: false
    isReverse: true
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
        isDark: true
        color: ''
        image: '/assets/images/sample7.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Component-Based Architecture'
      title: Building Pages with Components
      titleTag: 'h1'
      subTitle: 'A practical guide to constructing pages from reusable sections'
      prose: 'Metalsmith Components provide a modular approach to page construction. Instead of embedding all content within markdown body text, pages are assembled from reusable components defined in structured frontmatter.'
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
    classes: 'single-column'
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Pages as Structured Data
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Pages are built by defining a content model in the frontmatter. Each page specifies its layout template and an array of section components. The layout template orchestrates these sections while individual component files handle specific rendering logic.

        This page demonstrates the component-based approach:

        ```yaml
        layout: pages/sections.njk
        bodyClasses: 'sections-page'
        hasHero: true

        navigation:
          navLabel: 'Home'
          navIndex: 0

        seo:
          title: Metalsmith Components
          description: 'A collection of section components for use with Metalsmith'
          socialImage: '/assets/images/sample2.jpg'
          canonicalURL: ''

        sections:
          - sectionType: hero
            # hero configuration
          - sectionType: text-only
            # text-only configuration
          - sectionType: media-image
            # media-image configuration
        ```

        ### Configuration Properties:

        - `layout` determines the template file for page rendering
        - `bodyClasses` adds CSS classes to the body element
        - `navigation` defines menu label and position
        - `seo` contains metadata for search engine optimization
        - `sections` array defines the sequence of components to render

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Composable Sections
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Components are built from smaller, reusable partials. The media-image section demonstrates this composition pattern by combining text, call-to-action buttons, and image partials.

        ### Media Section Configuration

        ```yaml
        - sectionType: media-image
          containerTag: aside
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
              imageScreen: 'none'
          text:
            leadIn: 'And what is this?'
            title: Media Section Example
            titleTag: 'h2'
            isCentered: true
            subTitle: ''
            prose: Example of a media section with text and image. Change positions by setting the 'isReverse' property.
          ctas:
            - url: 'https://metalsmith.io'
              label: 'Metalsmith Central'
              isButton: true
              buttonStyle: 'primary'
            - url: 'https://example.com'
              label: 'Read more'
              isButton: false
              buttonStyle: 'primary'
          image:
            src: '/assets/images/sample7.jpg'
            alt: 'Component example'
            caption: 'Media section demonstration'
        ```

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Component Properties
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The media section combines three primary elements:

        #### Text Component:

        - `leadIn`: Introductory text above the title
        - `title`: Main heading text
        - `titleTag`: HTML heading level (h1-h6)
        - `isCentered`: Centers title over default columns
        - `subTitle`: Secondary heading text
        - `prose`: Body content supporting markdown formatting

        #### CTA Component:

        - `url`: Link destination
        - `label`: Display text
        - `isButton`: Boolean for button vs text link styling
        - `buttonStyle`: Visual style variant

        #### Image Component:

        - `src`: Image file path
        - `alt`: Alternative text for accessibility
        - `caption`: Optional descriptive text

        ```liquid
        {% from "components/_partials/ctas/ctas.njk" import ctas %}
        {% from "components/_partials/text/text.njk" import text %}
        {% from "components/_partials/image/image.njk" import image %}

        <div class="media-image content {% if section.isReverse %}is-reverse{% endif %}">
          {% if section.image %}
            <div class="image">{{ image(section.image)}}</div>
          {% endif %}

          {% if section.text and section.ctas | length > 0 %}
            <div class="text flow">
              {% if section.text %}
                <div class="prose flow">{{ text(section.text)}}</div>
              {% endif %}
              {% if section.ctas | length > 0 %}
                {{ ctas(section.ctas) }}
              {% endif %}
            </div>
          {% endif %}
        </div>
        ```

  - sectionType: text-only
    containerTag: article
    classes: 'single-column'
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
        imageScreen: 'none'
    text:
      leadIn: ''
      title: Benefits of Component-Based Architecture
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The component-based approach provides significant advantages over traditional monolithic templates. Each component exists as an independent unit with its own template and configuration schema, enabling development, testing, and maintenance in isolation. This modularity creates a foundation for systematic page construction.

        Components work across different page types and layouts without modification. A hero section defined once can appear on homepages, landing pages, or blog posts without duplication. This reusability eliminates redundant code and ensures consistency across the site. When component logic needs updating, changes happen in one location and propagate automatically. Updating the CTA button styling, for example, affects all instances across the site without hunting through multiple template files.

        Page restructuring becomes straightforward through frontmatter configuration. Reordering sections or trying different layouts requires no template modifications—simply adjust the sections array in the frontmatter. This flexibility extends to content management where the separation between content structure and presentation logic allows content editors to work with data while developers focus on component implementation. The frontmatter defines what appears on the page while templates determine how it renders.

  - sectionType: blog-navigation
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
        bottom: false
      noPadding:
        top: false
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
---
