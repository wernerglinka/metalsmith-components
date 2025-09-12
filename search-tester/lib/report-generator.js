/**
 * HTML Report Generator
 * Creates comprehensive HTML reports for search test results
 */

import { getQualityGrade } from './analyzer.js';

/**
 * Generate comprehensive HTML report
 */
export function generateHTMLReport(results, analysis) {
  const qualityGrade = getQualityGrade(analysis.qualityScore);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Search Test Report</title>
    <style>
        :root {
            --primary-color: #2563eb;
            --success-color: #059669;
            --warning-color: #d97706;
            --error-color: #dc2626;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-600: #4b5563;
            --gray-900: #111827;
        }
        
        * { box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: var(--gray-50);
            color: var(--gray-900);
        }
        
        .container { max-width: 1200px; margin: 0 auto; }
        
        .header {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .quality-score {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .grade-A { background: #dcfce7; color: #166534; }
        .grade-B { background: #dbeafe; color: #1d4ed8; }
        .grade-C { background: #fef3c7; color: #92400e; }
        .grade-D { background: #fed7aa; color: #9a3412; }
        .grade-F { background: #fecaca; color: #991b1b; }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .summary-card {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .summary-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        
        .issues-section, .recommendations-section, .category-section, .detailed-results {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .issue-item, .recommendation-item {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border-left: 4px solid;
        }
        
        .issue-high { background: #fef2f2; border-color: var(--error-color); }
        .issue-medium { background: #fffbeb; border-color: var(--warning-color); }
        .issue-low { background: #f0f9ff; border-color: var(--primary-color); }
        
        .recommendation-critical { background: #fef2f2; border-color: var(--error-color); }
        .recommendation-high { background: #fffbeb; border-color: var(--warning-color); }
        .recommendation-medium { background: #f0f9ff; border-color: var(--primary-color); }
        
        .category-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .stat-item {
            text-align: center;
            padding: 1rem;
            background: var(--gray-50);
            border-radius: 8px;
        }
        
        .stat-value {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .search-result {
            margin-bottom: 1.5rem;
            padding: 1rem;
            border: 1px solid var(--gray-200);
            border-radius: 8px;
        }
        
        .result-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        
        .term { font-weight: 600; font-size: 1.1rem; }
        .category { 
            padding: 0.25rem 0.5rem; 
            background: var(--gray-100); 
            border-radius: 4px; 
            font-size: 0.8rem;
            margin-left: 0.5rem;
        }
        
        .result-stats {
            display: flex;
            gap: 1rem;
            margin: 0.5rem 0;
            font-size: 0.9rem;
            color: var(--gray-600);
        }
        
        .result-item {
            background: var(--gray-50);
            margin: 0.5rem 0;
            padding: 1rem;
            border-radius: 6px;
            border-left: 3px solid var(--success-color);
        }
        
        .matches {
            font-size: 0.8rem;
            color: var(--gray-600);
            margin-top: 0.5rem;
        }
        
        .no-results {
            color: var(--gray-600);
            font-style: italic;
            padding: 1rem;
            background: var(--gray-50);
            border-radius: 6px;
        }
        
        .error {
            color: var(--error-color);
            background: #fef2f2;
            padding: 1rem;
            border-radius: 6px;
        }
        
        .tabs {
            display: flex;
            border-bottom: 1px solid var(--gray-200);
            margin-bottom: 1rem;
        }
        
        .tab {
            padding: 0.75rem 1.5rem;
            background: none;
            border: none;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            font-size: 1rem;
        }
        
        .tab.active {
            border-bottom-color: var(--primary-color);
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        
        h1, h2, h3 { margin-top: 0; }
        
        .timestamp {
            color: var(--gray-600);
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Universal Search Test Report</h1>
            <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
            <div style="margin-top: 1rem;">
                <span class="quality-score grade-${qualityGrade}">
                    Quality Score: ${analysis.qualityScore}/100 (Grade ${qualityGrade})
                </span>
            </div>
        </div>

        <div class="summary-grid">
            <div class="summary-card">
                <div class="summary-number">${analysis.summary.totalTerms}</div>
                <div>Total Terms Tested</div>
            </div>
            <div class="summary-card">
                <div class="summary-number">${analysis.summary.termsWithResults}</div>
                <div>Terms with Results</div>
            </div>
            <div class="summary-card">
                <div class="summary-number">${analysis.summary.termsWithErrors}</div>
                <div>Terms with Errors</div>
            </div>
            <div class="summary-card">
                <div class="summary-number">${analysis.summary.avgExecutionTime}ms</div>
                <div>Average Response Time</div>
            </div>
        </div>

        ${analysis.issues.length > 0 ? generateIssuesSection(analysis.issues) : ''}
        ${analysis.recommendations.length > 0 ? generateRecommendationsSection(analysis.recommendations) : ''}
        ${generateCategorySection(analysis.byCategory)}
        ${generateDetailedResults(results)}
    </div>

    <script>
        // Simple tab functionality
        function showTab(categoryName) {
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            document.getElementById(categoryName + '-content').classList.add('active');
            document.querySelector(\`[onclick="showTab('\${categoryName}')"]\`).classList.add('active');
        }
        
        // Show first tab by default
        document.addEventListener('DOMContentLoaded', function() {
            const firstTab = document.querySelector('.tab');
            if (firstTab) firstTab.click();
        });
    </script>
</body>
</html>
  `.trim();
}

/**
 * Generate issues section HTML
 */
function generateIssuesSection(issues) {
  return `
    <div class="issues-section">
        <h2>⚠️ Issues Found (${issues.length})</h2>
        ${issues.map(issue => `
            <div class="issue-item issue-${issue.severity}">
                <h3>${issue.description}</h3>
                <p><strong>Severity:</strong> ${issue.severity.toUpperCase()}</p>
                <p><strong>Impact:</strong> ${issue.impact}</p>
                ${issue.terms ? `<p><strong>Example Terms:</strong> ${issue.terms.slice(0, 10).join(', ')}${issue.terms.length > 10 ? ` (and ${issue.terms.length - 10} more)` : ''}</p>` : ''}
                ${issue.count ? `<p><strong>Affected Terms:</strong> ${issue.count}</p>` : ''}
            </div>
        `).join('')}
    </div>
  `;
}

/**
 * Generate recommendations section HTML
 */
function generateRecommendationsSection(recommendations) {
  return `
    <div class="recommendations-section">
        <h2>💡 Recommendations (${recommendations.length})</h2>
        ${recommendations.map(rec => `
            <div class="recommendation-item recommendation-${rec.priority}">
                <h3>${rec.action}</h3>
                <p><strong>Priority:</strong> ${rec.priority.toUpperCase()}</p>
                <p><strong>Reason:</strong> ${rec.reason}</p>
                <p><strong>Expected Impact:</strong> ${rec.expectedImpact}</p>
            </div>
        `).join('')}
    </div>
  `;
}

/**
 * Generate category analysis section HTML
 */
function generateCategorySection(categories) {
  return `
    <div class="category-section">
        <h2>📊 Results by Category</h2>
        ${Object.entries(categories).map(([category, stats]) => `
            <div style="margin-bottom: 2rem;">
                <h3>${formatCategoryName(category)}</h3>
                <div class="category-stats">
                    <div class="stat-item">
                        <div class="stat-value">${stats.totalTerms}</div>
                        <div>Total Terms</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.termsWithResults}</div>
                        <div>With Results</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.successRate}%</div>
                        <div>Success Rate</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.avgScore}%</div>
                        <div>Avg Score</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${stats.avgResults}</div>
                        <div>Avg Results</div>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>
  `;
}

/**
 * Generate detailed results section HTML
 */
function generateDetailedResults(results) {
  const categories = [...new Set(results.map(r => r.category))];
  
  return `
    <div class="detailed-results">
        <h2>🔍 Detailed Results</h2>
        <div class="tabs">
            ${categories.map(category => `
                <button class="tab" onclick="showTab('${category}')">${formatCategoryName(category)}</button>
            `).join('')}
        </div>
        
        ${categories.map(category => `
            <div id="${category}-content" class="tab-content">
                ${results
                  .filter(r => r.category === category)
                  .map(result => generateResultHTML(result))
                  .join('')
                }
            </div>
        `).join('')}
    </div>
  `;
}

/**
 * Generate HTML for individual search result
 */
function generateResultHTML(result) {
  return `
    <div class="search-result">
        <div class="result-header">
            <span class="term">"${result.term}"</span>
            <span class="category">${result.category}</span>
        </div>
        
        <div class="result-stats">
            <span>Total Results: ${result.totalResults}</span>
            <span>Relevant Results: ${result.relevantResults}</span>
            <span>Execution Time: ${result.executionTime}ms</span>
        </div>

        ${result.error ? `
            <div class="error">
                <strong>Error:</strong> ${result.error}
            </div>
        ` : ''}

        ${result.results.length > 0 ? `
            ${result.results.map(res => `
                <div class="result-item">
                    <strong>${res.title}</strong> (${res.score}% relevance)
                    <br><small>${res.type}${res.sectionType ? ` / ${res.sectionType}` : ''} - ${res.url}</small>
                    ${res.matches.length > 0 ? `
                        <div class="matches">
                            <strong>Matches:</strong> ${res.matches.map(m => `${m.field}: "${m.matchedText}"`).join(' | ')}
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        ` : result.error ? '' : `
            <div class="no-results">No results found</div>
        `}
    </div>
  `;
}

/**
 * Format category name for display
 */
function formatCategoryName(category) {
  return category
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, str => str.toUpperCase());
}