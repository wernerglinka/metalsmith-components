/**
 * Generate Library Search Index Plugin
 * Simple plugin to generate a search index for library components
 */

import path from 'path';

function generateLibrarySearchIndex(options = {}) {
  const pattern = options.pattern || 'library/**/*.html';
  const destination = options.destination || 'library-search-index.json';

  return function(files, metalsmith, done) {
    const searchIndex = [];
    const metadata = metalsmith.metadata();

    // Use the library collection
    if (!metadata.collections || !metadata.collections.library) {
      done();
      return;
    }

    const libraryCollection = metadata.collections.library;

    libraryCollection.forEach(file => {
      // Skip if this is not a component page
      if (!file.title || !file.card) {
        return;
      }

      // Extract component name from path
      const componentName = path.basename(file.path, '.md');

      // Extract searchable data
      const searchEntry = {
        title: file.title,
        description: (file.card && file.card.description) || '',
        url: '/library/' + componentName + '/',
        tags: (file.card && file.card.tags) || []
      };

      searchIndex.push(searchEntry);
    });

    // Sort by title
    searchIndex.sort((a, b) => a.title.localeCompare(b.title));

    // Create the search index file with proper structure
    const indexData = {
      version: "1.0.0",
      generator: "generate-library-search-index",
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


export default generateLibrarySearchIndex;