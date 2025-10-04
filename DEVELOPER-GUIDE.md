# Developer Guide

Best practices and lessons learned from building the Metalsmith Components library.

## Key Lessons Learned

### 1. Accuracy is Critical

DO NOT include features that belong to build plugins rather than the components themselves.

**Important Distinction:**
- Always examine the actual component code first
- Distinguish between what the component does vs. what build plugins do
- Example: The image partial only renders `<img>` tags and captions. Image optimization features belong to `metalsmith-optimize-images`, not the partial itself

**When Documenting:**
- Read the .njk template file to understand actual functionality
- Review the component's manifest.json for declared dependencies
- Test the component in isolation to verify behavior
- Separate concerns: component behavior vs. build pipeline features

### 2. Know Your Audience

**Problem**: Initially wrote documentation for end users rather than developers creating new components.

**Solution**:
- Focus on how to import and use components in new section components
- Include technical details like Nunjucks filters (`hasCtas`, `hasText`)
- Provide complete code examples showing integration patterns
- Document the developer workflow, not just the end-user features

**Target Audience:**
- Primary: Developers building new section components
- Secondary: Developers extending or modifying existing components
- Tertiary: End users configuring components via frontmatter

### 3. Validation Schema Updates Required

**Problem**: Added `isSmall` property to button partial but forgot to update validation schemas in sections using CTAs.

**Solution**: When adding properties to partials:
1. Update the partial's manifest.json validation schema
2. Update ALL section manifests that use that partial
3. Run `npm test` to catch validation errors immediately
4. Update component documentation to reflect new properties

**Example:**
```json
"isSmall": {
  "type": "boolean"
}
```

**Workflow:**
```bash
# 1. Add property to partial manifest
# 2. Find all sections using this partial
grep -r "\"ctas\"" lib/layouts/components/sections/*/manifest.json

# 3. Update each section's validation schema
# 4. Test
npm test
```

### 4. Manifest Consistency

**Problem**: Inconsistent manifest structures across components led to bundling issues.

**Solution**: Enforce strict manifest patterns:
- Use `"type": "partial"` for partials (not `"_partials"`)
- Use `"type": "section"` for sections
- Always include `validation` schema (even if minimal)
- List actual dependencies in `requires` array
- Use `modules` field for multi-provider components

**Validation Checklist:**
- [ ] `name` matches directory name
- [ ] `type` is "partial" or "section"
- [ ] `styles` array lists actual CSS files
- [ ] `scripts` array lists actual JS files
- [ ] `requires` lists partial dependencies
- [ ] `validation` schema documents all properties
- [ ] `modules` field used for provider patterns (optional)

### 5. Component Documentation Structure

**Successful Pattern:**

```markdown
---
layout: pages/sections.njk
seo:
  title: [Component Name] - Metalsmith Components
  description: 'Brief description for SEO'
card:
  title: '[Component Name]'
  description: 'Description for search results and cards'
  tags: ['relevant', 'search', 'tags']
sections:
  - sectionType: text-only
    text:
      title: 'Component Name'
      prose: |
        Overview of what this component does and when to use it.

  - sectionType: text-only
    text:
      title: 'Usage'
      prose: |
        How to import and use this component in templates.
        ```njk
        {% from "components/_partials/name/name.njk" import componentName %}
        {{ componentName(data) }}
        ```

  - sectionType: text-only
    text:
      title: 'Configuration'
      prose: |
        Properties and their types...

  - sectionType: component-name
    # Live example

  - sectionType: text-only
    text:
      title: 'Integration Notes'
      prose: |
        How this component works with others...
---
```

## Best Practices

### Documentation Content

1. **Start with actual code examination** - Never assume what a component does
2. **Include complete usage examples** - Show import statements and typical patterns
3. **Specify exact configuration options** - Only document properties that actually exist
4. **Explain integration patterns** - How this component composes with others
5. **Clarify scope** - What the component does vs. what build tools do

### Technical Implementation

