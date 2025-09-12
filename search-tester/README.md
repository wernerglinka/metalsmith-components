# Universal Search Tester

A comprehensive search testing framework for validating website search functionality with 500+ English language test terms.

## Features

- **500+ Test Terms**: Comprehensive dataset covering common English words, edge cases, and invalid inputs
- **Quality Analysis**: Automated analysis with scoring, issue detection, and recommendations
- **Multiple Output Formats**: JSON results and beautiful HTML reports
- **CLI & Library**: Use as command-line tool or integrate into your codebase
- **Configurable**: Customize search parameters, thresholds, and test categories
- **Universal**: Works with any search implementation (Fuse.js, Elasticsearch, custom, etc.)

## Installation

```bash
npm install -g universal-search-tester
```

Or for local installation:

```bash
npm install universal-search-tester --save-dev
```

## Quick Start

### Command Line

```bash
# Basic test
search-test test ./search-index.json

# With custom options
search-test test ./search-index.json --threshold 80 --verbose --output results.json

# Generate config template
search-test config --output my-config.json

# View available test terms
search-test terms --count
search-test terms --category validTerms
```

### Programmatic Usage

```javascript
import { SearchTester, quickTest } from 'universal-search-tester';

// Quick test
const results = await quickTest('./search-index.json');
console.log(`Quality Score: ${results.analysis.qualityScore}/100`);

// Advanced usage
const tester = new SearchTester({
  relevanceThreshold: 75,
  maxResults: 10
});

await tester.loadSearchIndex('./search-index.json');
const results = await tester.runTests();
```

## Search Index Format

Your search index should be a JSON file with this structure:

```json
{
  "entries": [
    {
      "title": "Page Title",
      "content": "Page content...",
      "url": "/page-url",
      "type": "page",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

Supported fields (all optional):
- `title` - Page/section title
- `content` - Main content text
- `url` - Page URL
- `type` - Content type
- `pageName` - Page name
- `leadIn` - Lead-in text
- `prose` - Prose content
- `tags` - Array of tags
- `sectionType` - Section type

## Test Categories

### Valid Terms (~170 terms)
Common English words that should return reasonable results:
- High-frequency nouns: time, person, world, life, work
- Common verbs: make, take, give, find, create
- Descriptive adjectives: good, new, important, available
- Universal web terms: home, contact, search, blog

### Invalid Terms (~120 terms) 
Terms that should return few or no results:
- Keyboard patterns: asdf, qwerty, hjkl
- Nonsense combinations: xyzt, mvnx, bklz
- Word fragments: ing, tion, ness, ment
- Common typos: teh, recieve, seperate

### Edge Cases (~160 terms)
Special testing scenarios:
- Empty/whitespace: '', ' ', '\t', '\n'
- Very short terms: a, i, ab, it
- Case variations: TEST, Test, test, tEsT
- Numbers/symbols: 123, @, #, $
- Multi-word phrases: "hello world", "contact us"
- Unicode: café, naïve, résumé

## Configuration

Create a configuration file:

```bash
search-test config --output search-test.config.json
```

Example configuration:

```json
{
  "relevanceThreshold": 70,
  "maxResults": 20,
  "minCharacters": 2,
  "outputFile": "./search-test-results.json",
  "htmlReport": "./search-test-report.html",
  "fuseOptions": {
    "keys": [
      { "name": "title", "weight": 10 },
      { "name": "content", "weight": 5 },
      { "name": "tags", "weight": 8 }
    ],
    "threshold": 0.2,
    "includeScore": true,
    "includeMatches": true,
    "minMatchCharLength": 4,
    "ignoreLocation": false,
    "distance": 50
  }
}
```

## Quality Analysis

The tool provides comprehensive quality analysis:

### Quality Score (0-100)
- **A (90-100)**: Excellent search quality
- **B (80-89)**: Good search quality  
- **C (70-79)**: Acceptable search quality
- **D (60-69)**: Poor search quality
- **F (0-59)**: Very poor search quality

### Issue Detection
- **False Positives**: Invalid terms returning results
- **False Negatives**: Valid terms returning no results
- **High Error Rate**: Many terms causing search errors
- **Low Recall**: Too few results for valid terms
- **Performance Issues**: Slow response times

### Recommendations
- **Precision**: Adjust thresholds to reduce irrelevant results
- **Recall**: Increase sensitivity to find more relevant content
- **Balance**: Optimize for both precision and recall
- **Content**: Improve search index quality
- **Performance**: Optimize search configuration

## Output Formats

### JSON Results
Complete test results with raw data:
- Individual term results with scores and matches
- Performance metrics
- Quality analysis
- Configuration used

### HTML Report
Beautiful, interactive report with:
- Quality score and grade
- Visual summary cards
- Categorized results with tabs
- Issue and recommendation sections
- Detailed match information

## Integration Examples

### CI/CD Pipeline

```yaml
# .github/workflows/search-test.yml
name: Search Quality Test
on: [push, pull_request]
jobs:
  test-search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npx search-test test ./build/search-index.json --threshold 80
```

### NPM Scripts

```json
{
  "scripts": {
    "search:test": "search-test test ./build/search-index.json --verbose",
    "search:test:ci": "search-test test ./build/search-index.json --threshold 80 --no-html"
  }
}
```

### Custom Test Suite

```javascript
import { SearchTester } from 'universal-search-tester';

describe('Search Quality', () => {
  let results;
  
  beforeAll(async () => {
    const tester = new SearchTester({ relevanceThreshold: 80 });
    await tester.loadSearchIndex('./test-data/search-index.json');
    results = await tester.runTests();
  });

  test('should have good quality score', () => {
    expect(results.analysis.qualityScore).toBeGreaterThan(70);
  });

  test('should have no high severity issues', () => {
    const highSeverityIssues = results.analysis.issues.filter(
      issue => issue.severity === 'high'
    );
    expect(highSeverityIssues).toHaveLength(0);
  });
});
```

## API Reference

### SearchTester Class

#### Constructor
```javascript
const tester = new SearchTester(config)
```

#### Methods
- `loadSearchIndex(indexPath)` - Load search index from file or data
- `testSearchTerm(term, category)` - Test individual search term
- `runTests(customTerms, options)` - Run comprehensive test suite

#### Static Methods
- `SearchTester.getTestTerms()` - Get the complete test terms dataset
- `SearchTester.create(config)` - Create new instance with config

### Functions
- `quickTest(indexPath, config)` - Run quick test with minimal setup

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Adding Test Terms
Test terms are defined in `lib/test-terms.js`. When adding terms:
- Add to appropriate category (validTerms, invalidTerms, edgeCases)
- Follow existing patterns and categories
- Test with multiple search implementations
- Document the reasoning for new categories

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.