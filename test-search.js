/**
 * Automated Search Testing Script
 * Tests search functionality with a comprehensive set of terms
 */

import Fuse from 'fuse.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test configuration
const config = {
  searchIndexPath: './build/search-index.json',
  minCharacters: 2,
  maxResults: 20,
  relevanceThreshold: 70, // Match the current search config
  outputFile: './search-test-results.json'
};

// Test datasets - Generic English language terms for universal search testing
const testTerms = {
  // Valid terms - Common English words that should have reasonable search behavior
  validTerms: [
    // High-frequency nouns (500+ most common English words)
    'time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand',
    'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government',
    'company', 'number', 'group', 'problem', 'fact', 'water', 'money', 'story', 'month', 'book',
    'system', 'program', 'question', 'right', 'business', 'issue', 'side', 'area', 'information', 'house',
    'family', 'health', 'school', 'service', 'room', 'name', 'research', 'community', 'level', 'state',
    
    // Verbs (common actions)
    'make', 'take', 'come', 'give', 'look', 'use', 'find', 'want', 'work', 'call',
    'try', 'ask', 'need', 'feel', 'become', 'leave', 'move', 'play', 'turn', 'start',
    'show', 'hear', 'talk', 'provide', 'allow', 'include', 'continue', 'follow', 'learn', 'change',
    'lead', 'understand', 'watch', 'stop', 'create', 'speak', 'read', 'spend', 'grow', 'open',
    'walk', 'win', 'build', 'teach', 'offer', 'remember', 'consider', 'appear', 'buy', 'serve',
    
    // Adjectives (descriptive words)
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old',
    'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important',
    'few', 'public', 'bad', 'same', 'able', 'local', 'sure', 'human', 'far', 'open',
    'white', 'real', 'best', 'possible', 'social', 'available', 'free', 'special', 'clear', 'black',
    'whole', 'medical', 'common', 'hard', 'simple', 'recent', 'strong', 'easy', 'ready', 'natural',
    
    // Technology & web terms (universal across websites)
    'home', 'page', 'website', 'search', 'help', 'support', 'contact', 'about', 'news', 'blog',
    'login', 'register', 'profile', 'account', 'settings', 'privacy', 'terms', 'policy', 'subscribe', 'download',
    'email', 'phone', 'address', 'location', 'map', 'directions', 'hours', 'menu', 'prices', 'events',
    'gallery', 'photos', 'images', 'video', 'audio', 'documents', 'resources', 'links', 'tools', 'services'
  ],
  
  // Invalid/partial terms - Should return few or no results
  invalidTerms: [
    // Random character combinations (keyboard patterns)
    'asdf', 'qwerty', 'zxcv', 'hjkl', 'poiu', 'mnbv', 'lkjh', 'qaze', 'wsdx', 'edcr',
    'rfvt', 'tgby', 'yhnu', 'ujmi', 'ikol', 'olpk', 'plmn', 'xzaq', 'cdev', 'vfrt',
    
    // Nonsense combinations
    'xyzt', 'qwxz', 'zqpx', 'mvnx', 'bklz', 'jpqx', 'wxyz', 'qpzm', 'xlnv', 'ztpq',
    'mnkj', 'bgtr', 'hylp', 'qzwx', 'xvnm', 'plkj', 'zxyw', 'qmwn', 'bvnx', 'zyxw',
    
    // Common suffixes/prefixes (partial matches)
    'ing', 'tion', 'ness', 'ment', 'able', 'ible', 'ful', 'less', 'ous', 'ive',
    'ize', 'ise', 'age', 'ery', 'ary', 'ity', 'ify', 'ure', 'ite', 'ate',
    'pre', 'pro', 'anti', 'over', 'under', 'out', 'super', 'sub', 'inter', 'non',
    
    // Single/double characters
    'x', 'z', 'q', 'j', 'xx', 'zz', 'qq', 'jj', 'xxx', 'zzz',
    
    // Common typos and misspellings
    'teh', 'adn', 'recieve', 'seperate', 'occured', 'neccessary', 'begining', 'sucess', 'writting', 'freind',
    'diffrent', 'usualy', 'everthing', 'somthing', 'comming', 'goverment', 'busines', 'proffesional', 'managment', 'develope',
    'beleive', 'truely', 'finaly', 'basicaly', 'orignal', 'similiar', 'definitly', 'realy', 'actualy', 'generaly',
    
    // Backwards words
    'ecneidua', 'tnetnoc', 'egami', 'txet', 'noitamrofni', 'ecivres', 'tcudorp', 'swen', 'yrots', 'eman',
    
    // Mixed case nonsense
    'aBcDe', 'XyZaB', 'QwErT', 'mNbVc', 'pLkJh', 'zXcVb', 'rTyUi', 'dFgHj', 'sAlKd', 'wEqAz'
  ],
  
  // Edge cases - Special testing scenarios
  edgeCases: [
    // Empty/whitespace variations
    '', ' ', '  ', '\t', '\n', '\r', '   ', '\t\n', ' \t ', '\r\n',
    
    // Very short terms
    'a', 'i', 'I', 'o', 'u', 'e', 'y', 'ab', 'it', 'is', 'to', 'of', 'at', 'on', 'in', 'be', 'or', 'an', 'as', 'by',
    
    // Stop words (common but low-value)
    'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day',
    'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man',
    
    // Case sensitivity tests
    'TEST', 'Test', 'test', 'tEsT', 'HOME', 'Home', 'home', 'hOmE',
    'SEARCH', 'Search', 'search', 'sEaRcH', 'CONTENT', 'Content', 'content', 'cOnTeNt',
    
    // Numbers and numeric patterns
    '1', '2', '10', '100', '1000', '2023', '2024', '2025', '123', '456', '789',
    'page1', 'item2', 'section3', 'chapter4', 'part5', 'step6', 'level7', 'phase8', 'stage9', 'round10',
    
    // Special characters and symbols
    '@', '#', '$', '%', '&', '*', '!', '?', '.', ',', ';', ':', '|', '\\', '/', '-', '_', '+', '=',
    'test@', '#test', '$test', 'test%', 'test&', 'test*', 'test!', 'test?', 'test.', 'test,',
    
    // Multi-word phrases (spaces)
    'hello world', 'test case', 'user name', 'web site', 'home page', 'contact us', 'about us', 'sign up',
    'log in', 'check out', 'find out', 'learn more', 'get started', 'try now', 'click here', 'read more',
    
    // Hyphenated/underscore variations
    'user-name', 'user_name', 'web-site', 'web_site', 'home-page', 'home_page', 'check-out', 'check_out',
    'sign-up', 'sign_up', 'log-in', 'log_in', 'e-mail', 'e_mail', 'real-time', 'real_time',
    
    // Very long terms
    'supercalifragilisticexpialidocious', 'pneumonoultramicroscopicsilicovolcanoconiosis', 
    'antidisestablishmentarianism', 'floccinaucinihilipilification', 'pseudopseudohypoparathyroidism',
    'verylongterminatenglishlanguagethatprobablywontmatchanything', 'extremelylongcompoundwordwithoutspaces',
    
    // International/Unicode edge cases
    'café', 'naïve', 'résumé', 'piña', 'jalapeño', 'über', 'façade', 'cliché', 'fiancé', 'protégé',
    
    // Common file extensions (might appear in content)
    'jpg', 'png', 'gif', 'pdf', 'doc', 'txt', 'html', 'css', 'js', 'json', 'xml', 'csv',
    
    // Domain/URL fragments
    'www', 'com', 'org', 'net', 'edu', 'gov', 'http', 'https', 'ftp', 'mailto'
  ]
};

