---
layout: pages/sections.njk
bodyClasses: 'sections-page'
hasHero: true

card:
  title: 'Building a Site-Wide Search System'
  description: 'Learn how to implement a robust search system for your Metalsmith site using metalsmith-search plugin and client-side filtering with Fuse.js.'
  date: '2025-08-01'
  author: 'Metalsmith Components Team'
  thumbnail: '/assets/images/sample10.jpg'

seo:
  title: Building a Site-Wide Search System for Metalsmith
  description: 'Complete guide to implementing site-wide search with build-time indexing and client-side fuzzy search with quality filtering for Metalsmith static sites.'
  socialImage: '/assets/images/sample10.jpg'
  canonicalURL: ''
  keywords: 'metalsmith search, site search, fuse.js, static site search, build-time indexing, fuzzy search, false positive prevention'

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
        image: '/assets/images/sample10.jpg'
        imageScreen: 'dark'
    text:
      leadIn: 'Advanced Techniques'
      title: Building a Site-Wide Search System
      titleTag: 'h1'
      subTitle: 'Two-layer architecture for quality search results'
      prose: 'Static sites need search too. This guide explains and shows how to build a comprehensive search system using the `metalsmith-search` plugin for indexing and client-side filtering to ensure quality results.'
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
      title: 'The Challenge'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Static sites don't have a backend to handle search queries, but that doesn't mean you can't provide excellent search functionality. The solution is a two-layer architecture:

        1. **Build-time indexing**: Generate a comprehensive search index during the build process
        2. **Client-side filtering**: Apply strict quality filters to prevent false positives

        This approach gives you the speed of static sites with the functionality users expect from modern web applications.

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
      title: 'Layer 1: Build-Time Index Generation'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The `metalsmith-search` plugin (v0.2.0+) uses an HTML-first architecture, processing final rendered HTML pages using Cheerio for accurate content indexing. This ensures the search index reflects exactly what users see in their browsers.

        ### Installing the Plugin

        ```bash
        npm install metalsmith-search
        ```

        ### Configuring in metalsmith.js

        **Critical**: The search plugin must run **AFTER** layouts/templates in your pipeline to process rendered HTML:

        ```javascript
        import search from 'metalsmith-search';
        import layouts from '@metalsmith/layouts';

        metalsmith
          .use(collections({
            blog: {
              pattern: 'blog/*.md',
              sortBy: 'card.date',
              reverse: true
            }
          }))
          .use(layouts({
            directory: 'lib/layouts',
            transform: 'nunjucks'
          }))
          .use(search({
            pattern: '**/*.html',           // Process HTML not Markdown
            excludeSelectors: ['nav', 'header', 'footer'],  // Optional: exclude site chrome
            ignore: [
              '**/search.md',
              '**/search-index.json'
            ]
          }))
        ```

        The plugin processes HTML files after layout rendering, using Cheerio to parse the DOM and extract text content. This HTML-first approach ensures accurate indexing of the actual page content users will see.

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
      title: 'What Gets Indexed?'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The HTML-first architecture creates page-level search entries by parsing rendered HTML:

        **How It Works**:
        1. **HTML Parsing**: Uses Cheerio to parse final rendered HTML pages
        2. **Content Exclusion**: Removes navigation, header, footer elements (configurable via `excludeSelectors`)
        3. **Text Extraction**: Extracts all text content from the remaining HTML
        4. **Heading Processing**: Finds all h1-h6 headings and ensures they have IDs for scroll-to functionality
        5. **Frontmatter Integration**: Includes metadata fields like title, description, tags from page frontmatter
        6. **Anchor Generation**: Automatically generates IDs for headings without them

        **Each page generates a single search entry**:

        ```json
        {
          "id": "page:/blog/post",
          "type": "page",
          "url": "/blog/post",
          "title": "Blog Post Title",
          "description": "Page description from frontmatter",
          "tags": ["javascript", "tutorial"],
          "content": "All page text content extracted from HTML...",
          "headings": [
            {"level": "h2", "id": "introduction", "title": "Introduction"},
            {"level": "h3", "id": "overview", "title": "Overview"}
          ],
          "wordCount": 1523
        }
        ```

        **The `headings` array enables scroll-to functionality** - when Fuse.js finds matches, client-side JavaScript can determine which section the match is in and scroll users to the nearest heading anchor.

        **Weighted Search Fields** (configured via `fuseOptions.keys`):
        - `title` (weight: 10) - Page titles get highest priority
        - `content` (weight: 5) - Main text content
        - `description` (weight: 3) - Page descriptions from frontmatter
        - `tags` (weight: 7) - Content tags

        You can customize which frontmatter fields are indexed using the `contentFields` option.

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
      title: 'Layer 2: Client-Side Quality Filtering'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The search component's JavaScript (`search.js`) uses Fuse.js for fuzzy matching, then applies additional strict filtering to ensure quality results. This two-step process prevents false positives while maintaining good recall for valid searches.

        ### Customizing the Search Component

        The search partial template is already provided in the component library at `lib/layouts/components/_partials/search/`. What you'll want to customize is the filtering logic in `search.js`, where you can tune the search quality to match your specific content and requirements.

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
      title: 'The Filtering Logic'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The key to quality search results is in `search.js`, specifically the `handleSearch()` function. This filtering works with the page-level search entries generated by the HTML-first indexing. Here's the core filtering algorithm from `lib/layouts/components/_partials/search/search.js`:

        ```javascript
        // From search.js - the two-layer filtering logic
        async function handleSearch(searchInstance) {
          const query = searchInstance.searchInput.value.trim();

          // Step 1: Fuzzy search with Fuse.js
          let results = searchInstance.fuse.search(query);

          // Step 2: Strict filtering for quality
          results = results.filter(result => {
            const relevance = (1 - result.score) * 100;
            const queryLower = query.toLowerCase().trim();
            const item = result.item;

            // Require minimum relevance score (tune this for your needs)
            if (relevance < 50) return false;

            // Collect all searchable fields from page-level entry
            const searchableFields = [];
            if (item.title) searchableFields.push(item.title);
            if (item.description) searchableFields.push(item.description);
            if (item.content) searchableFields.push(item.content);
            if (Array.isArray(item.tags)) {
              searchableFields.push(...item.tags);
            }

            // Include heading titles for better matching
            if (Array.isArray(item.headings)) {
              item.headings.forEach(heading => {
                if (heading.title) searchableFields.push(heading.title);
              });
            }

            // Require exact substring match (prevents false positives)
            return searchableFields.some(field => {
              return typeof field === 'string' &&
                     field.toLowerCase().includes(queryLower);
            });
          });

          displayResults(searchInstance, results, query);
        }
        ```

        ### Key Customization Points

        You can tune these values in `search.js` to match your content:

        - **Relevance threshold**: Change `50` to be more strict (70+) or more permissive (30)
        - **Searchable fields**: The HTML-first approach extracts content from rendered HTML, so you're working with clean text content plus frontmatter fields
        - **Heading integration**: The `headings` array enables scroll-to functionality and provides additional search context
        - **Exact match requirement**: This prevents false positives - keep this unless you have specific reasons to remove it

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
      title: 'Using Search in Your Pages'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        Add search to any page by including it in your frontmatter:

        ```yaml
        ---
        sections:
          - sectionType: search
            placeholder: 'Search components, features, or documentation...'
            settings:
              maxResults: 20
              minCharacters: 2
              enableHighlighting: true
        ---
        ```

        **The search component automatically uses the `/search-index.json` file generated by `metalsmith-search`**.

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
      title: 'Multi-Purpose Search: Three Implementation Patterns'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        The search partial is designed to be multi-purpose, supporting three different usage patterns with the same underlying code:

        ### 1. Inline Search (Page Sections)

        Embed search functionality directly into any page using the `search-only` section:

        ```yaml
        sections:
          - sectionType: search-only
            placeholder: 'Search components...'
            settings:
              maxResults: 20
              minCharacters: 2
        ```

        Results display inline on the same page - perfect for dedicated search pages or content-specific search areas.

        ### 2. Header Search Bar → Dedicated Results Page

        This library implements a global search bar in the site header that redirects to a dedicated search results page. This provides a professional search experience users expect from modern sites.

        **How it works:**

        - Search input in header (`header.njk`)
        - Form submission redirects to `/search/?q=query`
        - Search page reads URL parameter and auto-executes search
        - Results display on dedicated full-page layout

        **Implementation:**

        The header search form is simple - it just redirects:

        ```html
        <form class="header-search-form" action="/search/" method="get">
          <input type="search" name="q" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
        ```

        The `search.js` automatically detects the `?q=` parameter and executes the search:

        ```javascript
        function autoExecuteFromURL() {
          const urlParams = new URLSearchParams(window.location.search);
          const query = urlParams.get('q');

          if (query && query.trim().length > 0) {
            // Find search instance and execute
            const searchInstance = searchInstances.values().next().value;
            if (searchInstance) {
              searchInstance.searchInput.value = query;
              handleSearch(searchInstance);
            }
          }
        }
        ```

        **Benefits:**
        - Global search access from any page
        - Shareable search URLs (`/search/?q=maps`)
        - Browser history support (back button works)
        - Keyboard shortcut support (Cmd/Ctrl + K to focus)

        ### 3. Direct URL Access

        Users can visit search URLs directly or share them:
        - `/search/?q=maps` - Pre-filled search for "maps"
        - `/search/?q=accordion` - Pre-filled search for "accordion"

        The search page auto-executes and displays results immediately.

        **All three patterns use the same search partial** - it adapts to different contexts automatically. This is the power of multi-purpose partials in component-based architecture.

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
      title: 'Why This Architecture Works'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        This two-layer search architecture is a proven, industry-standard pattern used by major documentation sites and platforms including GitHub Docs, React documentation (via Algolia DocSearch), Vue.js docs, Hugo sites, and many Gatsby-powered sites.

        The HTML-first approach provides unique advantages:

        **Build-time benefits:**
        - **Accurate indexing**: Indexes exactly what users see in their browsers (rendered HTML, not source Markdown)
        - **Cheerio HTML parsing**: Reliable DOM traversal and text extraction
        - **Automatic heading extraction**: All h1-h6 headings indexed with IDs for scroll-to functionality
        - **Configurable exclusions**: Remove navigation, header, footer via CSS selectors
        - **Frontmatter integration**: Metadata fields (title, description, tags) included in index
        - **Optimized JSON structure**: Single page-level entries with headings array
        - **CDN-friendly**: Static file delivery with no server-side processing

        **Client-side benefits:**
        - Fuzzy matching for typo tolerance via Fuse.js
        - Exact match requirement prevents false positives
        - Real-time filtering as users type
        - Customizable relevance thresholds
        - Scroll-to functionality using heading anchors

        **Why HTML-first matters:**
        - Indexes final rendered content, not source Markdown
        - Handles template interpolation, component rendering, and dynamic content generation
        - Ensures search index matches user experience
        - Supports complex component-based architectures

        **Why it scales:**
        - Pre-computed index means instant searches regardless of content volume
        - No server infrastructure or search service subscriptions needed
        - Global CDN distribution ensures fast loading worldwide
        - Quality filtering ensures users only see relevant results

        This creates a search experience that rivals server-side solutions while maintaining the performance, simplicity, and zero-cost infrastructure of a static site.

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
      title: 'Next Steps'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        To implement this in your own project:

        1. Install `metalsmith-search` plugin (v0.2.0+)
        2. **Critical**: Configure it to run **AFTER** layouts/templates in your build pipeline
        3. Set `pattern: '**/*.html'` to process rendered HTML files
        4. Configure `excludeSelectors` to remove site chrome (nav, header, footer) from indexing
        5. Create the search component partial with Fuse.js integration
        6. Implement the two-layer filtering logic that works with page-level entries and headings
        7. Add search sections to your pages
        8. Tune the relevance threshold and minimum character requirements based on your content

        **Key insights**:
        - HTML-first indexing ensures accuracy - the search index matches what users see
        - Fuzzy search casts a wide net for typo tolerance
        - Strict client-side filtering ensures only quality matches reach your users
        - The `headings` array enables advanced features like scroll-to-section functionality

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
