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
        The `metalsmith-search` plugin generates a comprehensive search index during your build. It automatically indexes all your content, including pages, sections, and structured frontmatter data.

        ### Installing the Plugin

        ```bash
        npm install metalsmith-search
        ```

        ### Configuring in metalsmith.js

        ```javascript
        import search from 'metalsmith-search';

        metalsmith
          .use(collections({
            blog: {
              pattern: 'blog/*.md',
              sortBy: 'card.date',
              reverse: true
            }
          }))
          .use(search({
            ignore: [
              '**/search.md',
              '**/search-index.json'
            ]
          }))
        ```

        The plugin runs after collections are created, ensuring all your content is properly indexed. It automatically excludes the search page itself and the generated index file.

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
        The plugin creates a rich, multi-level index with weighted fields:

        - **Page-level entries**: Title, URL, tags, and full content
        - **Section-level entries**: Individual sections from structured frontmatter
        - **Weighted fields**: Title (weight: 10), pageName (8), tags (6), leadIn (5), prose (3), content (1)

        The generated `search-index.json` includes metadata about the index configuration:

        ```json
        {
          "version": "1.0.0",
          "generator": "metalsmith-search",
          "generated": "2025-10-14T20:17:57.193Z",
          "totalEntries": 227,
          "config": {
            "fuseOptions": {
              "keys": [
                {"name": "pageName", "weight": 10},
                {"name": "title", "weight": 8},
                {"name": "tags", "weight": 6},
                {"name": "leadIn", "weight": 5},
                {"name": "prose", "weight": 3},
                {"name": "content", "weight": 1}
              ],
              "threshold": 0.3,
              "includeScore": true
            }
          },
          "entries": [...]
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
        The key to quality search results is in `search.js`, specifically the `handleSearch()` function. This is where you can customize the filtering logic. Here's the core filtering algorithm from `lib/layouts/components/_partials/search/search.js`:

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

            // Collect all searchable fields
            const searchableFields = [];
            if (item.title) searchableFields.push(item.title);
            if (item.pageName) searchableFields.push(item.pageName);
            if (item.content) searchableFields.push(item.content);
            if (item.leadIn) searchableFields.push(item.leadIn);
            if (item.prose) searchableFields.push(item.prose);
            if (Array.isArray(item.tags)) {
              searchableFields.push(...item.tags);
            }

            // Check sections for structured content
            if (Array.isArray(item.sections)) {
              item.sections.forEach(section => {
                if (section.title) searchableFields.push(section.title);
                if (section.content) searchableFields.push(section.content);
                if (section.prose) searchableFields.push(section.prose);
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

        - **Relevance threshold** (line 12): Change `50` to be more strict (70+) or more permissive (30)
        - **Searchable fields**: Add or remove fields based on your frontmatter structure
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
      title: 'Why This Architecture Works'
      titleTag: 'h2'
      isCentered: false
      subTitle: ''
      prose: |-
        This two-layer search architecture is a proven, industry-standard pattern used by major documentation sites and platforms including GitHub Docs, React documentation (via Algolia DocSearch), Vue.js docs, Hugo sites, and many Gatsby-powered sites.

        The approach provides the best of both worlds:

        **Build-time benefits:**
        - Comprehensive indexing of all content
        - Automatic weight assignments for field importance
        - Optimized JSON structure for fast loading
        - No server-side processing required
        - CDN-friendly static file delivery

        **Client-side benefits:**
        - Fuzzy matching for typo tolerance
        - Exact match requirement prevents false positives
        - Real-time filtering as users type
        - Customizable relevance thresholds
        - Support for structured content (sections)

        **Why it scales:**
        - The pre-computed index means instant searches regardless of content volume
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

        1. Install `metalsmith-search` plugin
        2. Configure it to run after collections in your build pipeline
        3. Create the search component partial with Fuse.js integration
        4. Implement the two-layer filtering logic
        5. Add search sections to your pages
        6. Tune the relevance threshold and minimum character requirements based on your content

        The key insight is that fuzzy search casts a wide net, while strict client-side filtering ensures only quality matches reach your users.

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
