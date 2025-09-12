# CLAUDE.md

This file provides guidance to Claude Code when working with the Universal Search Tester toolkit.

## Project Overview

This is a standalone, self-contained search testing toolkit designed to validate website search functionality using comprehensive English language test terms. The toolkit requires no external dependencies beyond Node.js built-ins and can be distributed as a simple zip file.

### Important: Testing Philosophy and Architecture

**The Universal Search Tester tests the RAW SEARCH ALGORITHM/INDEX, not the end-user experience.**

#### Two-Layer Architecture:

**1. Universal Search Tester (This Tool) - "Data Layer"**
- Tests the **search index quality** and **algorithm effectiveness**
- Uses **raw fuzzy search results** (what Fuse.js actually returns)
- Validates **content discoverability** and **index completeness**
- Identifies **content gaps** or **indexing issues**
- Should NOT filter results for user experience - tests raw capability

**2. Client-Side Search Component - "UX Layer"** 
- Takes fuzzy results from the search index/algorithm
- Applies **user experience filtering** (e.g., exact substring verification)
- Provides **refined results** to prevent user confusion
- Handles **presentation logic** and **relevance filtering**

#### The Complete Flow:
```
Build Time:
├── Generate search index
├── Universal Search Tester validates RAW index quality
└── Identifies what content CAN be found (not what SHOULD be shown)

Runtime:
├── Client loads search index  
├── User types query
├── Search algorithm finds fuzzy matches (tested by this tool)
└── Client-side component filters for user experience
```

**Key Principle**: This tool tests "Can the algorithm find relevant content?" The client-side component decides "Should we show this to the user?"

## Architecture

### Core Components

- **search-tester.js** - Main testing engine with embedded lightweight search implementation
- **test-terms.js** - 519 universal English language test terms across 3 categories
- **run-test.html** - Browser-based drag & drop interface for non-technical users
- **example-*.json** - Sample configuration and search index files

### Design Principles

- **Zero Dependencies** - Uses only Node.js built-ins (fs, path, etc.)
- **Self-Contained** - Everything needed is in one folder
- **Universal** - Works with any search index format
- **Cross-Platform** - Runs on any OS with Node.js
- **Distribution Ready** - Can be zipped and shared easily

## Usage Patterns

### Command Line
```bash
# Basic usage
node search-tester.js path/to/search-index.json

# With options
node search-tester.js path/to/search-index.json --threshold 80 --verbose

# With custom config
node search-tester.js path/to/search-index.json --config custom-config.json
```

### Programmatic Usage
```javascript
import { testSearch } from './search-tester.js';

const results = await testSearch('./search-index.json', {
  relevanceThreshold: 75,
  categories: ['validTerms', 'invalidTerms'],
  verbose: false
});

console.log(`Quality Score: ${results.qualityScore}/100`);
```

### Browser Interface
- Open `run-test.html` in any modern browser
- Drag & drop search index JSON files
- Configure test parameters visually
- Download results instantly

## Test Categories

### Valid Terms (~170 terms)
Common English words that should return reasonable results:
- High-frequency nouns: time, person, world, work, life
- Common verbs: make, find, create, build, search
- Web terms: home, contact, about, blog, help

### Invalid Terms (~120 terms)
Terms that should return few or no results:
- Nonsense combinations: asdf, qwerty, xyz
- Word fragments: ing, tion, ness, ment
- Common typos: teh, recieve, seperate

### Edge Cases (~160 terms)
Special testing scenarios:
- Empty/whitespace: '', ' ', '\t'
- Short terms: a, i, ab, it
- Case variations: TEST, Test, test
- Multi-word: "hello world", "contact us"
- Unicode: café, naïve, résumé

## Search Index Format

