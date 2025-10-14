---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Understanding Component Validation with Manifest Schemas'
  description: 'Learn how to use JSON Schema validation in manifest.json files to catch errors early, provide better developer experience, and ensure component configurations are correct.'
  date: '2025-10-14'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample6.jpg'

seo:
  title: Understanding Component Validation - Metalsmith Components
  description: 'Complete guide to component validation using JSON Schema in manifest.json files. Learn validation rules, error handling, and best practices for maintainable components.'
  socialImage: '/assets/images/sample10.jpg'
  canonicalURL: ''
  keywords: 'component validation, json schema, manifest validation, metalsmith validation, type checking, enum validation, nested properties, build-time validation'

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
        image: '/assets/images/sample6.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Quality Assurance'
      title: Component Validation with Manifest Schemas
      titleTag: 'h1'
      subTitle: 'Catch errors before they reach production'
      prose: 'Learn how JSON Schema validation in manifest.json files prevents configuration errors, provides helpful feedback, and makes components easier to use correctly.'
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
      title: 'Why Validate Components?'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Without validation, configuration errors go undetected until runtime - or worse, silently produce incorrect output. Validation catches problems early in the build process.

        **Common errors validation prevents:**
        - Misspelled property names (`isDark` vs `isDArk`)
        - Wrong value types (`true` as string instead of boolean)
        - Invalid enum values (`buttonStyle: "red"` when only `"primary"/"secondary"` allowed)
        - Missing required fields (`mapProvider` required but not provided)
        - Incorrect data structures (object instead of array)

        **Benefits:**
        - **Build-time detection**: Errors caught before deployment
        - **Clear error messages**: Know exactly what's wrong and where
        - **Self-documenting**: Validation schema shows what's expected
        - **Editor support**: IDEs can use schemas for autocomplete
        - **Confidence**: Know your components are configured correctly

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
      title: 'Validation in Manifest Files'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Each component's `manifest.json` can include a `validation` object using JSON Schema syntax:

        **Basic structure:**
        ```json
        {
          "name": "hero",
          "type": "section",
          "styles": ["hero.css"],
          "scripts": [],
          "requires": ["text", "ctas", "image"],
          "validation": {
            "required": ["sectionType"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "hero"
              }
            }
          }
        }
        ```

        The `validation` object defines:
        - **required**: Array of required property names
        - **properties**: Schema for each property's validation rules

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
      title: 'Type Validation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The most basic validation ensures values are the correct type:

        ```json
        {
          "validation": {
            "properties": {
              "isFullScreen": {
                "type": "boolean"
              },
              "title": {
                "type": "string"
              },
              "slideCount": {
                "type": "number"
              },
              "items": {
                "type": "array"
              },
              "settings": {
                "type": "object"
              }
            }
          }
        }
        ```

        **Error examples:**
        ```yaml
        # WRONG - string instead of boolean
        isFullScreen: "true"
        # Error: Property isFullScreen must be boolean, got string

        # WRONG - number instead of string
        title: 42
        # Error: Property title must be string, got number

        # CORRECT
        isFullScreen: true
        title: "Welcome"
        ```

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
      title: 'Enum Validation (Controlled Values)'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Enum validation ensures values come from a predefined list:

        ```json
        {
          "validation": {
            "properties": {
              "mapProvider": {
                "type": "string",
                "enum": ["leaflet", "openlayers"],
                "default": "leaflet"
              },
              "buttonStyle": {
                "type": "string",
                "enum": ["primary", "secondary", "tertiary", "inverted"]
              },
              "imageScreen": {
                "type": "string",
                "enum": ["light", "dark", "none"]
              }
            }
          }
        }
        ```

        **Error examples:**
        ```yaml
        # WRONG - invalid provider
        mapProvider: leaflet.js
        # Error: mapProvider must be one of: leaflet, openlayers

        # WRONG - typo
        buttonStyle: primery
        # Error: buttonStyle must be one of: primary, secondary, tertiary, inverted

        # CORRECT
        mapProvider: leaflet
        buttonStyle: primary
        imageScreen: dark
        ```

        **Enums are perfect for:**
        - Provider choices (leaflet vs openlayers)
        - Style variants (primary, secondary, tertiary)
        - Size options (small, medium, large)
        - Display modes (grid, list, masonry)
        - Theme options (light, dark, auto)

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
      title: 'Const Validation (Exact Values)'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The `const` keyword validates that a property has an exact value:

        ```json
        {
          "validation": {
            "required": ["sectionType"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "hero"
              }
            }
          }
        }
        ```

        This ensures the component is used with the correct `sectionType`:

        ```yaml
        # WRONG - incorrect section type
        - sectionType: hiro
        # Error: sectionType must be exactly "hero"

        # WRONG - wrong component
        - sectionType: banner
        # Error: sectionType must be exactly "hero"

        # CORRECT
        - sectionType: hero
        ```

        Every component validates its `sectionType` to prevent copy-paste errors.

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
      title: 'Nested Property Validation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Use dot notation to validate nested properties:

        ```json
        {
          "validation": {
            "properties": {
              "containerFields.inContainer": {
                "type": "boolean"
              },
              "containerFields.noMargin.top": {
                "type": "boolean"
              },
              "containerFields.noMargin.bottom": {
                "type": "boolean"
              },
              "containerFields.background.isDark": {
                "type": "boolean"
              },
              "containerFields.background.imageScreen": {
                "type": "string",
                "enum": ["light", "dark", "none"]
              },
              "text.titleTag": {
                "type": "string",
                "enum": ["h1", "h2", "h3", "h4", "h5", "h6"],
                "default": "h1"
              }
            }
          }
        }
        ```

        This validates complex frontmatter structures:

        ```yaml
        sections:
          - sectionType: hero
            containerFields:
              inContainer: true
              noMargin:
                top: true
                bottom: false
              background:
                isDark: true
                imageScreen: dark
            text:
              title: 'Welcome'
              titleTag: h1
        ```

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
      title: 'Array Validation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Validate array items with the `items` schema:

        ```json
        {
          "validation": {
            "properties": {
              "ctas": {
                "type": "array",
                "items": {
                  "properties": {
                    "isButton": {
                      "type": "boolean"
                    },
                    "buttonStyle": {
                      "type": "string",
                      "enum": ["primary", "secondary", "tertiary", "inverted"]
                    },
                    "isSmall": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          }
        }
        ```

        This validates each CTA in the array:

        ```yaml
        ctas:
          - url: '/contact'
            label: 'Contact Us'
            isButton: true
            buttonStyle: primary
            isSmall: false
          - url: '/learn-more'
            label: 'Learn More'
            isButton: false
        ```

        **Error example:**
        ```yaml
        ctas:
          - isButton: "yes"        # WRONG - should be boolean
            buttonStyle: red       # WRONG - not in enum
        # Errors:
        # - ctas[0].isButton must be boolean, got string
        # - ctas[0].buttonStyle must be one of: primary, secondary, tertiary, inverted
        ```

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
      title: 'Required Properties'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Specify which properties must be present:

        ```json
        {
          "validation": {
            "required": ["sectionType", "mapProvider", "mapData"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "maps"
              },
              "mapProvider": {
                "type": "string",
                "enum": ["leaflet", "openlayers"]
              },
              "mapData": {
                "type": "string"
              },
              "height": {
                "type": "string"
              }
            }
          }
        }
        ```

        **Error example:**
        ```yaml
        # WRONG - missing required mapData
        - sectionType: maps
          mapProvider: leaflet
          height: 600px
        # Error: Required property mapData is missing

        # CORRECT
        - sectionType: maps
          mapProvider: leaflet
          mapData: london-landmarks
          height: 600px
        ```

        Properties not in `required` are optional. In this example, `height` is optional with a sensible default.

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
      title: 'Default Values'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Specify default values for optional properties:

        ```json
        {
          "validation": {
            "properties": {
              "mapProvider": {
                "type": "string",
                "enum": ["leaflet", "openlayers"],
                "default": "leaflet"
              },
              "text.titleTag": {
                "type": "string",
                "enum": ["h1", "h2", "h3", "h4", "h5", "h6"],
                "default": "h2"
              },
              "settings.maxResults": {
                "type": "number",
                "default": 20
              }
            }
          }
        }
        ```

        **Usage:**
        ```yaml
        # Explicit value
        - sectionType: maps
          mapProvider: openlayers  # Uses openlayers

        # Omitted - uses default
        - sectionType: maps
          # mapProvider defaults to "leaflet"
        ```

        Defaults document expected values and reduce configuration boilerplate.

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
      title: 'Complete Real-World Example'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Here's a complete validation schema from the maps component:

        ```json
        {
          "name": "maps",
          "type": "section",
          "styles": ["maps.css"],
          "scripts": ["maps.js"],
          "requires": ["ctas", "text", "commons"],
          "modules": {
            "providers": ["leaflet.js", "openlayers.js"],
            "helpers": ["load-script.js", "maps-utils.js"]
          },
          "validation": {
            "required": ["sectionType", "mapProvider", "mapData"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "maps"
              },
              "mapProvider": {
                "type": "string",
                "enum": ["leaflet", "openlayers"],
                "default": "leaflet"
              },
              "mapData": {
                "type": "string"
              },
              "height": {
                "type": "string"
              },
              "isDisabled": {
                "type": "boolean"
              },
              "containerFields.inContainer": {
                "type": "boolean"
              },
              "containerFields.background.isDark": {
                "type": "boolean"
              },
              "containerFields.background.imageScreen": {
                "type": "string",
                "enum": ["light", "dark", "none"]
              },
              "text.titleTag": {
                "type": "string",
                "enum": ["h1", "h2", "h3", "h4", "h5", "h6"],
                "default": "h2"
              }
            }
          }
        }
        ```

        This validates everything from required fields to nested container options.

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
      title: 'Understanding Error Messages'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When validation fails, you get clear error messages during the build:

        **Type error:**
        ```json
        Validation error in hero component:
        Property "isFullScreen" must be boolean, got string ("true")
        File: src/index.md, section 1
        ```

        **Enum error:**
        ```json
        Validation error in maps component:
        Property "mapProvider" must be one of: leaflet, openlayers
        Got: "google-maps"
        File: src/maps-demo.md, section 2
        ```

        **Missing required error:**
        ```json
        Validation error in maps component:
        Required property "mapData" is missing
        File: src/maps-demo.md, section 2
        ```

        **Nested property error:**
        ```json
        Validation error in hero component:
        Property "text.titleTag" must be one of: h1, h2, h3, h4, h5, h6
        Got: "heading"
        File: src/about.md, section 1
        ```

        Error messages include:
        - Component name
        - Property path
        - Expected vs actual value
        - File location
        - Section number

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
      title: 'Best Practices for Validation Schemas'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Follow these guidelines when creating validation schemas:

        **1. Validate the component identifier:**
        ```json
        {
          "required": ["sectionType"],
          "properties": {
            "sectionType": {
              "type": "string",
              "const": "your-component"
            }
          }
        }
        ```

        **2. Use enums for controlled values:**
        - Better than type validation alone
        - Documents available options
        - Catches typos and invalid values

        **3. Mark truly required fields:**
        - Only mark as required if component can't function without it
        - Use defaults for optional configuration

        **4. Validate nested structures:**
        - Use dot notation for deep properties
        - Prevents errors in complex configurations

        **5. Include defaults for common options:**
        - Reduces configuration boilerplate
        - Documents expected values

        **6. Validate arrays when items have structure:**
        - Ensures all items follow the same schema
        - Catches errors in each array item

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
      title: 'Common Validation Patterns'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        **Boolean flags:**
        ```json
        {
          "isDisabled": {"type": "boolean"},
          "isReverse": {"type": "boolean"},
          "isFullScreen": {"type": "boolean"}
        }
        ```

        **Heading tags:**
        ```json
        {
          "text.titleTag": {
            "type": "string",
            "enum": ["h1", "h2", "h3", "h4", "h5", "h6"],
            "default": "h2"
          }
        }
        ```

        **Button styles:**
        ```json
        {
          "buttonStyle": {
            "type": "string",
            "enum": ["primary", "secondary", "tertiary", "inverted"],
            "default": "primary"
          }
        }
        ```

        **Screen overlays:**
        ```json
        {
          "imageScreen": {
            "type": "string",
            "enum": ["light", "dark", "none"],
            "default": "none"
          }
        }
        ```

        **Container fields (common across components):**
        ```json
        {
          "containerFields.inContainer": {"type": "boolean"},
          "containerFields.isAnimated": {"type": "boolean"},
          "containerFields.noMargin.top": {"type": "boolean"},
          "containerFields.noMargin.bottom": {"type": "boolean"},
          "containerFields.noPadding.top": {"type": "boolean"},
          "containerFields.noPadding.bottom": {"type": "boolean"},
          "containerFields.background.isDark": {"type": "boolean"}
        }
        ```

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
      title: 'When to Skip Validation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        You don't need to validate everything:

        **Skip validation for:**
        - **Free-form text**: Titles, prose, descriptions
        - **Optional URLs**: Links that may or may not be present
        - **Flexible objects**: Data structures that vary by use case
        - **Pass-through properties**: Values used directly in templates

        **Example - minimal validation:**
        ```json
        {
          "validation": {
            "required": ["sectionType"],
            "properties": {
              "sectionType": {"type": "string", "const": "text-only"}
              // Don't validate text.title, text.prose, etc.
              // They're free-form content
            }
          }
        }
        ```

        Focus validation on:
        - Component identifiers (`sectionType`)
        - Controlled values (enums for providers, styles, modes)
        - Required technical properties (data source names, IDs)
        - Boolean flags that affect rendering
        - Nested configuration objects

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
      title: 'Creating Your Own Validation Schema'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        When building a new component, add validation step-by-step:

        **1. Start with component identifier:**
        ```json
        {
          "validation": {
            "required": ["sectionType"],
            "properties": {
              "sectionType": {
                "type": "string",
                "const": "my-component"
              }
            }
          }
        }
        ```

        **2. Add required properties:**
        ```json
        {
          "validation": {
            "required": ["sectionType", "dataSource"],
            "properties": {
              "sectionType": {"type": "string", "const": "my-component"},
              "dataSource": {"type": "string"}
            }
          }
        }
        ```

        **3. Add controlled values with enums:**
        ```json
        {
          "properties": {
            "sectionType": {"type": "string", "const": "my-component"},
            "dataSource": {"type": "string"},
            "displayMode": {
              "type": "string",
              "enum": ["grid", "list", "masonry"],
              "default": "grid"
            }
          }
        }
        ```

        **4. Add boolean flags:**
        ```json
        {
          "properties": {
            "sectionType": {"type": "string", "const": "my-component"},
            "dataSource": {"type": "string"},
            "displayMode": {
              "type": "string",
              "enum": ["grid", "list", "masonry"],
              "default": "grid"
            },
            "showFilters": {"type": "boolean"},
            "enableSorting": {"type": "boolean"}
          }
        }
        ```

        **5. Test with intentional errors:**
        - Try wrong types
        - Try invalid enum values
        - Omit required fields
        - Use nested properties incorrectly

        The build will show you if validation is working correctly.

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
      title: 'Summary'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Component validation with manifest schemas provides essential quality assurance:

        - **Build-time errors**: Catch problems before deployment
        - **Clear messages**: Know exactly what's wrong and where
        - **Type safety**: Ensure properties are correct types
        - **Enum validation**: Control allowed values
        - **Required fields**: Guarantee essential properties exist
        - **Nested validation**: Validate complex configurations
        - **Defaults**: Document and provide sensible defaults
        - **Self-documenting**: Schemas show what components expect

        Every component in this library includes validation in its manifest. Use these examples as templates for your own components, and let validation catch errors early in your development workflow.

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
