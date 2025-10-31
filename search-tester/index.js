/**
 * Universal Search Tester - Main Library
 * A comprehensive search testing framework for validating website search functionality
 */

import Fuse from 'fuse.js';
import fs from 'fs';
// import path from 'path'; // Reserved for future use
// import { fileURLToPath } from 'url'; // Reserved for future use

// Import test datasets
import { testTerms } from './lib/test-terms.js';
import { generateHTMLReport } from './lib/report-generator.js';
import { analyzeResults } from './lib/analyzer.js';

// const __filename = fileURLToPath(import.meta.url); // Reserved for future use
// const __dirname = path.dirname(__filename); // Reserved for future use

/**
 * Default configuration
 */
export const defaultConfig = {
  relevanceThreshold: 70,
  maxResults: 20,
  minCharacters: 2,
  outputFile: './search-test-results.json',
  htmlReport: './search-test-report.html',
  fuseOptions: {
    keys: [
      { name: 'pageName', weight: 10 },
      { name: 'title', weight: 8 },
      { name: 'leadIn', weight: 5 },
      { name: 'prose', weight: 3 },
      { name: 'content', weight: 1 },
      { name: 'tags', weight: 6 }
    ],
    threshold: 0.2,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 4,
    ignoreLocation: false,
    findAllMatches: false,
    useExtendedSearch: false,
    distance: 50,
    isCaseSensitive: false
  }
};

/**
 * Main SearchTester class
 */
export class SearchTester {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config };
    this.searchData = null;
    this.fuse = null;
  }

  /**
   * Load search index from file or data
   */
  async loadSearchIndex(indexPath) {
    try {
      let data;
      
      if (typeof indexPath === 'string') {
        // Load from file path
        const resolvedPath = path.resolve(process.cwd(), indexPath);
        const fileContent = fs.readFileSync(resolvedPath, 'utf8');
        data = JSON.parse(fileContent);
      } else {
        // Use provided data object
        data = indexPath;
      }

      // Handle different data formats
      this.searchData = data.entries ? data : { entries: data };
      
      // console.log(`✓ Loaded search index: ${this.searchData.entries.length} entries`);
      
      // Initialize Fuse.js
      this.fuse = new Fuse(this.searchData.entries, this.config.fuseOptions);
      
      return this.searchData;
    } catch (error) {
      throw new Error(`Failed to load search index: ${error.message}`);
    }
  }

  /**
   * Test a single search term
   */
  testSearchTerm(term, category = 'unknown') {
    if (!this.fuse) {
      throw new Error('Search index not loaded. Call loadSearchIndex() first.');
    }

    const startTime = Date.now();
    
    // Skip terms below minimum length
    if (term.length < this.config.minCharacters && term.trim().length > 0) {
      return {
        term,
        category,
        results: [],
        totalResults: 0,
        relevantResults: 0,
        executionTime: 0,
        error: `Term too short (${term.length} < ${this.config.minCharacters})`
      };
    }
    
    try {
      // Perform search
      const results = this.fuse.search(term);
      
      // Filter by relevance
      const relevantResults = results.filter(result => {
        const relevance = (1 - result.score) * 100;
        return relevance >= this.config.relevanceThreshold;
      });
      
      // Limit results
      const limitedResults = relevantResults.slice(0, this.config.maxResults);
      
      const executionTime = Date.now() - startTime;
      
      return {
        term,
        category,
        results: limitedResults.map(result => ({
          title: result.item.title || result.item.pageName || 'Untitled',
          url: result.item.url,
          type: result.item.type,
          sectionType: result.item.sectionType,
          score: Math.round((1 - result.score) * 100),
          matches: result.matches ? result.matches.map(match => ({
            field: match.key,
            matchedText: this._getMatchedText(result.item[match.key], match.indices)
          })) : []
        })),
        totalResults: results.length,
        relevantResults: relevantResults.length,
        executionTime
      };
    } catch (error) {
      return {
        term,
        category,
        results: [],
        totalResults: 0,
        relevantResults: 0,
        executionTime: Date.now() - startTime,
        error: error.message
      };
    }
  }

  /**
   * Run comprehensive search tests
   */
  async runTests(customTerms = null, options = {}) {
    if (!this.fuse) {
      throw new Error('Search index not loaded. Call loadSearchIndex() first.');
    }

    const {
      verbose = false,
      categories = ['validTerms', 'invalidTerms', 'edgeCases'],
      saveResults = true
    } = options;

    // Use custom terms or default test dataset
    const terms = customTerms || testTerms;
    
    // Collect all test terms
    const allTests = [];
    categories.forEach(category => {
      if (terms[category]) {
        terms[category].forEach(term => {
          allTests.push({ term, category });
        });
      }
    });

    if (verbose) {
      // console.log(`🧪 Testing ${allTests.length} search terms...`);
      // console.log(`📋 Configuration:`);
      // console.log(`- Relevance threshold: ${this.config.relevanceThreshold}%`);
      // console.log(`- Max results: ${this.config.maxResults}`);
      // console.log(`- Min characters: ${this.config.minCharacters}\n`);
    }
    
    // Run tests
    const results = [];
    let progress = 0;
    
    for (const { term, category } of allTests) {
      progress++;
      
      if (verbose) {
        process.stdout.write(`\r⏳ Progress: ${progress}/${allTests.length} (${Math.round(progress/allTests.length*100)}%)`);
      }
      
      const result = this.testSearchTerm(term, category);
      results.push(result);
    }
    
    if (verbose) {
      // console.log('\n\n📊 Analyzing results...');
    }
    
    // Analyze results
    const analysis = analyzeResults(results);
    
    // Prepare output data
    const outputData = {
      results,
      analysis,
      config: this.config,
      timestamp: new Date().toISOString(),
      metadata: {
        totalTerms: allTests.length,
        categories: categories,
        indexSize: this.searchData.entries.length
      }
    };

    // Save results if requested
    if (saveResults) {
      if (this.config.outputFile) {
        fs.writeFileSync(
          path.resolve(process.cwd(), this.config.outputFile),
          JSON.stringify(outputData, null, 2)
        );
      }

      if (this.config.htmlReport) {
        const htmlReport = generateHTMLReport(results, analysis);
        fs.writeFileSync(
          path.resolve(process.cwd(), this.config.htmlReport),
          htmlReport
        );
      }
    }

    return outputData;
  }

  /**
   * Extract matched text from indices
   */
  _getMatchedText(fieldValue, indices) {
    if (!indices || !fieldValue) {return '';}
    return indices.map(([start, end]) => 
      fieldValue.substring(start, end + 1)
    ).join(', ');
  }

  /**
   * Get test terms (for external access)
   */
  static getTestTerms() {
    return testTerms;
  }

  /**
   * Create a new instance with custom configuration
   */
  static create(config = {}) {
    return new SearchTester(config);
  }
}

/**
 * Quick test function for simple usage
 */
export async function quickTest(indexPath, config = {}) {
  const tester = new SearchTester(config);
  await tester.loadSearchIndex(indexPath);
  return await tester.runTests();
}

// Default export
export default SearchTester;