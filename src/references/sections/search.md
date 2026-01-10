---
layout: pages/sections-with-sidebar.njk
bodyClasses: 'sections-page'
hasHero: true
title: Search

navigation:
  navLabel: 'Search'
  navIndex: 6

card:
  title: 'Search'
  description: 'Interactive search component with fuzzy search, filtering, and real-time results using Fuse.js and metalsmith-search plugin.'
  image: '/assets/images/sample19.jpg'
  tags: ['search', 'find', 'filter', 'site-search', 'fuzzy-search']

seo:
  title: Search Component - Interactive Search for Metalsmith
  description: 'Interactive search component with fuzzy search, filtering, and real-time results. Perfect for component libraries, documentation sites, and content-heavy Metalsmith static sites.'
  socialImage: '/assets/images/sample.jpg'
  canonicalURL: ''
  keywords: 'metalsmith search, fuzzy search, search component, fuse.js, interactive search, site search, content discovery'

sections:
  - sectionType: text-only
    containerTag: article
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Search Section'
      titleTag: 'h1'
      subTitle: ''
      prose: 'An interactive search component that provides search functionality across your Metalsmith site content using [Fuse.js](https://www.fusejs.io/) and the metalsmith-search plugin. The section component provides a wrapper for the [search particle](/references/partials/search). Please refer to it for more info.'

  - sectionType: search-only
    containerTag: section
    classes: ''
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: true
        bottom: false
      background:
        color: ''
        image: ''
        imageScreen: 'none' # light, dark, none
    text:
      leadIn: ''
      title: 'Search'
      titleTag: 'h2'
      subTitle: 'Find components, examples, and documentation'
      prose:
    settings:
      placeholder: 'Search components, features, or documentation...'
      showCategories: true
      maxResults: 15
      resultTypes: []
      enableHighlighting: true
      showRelevanceScore: true
      minCharacters: 3

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'search-architecture'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Two-Step Search Architecture'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        The search uses a two-step approach to balance discovery with precision:

        **Fuzzy Discovery** - Fuse.js finds potential matches with typo tolerance and weighted field matching across titles, content, tags, and metadata.

        **Exact Verification** - Only shows results where the search term actually appears as a substring in the content, preventing false positives like "dors" matching "doors."

        This eliminates the common trade-off between search recall and precision. Users get results that handle typos while ensuring all results contain their search terms.

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'plugin-configuration'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Plugin Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        The search component requires the `metalsmith-search` plugin to be properly configured in `metalsmith.js` build file.

        ### Basic Plugin Installation

        ```javascript
        import search from 'metalsmith-search';

        const metalsmith = Metalsmith(__dirname)
          .source('src')
          .destination('build')
          
          // Add search plugin EARLY in pipeline for clean content
          .use(search({
            // Default configuration processes clean markdown files
            indexLevels: ['page', 'section']
          }))
          
          // Content processing happens AFTER search indexing
          .use(layouts())
          .use(collections())
          
          .build((err) => {
            if (err) throw err;
            console.log('Build complete with search index!');
          });
        ```

        ### Plugin Position

        Place the search plugin **before templating is applied** for optimal content extraction

        ### Configuration Options

        **File Processing:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `pattern` | string | '**/*.md' | Files to index |
        | `ignore` | array | ['**/search.md'] | Exclude specific files |

        **Index Configuration:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `indexPath` | string | 'search-index.json' | Output file path |
        | `indexLevels` | array | ['page', 'section'] | Content levels to index |
        | `sectionsField` | string | 'sections' | Component array field name |

        **Component Processing:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `autoDetectSectionTypes` | boolean | true | Auto-discover component types |
        | `sectionTypeField` | string | 'sectionType' | Component type field |

        **Content Processing:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `stripHtml` | boolean | true | Remove HTML markup |
        | `generateAnchors` | boolean | true | Create section anchors |
        | `maxSectionLength` | number | 2000 | Split long sections (characters) |
        | `chunkSize` | number | 1500 | Target chunk size (characters) |
        | `minSectionLength` | number | 50 | Skip tiny sections (characters) |
        | `processMarkdownFields` | boolean | true | Process markdown in frontmatter |
        | `frontmatterFields` | array | ['summary', 'intro', 'leadIn'] | Fields to process |

        **Performance Options:**

        | Property | Type | Default | Description |
        |----------|------|---------|-------------|
        | `batchSize` | number | 10 | Process files in batches (file count) |
        | `async` | boolean | false | Enable for very large sites |

        **Complete Example:**
        ```javascript
        .use(search({
          // File processing
          pattern: '**/*.md',
          ignore: ['**/search.md'],

          // Index configuration
          indexPath: 'search-index.json',
          indexLevels: ['page', 'section'],
          sectionsField: 'sections',

          // Component-based processing
          autoDetectSectionTypes: true,
          sectionTypeField: 'sectionType',

          // Content processing
          stripHtml: true,
          generateAnchors: true,
          maxSectionLength: 2000,
          chunkSize: 1500,
          minSectionLength: 50,

          // Frontmatter markdown processing
          processMarkdownFields: true,
          frontmatterFields: ['summary', 'intro', 'leadIn'],

          // Enhanced Fuse.js search configuration
          fuseOptions: {
            keys: [
              { name: 'title', weight: 10 },
              { name: 'tags', weight: 8 },
              { name: 'leadIn', weight: 5 },
              { name: 'prose', weight: 3 },
              { name: 'content', weight: 1 }
            ],
            threshold: 0.3,                     // Search sensitivity (0.0 = exact, 1.0 = loose)
            includeScore: true,                 // Include relevance scores
            includeMatches: true,              // Include match highlighting data
            minMatchCharLength: 3              // Minimum characters for match
          },

          // Performance options
          batchSize: 10,
          async: false
        }))
        ```

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'content-architecture'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Content Architecture Support'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        The metalsmith-search plugin intelligently handles both structured content architecture and traditional long-form content.

        ### Structured Content Sites

        For sites using structured frontmatter with component sections:

        ```yaml
        ---
        title: "My Page"
        sections:
          - sectionType: hero
            text:
              title: "Welcome"
              leadIn: "Get started"
              prose: "This content is automatically indexed"
          - sectionType: text-only
            text:
              prose: "More searchable content here"
        ---
        ```

        **Auto-Detection Features:**
        - Automatically discovers component types from `sectionType` fields
        - Generates field mappings for discovered components
        - No manual configuration needed when adding new components
        - Debug with: `DEBUG=metalsmith-search* node metalsmith.js`

        ### Traditional Markdown Sites

        For traditional long-form content:

        ```yaml
        ---
        title: "My Article"
        summary: "Brief description with **markdown**"
        tags: ["web", "development"]
        ---

        # Article Title

        Long-form content that gets automatically chunked for search...
        ```

        **Intelligent Processing:**
        - Automatic content chunking for long articles
        - Heading-based section navigation
        - Frontmatter markdown processing
        - Tag and metadata extraction

        ### Custom Component Field Names

        If your site uses different field names for component arrays:

        ```javascript
        .use(search({
          sectionsField: 'myComponents',  // Instead of default 'sections'
          indexLevels: ['page', 'section']
        }))
        ```

        Common alternative field names: `components`, `blocks`, `content`, `pageComponents`

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'field-mapping'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Client-Server Field Mapping'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        The search component's client-side Fuse.js configuration must match the fields generated by the metalsmith-search plugin.

        ### Server-Side Index Fields

        The plugin generates these searchable fields in `/search-index.json`:

        - `pageName` - Page title or filename
        - `title` - Section or page title
        - `leadIn` - Lead-in text from frontmatter
        - `prose` - Main content text
        - `content` - Combined full content
        - `tags` - Content tags array
        - `url` - Page or section URL
        - `type` - Content type (page/section)
        - `sectionType` - Component type (hero, text-only, etc.)

        ### Client-Side Fuse.js Configuration

        The search component uses this optimized configuration:

        ```javascript
        const fuseOptions = {
          keys: [
            { name: 'pageName', weight: 10 },   // Highest priority
            { name: 'title', weight: 8 },       // Section titles
            { name: 'leadIn', weight: 5 },      // Lead-in text
            { name: 'prose', weight: 3 },       // Main content
            { name: 'content', weight: 1 },     // Full content
            { name: 'tags', weight: 6 }         // Content tags
          ],
          threshold: 0.3,                       // Balanced sensitivity
          includeScore: true,
          includeMatches: true,
          minMatchCharLength: 3
        };
        ```

        ### Performance Optimization

        **Search Relevance Filtering:**
        - Results below 50% relevance are automatically filtered out
        - Prevents low-quality matches from cluttering results
        - Maintains focus on meaningful content matches

        **Dynamic Library Loading:**
        - Fuse.js (145KB) loaded from CDN only when search component is used
        - Prevents impact on initial page load for pages without search
        - Follows established component pattern for script loading

  - sectionType: text-only
    containerTag: article
    classes: ''
    id: 'debugging'
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: true
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
      title: 'Debugging & Troubleshooting'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        Enable debug output to troubleshoot plugin behavior:

        ```bash
        DEBUG=metalsmith-search* node metalsmith.js
        ```

        This shows detailed information about:
        - Files being processed and content extraction
        - Auto-detected component types and field mappings
        - Index generation progress and performance metrics
        - Batch processing status and error handling

        ## Common Issues & Solutions

        **Empty search index:**
        - Verify plugin runs on correct file pattern (default: `**/*.md`)
        - Check that markdown files contain valid frontmatter structure
        - Ensure component sections use expected field names

        **Poor search results:**
        - Adjust `threshold` in `fuseOptions` (lower = more strict matching)
        - Modify field weights to prioritize important content types
        - Verify client-side Fuse.js keys match server-side index fields

        **Large bundle size:**
        - Use `stripHtml: true` to remove HTML markup from content
        - Increase `minSectionLength` to filter out short content chunks (characters)
        - Enable `async: true` and adjust `batchSize` for better performance (file count)

        **Missing anchor links:**
        - Ensure `generateAnchors: true` in plugin configuration
        - Verify section components render IDs in templates
        - Check that plugin runs before permalink processing

        ## Performance Tips

        **For Large Sites:**
        ```javascript
        .use(search({
          async: true,                    // Enable async processing
          batchSize: 50,                  // Larger batches (file count)
          maxSectionLength: 1500,         // Optimize content chunking (characters)
          chunkSize: 1000,                // Target chunk size (characters)
          stripHtml: true,                // Reduce index size (default)
          minSectionLength: 100           // Skip short sections (characters)
        }))
        ```

        **Production Optimization:**
        ```javascript
        // Search plugin positioned early for clean content access
        const metalsmith = Metalsmith(__dirname)
          .source('src')
          .destination('build')
          
          // Search plugin EARLY - always runs to maintain pipeline position
          .use(search({
            indexPath: 'search-index.json',
            // Optimize for production builds
            minSectionLength: 100,        // Skip short sections (characters)
            batchSize: 20                 // Process files in batches (file count)
          }))
          
          .use(layouts())
          .use(collections())
          
          .build((err) => {
            if (err) throw err;
            console.log('Build complete with optimized search index!');
          });
        ```

  - sectionType: text-only
    containerTag: section
    id: ''
    isDisabled: false
    isAnimated: true
    containerFields:
      inContainer: false
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
      leadIn: ''
      title: 'Configuration'
      titleTag: 'h2'
      subTitle: ''
      prose: |-
        ```yaml
        - sectionType: search
          containerTag: section
          # container settings

          text:
            title: 'Search Components'                    # Main heading (optional)
            subtitle: 'Find what you need'               # Subtitle text (optional)
            placeholder: 'Search...'                     # Input placeholder (default: "Search...")

          settings:
            showCategories: true                         # Show filter dropdowns (default: false)
            maxResults: 20                               # Maximum results to display (default: 20)
            enableHighlighting: true                     # Highlight matching terms (default: true)
            showRelevanceScore: true                     # Show relevance percentage (default: true)
            minCharacters: 2                             # Min characters to trigger search (default: 2)
        ```

        ### Notes

        - **Fuzzy Search**: Powered by Fuse.js for intelligent search matching
        - **Component-Aware**: Understands your site's component-based architecture
        - **Multi-Level Search**: Search both page-level and section-level content
        - **Real-time Results**: Instant search with debounced input (300ms)
        - **Filtering**: Filter by content type and component type
        - **Keyboard Shortcuts**: Ctrl/Cmd+K to focus search, Escape to clear
        - **Match Highlighting**: Visually highlights matching terms in results
        - **Accessibility**: Full ARIA support and screen reader compatibility
        - **Responsive**: Works seamlessly across all device sizes

        ### Prerequisites

        1. **metalsmith-search plugin** must be installed and configured in your Metalsmith build
        2. **Fuse.js** is loaded from CDN automatically when the search component is used
        3. The plugin must generate a `/search-index.json` file during build

        ### Search Properties

        - `text.title`: Main heading for the search section (optional)
        - `text.subtitle`: Subtitle or description text (optional)
        - `text.placeholder`: Placeholder text for search input (default: "Search...")
        - `settings.showCategories`: Show filter dropdowns (default: false)
        - `settings.maxResults`: Maximum number of results to display (default: 20)
        - `settings.enableHighlighting`: Highlight matching terms (default: true)
        - `settings.showRelevanceScore`: Show relevance percentage (default: true)
        - `settings.minCharacters`: Minimum characters to trigger search (default: 2)

  - sectionType: banner
    containerTag: aside
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: 'search'
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
      title: 'Download Search Section'
      titleTag: 'h3'
      subTitle: ''
      prose: 'Get the complete search component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/sections/search.zip'
        label: 'Download Search Section'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''
---
