/**
 * Universal Search Tester - Standalone Edition
 * A comprehensive search testing framework with no external dependencies
 * 
 * Usage: node search-tester.js <search-index.json> [options]
 * Browser: Can also be imported as ES module in browser
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Lightweight Fuse.js-like search implementation
 * No external dependencies required
 */
class SimpleSearch {
  constructor(data, options = {}) {
    this.data = data;
    this.options = {
      keys: options.keys || [{ name: 'title', weight: 1 }],
      threshold: options.threshold || 0.3,
      minMatchCharLength: options.minMatchCharLength || 3,
      includeScore: options.includeScore || false,
      includeMatches: options.includeMatches || false,
      ...options
    };
  }

  search(query) {
    if (!query || query.length < this.options.minMatchCharLength) {
      return [];
    }

    const results = [];
    const queryLower = query.toLowerCase();

    this.data.forEach((item, index) => {
      let totalScore = 0;
      let totalWeight = 0;
      const matches = [];

      this.options.keys.forEach(keyConfig => {
        const key = typeof keyConfig === 'string' ? keyConfig : keyConfig.name;
        const weight = typeof keyConfig === 'string' ? 1 : (keyConfig.weight || 1);
        const value = item[key];

        if (!value) return;

        const valueLower = value.toString().toLowerCase();
        const score = this._calculateScore(queryLower, valueLower);

        if (score < this.options.threshold) {
          totalScore += score * weight;
          totalWeight += weight;

          if (this.options.includeMatches) {
            const matchIndices = this._findMatches(queryLower, valueLower);
            if (matchIndices.length > 0) {
              matches.push({
                key: key,
                indices: matchIndices
              });
            }
          }
        }
      });

      if (totalWeight > 0) {
        const finalScore = totalScore / totalWeight;
        const result = { item, refIndex: index };
        
        if (this.options.includeScore) {
          result.score = finalScore;
        }
        
        if (this.options.includeMatches && matches.length > 0) {
          result.matches = matches;
        }

        results.push(result);
      }
    });

    // Sort by score (lower is better, like Fuse.js)
    results.sort((a, b) => (a.score || 0) - (b.score || 0));
    
    return results;
  }

  _calculateScore(query, text) {
    // Simple fuzzy matching score calculation
    if (text.includes(query)) {
      return 0.1; // Exact substring match gets low score (good)
    }

    // Calculate edit distance-based score
    const distance = this._levenshteinDistance(query, text);
    const maxLength = Math.max(query.length, text.length);
    return distance / maxLength;
  }

  _levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  _findMatches(query, text) {
    const matches = [];
    let index = text.indexOf(query);
    
    while (index !== -1) {
      matches.push([index, index + query.length - 1]);
      index = text.indexOf(query, index + 1);
    }
    
    return matches;
  }
}

/**
 * Load test terms from external file or use embedded dataset
 */
async function loadTestTerms() {
  try {
    // Try to load from external file first
    const termsPath = path.join(__dirname, 'test-terms.js');
    if (fs.existsSync(termsPath)) {
      const module = await import(`file://${termsPath}`);
      return module.testTerms;
    }
  } catch (error) {
    console.warn('Could not load external test terms, using embedded dataset');
  }

  // Embedded test terms dataset (fallback)
  return {
    validTerms: [
      'time', 'person', 'year', 'way', 'day', 'thing', 'world', 'life', 'hand', 'part',
      'home', 'page', 'website', 'search', 'help', 'support', 'contact', 'about', 'news', 'blog',
      'make', 'take', 'come', 'give', 'look', 'use', 'find', 'want', 'work', 'call',
      'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old'
    ],
    invalidTerms: [
      'asdf', 'qwerty', 'zxcv', 'xyz', 'zzz', 'abc', 'ing', 'tion', 'ness', 'ment',
      'teh', 'recieve', 'seperate', 'occured', 'goverment', 'comming', 'usualy', 'everthing'
    ],
    edgeCases: [
      '', ' ', 'a', 'i', 'ab', 'it', 'is', 'to', 'of', 'at', 'on', 'in',
      'TEST', 'Test', 'test', 'HOME', 'Home', 'home', 'hello world', 'contact us'
    ]
  };
}

/**
 * Main search testing function
 */
