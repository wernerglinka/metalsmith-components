/**
 * Enhanced Search Component
 * Provides fuzzy search functionality using Fuse.js with configurable JSON sources
 * Supports multiple search instances on the same page
 */

import loadFuse from './modules/helpers/load-fuse.js';

let Fuse = null;

// Store multiple search instances
const searchInstances = new Map();

// Configuration
const config = {
  minCharacters: 2,
  maxResults: 20,
  debounceDelay: 300,
  highlightMatches: true
};

/**
 * Initialize search functionality when DOM loads
 */
document.addEventListener('DOMContentLoaded', () => {
  initAllSearchInstances();
});

/**
 * Initialize all search instances on the page
 */
async function initAllSearchInstances() {
  try {
    // Load Fuse.js library once
    Fuse = await loadFuse();

    // Find all search containers
    const searchContainers = document.querySelectorAll('.search-container');

    for (const container of searchContainers) {
      await initSearchInstance(container);
    }
  } catch (error) {
    console.error('Failed to initialize search:', error);
  }
}

/**
 * Initialize a single search instance
 */
async function initSearchInstance(container) {
  const searchSource = container.dataset.searchSource || '/search-index.json';
  const searchType = container.dataset.searchType || 'default';

  // Get DOM elements for this instance
  const searchInput = container.querySelector('.search-input');
  const searchResults = container.querySelector('.search-results');
  const searchStatus = container.querySelector('.search-status');
  const searchClear = container.querySelector('.search-clear');

  if (!searchInput || !searchResults) {
    console.warn('Search elements not found in container - search functionality disabled');
    return;
  }

  // Create search instance object
  const searchInstance = {
    container,
    searchInput,
    searchResults,
    searchStatus,
    searchClear,
    searchType,
    fuse: null,
    searchData: null,
    debounceTimeout: null
  };

  try {
    // Show loading state
    showStatus(searchInstance, 'Loading search index...', 'loading');

    // Load search index
    const response = await fetch(searchSource);
    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.status}`);
    }

    searchInstance.searchData = await response.json();

    // Get Fuse options based on search type
    const fuseOptions = getFuseOptions(searchType);

    // Initialize Fuse.js with the loaded index
    const dataArray = searchInstance.searchData.entries || searchInstance.searchData.items || searchInstance.searchData;
    searchInstance.fuse = new Fuse(dataArray, fuseOptions);

    // Store the instance
    const instanceId = searchInput.id || `search-${Date.now()}`;
    searchInstances.set(instanceId, searchInstance);

    // Set up event listeners
    setupEventListeners(searchInstance);

    // Hide loading state
    hideStatus(searchInstance);

    console.log(`Search instance initialized:`, {
      source: searchSource,
      type: searchType,
      entriesCount: dataArray.length
    });

  } catch (error) {
    console.error('Failed to initialize search instance:', error);
    showStatus(searchInstance, 'Failed to load search. Please try again later.', 'error');
  }
}

/**
 * Get Fuse.js options based on search type
 */
function getFuseOptions(searchType) {
  const baseOptions = {
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    findAllMatches: false,
    useExtendedSearch: true,
    distance: 100,
    isCaseSensitive: false
  };

  switch (searchType) {
    case 'library':
      return {
        ...baseOptions,
        keys: [
          { name: 'title', weight: 10 },
          { name: 'tags', weight: 8 },
          { name: 'description', weight: 6 },
          { name: 'category', weight: 4 }
        ]
      };

    case 'site':
    default:
      return {
        ...baseOptions,
        keys: [
          { name: 'title', weight: 10 },
          { name: 'pageName', weight: 8 },
          { name: 'tags', weight: 7 },
          { name: 'leadIn', weight: 5 },
          { name: 'prose', weight: 3 },
          { name: 'content', weight: 1 }
        ]
      };
  }
}

/**
 * Set up event listeners for a search instance
 */
function setupEventListeners(searchInstance) {
  // Search input with debouncing
  searchInstance.searchInput.addEventListener('input', (event) => {
    handleSearchInput(searchInstance, event);
  });

  // Clear button
  if (searchInstance.searchClear) {
    searchInstance.searchClear.addEventListener('click', () => {
      clearSearch(searchInstance);
    });
  }

  // Keyboard shortcuts
  searchInstance.searchInput.addEventListener('keydown', (event) => {
    handleKeyboardShortcuts(searchInstance, event);
  });
}

/**
 * Handle search input with debouncing
 */
function handleSearchInput(searchInstance, event) {
  clearTimeout(searchInstance.debounceTimeout);
  searchInstance.debounceTimeout = setTimeout(() => {
    handleSearch(searchInstance);
  }, config.debounceDelay);
}

/**
 * Handle search execution
 */
function handleSearch(searchInstance) {
  if (!searchInstance.fuse) return;

  const query = searchInstance.searchInput.value.trim();

  // Clear results if query is too short
  if (query.length < config.minCharacters) {
    clearResults(searchInstance);
    if (query.length > 0) {
      showStatus(searchInstance, `Type at least ${config.minCharacters} characters to search`);
    } else {
      hideStatus(searchInstance);
    }
    return;
  }

  // Perform search
  let results = searchInstance.fuse.search(query);

  // Filter results for better relevance
  results = results.filter(result => {
    const relevance = (1 - result.score) * 100;
    return relevance >= 30; // Only show results with reasonable relevance
  });

  // Limit results
  if (results.length > config.maxResults) {
    results = results.slice(0, config.maxResults);
  }

  // Display results
  displayResults(searchInstance, results, query);

  // Update status
  updateSearchStatus(searchInstance, results.length, query);
}

/**
 * Display search results
 */
function displayResults(searchInstance, results, query) {
  if (results.length === 0) {
    searchInstance.searchResults.innerHTML = '<div class="no-results">No results found. Try different keywords.</div>';
    return;
  }

  const resultsHTML = results.map(result => {
    const item = result.item;
    const score = Math.round((1 - result.score) * 100);

    // Prepare content for display
    let title = item.title || 'Untitled';
    let description = item.description || item.content || item.prose || '';

    // Highlight matches if enabled
    if (config.highlightMatches) {
      title = highlightText(title, query);
      description = highlightText(description, query);
    }

    // Truncate description
    if (description.length > 150) {
      description = `${description.substring(0, 150)}...`;
    }

    // Add highlight parameter to URL for term highlighting on target page
    const url = new URL(item.url, window.location.origin);
    url.searchParams.set('highlight', query);
    const highlightUrl = url.pathname + url.search + url.hash;

    // Create result HTML based on search type
    if (searchInstance.searchType === 'library') {
      return `
        <div class="search-result library-result">
          <h3><a href="${highlightUrl}" data-search-result>${title}</a></h3>
          ${description ? `<p class="description">${description}</p>` : ''}
          ${item.tags ? `<div class="tags">${item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
        </div>
      `;
    } else {
      return `
        <div class="search-result">
          <h3><a href="${highlightUrl}" data-search-result>${title}</a></h3>
          ${description ? `<p class="excerpt">${description}</p>` : ''}
        </div>
      `;
    }
  }).join('');

  searchInstance.searchResults.innerHTML = resultsHTML;

  // Track search for analytics
  trackSearchResults(results, query);
}

