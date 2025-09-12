# Universal Search Tester Toolkit

A standalone, self-contained search testing framework that can be used on any website without npm dependencies. Simply extract and run!

## 📁 What's Included

```
universal-search-tester/
├── README.md                    # This documentation
├── search-tester.js            # Main testing script (standalone)
├── test-terms.js               # 500+ universal English test terms
├── example-config.json         # Sample configuration file
├── example-index.json          # Sample search index format
├── run-test.html              # Browser-based test runner
├── templates/
│   └── report-template.html   # HTML report template
└── examples/
    ├── basic-usage.html       # Basic usage example
    ├── metalsmith-example.js  # Metalsmith integration
    └── custom-terms.js        # How to add custom test terms
```

## 🚀 Quick Start

### Method 1: Node.js Script
```bash
# No installation needed! Just run:
node search-tester.js path/to/your/search-index.json

# With options:
node search-tester.js path/to/your/search-index.json --threshold 80 --verbose
```

### Method 2: Browser-Based Testing
1. Open `run-test.html` in your browser
2. Upload your search index JSON file
3. Configure test parameters
4. View results instantly

### Method 3: Integration into Your Build
```javascript
// Copy search-tester.js to your project and use:
import('./search-tester.js').then(({ testSearch }) => {
  testSearch(searchIndex, config).then(results => {
    console.log(`Quality Score: ${results.qualityScore}/100`);
  });
});
```

## 📊 Test Coverage

### 170 Valid Terms
Common English words that should return reasonable results:
- **High-frequency nouns**: time, person, world, work, life
- **Common verbs**: make, find, create, build, search
- **Web terms**: home, contact, about, blog, help

### 120 Invalid Terms  
Terms that should return few/no results:
- **Nonsense**: asdf, qwerty, xyz, zzz
- **Fragments**: ing, tion, ness, ment
- **Typos**: teh, recieve, seperate, comming

### 160 Edge Cases
Special scenarios to test robustness:
- **Empty/whitespace**: '', ' ', '\t'
- **Short terms**: a, i, ab, it
- **Case variations**: TEST, Test, test
- **Unicode**: café, naïve, résumé
- **Multi-word**: "hello world", "contact us"

## ⚙️ Configuration

Create a `config.json` file or use the provided `example-config.json`:

```json
{
  "relevanceThreshold": 70,
  "maxResults": 20,
  "categories": ["validTerms", "invalidTerms", "edgeCases"],
  "generateHtmlReport": true,
  "outputFile": "search-test-results.json",
  "htmlReport": "search-test-report.html"
}
```

## 📝 Search Index Format

Your search index should be a JSON file like `example-index.json`:

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

All fields are optional. Supported fields:
- `title`, `content`, `url`, `type`, `pageName`, `leadIn`, `prose`, `tags`, `sectionType`

## 🎯 Usage Examples

### Basic Command Line
```bash
node search-tester.js ./build/search-index.json
```

### With Custom Config
```bash
node search-tester.js ./search-index.json --config ./my-config.json --verbose
```

### Integration Example
```javascript
// In your build script
const { testSearch } = await import('./universal-search-tester/search-tester.js');

const results = await testSearch('./build/search-index.json', {
  relevanceThreshold: 80,
  verbose: false
});

if (results.qualityScore < 70) {
  console.error('Search quality below threshold!');
  process.exit(1);
}
```

## 📊 Quality Analysis

### Quality Score (0-100)
- **A (90-100)**: Excellent - Professional search quality
- **B (80-89)**: Good - Acceptable for most sites  
- **C (70-79)**: Fair - Room for improvement
- **D (60-69)**: Poor - Needs significant work
- **F (0-59)**: Failing - Major issues detected

### Issue Detection
- **False Positives**: Nonsense terms returning results
- **False Negatives**: Valid terms finding nothing
- **Performance**: Slow response times
- **Error Rate**: High failure rate on edge cases

### Recommendations
- Threshold adjustments for better precision/recall
- Configuration optimizations
- Content indexing improvements
- Performance enhancements

## 🔧 Customization

### Adding Custom Test Terms
Edit `test-terms.js` or create your own:

```javascript
// custom-terms.js
export const myTestTerms = {
  validTerms: ['product', 'service', 'pricing'],
  invalidTerms: ['nonsense', 'gibberish'],
  edgeCases: ['PRODUCT', 'Service!', '']
};
```

### Custom Search Implementation
The tester works with any search that returns results with scores:

```javascript
// Your custom search function
function mySearch(term) {
  // Your search logic here
  return results.map(item => ({
    item: { title: item.title, url: item.url },
    score: item.relevance // 0.0 = perfect, 1.0 = no match
  }));
}
```

## 📁 File Descriptions

- **search-tester.js**: Main testing engine (no external dependencies)
- **test-terms.js**: Universal English language test dataset
- **run-test.html**: Browser interface for drag-and-drop testing
- **example-config.json**: Sample configuration with all options
- **example-index.json**: Sample search index format
- **templates/report-template.html**: Beautiful HTML report template

## 🚀 Distribution

This toolkit is designed to be shared easily:

1. **Zip Distribution**: Compress the entire folder and share
2. **Git Repository**: Clone or download from repository
3. **Copy to Project**: Drop folder into any project
4. **CI/CD**: Add to build pipelines for automated testing

## 💡 Integration Ideas

### Build Process
Add to your build script to validate search quality before deployment:

```json
{
  "scripts": {
    "build": "npm run generate && node ./search-tester/search-tester.js ./build/search-index.json",
    "test:search": "node ./search-tester/search-tester.js ./build/search-index.json --threshold 80"
  }
}
```

### CI/CD Pipeline
```yaml
# GitHub Actions example
- name: Test Search Quality
  run: |
    node ./search-tester/search-tester.js ./build/search-index.json --threshold 75
    if [ $? -ne 0 ]; then exit 1; fi
```

### Quality Gates
Set quality thresholds for different environments:
- **Development**: Quality Score > 60
- **Staging**: Quality Score > 70  
- **Production**: Quality Score > 80

## 🆘 Troubleshooting

### Common Issues

**"Module not found" errors**
- Ensure you're running from the toolkit directory
- Use `node search-tester.js` not `npm run`

**"Invalid search index" errors**  
- Check JSON format matches `example-index.json`
- Ensure file path is correct
- Validate JSON syntax

**Poor quality scores**
- Review false positives in invalid terms
- Check if valid terms are finding results
- Adjust threshold in config

**Browser version not working**
- Use modern browser (Chrome 80+, Firefox 75+)
- Enable JavaScript
- Check console for errors

## 📄 License

MIT License - Use freely in any project, commercial or personal.

## 🤝 Contributing

This is a standalone toolkit, but improvements are welcome:
- Add more test terms for specific domains
- Improve quality analysis algorithms  
- Add support for more search engines
- Enhance the browser interface

---

**Ready to test your search? Just run:**
```bash
node search-tester.js path/to/your/search-index.json
```