/**
 * Generate Partials Search Index Plugin
 * Plugin to generate a search index for partial components
 */

import path from 'path';

function generatePartialsSearchIndex(options = {}) {
  const pattern = options.pattern || 'partials/**/*.html';
  const destination = options.destination || 'partials-search-index.json';

  return function(files, metalsmith, done) {
    const searchIndex = [];
    const metadata = metalsmith.metadata();

    // Use the partials collection
    if (!metadata.collections || !metadata.collections.partials) {
      // Create empty index if no partials collection exists yet
      const indexData = {
        version: "1.0.0",
        generator: "generate-partials-search-index",
        generated: new Date().toISOString(),
        totalEntries: 0,
        entries: []
      };

      files[destination] = {
        contents: Buffer.from(JSON.stringify(indexData, null, 2)),
        mode: '0644'
      };

      done();
      return;
    }

    const partialsCollection = metadata.collections.partials;

    partialsCollection.forEach(file => {
      // Skip if this is not a component page (check for seo.title or card)
      if (!file.card) {
        return;
      }

      // Extract component name from path
      const componentName = path.basename(file.path, '.md');

      // Extract searchable data - use card.title or fallback to seo.title
      const searchEntry = {
        title: (file.card && file.card.title) || (file.seo && file.seo.title) || '',
        description: (file.card && file.card.description) || '',
        url: '/partials/' + componentName + '/',
        tags: (file.card && file.card.tags) || []
      };

      searchIndex.push(searchEntry);
    });

    // Sort by title
    searchIndex.sort((a, b) => a.title.localeCompare(b.title));

    // Create the search index file with proper structure
    const indexData = {
      version: "1.0.0",
      generator: "generate-partials-search-index",
      generated: new Date().toISOString(),
      totalEntries: searchIndex.length,
      entries: searchIndex
    };

    files[destination] = {
      contents: Buffer.from(JSON.stringify(indexData, null, 2)),
      mode: '0644'
    };

    done();
  };
}


export default generatePartialsSearchIndex;