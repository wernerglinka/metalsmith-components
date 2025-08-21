---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

navigation:
  navLabel: 'From YAML to HTML'
  navIndex: 2

seo:
  title: From YAML to HTML - Metalsmith Component Build Process
  description: 'Complete guide to understanding how Metalsmith transforms YAML configurations into HTML pages. Learn the template hierarchy, Nunjucks macros, data flow, and debugging techniques.'
  socialImage: '/assets/images/sample8.jpg'
  canonicalURL: ''
  keywords: 'metalsmith build process, YAML to HTML, nunjucks templates, template hierarchy, component rendering, static site pipeline, metalsmith tutorial, debugging metalsmith'

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
        image: '/assets/images/sample8.jpg'
        imageScreen: 'dark' # light, dark, none
    text:
      leadIn: 'Metalsmith Components'
      title: Building Structured Pages
      titleTag: 'h1'
      subTitle: 'From YAML configuration to rendered HTML—understanding the component build process'
      prose: Creating pages with Metalsmith Components involves a carefully orchestrated build pipeline that transforms structured YAML data into fully rendered HTML pages. This process leverages template hierarchy, Nunjucks macros, and a modular component system to deliver maintainable, scalable websites.
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
      title: Understanding the Build Pipeline
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When you create a structured page with Metalsmith Components, several coordinated processes transform your content into a complete web page. This transformation happens through a series of well-defined steps that ensure consistency, maintainability, and performance.

        ### The Journey from YAML to HTML

        Your content begins as structured data in the frontmatter of a markdown file. This YAML configuration describes your page's structure, content, and metadata. Unlike traditional markdown pages where content lives in the body, structured pages define everything in the frontmatter, leaving the markdown body empty.

        The build process follows this sequence:

        1. **Metalsmith reads your source file** and parses the YAML frontmatter
        2. **The layout property determines the template** that will render your page
        3. **The sections.njk template orchestrates the rendering** of individual components
        4. **Each section component renders independently** using its own template
        5. **The complete HTML page is generated** and written to your build directory

        This architecture separates content from presentation, allowing you to modify either without affecting the other. Content editors work with structured data while developers maintain templates, creating a clean separation of concerns.

        ## Template Hierarchy and the Sections Template

        The template hierarchy in Metalsmith Components follows a logical inheritance pattern that promotes code reuse and consistency across your site. Understanding this hierarchy is crucial for effective page building.

        #### Base Template (pages/default.njk)
        At the foundation sits the default template that provides the HTML structure common to all pages. This template includes the document head, body wrapper, and any site-wide elements. It defines blocks that child templates can override or extend.

        #### Sections Template (pages/sections.njk)
        The sections template extends the default template and serves as the orchestrator for component-based pages. This template is the heart of the structured page system. When you specify `layout: pages/sections.njk` in your frontmatter, you're telling Metalsmith to use this specialized template.

        The sections template performs several critical functions:

        - **Iterates through the sections array** defined in your frontmatter
        - **Checks each section's status** skipping any marked as disabled
        - **Creates the appropriate container element** based on the containerTag property
        - **Applies container attributes** including classes, IDs, and styling properties
        - **Renders background images** when specified in the configuration
        - **Calls the render-section macro** to process individual components

        Here's how the sections template processes your configuration:

        ```liquid
        {% for section in sections %}
          {% if not section.isDisabled %}
            <{{ section.containerTag }} id="{{ section.id }}" {{ buildContainerAttributes(section) }}>
              
              {% if section.containerFields.background.image %}
                <div class="background-image" style="background-image: url({{ section.containerFields.background.image }})"></div>
              {% endif %}
              
              {{ renderSection(section, site, navigation.breadcrumbs, artMuseums, socialLinks, pageFiles, collections) }}
              
            </{{ section.containerTag }}>
          {% endif %}
        {% endfor %}
        ```

        The template creates semantic HTML containers (section, article, aside, or div) based on your configuration. Each container receives the appropriate attributes for styling, accessibility, and JavaScript hooks. The dynamic container tag approach ensures your HTML remains semantic while providing flexibility in structure.

        ### Component Resolution and Rendering

        The magic happens in the `renderSection` macro. This helper function dynamically loads and executes the appropriate component template based on the `sectionType` property. Since Nunjucks doesn't support dynamic macro invocation, the system uses template includes with a composed path:

        ```liquid
        {% include "../sections/" + section.sectionType + "/" + section.sectionType + ".njk" %}
        ```

        This approach means that a section with `sectionType: hero` loads the template at `components/sections/hero/hero.njk`. Each component template lives in its own directory, maintaining a clean, organized structure.

        ## Nunjucks Macros and Component Composition

        ### The Power of Macros

        Nunjucks macros form the foundation of component reusability in this system. Each component is built from smaller, reusable macro functions that handle specific rendering tasks. This composition pattern creates a flexible, maintainable component library.

        #### Partial Macros
        The system includes a collection of partial macros that render common UI elements:

        - **text macro**: Renders headings and paragraphs in markdown
        - **ctas macro**: Creates call-to-action buttons and links
        - **image macro**: Handles image display with captions and alt text
        - **authorDate macro**: Formats author and date information
        - **icon macro**: Renders SVG icons from the icon library

        These partials live in the `components/_partials` directory and can be imported into any component template. Each partial accepts a configuration object and returns rendered HTML.

        #### Component Templates Using Macros
        Component templates import and compose these partials to create complete sections. Here's how a typical component template structures itself:

        ```liquid
        {% from "components/_partials/ctas/ctas.njk" import ctas %}
        {% from "components/_partials/text/text.njk" import text %}
        {% from "components/_partials/image/image.njk" import image %}

        <div class="media-section content {% if section.isReverse %}is-reverse{% endif %}">
          {% if section.image %}
            <div class="image">
              {{ image(section.image) }}
            </div>
          {% endif %}

          {% if section.text %}
            <div class="text flow">
              {{ text(section.text) }}
              {% if section.ctas and section.ctas | length > 0 %}
                {{ ctas(section.ctas) }}
              {% endif %}
            </div>
          {% endif %}
        </div>
        ```

        The component template imports necessary partials, then conditionally renders them based on the presence of data. This approach ensures that components gracefully handle missing data while maintaining their structure.

        ### Benefits of Macro Composition

        This macro-based architecture provides several advantages:

        **Consistency**: All buttons across your site use the same CTA macro, ensuring uniform styling and behavior. Updates to the macro automatically propagate to all instances.

        **Flexibility**: Components can mix and match partials as needed. A hero section might use text and CTA partials, while a testimonial uses text and author partials.

        **Testability**: Each macro can be tested independently with different data inputs, making it easier to ensure reliability across edge cases.

        **Maintainability**: Changes to partial rendering logic happen in one place. If you need to update how images display captions, you modify only the image macro.

        ## Data Flow Through the System

        ### From Configuration to Output

        Understanding how data flows through the template system helps you debug issues and extend functionality. The journey begins with your YAML configuration and ends with rendered HTML.

        #### Step 1: Frontmatter Parsing
        Metalsmith reads your markdown file and extracts the frontmatter. The YAML parser converts your configuration into JavaScript objects that templates can access. Each property becomes available to the template system.

        #### Step 2: Template Selection
        The `layout` property in your frontmatter determines which template processes your content. For structured pages, this is typically `pages/sections.njk`, though you could create specialized section templates for different page types.

        #### Step 3: Section Iteration
        The sections template receives your complete page data, including the sections array. It iterates through each section, passing the section object and global metadata to the rendering pipeline.

        #### Step 4: Component Rendering
        Each section's configuration flows into its component template. The template receives:
        - The complete section object with all properties
        - Site-wide metadata (site configuration, navigation, etc.)
        - Collection data (blog posts, projects, etc.)
        - Helper data (breadcrumbs, social links, etc.)

        #### Step 5: Partial Execution
        Component templates pass relevant data subsets to partial macros. For example, the text macro receives only the text configuration object, not the entire section data. This focused data passing keeps partials simple and reusable.

        #### Step 6: HTML Generation
        Each partial returns HTML strings that bubble up through the template hierarchy. The component template assembles these strings into a complete section, which the sections template places into the page structure.

        ### Accessing Global Data

        Components can access various global data sources passed through the render pipeline:

        **Site Configuration**: Global settings, metadata, and configuration values defined in your Metalsmith configuration or site.yaml file.

        **Navigation Data**: Menu structures, breadcrumbs, and navigation metadata that components use to create navigation elements or show current location.

        **Collections**: Arrays of content items like blog posts, projects, or team members that components can iterate through to create listings or galleries.

        **Page-Specific Data**: Any additional frontmatter properties defined in your page that aren't part of the sections array.

        This rich data context allows components to be context-aware while remaining modular. A blog listing component can access the posts collection, while a navigation component uses the site menu structure.

        ## Debugging and Troubleshooting

        ### Common Issues and Solutions

        When building structured pages, you might encounter various issues. Understanding the build process helps you quickly identify and resolve problems.

        #### Section Not Rendering
        If a section doesn't appear in your output:

        - Check the `isDisabled` property—it might be set to true
        - Verify the `sectionType` matches an existing component template
        - Ensure the component template file exists at the expected path
        - Check for syntax errors in your YAML configuration

        #### Missing Content
        When content doesn't display within a section:

        - Verify the property names match what the template expects
        - Check that conditional rendering isn't hiding content (empty arrays, missing required fields)
        - Ensure text content is properly indented in YAML
        - Look for typos in property names (YAML is case-sensitive)

        #### Styling Issues
        If sections don't look right:

        - Verify the `classes` property is applied correctly
        - Check that container field settings match your intentions
        - Ensure background images exist at the specified paths
        - Review the `isReverse` and layout modifier properties

        #### Build Errors
        When the build fails:

        - Check YAML syntax (proper indentation, no tabs)
        - Verify all template imports have correct paths
        - Ensure required global data is available (collections, site config)
        - Look for unclosed tags or syntax errors in templates

        ### Development Tips

        **Output YAML properties**: Add YAML properties in your templates to output debugging information during development:

        ```liquid
        <pre>
          {{ section.sectionType }}
        </pre>

        ```

        **Enable Verbose Logging**: Configure Metalsmith to provide detailed build information, helping you track the processing pipeline.

        **Test Incrementally**: Build sections one at a time, verifying each works before adding the next. This isolates issues to specific components.

        **Validate YAML**: Use a YAML validator to check your frontmatter syntax before building. Many editors provide built-in YAML validation.

        **Check Template Paths**: Ensure your component structure matches the expected paths. The renderSection macro expects a specific directory structure.

        ## Summary and Next Steps

        ### Mastering the Build Process

        Understanding how Metalsmith Components transform YAML configurations into rendered HTML empowers you to build sophisticated, maintainable websites. The process leverages:

        - **Template hierarchy** that provides structure and inheritance
        - **The sections template** that orchestrates component rendering
        - **Nunjucks macros** that enable composition and reusability
        - **A clear data flow** from configuration to output

        This architecture separates concerns effectively. Content editors work with structured data in YAML, designers style components with CSS, and developers maintain templates—all without stepping on each other's work.

        ### Key Takeaways

        **Structure Over Inline Content**: By moving content into frontmatter structures, you gain consistency, reusability, and maintainability. Pages become compositions of well-defined components rather than free-form documents.

        **Template Orchestration**: The sections.njk template acts as a conductor, coordinating the rendering of individual components while maintaining page-level cohesion.

        **Macro Composition**: Building components from smaller, reusable macros creates a flexible system where updates propagate automatically and new components can leverage existing partials.

        **Data-Driven Rendering**: The clear flow of data from YAML through templates to HTML makes the system predictable and debuggable. You always know where data comes from and how it's processed.

        The component-based approach with Metalsmith transforms website building from a series of one-off pages into a systematic, scalable process. Each page you build adds to your library of configurations, making the next page faster to create and easier to maintain.

        Start with simple pages, experiment with different section combinations, and gradually build your understanding of how properties affect rendering. Soon, you'll be creating sophisticated, dynamic websites with the simplicity of YAML configuration and the power of a robust template system.

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
      - url: '/library'
        label: 'Browse the component library'
        isButton: true
        buttonStyle: 'primary'
---