1. **Update validation schemas** when adding new properties to any component
2. **Test build integration** to ensure bundling works correctly
3. **Use consistent navigation structure** for discoverability
4. **Maintain separation of concerns** between different component types
5. **Run tests before committing** - `npm test` catches manifest issues early

### Content Organization

1. **Text section** - Brief introduction to the component's purpose
2. **Usage section** - How developers integrate it into new components
3. **Configuration section** - Exact properties and their types
4. **Examples section** - Live demonstrations of different configurations
5. **Integration section** - How it relates to other components

### Testing New Components

After creating a component:

1. **Manifest validation**: `npm test` ensures valid JSON and structure
2. **Build verification**: `npm run build` tests bundling
3. **Development testing**: `npm start` verifies runtime behavior
4. **Visual testing**: Check responsive behavior and accessibility
5. **Integration testing**: Use component in multiple contexts

Common issues to check:
- Missing `type` field in manifest.json
- Using deprecated manifest structure
- Incorrect `requires` dependencies
- Template syntax errors with helper functions
- Missing validation schemas

## Component Creation Workflow

### 1. Plan the Component

- Identify if it's a partial or section
- Determine what partials it depends on
- Sketch the data structure
- Consider validation requirements

### 2. Create Directory Structure

```bash
mkdir -p lib/layouts/components/sections/[component-name]
# or
mkdir -p lib/layouts/components/_partials/[component-name]
```

### 3. Create Manifest First

Start with manifest.json to define the component's contract:
- Name and type
- Dependencies (requires)
- Assets (styles, scripts)
- Validation schema

### 4. Create Template

Build the .njk template following patterns:
- Import required partials
- Use helper functions (hasText, hasCtas)
- Follow data loading patterns
- Add appropriate comments

### 5. Add Styles and Scripts

- Create component-specific CSS
- Add JavaScript if needed for interactivity
- Keep styles scoped to component

### 6. Create Example Configuration

Add .yml file showing typical usage patterns

### 7. Test and Document

- Run `npm test`
- Create demo page in `src/library/`
- Add tags for searchability
- Document integration patterns

## Data Loading Patterns

### From Global Data

```njk
{# Load all items #}
{% if section.items.scope === "all" %}
  {% set itemsList = data[section.items.source] %}
{% endif %}

{# Load selected items by ID #}
{% if section.items.scope === "selections" %}
  {% set itemsList = data[section.items.source] | getSelections(section.items.selections) %}
{% endif %}
```

### From Collections

```njk
{% set collection = collections[section.collectionName] %}
```

### Recursive Data Loading

Maps and other complex components use recursive JSON loading:
```javascript
// Build-time plugin loads all JSON files from lib/data/maps/
// Available in templates as: data.maps.filename
```

## Advanced Patterns

### Multi-Provider Components (Modules Pattern)

For components supporting multiple provider libraries:

**Manifest:**
```json
{
  "modules": {
    "providers": ["provider-a.js", "provider-b.js"],
    "helpers": ["utils.js", "loader.js"]
  }
}
```

**Directory Structure:**
```
component-name/
├── modules/
│   ├── providers/
│   │   ├── provider-a.js
│   │   └── provider-b.js
│   └── helpers/
│       └── utils.js
└── component-name.js  # Main entry, loads appropriate provider
```

**Examples:**
- **maps**: Leaflet vs OpenLayers
- **video**: YouTube vs Vimeo vs Cloudinary
- **podcast**: Different player implementations

### Build-Time Generation

Some components use build-time plugins for optimization:

**Maps Icons:**
- Plugin scans all map data
- Extracts used icons
- Generates icon-loader.js with only needed icons
- Reduces bundle size

**Search Indexes:**
- Plugin scans library pages
- Generates search-index.json
- Enables client-side search

## Troubleshooting

### Build Fails

1. Check manifest.json is valid JSON
2. Verify all required files exist
3. Check partial dependencies are correct
4. Run `npm test` to identify specific issue

### Component Not Rendering

1. Verify component is used in a page
2. Check template syntax
3. Verify data structure matches validation schema
4. Check browser console for JavaScript errors

