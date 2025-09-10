# Search Section Component

A comprehensive search component that provides fuzzy search functionality across your Metalsmith site content using Fuse.js and the metalsmith-search plugin.

## Features

- **Fuzzy Search**: Powered by Fuse.js for intelligent search matching
- **Component-Aware**: Understands your site's component-based architecture
- **Multi-Level Search**: Search both page-level and section-level content
- **Real-time Results**: Instant search with debounced input
- **Filtering**: Filter by content type and component type
- **Keyboard Shortcuts**: Ctrl/Cmd+K to focus search, Escape to clear
- **Match Highlighting**: Visually highlights matching terms in results
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Responsive**: Works seamlessly across all device sizes

## Prerequisites

1. **metalsmith-search plugin** must be installed and configured in your Metalsmith build
2. **Fuse.js** is loaded from CDN automatically when the search component is used
3. The plugin must generate a `/search-index.json` file during build

## Basic Usage

Add to any page's frontmatter sections array:

```yaml
sections:
  - sectionType: search
    text:
      placeholder: "Search components and documentation..."
```

## Configuration Options

### Text Content

```yaml
text:
  title: "Search Components"           # Main heading (optional)
  subtitle: "Find what you need"       # Subtitle text (optional)  
  placeholder: "Search..."             # Input placeholder (default: "Search...")
```

### Settings

```yaml
settings:
  showCategories: true                 # Show filter dropdowns (default: false)
  maxResults: 20                       # Maximum results to display (default: 20)
  resultTypes: ['page', 'section']     # Content types to search (default: ['page', 'section'])
  showRelevanceScore: true             # Show relevance percentage (default: true)
  enableHighlighting: true             # Highlight matching terms (default: true)
  minCharacters: 2                     # Minimum characters to trigger search (default: 2)
```

## Examples

### Basic Search

```yaml
sectionType: search
text:
  placeholder: "Search components..."
```

### Advanced Search with Filters

```yaml
sectionType: search
text:
  title: "Find Components"
  subtitle: "Search through all component documentation and examples"
  placeholder: "Search components, guides, examples..."
settings:
  showCategories: true
  maxResults: 15
  enableHighlighting: true
  showRelevanceScore: true
```

### Minimal Search Bar

```yaml
sectionType: search
# Uses all defaults - just a simple search input
```

## Search Functionality

### Content Types Searched

The search component can find content in:

- **Pages**: Complete page content and metadata
- **Sections**: Individual component sections within pages
- **Component Types**: Specific types like hero, text-only, media-image, etc.

### Search Features

- **Fuzzy Matching**: Finds results even with typos or partial matches
- **Weighted Results**: Titles and headings are weighted higher than body content
- **Multi-field Search**: Searches across titles, content, and metadata
- **Real-time**: Results update as you type (with 300ms debounce)

### Filtering Options

When `showCategories: true`:

- **Content Type Filter**: Filter by "Pages" or "Sections"
- **Component Type Filter**: Filter by specific component types (hero, text-only, etc.)

### Keyboard Shortcuts

- **Ctrl/Cmd + K**: Focus the search input from anywhere on the page
- **Escape**: Clear search and results when search input is focused

## Technical Details

### Dependencies

- **Fuse.js 7.0.0+**: Loaded from jsdelivr CDN
- **metalsmith-search plugin**: Must be configured in your Metalsmith build
- **Modern browser**: ES6+ support required for full functionality

### Performance

- Search index loads asynchronously after page load
- Input is debounced (300ms) to prevent excessive API calls
- Results are limited to prevent DOM performance issues
- CSS animations use GPU acceleration where possible

### Accessibility

- Full ARIA labeling for screen readers
- Keyboard navigation support
- Focus management for optimal UX
- Live regions announce result changes
- High contrast mode support

### Browser Support

- **Modern Browsers**: Full functionality (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- **Legacy Browsers**: Graceful degradation (basic functionality may work)

## Styling

The component uses CSS custom properties (CSS variables) from your design tokens:

- `--color-primary`: Primary brand color for highlights and focus states
- `--color-text-primary/secondary/tertiary`: Text color hierarchy
- `--color-background/background-secondary`: Background colors
- `--color-border`: Border colors
- `--space-*`: Spacing scale
- `--font-size-*`: Typography scale
- `--border-radius*`: Border radius scale

### Customization

Override specific styles by adding CSS after the component styles:

```css
.search-section .search-input {
  border: 3px solid var(--custom-color);
}

.search-result {
  background: var(--custom-background);
}
```

## Integration with metalsmith-search

This component is designed to work with the metalsmith-search plugin. Ensure your Metalsmith configuration includes:

```javascript
import search from 'metalsmith-search';

// In your Metalsmith build pipeline
.use(search({
  indexPath: 'search-index.json',
  indexLevels: ['page', 'section'],
  generateAnchors: true,
  sectionTypes: ['hero', 'text-only', 'media-image', 'cta', 'banner', 'slider', 'flip-cards', 'logos-list', 'testimonial', 'columns', 'blog-list', 'maps']
}))
```

## Troubleshooting

### Search Not Working

1. **Check search index**: Verify `/search-index.json` exists and contains data
2. **Check console**: Look for JavaScript errors in browser dev tools
3. **Verify plugin**: Ensure metalsmith-search plugin is configured correctly
4. **Check CDN**: Ensure Fuse.js can load from jsdelivr CDN

### No Results Found

1. **Check index content**: Verify your content is being indexed properly
2. **Adjust threshold**: The search may be too strict - check Fuse.js threshold settings
3. **Clear filters**: Make sure category filters aren't excluding your content

### Performance Issues

1. **Reduce maxResults**: Lower the maximum number of displayed results
2. **Check content size**: Very large search indexes may impact performance
3. **Browser support**: Older browsers may struggle with large result sets

## SEO Considerations

- Search functionality is client-side only and doesn't affect SEO
- Search interface HTML is crawlable by search engines
- No duplicate content issues
- May improve user engagement metrics

## Future Enhancements

Potential improvements for future versions:

- Search suggestions and autocomplete
- Recent searches history
- Search analytics and reporting
- Advanced query syntax support
- Search result categorization
- Export search results functionality