/**
 * Highlight search terms in text
 */
function highlightText(text, query) {
  if (!text || !query || query.length < 2) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Clear search results and input
 */
function clearSearch(searchInstance) {
  searchInstance.searchInput.value = '';
  clearResults(searchInstance);
  hideStatus(searchInstance);
  searchInstance.searchInput.focus();
}

/**
 * Clear search results only
 */
function clearResults(searchInstance) {
  if (searchInstance.searchResults) {
    searchInstance.searchResults.innerHTML = '';
  }
}

/**
 * Show status message
 */
function showStatus(searchInstance, message, type = 'info') {
  if (!searchInstance.searchStatus) return;

  searchInstance.searchStatus.textContent = message;
  searchInstance.searchStatus.className = `search-status search-${type}`;
  searchInstance.searchStatus.style.display = 'block';
}

/**
 * Hide status message
 */
function hideStatus(searchInstance) {
  if (!searchInstance.searchStatus) return;

  searchInstance.searchStatus.style.display = 'none';
}

/**
 * Update search status with results information
 */
function updateSearchStatus(searchInstance, count, query) {
  let message = '';

  if (count === 0) {
    message = `No results for "${query}"`;
  } else if (count === 1) {
    message = `1 result for "${query}"`;
  } else {
    message = `${count} results for "${query}"`;
    if (count === config.maxResults) {
      message += ` (showing first ${config.maxResults})`;
    }
  }

  showStatus(searchInstance, message);
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(searchInstance, event) {
  // Clear search with Escape
  if (event.key === 'Escape') {
    clearSearch(searchInstance);
  }
}

/**
 * Track search results for analytics (placeholder)
 */
function trackSearchResults(results, query) {
  console.log('Search performed:', {
    query,
    resultCount: results.length,
    timestamp: new Date().toISOString()
  });
}