### Styles Not Applied

1. Verify CSS file listed in manifest.json
2. Check component is actually used (bundler only includes used components)
3. Verify CSS selectors match template structure
4. Check build output for bundled CSS

### Using Chrome DevTools MCP for Advanced Debugging

The Chrome DevTools MCP server enables AI-assisted debugging by giving direct access to a live browser instance. This is particularly valuable for CSS issues where computed styles differ from source code.

**Setup:**
```bash
# Add the MCP server (one-time setup)
claude mcp add chrome-devtools npx "chrome-devtools-mcp@latest"

# Verify it's connected
claude mcp list
```

**Note**: After adding the MCP server, restart your conversation for the tools to become available.

**Available Tools:**
- `mcp__chrome-devtools__navigate_page` - Navigate to URLs
- `mcp__chrome-devtools__evaluate_script` - Run JavaScript in browser context
- `mcp__chrome-devtools__take_screenshot` - Capture visual state
- `mcp__chrome-devtools__take_snapshot` - Get DOM structure
- `mcp__chrome-devtools__list_console_messages` - Check console output
- `mcp__chrome-devtools__list_network_requests` - Analyze network activity
- `mcp__chrome-devtools__performance_start_trace` - Profile performance

**Example: Debugging CSS Padding Issues**

When visual padding doesn't match expectations:

```javascript
// Navigate to the page
mcp__chrome-devtools__navigate_page("http://localhost:3002/your-page/")

// Inspect computed styles
mcp__chrome-devtools__evaluate_script(() => {
  const section = document.querySelector('.section-wrapper');
  const styles = window.getComputedStyle(section);

  return {
    classes: section.className,
    computedPadding: styles.padding,
    paddingTop: styles.paddingTop,
    cssVariables: {
      '--space-s-l': styles.getPropertyValue('--space-s-l'),
      '--section-padding': styles.getPropertyValue('--section-padding')
    }
  };
})
```

**Real Example from This Project:**

Problem: Sections on sidebar pages had no padding despite CSS defining `padding: var(--space-s-l)`.

Using MCP to debug:
1. Navigated to page: `mcp__chrome-devtools__navigate_page(url)`
2. Inspected computed padding: Returned `"padding": "0px"`
3. Checked CSS variables: `--space-s-l` was defined but not applied
4. Discovered override: `body.with-sidebar .section-wrapper { padding: 0; }` in main.css
5. Verified fix by re-checking computed styles: Now showing `"padding": "39.0428px"`

**Advantages Over Source Code Inspection:**
- See actual computed values, not just CSS rules
- Identify specificity and cascade issues
- Verify CSS variable resolution
- Catch runtime JavaScript modifications
- Test responsive behavior at different viewports
- Validate accessibility attributes

**Typical Workflow:**
```bash
# 1. Start dev server
npm start

# 2. In conversation, navigate to page
# Use: mcp__chrome-devtools__navigate_page("http://localhost:3002/page/")

# 3. Inspect computed styles
# Use: mcp__chrome-devtools__evaluate_script to run JS

# 4. Take screenshots to verify fixes
# Use: mcp__chrome-devtools__take_screenshot({ fullPage: true })
```

**When to Use MCP Tools:**
- Debugging CSS specificity issues
- Investigating computed style mismatches
- Checking responsive behavior
- Analyzing network requests
- Performance profiling
- Accessibility testing
- Form interaction testing

### Validation Errors

1. Check manifest validation schema
2. Verify frontmatter matches schema
3. Run `npm test` to see specific validation errors
4. Check required fields are present

## Contributing Guidelines

When contributing new components:

1. Follow existing patterns and conventions
2. Add complete validation schemas
3. Document all properties
4. Create demo page with examples
5. Test across different contexts
6. Update this guide if you establish new patterns

## Resources

- [Metalsmith Documentation](https://metalsmith.io)
- [Nunjucks Template Documentation](https://mozilla.github.io/nunjucks/)
- [JSON Schema Validation](https://json-schema.org/)
- Component examples in `lib/layouts/components/`