export async function testSearch(indexPath, config = {}) {
  const startTime = Date.now();
  
  // Default configuration
  const defaultConfig = {
    relevanceThreshold: 70,
    maxResults: 20,
    minCharacters: 2,
    categories: ['validTerms', 'invalidTerms', 'edgeCases'],
    generateHtmlReport: true,
    outputFile: 'search-test-results.json',
    htmlReport: 'search-test-report.html',
    verbose: false
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Load search index
  let searchData;
  if (typeof indexPath === 'string') {
    try {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      searchData = JSON.parse(indexContent);
    } catch (error) {
      throw new Error(`Failed to load search index: ${error.message}`);
    }
  } else {
    searchData = indexPath; // Assume it's already parsed data
  }

  // Ensure entries array exists
  if (!searchData.entries && Array.isArray(searchData)) {
    searchData = { entries: searchData };
  }

  if (finalConfig.verbose) {
    console.log(`✓ Loaded search index: ${searchData.entries.length} entries`);
  }

  // Initialize search engine
  const searchEngine = new SimpleSearch(searchData.entries, {
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
    minMatchCharLength: 4
  });

  // Load test terms
  const testTerms = await loadTestTerms();
  
  // Collect test terms based on selected categories
  const allTests = [];
  finalConfig.categories.forEach(category => {
    if (testTerms[category]) {
      testTerms[category].forEach(term => {
        allTests.push({ term, category });
      });
    }
  });

  if (finalConfig.verbose) {
    console.log(`🧪 Testing ${allTests.length} search terms...`);
  }

  // Run tests
  const results = [];
  let progress = 0;

  for (const { term, category } of allTests) {
    progress++;
    
    if (finalConfig.verbose) {
      process.stdout.write(`\r⏳ Progress: ${progress}/${allTests.length} (${Math.round(progress/allTests.length*100)}%)`);
    }

    const result = testSingleTerm(searchEngine, term, category, finalConfig);
    results.push(result);
  }

  if (finalConfig.verbose) {
    console.log('\n📊 Analyzing results...');
  }

  // Analyze results
  const analysis = analyzeResults(results, finalConfig);
  
  // Prepare output
  const output = {
    results,
    analysis,
    config: finalConfig,
    timestamp: new Date().toISOString(),
    metadata: {
      totalTerms: allTests.length,
      categories: finalConfig.categories,
      indexSize: searchData.entries.length,
      executionTime: Date.now() - startTime
    }
  };

  // Save results
  if (finalConfig.outputFile && typeof indexPath === 'string') {
    try {
      fs.writeFileSync(finalConfig.outputFile, JSON.stringify(output, null, 2));
    } catch (error) {
      console.warn(`Could not save JSON results: ${error.message}`);
    }
  }

  // Generate HTML report
  if (finalConfig.generateHtmlReport && typeof indexPath === 'string') {
    try {
      const htmlReport = generateHtmlReport(results, analysis);
      fs.writeFileSync(finalConfig.htmlReport, htmlReport);
    } catch (error) {
      console.warn(`Could not save HTML report: ${error.message}`);
    }
  }

  return output;
}

/**
 * Test a single search term
 */
function testSingleTerm(searchEngine, term, category, config) {
  const startTime = Date.now();
  
  // Skip terms below minimum length
  if (term.length < config.minCharacters && term.trim().length > 0) {
    return {
      term,
      category,
      results: [],
      totalResults: 0,
      relevantResults: 0,
      executionTime: 0,
      error: `Term too short (${term.length} < ${config.minCharacters})`
    };
  }
  
  try {
    // Perform search
    let searchResults = searchEngine.search(term);
    
    // Filter by relevance
    const relevantResults = searchResults.filter(result => {
      const relevance = (1 - (result.score || 0)) * 100;
      return relevance >= config.relevanceThreshold;
    });
    
    // Limit results
    const limitedResults = relevantResults.slice(0, config.maxResults);
    
    const executionTime = Date.now() - startTime;
    
    return {
      term,
      category,
      results: limitedResults.map(result => ({
        title: result.item.title || result.item.pageName || 'Untitled',
        url: result.item.url || '#',
        type: result.item.type || 'unknown',
        sectionType: result.item.sectionType,
        score: Math.round((1 - (result.score || 0)) * 100),
        matches: result.matches ? result.matches.map(match => ({
          field: match.key,
          matchedText: getMatchedText(result.item[match.key], match.indices)
        })) : []
      })),
      totalResults: searchResults.length,
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
 * Extract matched text from indices
 */
function getMatchedText(fieldValue, indices) {
  if (!indices || !fieldValue) return '';
  return indices.map(([start, end]) => 
    fieldValue.substring(start, end + 1)
  ).join(', ');
}

/**
 * Analyze test results
 */
function analyzeResults(results, config) {
  const analysis = {
    summary: {
      totalTerms: results.length,
      termsWithResults: results.filter(r => r.relevantResults > 0).length,
      termsWithErrors: results.filter(r => r.error).length,
      avgExecutionTime: Math.round(
        results.reduce((sum, r) => sum + r.executionTime, 0) / results.length
      )
    },
    byCategory: {},
    issues: [],
    recommendations: [],
    qualityScore: 0
  };

  // Analyze by category
  config.categories.forEach(category => {
    const categoryResults = results.filter(r => r.category === category);
    if (categoryResults.length === 0) return;

    analysis.byCategory[category] = {
      totalTerms: categoryResults.length,
      termsWithResults: categoryResults.filter(r => r.relevantResults > 0).length,
      avgResults: Math.round(
        categoryResults.reduce((sum, r) => sum + r.relevantResults, 0) / categoryResults.length
      ),
      successRate: Math.round(
        (categoryResults.filter(r => r.relevantResults > 0).length / categoryResults.length) * 100
      )
    };
  });

  // Identify issues
  const invalidWithResults = results.filter(r => 
    r.category === 'invalidTerms' && r.relevantResults > 0
  );
  
  if (invalidWithResults.length > 0) {
    analysis.issues.push({
      type: 'false_positives',
      severity: 'high',
      count: invalidWithResults.length,
      terms: invalidWithResults.slice(0, 10).map(r => r.term),
      description: 'Invalid terms returning results'
    });
  }

  const validWithoutResults = results.filter(r => 
    r.category === 'validTerms' && r.relevantResults === 0
  );
  
  if (validWithoutResults.length > 0) {
    analysis.issues.push({
      type: 'false_negatives',
      severity: validWithoutResults.length > 20 ? 'high' : 'medium',
      count: validWithoutResults.length,
      terms: validWithoutResults.slice(0, 10).map(r => r.term),
      description: 'Valid terms returning no results'
    });
  }

  // Generate recommendations
  if (invalidWithResults.length > 0) {
    analysis.recommendations.push('Increase search threshold to reduce false positives');
  }
  
  if (analysis.byCategory.validTerms?.successRate < 70) {
    analysis.recommendations.push('Reduce search threshold to improve recall for valid terms');
  }

  // Calculate quality score
  let score = 100;
  analysis.issues.forEach(issue => {
    if (issue.severity === 'high') score -= 20;
    else if (issue.severity === 'medium') score -= 10;
    else score -= 5;
  });
  
  analysis.qualityScore = Math.max(0, score);

  return analysis;
}

/**
 * Generate simple HTML report
 */
function generateHtmlReport(results, analysis) {
  const getGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return `
<!DOCTYPE html>
<html>
<head>
    <title>Search Test Report</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .score { font-size: 24px; font-weight: bold; color: #2563eb; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
        .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .card h3 { margin: 0 0 10px 0; color: #374151; }
        .card .number { font-size: 32px; font-weight: bold; color: #2563eb; }
        .issues, .recommendations { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .issue { padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #ef4444; background: #fef2f2; }
        .recommendation { padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #3b82f6; background: #eff6ff; }
        .details { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .result { margin: 15px 0; padding: 15px; border: 1px solid #e5e7eb; border-radius: 6px; }
        .term { font-weight: bold; color: #1f2937; }
        .category { background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Universal Search Test Report</h1>
            <div class="score">Quality Score: ${analysis.qualityScore}/100 (Grade ${getGrade(analysis.qualityScore)})</div>
            <p>Generated: ${new Date().toLocaleString()}</p>
        </div>

        <div class="summary">
            <div class="card">
                <h3>Total Terms</h3>
                <div class="number">${analysis.summary.totalTerms}</div>
            </div>
            <div class="card">
                <h3>With Results</h3>
                <div class="number">${analysis.summary.termsWithResults}</div>
            </div>
            <div class="card">
                <h3>Errors</h3>
                <div class="number">${analysis.summary.termsWithErrors}</div>
            </div>
            <div class="card">
                <h3>Avg Time</h3>
                <div class="number">${analysis.summary.avgExecutionTime}ms</div>
            </div>
        </div>

        ${analysis.issues.length > 0 ? `
        <div class="issues">
            <h2>⚠️ Issues Found</h2>
            ${analysis.issues.map(issue => `
                <div class="issue">
                    <strong>${issue.description}</strong><br>
                    Severity: ${issue.severity} | Count: ${issue.count}<br>
                    ${issue.terms ? `Examples: ${issue.terms.join(', ')}` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${analysis.recommendations.length > 0 ? `
        <div class="recommendations">
            <h2>💡 Recommendations</h2>
            ${analysis.recommendations.map(rec => `
                <div class="recommendation">${rec}</div>
            `).join('')}
        </div>
        ` : ''}

        <div class="details">
            <h2>Category Results</h2>
            ${Object.entries(analysis.byCategory).map(([cat, stats]) => `
                <div class="card" style="margin: 10px 0;">
                    <h3>${cat.replace(/([A-Z])/g, ' $1').toLowerCase()}</h3>
                    <p>Terms: ${stats.totalTerms} | With Results: ${stats.termsWithResults} | Success Rate: ${stats.successRate}%</p>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>`;
}

/**
 * Command line interface
 */
async function runCLI() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Universal Search Tester - Standalone Edition

Usage: node search-tester.js <search-index.json> [options]

Options:
  --config <file>           Configuration file path
  --threshold <number>      Relevance threshold (default: 70)
  --max-results <number>    Max results per term (default: 20)
  --output <file>          JSON output file (default: search-test-results.json)
  --html-report <file>     HTML report file (default: search-test-report.html)
  --no-html               Skip HTML report generation
  --categories <list>     Comma-separated categories (default: validTerms,invalidTerms,edgeCases)
  --verbose               Detailed output
  --help, -h              Show this help

Examples:
  node search-tester.js ./build/search-index.json
  node search-tester.js ./search-index.json --threshold 80 --verbose
  node search-tester.js ./search-index.json --config ./my-config.json
    `);
    return;
  }

  const indexPath = args[0];
  const config = {};

  // Parse command line arguments
  for (let i = 1; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    
    switch (flag) {
      case '--config':
        try {
          const configData = JSON.parse(fs.readFileSync(value, 'utf8'));
          Object.assign(config, configData);
        } catch (error) {
          console.error(`Error loading config: ${error.message}`);
          process.exit(1);
        }
        break;
      case '--threshold':
        config.relevanceThreshold = parseInt(value);
        break;
      case '--max-results':
        config.maxResults = parseInt(value);
        break;
      case '--output':
        config.outputFile = value;
        break;
      case '--html-report':
        config.htmlReport = value;
        break;
      case '--no-html':
        config.generateHtmlReport = false;
        i--; // No value for this flag
        break;
      case '--categories':
        config.categories = value.split(',').map(c => c.trim());
        break;
      case '--verbose':
        config.verbose = true;
        i--; // No value for this flag
        break;
    }
  }

  try {
    console.log('🔍 Universal Search Tester - Standalone Edition\n');
    
    const results = await testSearch(indexPath, config);
    
    // Display results
    console.log('✅ Testing completed!\n');
    console.log('📈 Summary:');
    console.log(`  Total terms: ${results.analysis.summary.totalTerms}`);
    console.log(`  With results: ${results.analysis.summary.termsWithResults}`);
    console.log(`  Errors: ${results.analysis.summary.termsWithErrors}`);
    console.log(`  Quality score: ${results.analysis.qualityScore}/100`);

    if (results.analysis.issues.length > 0) {
      console.log('\n⚠️  Issues:');
      results.analysis.issues.forEach(issue => {
        console.log(`  - ${issue.description}: ${issue.count} terms`);
      });
    }

    if (results.analysis.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      results.analysis.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    }

    if (config.outputFile !== false) {
      console.log(`\n📄 Results saved: ${config.outputFile || 'search-test-results.json'}`);
    }
    if (config.generateHtmlReport !== false) {
      console.log(`📄 HTML report: ${config.htmlReport || 'search-test-report.html'}`);
    }

    // Exit with error code if quality is poor
    const hasHighSeverityIssues = results.analysis.issues.some(issue => issue.severity === 'high');
    process.exit(hasHighSeverityIssues ? 1 : 0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run CLI if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}