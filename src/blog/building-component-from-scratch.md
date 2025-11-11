---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building a Component from Scratch'
  description: 'A comprehensive guide to creating your own Metalsmith component from the ground up, complete with validation, documentation, and submission to the library'
  date: '2025-11-04'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample1.jpg'

seo:
  title: 'Building a Metalsmith Component from Scratch'
  description: 'Complete developer guide for creating, testing, documenting, and submitting components to the Metalsmith Components library'
  socialImage: '/assets/images/sample18.jpg'
  canonicalURL: ''
  keywords: 'metalsmith components, component development, create component, pull request, contribution guide'

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
        image: '/assets/images/sample1.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Component Development'
      title: 'Building Components from Scratch'
      titleTag: 'h1'
      subTitle: 'Create, test, and contribute'
      prose: 'Learn how to build your own Metalsmith component from the ground up, following established patterns and best practices. This comprehensive guide walks you through creating a component that can be submitted to the library via pull request.'
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
      title: ''
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        ## What You'll Learn

        By the end of this guide, you'll understand how to:
        - Set up the component file structure correctly
        - Create a manifest.json with proper validation
        - Build a Nunjucks template following established patterns
        - Write component-specific CSS using design tokens
        - Add optional JavaScript for interactivity
        - Create comprehensive documentation
        - Test your component thoroughly
        - Submit a pull request to the library

        ## Prerequisites

        Before starting, you should have:
        - The [Metalsmith Components library](https://github.com/wernerglinka/metalsmith-components) cloned locally
        - Node.js 18.0.0 or higher installed
        - Solid understanding of HTML, CSS, and JavaScript
        - Familiarity with Nunjucks templating
        - Git knowledge for creating pull requests
        - A code editor 

        ## Understanding Component Types

        The library has two component categories:

        ### Partials
        Small, reusable UI elements that get embedded in larger components. Partials are the building blocks of sections.

        **Examples**: button, icon, image, text, video, audio, navigation

        **Location**: `lib/layouts/components/_partials/[name]/`

        **Use Case**: When you need a small, reusable piece of UI that can be used across multiple sections

        ### Sections
        Large page sections that compose partials and other elements into complete page blocks.

        **Examples**: hero, text-only, cards-list, footer, header

        **Location**: `lib/layouts/components/sections/[name]/`

        **Use Case**: When you need a complete page section that serves as a page building block

        For this tutorial, we'll build a simple section component called **quote-block** that displays a quote with attribution.

        ## Step 1: Plan Your Component

        Before writing any code, plan what your component will do and how it will work.

        ### Quote Block Requirements

        Our component will:
        - Display a blockquote with the quote text
        - Show attribution (author name and title/organization)
        - Optionally include an author photo
        - Support different visual styles (centered, left-aligned)
        - Use semantic HTML for accessibility
        - Be responsive and work in any container size

        ### Sketch the Structure

        ```any
        ┌─────────────────────────────┐
        │  "Quote text goes here..."  │
        │                             │
        │  [Author Photo]             │
        │  Author Name                │
        │  Author Title               │
        └─────────────────────────────┘
        ```

        ### Define the Data Structure

        ```yaml
        - sectionType: quote-block
          classes: "centered"  # or "left-aligned" - controls visual style
          quote: "The quote text"
          author:
            name: "Jane Doe"
            title: "CEO, Example Corp"
            image: "/path/to/photo.jpg"  # optional
        ```

        ## Step 2: Create the Component Directory

        Navigate to the component library root and create the component directory.

        ### Create Directory Structure

        ```bash
        cd /path/to/metalsmith-components/website
        mkdir -p lib/layouts/components/sections/quote-block
        cd lib/layouts/components/sections/quote-block
        ```

        ### Create Required Files

        Create these essential files:

        ```bash
        touch manifest.json
        touch quote-block.njk
        touch quote-block.css
        touch quote-block.yml
        touch README.md
        ```

        Your directory should now look like this:

        ```any
        quote-block/
        ├── manifest.json
        ├── quote-block.njk
        ├── quote-block.css
        ├── quote-block.yml
        └── README.md
        ```

        ## Step 3: Create the Manifest

        The manifest.json file defines your component's metadata, dependencies, and validation rules.

        ### Write manifest.json

        ```json
        {
          "name": "quote-block",
          "type": "section",
          "styles": ["quote-block.css"],
          "scripts": [],
          "requires": ["image", "commons"],
          "validation": {
            "required": ["sectionType", "quote"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "quote-block"
              },
              "quote": {
                "type": "string",
                "minLength": 1
              },
              "author.name": {
                "type": "string"
              },
              "author.title": {
                "type": "string"
              },
              "author.image": {
                "type": "string"
              },
              "containerFields.inContainer": {
                "type": "boolean"
              },
              "containerFields.isAnimated": {
                "type": "boolean"
              }
            }
          }
        }
        ```

        ### Manifest Structure Explained

        **name**: Must match the directory name and component identifier

        **type**: Either "section" or "partial" - determines where the component is used

        **styles**: Array of CSS files to bundle with the component

        **scripts**: Array of JavaScript files (empty if no JavaScript needed)

        **requires**: Dependencies on other components - the bundler will include these automatically

        **validation**: JSON Schema validation rules that ensure frontmatter is correct

        ### Validation Best Practices

        - Always require `sectionType` with a `const` value matching your component name
        - Mark truly required fields in the `required` array
        - Use `enum` for fields with limited options
        - Provide `default` values when sensible
        - Use `minLength` for required string fields to ensure they're not empty
        - Document boolean fields even if not required

        ## Step 4: Create the Nunjucks Template

        The template file renders your component's configuration into HTML.

        ### Write quote-block.njk

        ```nunjucks
        {% from "components/_partials/image/image.njk" import image %}

        <div class="quote-block">
          <blockquote class="quote-content">
            <p class="quote-text">{{ section.quote }}</p>

            {% if section.author %}
              <footer class="quote-attribution">
                {% if section.author.image %}
                  <div class="author-photo">
                    {{ image({
                      src: section.author.image,
                      alt: section.author.name + ' photo'
                    }) }}
                  </div>
                {% endif %}

                <div class="author-info">
                  {% if section.author.name %}
                    <cite class="author-name">{{ section.author.name }}</cite>
                  {% endif %}

                  {% if section.author.title %}
                    <span class="author-title">{{ section.author.title }}</span>
                  {% endif %}
                </div>
              </footer>
            {% endif %}
          </blockquote>
        </div>
        ```

        ### Template Patterns Explained

        **Imports**: Import dependent partials at the top using `{% from ... import ... %}`. Here we import the `image` partial for rendering author photos.

        **Default Values**: Use the `default()` filter for optional fields with fallbacks

        **Conditional Rendering**: Only render elements if data exists using `{% if %}`. Notice how the photo, name, and title are all optional.

        **Semantic HTML**: Use appropriate tags like `<blockquote>`, `<cite>`, and `<footer>`

        **Macro Usage**: Call imported macros with data objects: `{{ image({ src: ..., alt: ... }) }}`

        **Accessibility**: Proper alt text, semantic structure, and meaningful class names

        ### Common Template Filters

        Available globally in all templates:

        - `default(value)` - Provide fallback values
        - `mdToHTML` - Convert Markdown to HTML
        - `hasText` - Check if text object has content
        - `hasCtas` - Check if CTAs array exists
        - `isExternal` - Check if URL is external
        - `toLower` / `toUpper` - String transformations

        A complete list of all predefined template filters can be found at `/nunjucks-filters/index.js`. And this is the folder in which you'd add any of your own filters.

        ## Step 5: Write Component Styles

        Create CSS using design tokens for consistency with the rest of the library.

        ### Check Default Rendering First

        Before writing any component-specific styles, build and preview your component to see how it renders with just the base styles from `_css-base.css` and `_design-tokens.css`. This helps you avoid duplicating styles that are already provided by the framework.

        ```bash
        npm run build
        npm start
        ```

        Visit your component's reference page and observe:
        - Which typography styles are already applied
        - What spacing and layout behavior exists by default
        - Which elements inherit appropriate colors and fonts
        - What already works well without custom CSS

        This approach ensures you only write CSS for truly component-specific styling, keeping your stylesheets lean and avoiding conflicts with global styles. You might find that semantic HTML elements like `<blockquote>`, `<cite>`, and `<p>` already have sensible defaults, requiring only minor adjustments for your specific component needs.

        ### Write quote-block.css

        ```css
        /**
         * Quote Block Section Styles
         *
         * Modern CSS Layout Approach:
         * - Container queries for component-level responsiveness
         * - Design tokens for all spacing and colors
         * - Fluid typography with clamp()
         *
         * Design Tokens:
         * - --color-text
         * - --color-text-secondary
         * - --color-primary
         * - --space-s, --space-m, --space-l
         * - --font-quote
         * - --border-radius
         */

        .quote-block {
          /* Container setup for responsive behavior */
          container-name: quote;
          container-type: inline-size;
        }

        .quote-content {
          /* Remove default blockquote margins */
          margin: 0;
          padding: var(--space-l);
          border-left: 4px solid var(--color-primary);
          background: rgb(0 0 0 / 2%);
          border-radius: var(--border-radius);
        }

        .quote-text {
          /* Fluid quote text sizing */
          font-size: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);
          font-style: italic;
          line-height: 1.6;
          color: var(--color-text);
          margin: 0 0 var(--space-m) 0;
        }

        .quote-attribution {
          display: flex;
          align-items: center;
          gap: var(--space-s);
          margin-top: var(--space-m);
          padding-top: var(--space-m);
          border-top: 1px solid rgb(0 0 0 / 10%);
        }

        .author-photo {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3xs);
        }

        .author-name {
          font-weight: 600;
          font-style: normal;
          color: var(--color-text);
        }

        .author-title {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
        }

        /* Centered variant */
        .quote-block.centered {
          .quote-content {
            text-align: center;
            border-left: none;
            border-top: 4px solid var(--color-primary);
          }

          .quote-attribution {
            justify-content: center;
          }
        }

        /* Left-aligned variant (default styling) */
        .quote-block.left-aligned {
          /* Uses default styles defined above */
        }

        /* Container query for responsive behavior */
        @container quote (max-width: 30rem) {
          .quote-attribution {
            flex-direction: column;
            text-align: center;
          }
        }
        ```

        ### CSS Best Practices

        **Design Tokens**: Use CSS custom properties from `_design-tokens.css` for all colors, spacing, and fonts

        **Container Queries**: Use container queries instead of viewport media queries for true component responsiveness

        **Fluid Typography**: Use `clamp()` for responsive text sizing without breakpoints

        **Modern CSS**: Nested selectors, logical properties (`margin-inline`, `padding-block`)

        **Documentation**: Comment your CSS explaining the approach and listing required design tokens

        **Specificity**: Keep selectors shallow and component-scoped

        ## Step 6: Create Example Configuration

        The YAML file shows developers how to use your component.

        ### Understanding the Section Object Structure

        Every section component configuration consists of two types of properties:

        **Standard Container Properties** - These are common to all section components and control the outer wrapper behavior. They're processed by the page layout system helpers (`build_container-attributes.njk` and `render-section.njk`):

        - `sectionType` - Identifies which component to use
        - `containerTag` - HTML tag for the section wrapper (section, article, div, etc.)
        - `classes` - Additional CSS classes for styling variations
        - `id` - HTML id attribute for anchor linking
        - `isDisabled` - Temporarily disable a section without removing it
        - `containerFields` - Wrapper configuration:
          - `inContainer` - Wrap content in a max-width container
          - `isAnimated` - Enable scroll-based animations
          - `noMargin` - Remove top/bottom margins
          - `noPadding` - Remove top/bottom padding
          - `background` - Background color, image, and overlay settings

        **Component-Specific Properties** - These are unique to your component and define its content and behavior. For the quote-block component:

        - `quote` - The quote text to display
        - `author` - Author attribution object with:
          - `name` - Author's name
          - `title` - Author's title or organization
          - `image` - Path to author photo (optional)

        **Note**: Visual styling variants (like centered vs left-aligned) are controlled via the standard `classes` property rather than component-specific properties. This keeps styling concerns in CSS where they belong.

        The standard properties create the outer structure and positioning, while your component-specific properties determine what gets rendered inside that structure. This separation allows consistent page-level control while keeping component logic focused on content presentation.

        ### Write quote-block.yml

        ```yaml
        # Basic quote with centered styling
        - sectionType: quote-block
          containerTag: section
          classes: "centered"
          id: ""
          isDisabled: false
          containerFields:
            inContainer: true
            isAnimated: true
            noMargin:
              top: false
              bottom: false
            noPadding:
              top: false
              bottom: false
            background:
              color: ""
              image: ""
              imageScreen: "none"
          quote: "The best way to predict the future is to invent it."
          author:
            name: "Alan Kay"
            title: "Computer Scientist"
            image: ""

        # Quote with author photo and left-aligned styling
        - sectionType: quote-block
          containerTag: section
          classes: "left-aligned"
          id: ""
          isDisabled: false
          containerFields:
            inContainer: true
            isAnimated: true
            noMargin:
              top: false
              bottom: false
            noPadding:
              top: false
              bottom: false
            background:
              color: ""
              image: ""
              imageScreen: "none"
          quote: "Design is not just what it looks like and feels like. Design is how it works."
          author:
            name: "Steve Jobs"
            title: "Co-founder, Apple Inc."
            image: "/assets/images/author-photo.jpg"

        # Minimal quote without author
        - sectionType: quote-block
          containerTag: section
          classes: ""
          id: ""
          isDisabled: false
          containerFields:
            inContainer: true
            isAnimated: false
            noMargin:
              top: false
              bottom: false
            noPadding:
              top: false
              bottom: false
            background:
              color: ""
              image: ""
              imageScreen: "none"
          quote: "Simplicity is the ultimate sophistication."
          style: "centered"
        ```

        ### Example Configuration Best Practices

        - Provide multiple examples showing different use cases
        - Include all standard containerFields for consistency
        - Show both required and optional properties
        - Demonstrate different style variants
        - Use realistic content that makes the component's purpose clear

        ## Step 7: Write Documentation

        Comprehensive documentation helps other developers use your component effectively.

        ### Write README.md

        ```markdown
        # Quote Block Section Component

        A section component for displaying quotes with optional author attribution and photo.

        ## Features

        - Semantic HTML with proper `<blockquote>` and `<cite>` elements
        - Optional author photo with automatic circular cropping
        - Two layout styles: centered and left-aligned
        - Responsive design with container queries
        - Accessible markup with proper attribution structure
        - Fluid typography that scales smoothly

        ## Usage

        ### Basic Quote

        ```yaml
        sections:
          - sectionType: quote-block
            classes: "centered"
            quote: "Your quote text here"
        ```

        ### Quote with Author

        ```yaml
        sections:
          - sectionType: quote-block
            classes: "left-aligned"
            quote: "Your quote text here"
            author:
              name: "Author Name"
              title: "Author Title/Organization"
              image: "/path/to/author-photo.jpg"
        ```

        ## Properties

        ### Required Properties

        | Property | Type | Description |
        |----------|------|-------------|
        | `sectionType` | string | Must be "quote-block" |
        | `quote` | string | The quote text to display |

        ### Optional Properties

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `classes` | string | "" | CSS classes for styling variants: "centered" or "left-aligned" |
        | `author.name` | string | - | Author's name |
        | `author.title` | string | - | Author's title or organization |
        | `author.image` | string | - | Path to author photo |

        ## Dependencies

        This component requires:
        - **image** partial - For rendering author photos
        - **commons** partial - Base container and styling utilities

        ## Styles

        ### Centered Style
        - Quote text is center-aligned
        - Top border instead of left border
        - Author attribution centered below quote

        ### Left-Aligned Style
        - Quote text is left-aligned
        - Left border accent
        - Author attribution aligned left

        ## Customization

        ### Custom Quote Styles

        You can override the default styles by targeting the component:

        ```css
        /* Custom quote background */
        .quote-block .quote-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        /* Larger author photo */
        .quote-block .author-photo {
          width: 4rem;
          height: 4rem;
        }
        ```

        ## Accessibility

        - Uses semantic `<blockquote>` element for screen readers
        - Proper `<cite>` element for author attribution
        - Meaningful alt text for author photos
        - Sufficient color contrast ratios
        - Keyboard accessible (no interactive elements)

        ## Browser Support

        - Modern browsers with container query support
        - Graceful degradation for older browsers
        - No JavaScript required

        ## Examples

        See `quote-block.yml` for complete examples demonstrating various configurations.

        ### Documentation Best Practices

        - Start with a clear one-sentence description
        - List key features prominently
        - Provide complete, copy-paste-ready examples
        - Document all properties in tables
        - List dependencies explicitly
        - Include customization examples
        - Address accessibility considerations
        - Note browser support requirements

        ## Step 8: Create a Reference Page

        The reference page demonstrates your component in action on the website.

        ### Create src/references/sections/quote-block.md

        ```yaml
        ---
        layout: pages/sections.njk
        bodyClasses: 'sections-page'
        hasHero: false

        card:
          title: 'Quote Block'
          description: 'A section component for displaying quotes with attribution'
          tags: ['quote', 'blockquote', 'testimonial', 'attribution']

        seo:
          title: Quote Block - Metalsmith Components
          description: 'Quote block section component with author attribution and photo'
          socialImage: ''
          canonicalURL: ''
          keywords: 'quote block, blockquote, testimonial, author attribution'

        sections:
          - sectionType: text-only
            containerTag: section
            containerFields:
              inContainer: true
              isAnimated: true
              noMargin:
                top: false
                bottom: false
              noPadding:
                top: false
                bottom: false
              background:
                color: ''
                image: ''
                imageScreen: 'none'
            text:
              title: 'Quote Block Section'
              titleTag: 'h1'
              prose: |-
                The quote block component displays quotes with optional author attribution and photo. Perfect for testimonials, inspiring quotes, or highlighting important statements.

                ## Features

                - Semantic blockquote markup for accessibility
                - Optional author photo with automatic circular cropping
                - Two layout styles: centered and left-aligned
                - Responsive design using container queries
                - Fluid typography that scales smoothly

                ## Usage

                Import and use in your templates, or add to page frontmatter sections array.

          - sectionType: quote-block
            containerTag: section
            containerFields:
              inContainer: true
              isAnimated: true
              noMargin:
                top: false
                bottom: false
              noPadding:
                top: false
                bottom: false
              background:
                color: ''
                image: ''
                imageScreen: 'none'
            quote: "The best way to predict the future is to invent it."
            author:
              name: "Alan Kay"
              title: "Computer Scientist"
              image: ""
            style: "centered"

          - sectionType: quote-block
            containerTag: section
            containerFields:
              inContainer: true
              isAnimated: true
              noMargin:
                top: false
                bottom: false
              noPadding:
                top: false
                bottom: false
              background:
                color: ''
                image: ''
                imageScreen: 'none'
            quote: "Design is not just what it looks like and feels like. Design is how it works."
            author:
              name: "Steve Jobs"
              title: "Co-founder, Apple Inc."
              image: "/assets/images/sample-author.jpg"
            style: "left-aligned"

          - sectionType: text-only
            containerTag: section
            containerFields:
              inContainer: true
              isAnimated: true
              noMargin:
                top: false
                bottom: false
              noPadding:
                top: false
                bottom: false
              background:
                color: ''
                image: ''
                imageScreen: 'none'
            text:
              title: 'Configuration'
              titleTag: 'h2'
              prose: |-
                ## Properties

                | Property | Type | Required | Description |
                |----------|------|----------|-------------|
                | `sectionType` | string | Yes | Must be "quote-block" |
                | `quote` | string | Yes | The quote text to display |
                | `author.name` | string | No | Author's name |
                | `author.title` | string | No | Author's title or organization |
                | `author.image` | string | No | Path to author photo |
                | `style` | string | No | "centered" or "left-aligned" (default: "centered") |

                ## Dependencies

                - **image** - For rendering author photos
                - **commons** - Base styling and utilities
        ---
        ```

        ### Reference Page Best Practices

        - Add meaningful tags for search discoverability
        - Include multiple live examples showing different configurations
        - Document all properties in a table
        - List dependencies clearly
        - Keep it focused on developer usage, not end-user content

        ## Step 9: Test Your Component

        Thorough testing ensures your component works correctly and integrates properly.

        ### Run Component Tests

        ```bash
        # From project root
        npm test
        ```

        This runs all test suites including:
        - Manifest validation (checks your manifest.json structure)
        - Component structure tests
        - Build integration tests

        ### Fix Common Test Failures

        **Manifest not found**:
        - Verify `manifest.json` exists in component directory
        - Check file permissions

        **Invalid manifest structure**:
        - Ensure `type` field is present ("section" or "partial")
        - Verify `name` matches directory name
        - Check that `requires` array only references existing components

        **Template errors**:
        - Verify all imported partials exist
        - Check for typos in macro calls
        - Ensure conditional logic is correct

        ### Build and Visual Testing

        ```bash
        # Build the site
        npm run build

        # Start development server
        npm start
        ```

        Visit `http://localhost:3000/references/sections/quote-block` and test:

        1. **Visual Check** - Component renders correctly with proper styling
        2. **Responsive Behavior** - Resize browser to test container queries
        3. **Multiple Instances** - Different configurations all work
        4. **Missing Data** - Optional fields can be omitted without errors
        5. **Browser DevTools** - No console errors or warnings
        6. **Accessibility** - Use screen reader to verify semantic structure

        ### Test in the Starter

        To ensure portability, test your component in the Metalsmith2025 Starter:

        1. Copy component directory to starter's `lib/layouts/components/sections/`
        2. Copy any new dependencies not already in starter
        3. Create a test page using the component
        4. Build and verify it works identically

        ## Step 10: Prepare for Submission

        Before submitting a pull request, ensure your component meets all requirements.

        ### Pre-Submission Checklist

        **Code Quality**:
        - [ ] All tests pass (`npm test`)
        - [ ] No linting errors (`npm run lint`)
        - [ ] CSS follows design token patterns
        - [ ] JavaScript (if any) is clean and documented
        - [ ] No console errors in browser

        **Documentation**:
        - [ ] README.md is comprehensive and accurate
        - [ ] Example YAML demonstrates all features
        - [ ] Reference page shows live examples
        - [ ] All properties documented in tables
        - [ ] Dependencies listed clearly

        **Accessibility**:
        - [ ] Semantic HTML elements used
        - [ ] Proper ARIA attributes where needed
        - [ ] Keyboard navigation works
        - [ ] Color contrast meets WCAG standards
        - [ ] Tested with screen reader

        **Validation**:
        - [ ] manifest.json includes validation rules
        - [ ] Required fields marked in validation
        - [ ] Enum constraints for limited-option fields
        - [ ] Default values provided where appropriate

        **Portability**:
        - [ ] Component works in starter project
        - [ ] No hardcoded paths or assumptions
        - [ ] All dependencies in manifest.json
        - [ ] Uses standard design tokens only

        ## Step 11: Submit a Pull Request

        Now you're ready to contribute your component to the library.

        ### Fork and Clone

        If you haven't already:

        ```bash
        # Fork the repository on GitHub
        # Then clone your fork
        git clone https://github.com/YOUR-USERNAME/metalsmith-components.git
        cd metalsmith-components/website
        ```

        ### Create a Feature Branch

        ```bash
        # Create and switch to a new branch
        git checkout -b add-quote-block-component
        ```

        ### Commit Your Changes

        ```bash
        # Add all component files
        git add lib/layouts/components/sections/quote-block/
        git add src/references/sections/quote-block.md

        # Create a descriptive commit
        git commit -m "Add quote-block section component

        - Add quote block component with author attribution
        - Support centered and left-aligned styles
        - Include optional author photo
        - Add comprehensive documentation and examples
        - Include validation rules in manifest
        - Create reference page with live examples"
        ```

        ### Push and Create Pull Request

        ```bash
        # Push to your fork
        git push origin add-quote-block-component
        ```

        Then on GitHub:

        1. Navigate to your fork
        2. Click "Compare & pull request"
        3. Write a clear PR description:

        ```markdown
        ## Add Quote Block Section Component

        This PR adds a new quote-block section component for displaying quotes with optional author attribution.

        ### Features
        - Semantic blockquote markup
        - Optional author photo and attribution
        - Two layout styles (centered, left-aligned)
        - Responsive container queries
        - Full accessibility support

        ### Testing
        - [x] All tests pass
        - [x] Component builds successfully
        - [x] Visual testing completed
        - [x] Tested in starter project
        - [x] Documentation complete

        ### Files Changed
        - `lib/layouts/components/sections/quote-block/` - Component files
        - `src/references/sections/quote-block.md` - Reference page

        ### Screenshots
        [Attach screenshots showing the component in action]

        ### Related Issues
        Closes #123 (if applicable)
        ```

        4. Click "Create pull request"

        ### PR Best Practices

        - Use a clear, descriptive title
        - Explain what the component does and why it's useful
        - List all features and capabilities
        - Confirm you've tested thoroughly
        - Include screenshots or animated GIFs
        - Reference related issues if applicable
        - Be responsive to review feedback

        ## Understanding What You Built

        Let's review the architecture of your component:

        ### Component Structure

        You created a self-contained module with everything needed:
        - **manifest.json** - Metadata and validation rules
        - **quote-block.njk** - Template that renders the configuration
        - **quote-block.css** - Component-specific styles
        - **quote-block.yml** - Example configurations
        - **README.md** - Developer documentation
        - **Reference page** - Live demonstrations

        ### How It Works in the Build Pipeline

        When a page uses your component:

        1. Metalsmith reads the page's frontmatter
        2. Finds `sectionType: quote-block` in sections array
        3. Validates the configuration against manifest.json schema
        4. Loads the quote-block.njk template
        5. Passes section data to the template
        6. Template renders HTML using the data
        7. Bundler includes quote-block.css in page assets
        8. Final HTML is written to build directory

        ### Dependency Resolution

        The `requires` array in manifest.json tells the bundler:
        - Include the image partial (for author photos)
        - Include commons (base utilities)
        - Bundle their CSS and JavaScript too
        - Resolve their dependencies recursively

        This ensures all necessary code is included automatically.

        ### Validation Benefits

        The validation rules in manifest.json:
        - Catch configuration errors at build time
        - Provide helpful error messages
        - Document expected data structure
        - Enable IDE autocomplete (with proper tooling)
        - Prevent runtime errors from missing required fields

        ## Next Steps and Advanced Topics

        Now that you've built a basic component, consider these enhancements:

        ### Add Interactive Behavior

        Add JavaScript for features like:
        - Copy quote text to clipboard
        - Share quote on social media
        - Animated quote rotation
        - Interactive hover effects

        ### Support Multiple Data Sources

        Load quotes from external JSON files:

        ```yaml
        - sectionType: quote-block
          items:
            scope: "selections"
            source: "quotes"
            selections: ["quote-1", "quote-2"]
        ```

        ### Advanced Styling Variants

        Create additional style options:
        - Different color schemes
        - Border styles and decorations
        - Typography variations
        - Background patterns

        ### Enhanced Accessibility

        Add advanced accessibility features:
        - Proper landmark roles
        - Enhanced keyboard navigation
        - Screen reader announcements
        - High contrast mode support

        ## Summary

        Congratulations! You've learned how to build a Metalsmith component from scratch. Here's what you accomplished:

        1. Planned component structure and data model
        2. Created proper directory structure
        3. Built a complete manifest.json with validation
        4. Wrote a Nunjucks template following best practices
        5. Created component CSS using design tokens
        6. Provided example configurations
        7. Wrote comprehensive documentation
        8. Created a reference page
        9. Tested thoroughly
        10. Prepared and submitted a pull request

        ### Key Takeaways

        - **Components are self-contained** - Everything needed travels together
        - **Manifest drives behavior** - Validation, dependencies, and bundling all configured here
        - **Design tokens enable theming** - Use CSS custom properties for consistency
        - **Documentation is critical** - Good docs make components reusable
        - **Testing ensures quality** - Thorough testing prevents issues in production
        - **Portability matters** - Components should work in any Metalsmith project

        ### Related Resources

        - [Component Development Guide](/.claude/guides/COMPONENT-GUIDE.md)
        - [Troubleshooting Guide](/.claude/guides/TROUBLESHOOTING.md)
        - [CSS Layouts Skill](/.claude/skills/css-layouts.md)
        - [Understanding Component Validation](/blog/understanding-component-validation)
        - [How Component Bundling Works](/blog/how-component-bundling-works)
        - [Building Interactive Components](/blog/building-interactive-components)
        - [Metalsmith Components Repository](https://github.com/wernerglinka/metalsmith-components)

        Welcome to the community of Metalsmith component developers!

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
        imageScreen: 'none'
---
