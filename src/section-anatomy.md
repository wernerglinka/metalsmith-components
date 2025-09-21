---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'Section Anatomy'
  navIndex: 1

seo:
  title: Section Anatomy - Understanding Metalsmith Component Structure
  description: 'Deep dive into Metalsmith component architecture. Learn how hero sections, content blocks, and page sections are structured with YAML configuration and Nunjucks templates.'
  socialImage: '/assets/images/sample12.jpg'
  canonicalURL: ''
  keywords: 'metalsmith section anatomy, component structure, YAML configuration, hero section, component properties, page sections, template architecture, structured content'

sections:
  - sectionType: hero
    containerTag: section
    classes: 'first-section'
    id: ''
    description: 'This is a hero section'
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
        image: '/assets/images/sample12.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: Section Anatomy
      titleTag: 'h1'
      subTitle: 'A component-based approach provides significant advantages over monolithic templates. '
      prose: |-
        Components are independent units with their own templates and configuration schemas, enabling development, testing, and maintenance in isolation. Each component encapsulates its structure, styling, and behavior, making your site architecture more maintainable and scalable.

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
      title: The anatomy of section components
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        On this page we'll dissect the hero component from the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) to understand how modern component-based architecture works in practice.

        The shift from document-oriented to component-oriented content isn't just a technical change—it's a fundamental rethinking of how we build websites. The structured content starter makes this shift practical, providing a complete foundation for building modern sites without modern complexity.

        ### Understanding the Component System
        Before examining specific components, it's important to understand how Metalsmith processes these configurations. Each section component consists of two essential parts:

        **Configuration (YAML)**: Defines the content, structure, and presentation settings for a component instance. This is what content editors work with.

        **Template (Nunjucks/Handlebars)**: Renders the configuration into HTML. Templates interpret the configuration properties to generate the final markup.


        The build pipeline reads your YAML configuration, passes it to the appropriate template based on the sectionType, and outputs rendered HTML. This separation allows you to modify content without touching code, and update templates without affecting content.

        ### Hero Section Example
        Let's examine a real Hero section configuration to understand how components work:

        ```yaml
        - sectionType: hero
          containerTag: section
          classes: 'first-section'
          id: ''
          description: 'This is a hero section'
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
              image: '/assets/images/sample12.jpg'
              imageScreen: 'dark' # light, dark, none
          text:
            leadIn: 'Metalsmith Components'
            title: Section Anatomy
            titleTag: 'h1'
            subTitle: 'A component-based approach provides significant advantages over monolithic templates. '
            prose: Components are independent unit with their own templates and configuration schema, enabling development, testing, and maintenance in isolation.
          ctas:
            - url: ''
              label: ''
              isButton: false
              buttonStyle: 'primary'
          image:
            src: ''
            alt: ''
            caption: ''
        ```

        This configuration describes the hero section displayed at the top of this page. The hero features a background image overlaid with a dark screen for text readability, with white text that remains legible against the darkened background. The section stretches the full width of the viewport while the content remains constrained to a readable width.

        ### Component Property Categories
        The Hero section structure divides into three logical categories, each serving a specific purpose in the component system:

        #### 1. General Section Properties
        These properties control the fundamental behavior and identity of the section:

        ##### Core Properties:

        | Name | Description |
        |------|-------------|
        | `sectionType` | Determines which template renders this section. Each section type (hero, content, gallery, etc.) has a corresponding template file. |
        | `containerTag` | The HTML element that wraps the section. Choose section for standalone content, aside for complementary content, article for self-contained compositions, or div for generic containers. |
        | `classes` | Additional CSS classes for custom styling or JavaScript behavior hooks. |
        | `id` | HTML ID attribute, primarily used as an anchor target for in-page navigation or specific styling. |

        ##### Control Properties:

        | Name | Description |
        |------|-------------|
        | `description` | Human-readable note about the section's purpose. This helps content editors understand the section's role but doesn't affect rendering. |
        | `isDisabled` | Temporarily removes the section from rendering without deleting its configuration. Useful during development or content updates. |
        | `isFullScreen` | Makes the section occupy the entire viewport height, creating immersive banner experiences. |
        | `isReverse` | Reverses the visual order of content columns (image/text) in multi-column layouts. Doesn't apply to single-column sections. |

        #### 2. Container Properties
        Container properties manage the section's visual presentation and spacing behavior:

        ##### Layout Control:

        | Name | Description |
        |------|-------------|
        | `inContainer` | When false, the section's background extends edge-to-edge across the viewport while content remains centered within the standard container width. When true, both background and content are constrained. |
        | `isAnimated` | Enables scroll-triggered animations for the section, typically a fade-in or slide-in effect as the user scrolls. |

        ##### Spacing Control:
        The margin and padding objects provide granular control over section spacing:

        | Name | Description |
        |------|-------------|
        | `noMargin.top` | When true, removes the top margin, allowing sections to connect visually.|
        | `noMargin.bottom` | When true, removes the bottom margin for seamless transitions.|
        | `noPadding.top` | When true, removes internal top padding, bringing content closer to the section edge.|
        | `noPadding.bottom` | When true, removes internal bottom padding.|

        ##### Background Treatment:
        The background object creates rich visual layers:

        | Name | Description |
        |------|-------------|
        |`isDark` | When true, automatically sets text colors to light values for contrast against dark backgrounds. |
        | `color` | Accepts hex color values (#RRGGBB format) for solid background colors. |
        | `image` | Path to a background image file, typically relative to your assets directory. |
        | `imageScreen` | Applies a semi-transparent overlay to background images. Use `dark` for a dark overlay (lightens text), `light` for a light overlay (darkens text), or `none` for no overlay. |

        #### 3. Functional Properties
        These properties contain the actual content that users see:
        ##### Text Component:
        The text object structures your written content hierarchically:

        | Name | Description |
        |------|-------------|
        | `leadIn` | Introductory text that appears above the main title, often styled smaller or differently to establish context. |
        | `title` | The primary heading text that captures attention and communicates the main message. |
        | `titleTag` | Specifies the semantic HTML heading level (h1-h6). Use h1 for page titles, h2 for major sections, and so on for proper document outline. |
        | `subTitle` | Secondary heading that elaborates on the title, typically rendered larger than body text but smaller than the title. |
        | `prose` | Body content that supports markdown formatting, allowing for rich text, links, lists, and emphasis within your content. |

        ##### Call-to-Action (CTA) Component:
        The CTA array enables multiple action buttons or links:

        | Name | Description |
        |------|-------------|
        | `url` | The destination URL when clicked. Can be relative (/about) or absolute (https://example.com). |
        | `label` | The visible text on the button or link. |
        | `isButton` | Boolean flag that determines whether to style as a button (true) or text link (false). |
        | `buttonStyle` | Visual variant when isButton is true. Common values include 'primary', 'secondary', 'tertiary', or 'inverted'. |

        ##### Image Component:
        The image object handles visual media:

        | Name | Description |
        |------|-------------|
        | `src` | Path to the image file, relative to your site root. |
        | `alt` | Alternative text for accessibility, describing the image content for screen readers and when images fail to load. |
        | `caption` | Optional descriptive text displayed below the image, providing context or attribution. |

        ### How Components Compose Pages
        Sections stack vertically to create complete pages. The configuration order determines the rendering order. For example, a typical landing page might consist of:

        1. Hero section (dramatic introduction)
        2. Content section (key benefits)
        3. Gallery section (visual proof)
        4. CTA section (conversion focus)
        5. Footer section (navigation and legal)

        Each section operates independently, allowing you to reorder, add, or remove sections without affecting others. This modularity enables rapid iteration and A/B testing of page layouts.

        ## Property Interactions and Cascading
        Understanding how properties interact helps you create cohesive designs:

        **Visual Hierarchy**: The `titleTag` property affects SEO and accessibility. Use only one h1 per page, typically in your hero section. Subsequent sections should use h2 for main headings.

        **Spacing Rhythm**: Combine margin and padding controls to create visual rhythm. For example, remove bottom margin from a hero and top margin from the following section to create a connected flow.

        **Background Layering**: When using both `color` and `image` properties, the color acts as a fallback while the image loads, preventing layout shift.

        **Responsive Behavior**: The `isReverse` property typically applies only on larger screens. On mobile devices, sections often stack vertically regardless of this setting.

        ## Best Practices for Component Configuration
        **Accessibility First**: Always provide meaningful `alt` text for images and use semantic HTML tags appropriately. The `titleTag` should reflect the document 

        **Performance Considerations**: Reference optimized images in your background and image properties. Large background images should be compressed and properly sized for web delivery.

        **Content Strategy**: Use `leadIn` text to provide context, especially when sections might be viewed independently (through deep linking or search results).

        **Maintainability**: Use the `description` field to document the section's purpose, especially for complex layouts or when multiple team members edit content.

        This component-based approach transforms how we think about web pages—from monolithic documents to composable, reusable sections that adapt to changing content needs while maintaining consistent quality and performance.
    ctas:
      - url: ''
        label: ''
        isButton: true
        buttonStyle: 'primary'

  - sectionType: banner
    containerTag: aside
    classes: 'cta-banner'
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
        image: '/assets/images/sample7.jpg'
        imageScreen: 'light' # light, dark, none
    text:
      leadIn: ''
      title: ''
      titleTag: 'h3'
      isCentered: false
      subTitle: ''
      prose: ''
    ctas:
      - url: '/yaml-to-html'
        label: 'Follow the journey from YAML to HTML'
        isButton: true
        buttonStyle: 'primary'
---
