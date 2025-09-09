/**
 * Search Section Component
 * Provides fuzzy search functionality using Fuse.js and metalsmith-search index
 */

import loadFuse from './modules/helpers/load-fuse.js';

let fuse = null;
let Fuse = null;
let searchData = null;
let searchInput = null;
let searchResults = null;
let searchStatus = null;
let searchClear = null;
let categoryFilter = null;
let componentTypeFilter = null;

// Configuration
const config = {
  minCharacters: 2,
  maxResults: 20,
  debounceDelay: 300,
  highlightMatches: true
};

let debounceTimeout = null;

/**
 * Initialize search functionality when DOM loads
 */
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});

/**
 * Initialize search components and load search index
 */
async function initSearch() {
  try {
    // Get DOM elements
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');
    searchStatus = document.getElementById('search-status');
    searchClear = document.getElementById('search-clear');
    categoryFilter = document.getElementById('category-filter');
    componentTypeFilter = document.getElementById('component-type-filter');
    
    if (!searchInput || !searchResults) {
      console.warn('Search elements not found - search functionality disabled');
      return;
    }

    // Show loading state
    showStatus('Loading search index...', 'loading');
    
    // Load search index
    const response = await fetch('/search-index.json');
    if (!response.ok) {
      throw new Error(`Failed to load search index: ${response.status}`);
    }
    
    searchData = await response.json();
    
    // Load Fuse.js library
    Fuse = await loadFuse();
    
    // Initialize Fuse.js with the loaded index - use our own optimized config
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 10 },
        { name: 'content', weight: 1 },
        { name: 'excerpt', weight: 3 },
        'tags'
      ],
      threshold: 0.3, // Balanced threshold for good matches
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 3, // Require at least 3 characters to match
      ignoreLocation: true, // Don't penalize matches based on location
      findAllMatches: false, // Just find best matches
      useExtendedSearch: false,
      distance: 200, // Allow some flexibility
      isCaseSensitive: false, // Ensure case insensitive matching
      getFn: function(obj, path) {
        // Custom getter to handle nested properties
        if (typeof path === 'string') {
          return obj[path];
        }
        return Fuse.config.getFn(obj, path);
      }
    };
    
    console.log('Using Fuse options:', fuseOptions);
    console.log('Sample search data entries:', searchData.entries.slice(0, 2));
    
    fuse = new Fuse(searchData.entries, fuseOptions);
    
    console.log('Fuse initialized with:', {
      entriesCount: searchData.entries.length,
      fuseOptions,
      sampleEntries: searchData.entries.slice(0, 3)
    });
    
    // Search is ready
    
    // Set up event listeners
    setupEventListeners();
    
    // Show ready state
    showStatus(`Search ready with ${searchData.entries.length} entries`);
    
    console.log('Search initialized successfully', {
      entries: searchData.entries.length,
      types: getEntryTypes()
    });
    
  } catch (error) {
    console.error('Search initialization failed:', error);
    showStatus('Search unavailable. Please try refreshing the page.', 'error');
  }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Search input with debouncing
  searchInput.addEventListener('input', handleSearchInput);
  
  // Clear button
  if (searchClear) {
    searchClear.addEventListener('click', clearSearch);
  }
  
  // Filter dropdowns
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleSearch);
  }
  
  if (componentTypeFilter) {
    componentTypeFilter.addEventListener('change', handleSearch);
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Handle search input with debouncing
 */
function handleSearchInput(event) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    handleSearch(event);
  }, config.debounceDelay);
}

/**
 * Handle search execution
 */
function handleSearch(event) {
  if (!fuse) return;
  
  const query = searchInput.value.trim();
  const category = categoryFilter?.value || 'all';
  const componentType = componentTypeFilter?.value || 'all';
  
  // Clear results if query is too short
  if (query.length < config.minCharacters) {
    clearResults();
    if (query.length > 0) {
      showStatus(`Type at least ${config.minCharacters} characters to search`);
    } else {
      showStatus('');
    }
    return;
  }

  // Perform search
  let results = fuse.search(query);
  
  // Filter out low-relevance results (less than 50% relevance)
  results = results.filter(result => {
    const relevance = (1 - result.score) * 100;
    return relevance >= 50; // Only show results with 50%+ relevance
  });
  
  // Apply category/component filters
  results = applyFilters(results, category, componentType);
  
  // Limit results
  if (results.length > config.maxResults) {
    results = results.slice(0, config.maxResults);
  }
  
  // Display results
  displayResults(results, query);
  
  // Update status
  updateSearchStatus(results.length, query, category, componentType);
}