// Fuse.js configuration (match search.js settings)
const fuseOptions = {
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
};

/**
 * Load search index
 */
async function loadSearchIndex() {
  try {
    const indexPath = path.resolve(__dirname, config.searchIndexPath);
    const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    console.log(`✓ Loaded search index: ${data.entries.length} entries`);
    return data;
  } catch (error) {
    console.error('✗ Failed to load search index:', error.message);
    process.exit(1);
  }
}

/**
 * Test a single search term
 */
function testSearchTerm(fuse, term, category = 'unknown') {
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
    let results = fuse.search(term);
    
    // Filter by relevance (match search.js logic)
    const relevantResults = results.filter(result => {
      const relevance = (1 - result.score) * 100;
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
        url: result.item.url,
        type: result.item.type,
        sectionType: result.item.sectionType,
        score: Math.round((1 - result.score) * 100),
        matches: result.matches ? result.matches.map(match => ({
          field: match.key,
          matchedText: getMatchedText(result.item[match.key], match.indices)
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
function analyzeResults(allResults) {
  const analysis = {
    summary: {
      totalTerms: allResults.length,
      termsWithResults: allResults.filter(r => r.relevantResults > 0).length,
      termsWithErrors: allResults.filter(r => r.error).length,
      avgExecutionTime: Math.round(
        allResults.reduce((sum, r) => sum + r.executionTime, 0) / allResults.length
      )
    },
    byCategory: {},
    issues: [],
    recommendations: []
  };
  
  // Analyze by category
  ['validTerms', 'invalidTerms', 'edgeCases'].forEach(category => {
    const categoryResults = allResults.filter(r => r.category === category);
    analysis.byCategory[category] = {
      totalTerms: categoryResults.length,
      termsWithResults: categoryResults.filter(r => r.relevantResults > 0).length,
      avgResults: Math.round(
        categoryResults.reduce((sum, r) => sum + r.relevantResults, 0) / categoryResults.length
      ),
      avgScore: Math.round(
        categoryResults
          .filter(r => r.results.length > 0)
          .reduce((sum, r) => {
            const avgScore = r.results.reduce((s, res) => s + res.score, 0) / r.results.length;
            return sum + avgScore;
          }, 0) / Math.max(1, categoryResults.filter(r => r.results.length > 0).length)
      )
    };
  });
  
  // Identify issues
  const invalidWithResults = allResults.filter(r => 
    r.category === 'invalidTerms' && r.relevantResults > 0
  );
  
  const validWithoutResults = allResults.filter(r => 
    r.category === 'validTerms' && r.relevantResults === 0
  );
  
  if (invalidWithResults.length > 0) {
    analysis.issues.push({
      type: 'false_positives',
      count: invalidWithResults.length,
      terms: invalidWithResults.map(r => r.term),
      description: 'Invalid terms returning results'
    });
  }
  
  if (validWithoutResults.length > 0) {
    analysis.issues.push({
      type: 'false_negatives',
      count: validWithoutResults.length,
      terms: validWithoutResults.map(r => r.term),
      description: 'Valid terms returning no results'
    });
  }
  
  // Generate recommendations
  if (analysis.byCategory.invalidTerms.termsWithResults > 0) {
    analysis.recommendations.push('Consider increasing threshold or reducing fuzzy matching distance');
  }
  
  if (analysis.byCategory.validTerms.avgResults < 3) {
    analysis.recommendations.push('Consider reducing threshold to return more relevant results');
  }
  
  return analysis;
}

/**
 * Generate HTML report
 */
function generateHTMLReport(results, analysis) {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Search Test Results</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; margin: 40px; }
        .summary { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .category { margin-bottom: 30px; }
        .term-result { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; }
        .term-result.no-results { background: #f9f9f9; }
        .term-result.has-results { background: #f0fff0; }
        .term-result.error { background: #fff0f0; }
        .results { margin-top: 10px; }
        .result-item { background: white; margin: 5px 0; padding: 10px; border-left: 3px solid #007acc; }
        .matches { font-size: 0.9em; color: #666; margin-top: 5px; }
        .issues { background: #fff5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recommendations { background: #f5fff5; padding: 20px; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>
    <h1>Search Test Results</h1>
    <div class="summary">
        <h2>Summary</h2>
        <table>
            <tr><td>Total Terms Tested</td><td>${analysis.summary.totalTerms}</td></tr>
            <tr><td>Terms with Results</td><td>${analysis.summary.termsWithResults}</td></tr>
            <tr><td>Terms with Errors</td><td>${analysis.summary.termsWithErrors}</td></tr>
            <tr><td>Average Execution Time</td><td>${analysis.summary.avgExecutionTime}ms</td></tr>
        </table>
    </div>
    
    ${analysis.issues.length > 0 ? `
    <div class="issues">
        <h2>Issues Found</h2>
        ${analysis.issues.map(issue => `
            <h3>${issue.type.replace('_', ' ').toUpperCase()}</h3>
            <p>${issue.description}: ${issue.count} terms</p>
            <p><strong>Terms:</strong> ${issue.terms.join(', ')}</p>
        `).join('')}
    </div>
    ` : ''}
    
    ${analysis.recommendations.length > 0 ? `
    <div class="recommendations">
        <h2>Recommendations</h2>
        <ul>
            ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
    
    <h2>Results by Category</h2>
    ${Object.entries(analysis.byCategory).map(([category, stats]) => `
        <div class="category">
            <h3>${category.replace(/([A-Z])/g, ' $1').toLowerCase()}</h3>
            <table>
                <tr><td>Total Terms</td><td>${stats.totalTerms}</td></tr>
                <tr><td>Terms with Results</td><td>${stats.termsWithResults}</td></tr>
                <tr><td>Average Results per Term</td><td>${stats.avgResults}</td></tr>
                <tr><td>Average Score</td><td>${stats.avgScore}%</td></tr>
            </table>
        </div>
    `).join('')}
    
    <h2>Detailed Results</h2>
    ${results.map(result => `
        <div class="term-result ${result.error ? 'error' : result.relevantResults > 0 ? 'has-results' : 'no-results'}">
            <h3>"${result.term}" (${result.category})</h3>
            <p>
                Total Results: ${result.totalResults} | 
                Relevant Results: ${result.relevantResults} | 
                Execution Time: ${result.executionTime}ms
                ${result.error ? ` | Error: ${result.error}` : ''}
            </p>
            ${result.results.length > 0 ? `
                <div class="results">
                    ${result.results.map(res => `
                        <div class="result-item">
                            <strong>${res.title}</strong> (${res.score}%)
                            <br><small>${res.type}${res.sectionType ? ` / ${res.sectionType}` : ''} - ${res.url}</small>
                            ${res.matches.length > 0 ? `
                                <div class="matches">Matches: ${res.matches.map(m => `${m.field}: "${m.matchedText}"`).join(' | ')}</div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('')}
</body>
</html>
  `;
  
  return html;
}

/**
 * Main test function
 */
async function runSearchTests() {
  console.log('🔍 Starting automated search testing...\n');
  
  // Load search index
  const searchData = await loadSearchIndex();
  const fuse = new Fuse(searchData.entries, fuseOptions);
  
  console.log('📋 Test configuration:');
  console.log(`- Relevance threshold: ${config.relevanceThreshold}%`);
  console.log(`- Max results: ${config.maxResults}`);
  console.log(`- Min characters: ${config.minCharacters}\n`);
  
  // Collect all test terms
  const allTests = [
    ...testTerms.validTerms.map(term => ({ term, category: 'validTerms' })),
    ...testTerms.invalidTerms.map(term => ({ term, category: 'invalidTerms' })),
    ...testTerms.edgeCases.map(term => ({ term, category: 'edgeCases' }))
  ];
  
  console.log(`🧪 Testing ${allTests.length} search terms...\n`);
  
  // Run tests
  const results = [];
  let progress = 0;
  
  for (const { term, category } of allTests) {
    progress++;
    process.stdout.write(`\r⏳ Progress: ${progress}/${allTests.length} (${Math.round(progress/allTests.length*100)}%)`);
    
    const result = testSearchTerm(fuse, term, category);
    results.push(result);
  }
  
  console.log('\n\n📊 Analyzing results...');
  
  // Analyze results
  const analysis = analyzeResults(results);
  
  // Save JSON results
  const outputData = { results, analysis, config, timestamp: new Date().toISOString() };
  fs.writeFileSync(path.resolve(__dirname, config.outputFile), JSON.stringify(outputData, null, 2));
  
  // Generate HTML report
  const htmlReport = generateHTMLReport(results, analysis);
  fs.writeFileSync(path.resolve(__dirname, 'search-test-report.html'), htmlReport);
  
  // Print summary
  console.log('\n✅ Testing completed!');
  console.log('\n📈 Summary:');
  console.log(`- Total terms tested: ${analysis.summary.totalTerms}`);
  console.log(`- Terms with results: ${analysis.summary.termsWithResults}`);
  console.log(`- Terms with errors: ${analysis.summary.termsWithErrors}`);
  console.log(`- Average execution time: ${analysis.summary.avgExecutionTime}ms`);
  
  if (analysis.issues.length > 0) {
    console.log('\n⚠️  Issues found:');
    analysis.issues.forEach(issue => {
      console.log(`- ${issue.description}: ${issue.count} terms`);
    });
  }
  
  if (analysis.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    analysis.recommendations.forEach(rec => {
      console.log(`- ${rec}`);
    });
  }
  
  console.log(`\n📄 Detailed results saved to: ${config.outputFile}`);
  console.log(`📄 HTML report saved to: search-test-report.html`);
}

// Run tests
runSearchTests().catch(console.error);