Expected JSON structure:
```json
{
  "entries": [
    {
      "title": "Page Title",
      "content": "Page content text...",
      "url": "/page-url",
      "type": "page",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

Supported fields (all optional):
- `title`, `content`, `url`, `type`
- `pageName`, `leadIn`, `prose`
- `tags` (array), `sectionType`

## Configuration Options

### Basic Settings
- `relevanceThreshold` (0-100) - Minimum relevance score for results
- `maxResults` - Maximum results per search term
- `categories` - Which test categories to run
- `verbose` - Enable detailed progress output

### Advanced Settings
- `generateHtmlReport` - Create HTML report file
- `outputFile` - JSON results file path
- `htmlReport` - HTML report file path

### Search Engine Settings
The toolkit includes a lightweight search implementation with configurable:
- Fuzzy matching threshold
- Minimum match character length  
- Field weighting for different content types

## Quality Analysis

### Scoring System (0-100)
- **A (90-100)**: Excellent search algorithm/index quality
- **B (80-89)**: Good search algorithm/index quality
- **C (70-79)**: Acceptable search algorithm/index quality
- **D (60-69)**: Poor search algorithm/index quality
- **F (0-59)**: Very poor search algorithm/index quality

### Issue Detection (Algorithm/Index Level)
- **False Positives**: Search algorithm finding content that doesn't contain the search term
- **False Negatives**: Search algorithm missing content that should be findable
- **Performance Issues**: Slow search response times
- **High Error Rate**: Search algorithm failures
- **Index Quality**: Missing or poorly structured content in search index

### Important: What This Tool Does NOT Test
- **User Experience Filtering**: Whether results should be shown to users
- **Presentation Logic**: How results are formatted or displayed
- **Business Logic**: Whether results meet user expectations
- **UI/UX Concerns**: Search interface usability

### Recommendations Focus
- **Index Structure**: Improve content organization and field weighting
- **Algorithm Configuration**: Threshold adjustments for better discovery
- **Content Quality**: Identify missing or poorly indexed content
- **Performance**: Search algorithm optimization

**Remember**: This tool helps optimize the "data layer" - what content CAN be found. The client-side component handles what SHOULD be shown to users.

## Integration Examples

### Build Process Integration
```javascript
// In metalsmith.js or build script
import { testSearch } from './universal-search-tester/search-tester.js';

// After search index generation
const results = await testSearch('./build/search-index.json', {
  relevanceThreshold: 75
});

if (results.qualityScore < 70) {
  console.warn(`⚠️ Search quality: ${results.qualityScore}/100`);
  process.exit(1);
}
```

### NPM Scripts
```json
{
  "scripts": {
    "test:search": "node ./universal-search-tester/search-tester.js ./build/search-index.json",
    "build:test": "npm run build && npm run test:search"
  }
}
```

### CI/CD Pipeline
```yaml
- name: Test Search Quality
  run: |
    node ./universal-search-tester/search-tester.js ./build/search-index.json --threshold 75
    if [ $? -ne 0 ]; then exit 1; fi
```

## Development Guidelines

### Code Style
- ES modules (import/export)
- No external dependencies
- Functional programming patterns
- Clear, descriptive variable names
- Comprehensive error handling

### File Organization
- Keep all functionality self-contained
- Use relative imports only
- Include fallback implementations
- Maintain backward compatibility

### Testing Philosophy
- Use realistic English language terms
- Test edge cases and error conditions
- Provide actionable feedback
- Focus on user experience quality

## Customization

### Adding Custom Test Terms
Edit `test-terms.js` to add domain-specific terms:
```javascript
export const testTerms = {
  validTerms: [
    // Add your domain-specific valid terms
    'product', 'service', 'pricing'
  ],
  // ... existing terms
};
```

### Custom Search Implementation
The toolkit can work with different search engines by modifying the search interface in `search-tester.js`.

### Configuration Templates
Create custom configuration files for different environments:
- `config-development.json`
- `config-staging.json`  
- `config-production.json`

## Troubleshooting

### Common Issues
- **Module not found**: Ensure running from toolkit directory
- **JSON parse errors**: Validate search index format
- **Poor quality scores**: Review false positives/negatives
- **Browser compatibility**: Requires modern browser for web interface

### Performance Considerations
- Large search indexes may take longer to test
- Consider reducing test term categories for faster testing
- Use `--categories validTerms` for quick quality checks

## Distribution

This toolkit is designed to be:
- **Zipped and shared** without installation
- **Copied to any project** and used immediately
- **Version controlled** alongside project code
- **Embedded in build processes** for quality assurance

The goal is professional-grade search testing that's accessible to anyone, regardless of their technical setup or dependencies.