/**
 * Apply category and component type filters
 */
function applyFilters(results, category, componentType) {
  let filtered = results;
  
  // Filter by category (page/section)
  if (category && category !== 'all') {
    filtered = filtered.filter(result => result.item.type === category);
  }
  
  // Filter by component type
  if (componentType && componentType !== 'all') {
    filtered = filtered.filter(result => result.item.sectionType === componentType);
  }
  
  return filtered;
}

/**
 * Display search results
 */
function displayResults(results, query) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found. Try different keywords or adjust your filters.</div>';
    return;
  }

  const resultsHTML = results.map(result => {
    const item = result.item;
    // Fuse.js scores: 0.0 = perfect match, 1.0 = no match
    // Convert to percentage: 100% = perfect, 0% = no match
    const score = Math.round((1 - result.score) * 100);
    
    // Prepare content for display
    let title = item.title || 'Untitled';
    let excerpt = item.content || item.prose || '';
    
    // Highlight matches if enabled
    if (config.highlightMatches) {
      const highlighted = highlightMatches(title, excerpt, result.matches, query);
      title = highlighted.title;
      excerpt = highlighted.excerpt;
    }
    
    // Truncate excerpt
    if (excerpt.length > 200) {
      excerpt = excerpt.substring(0, 200) + '...';
    }
    
    return `
      <div class="search-result">
        ${item.pageName && item.type === 'section' ? `<p class="page-name">${item.pageName}</p>` : ''}
        <h3><a href="${item.url}" data-search-result>${title}</a></h3>
        ${excerpt ? `<p class="excerpt">${excerpt}</p>` : ''}
        <div class="meta">
          <span class="score">Relevance: ${score}%</span>
          <span class="type">${formatContentType(item.type)}</span>
          ${item.wordCount ? `<span class="word-count">${item.wordCount} words</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  searchResults.innerHTML = resultsHTML;
  
  // Add click tracking for analytics
  trackSearchResults(results, query);
}

/**
 * Highlight search matches in text
 */
function highlightMatches(title, excerpt, matches, query) {
  // Instead of using Fuse.js indices (which can be partial), 
  // do a simple case-insensitive highlight of the actual query
  const highlightQuery = (text, searchTerm) => {
    if (!text || !searchTerm || searchTerm.length < 3) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };
  
  return {
    title: highlightQuery(title, query),
    excerpt: highlightQuery(excerpt, query)
  };
}


/**
 * Clear search results and input
 */
function clearSearch() {
  searchInput.value = '';
  clearResults();
  showStatus('');
  searchInput.focus();
}

/**
 * Clear search results only
 */
function clearResults() {
  if (searchResults) {
    searchResults.innerHTML = '';
  }
}

/**
 * Show status message
 */
function showStatus(message, type = 'info') {
  if (!searchStatus) return;
  
  searchStatus.textContent = message;
  searchStatus.className = `search-status search-${type}`;
}

/**
 * Update search status with results information
 */
function updateSearchStatus(count, query, category, componentType) {
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
  
  // Add filter information
  const activeFilters = [];
  if (category && category !== 'all') {
    activeFilters.push(`type: ${category}`);
  }
  if (componentType && componentType !== 'all') {
    activeFilters.push(`component: ${componentType}`);
  }
  
  if (activeFilters.length > 0) {
    message += ` (filtered by ${activeFilters.join(', ')})`;
  }
  
  showStatus(message);
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
  // Focus search input with Ctrl/Cmd + K
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }
  
  // Clear search with Escape
  if (event.key === 'Escape' && document.activeElement === searchInput) {
    clearSearch();
  }
}

/**
 * Format component type for display
 */
function formatComponentType(type) {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format content type for display
 */
function formatContentType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

/**
 * Get unique entry types for debugging
 */
function getEntryTypes() {
  if (!searchData?.entries) return {};
  
  const types = {};
  searchData.entries.forEach(entry => {
    types[entry.type] = (types[entry.type] || 0) + 1;
    if (entry.sectionType) {
      types[`${entry.type}:${entry.sectionType}`] = (types[`${entry.type}:${entry.sectionType}`] || 0) + 1;
    }
  });
  
  return types;
}


/**
 * Track search results for analytics (placeholder)
 */
function trackSearchResults(results, query) {
  // This is where you would add analytics tracking
  console.log('Search performed:', {
    query,
    resultCount: results.length,
    timestamp: new Date().toISOString()
  });
}