# Creating a Partials Library

This document outlines the process and lessons learned from creating the partials library for the Metalsmith Components project.

## Overview

The partials library serves as documentation for developers who want to understand and use partial components when creating new section components. Unlike the sections library which demonstrates complete page building blocks, the partials library documents the foundational UI elements that compose larger sections.

## Implementation Steps

### 1. Created Library Structure

```
src/
├── partials-library.md           # Main library page
└── partials/                     # Individual partial documentation
    ├── button.md
    ├── ctas.md
    ├── image.md
    └── [other-partials].md
```

### 2. Updated Build Configuration

**Added partials collection** in `metalsmith.js`:
```javascript
partials: {
  pattern: 'partials/*.md',
  sortBy: 'seo.title',
  reverse: false
}
```

**Created search index generator** `plugins/generate-partials-search-index.js` for partials-specific search functionality.

**Updated exclusion lists** to prevent search indexes from being processed as pages:
```javascript
// Search plugin ignore list
ignore: [
  '**/search-index.json',
  '**/library-search-index.json',
  '**/partials-search-index.json'
]

// Navigation exclude patterns
navExcludePatterns: [
  'search-index.json',
  'library-search-index.json',
  'partials-search-index.json'
]
```

### 3. Created Individual Partial Documentation

Each partial documentation page follows this structure:

```yaml
---
layout: pages/sections.njk
seo:
  title: [Partial Name] - Metalsmith Components
  description: 'Brief description of the partial'
card:
  title: '[Partial Name]'
  description: 'Description for search/cards'
  tags: ['relevant', 'tags', 'for', 'search']
sections:
  # Hero section introducing the partial
  # Overview section with usage examples
  # Live examples section
  # Integration notes section
---
```

## Key Lessons Learned

### 1. Accuracy is Critical

DO NOT include features that belong to build plugins rather than the partials themselves.

- Always examine the actual partial code first
- Distinguish between what the partial does vs. what build plugins do
- For the image partial: it only renders `<img>` tags and captions, optimization features belong to `metalsmith-optimize-images`

### 2. Know Your Audience

**Problem**: Initially wrote documentation for end users rather than developers creating new components.

**Solution**:
- Focus on how to import and use partials in new section components
- Include technical details like Nunjucks filters (`hasCtas`)
- Provide complete code examples showing integration patterns

### 3. Validation Schema Updates Required

**Problem**: Added `isSmall` property to button partial but forgot to update validation schemas.

**Solution**: Updated all section manifests that include CTA validation to allow the `isSmall` property:
```json
"isSmall": {
  "type": "boolean"
}
```

Coding details are considered internal will not be included in the documentation.


## Documentation Template

Based on the successful patterns, here's a template for future partial documentation:

```markdown
---
layout: pages/sections.njk
seo:
  title: [Partial] Partial - Metalsmith Components
  description: 'Brief description'
card:
  title: '[Partial Name]'
  description: 'Search description'
  tags: ['relevant', 'search', 'tags']
sections:
  - sectionType: text-only
    # Overview and usage in templates

  - sectionType: text-only
    # Live examples with different configurations

  - sectionType: text-only
    # Integration notes and technical details
---
```

## Best Practices

### Documentation Content

1. **Start with actual code examination** - Never assume what a partial does
2. **Include complete usage examples** - Show import statements and typical patterns
3. **Specify exact configuration options** - Only document properties that actually exist
4. **Explain integration patterns** - How this partial composes with others
5. **Clarify scope** - What the partial does vs. what build tools do

### Technical Implementation

1. **Update validation schemas** when adding new properties
2. **Test build integration** to ensure search indexes generate correctly
3. **Use consistent navigation structure** for discoverability
4. **Maintain separation of concerns** between different search indexes

### Content Organization

1. **Text section** - Brief introduction to the partial's purpose
2. **Usage section** - How developers integrate it into new sections
3. **Configuration section** - Exact properties and their types
4. **Examples section** - Live demonstrations of different configurations
5. **Integration section** - How it relates to other partials and sections

## Future Expansion

To complete the partials library:

1. **Document remaining partials** using the established template
2. **Cross-reference relationships** between partials and sections
3. **Add advanced integration examples** showing multiple partials working together
4. **Consider creating a "composition guide"** showing how partials combine to create sections

This approach ensures comprehensive, accurate documentation that serves the target audience of developers building new section components.