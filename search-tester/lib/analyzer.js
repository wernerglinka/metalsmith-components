/**
 * Search Results Analyzer
 * Analyzes search test results and provides quality insights
 */

/**
 * Analyze test results and generate quality metrics
 */
export function analyzeResults(allResults) {
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
    recommendations: [],
    qualityScore: 0
  };
  
  // Analyze by category
  const categories = ['validTerms', 'invalidTerms', 'edgeCases'];
  categories.forEach(category => {
    const categoryResults = allResults.filter(r => r.category === category);
    if (categoryResults.length === 0) return;

    analysis.byCategory[category] = {
      totalTerms: categoryResults.length,
      termsWithResults: categoryResults.filter(r => r.relevantResults > 0).length,
      termsWithErrors: categoryResults.filter(r => r.error).length,
      avgResults: Math.round(
        categoryResults.reduce((sum, r) => sum + r.relevantResults, 0) / categoryResults.length
      ),
      avgScore: calculateAvgScore(categoryResults),
      successRate: Math.round(
        (categoryResults.filter(r => r.relevantResults > 0).length / categoryResults.length) * 100
      )
    };
  });
  
  // Identify issues
  identifyIssues(analysis, allResults);
  
  // Generate recommendations
  generateRecommendations(analysis);
  
  // Calculate overall quality score
  analysis.qualityScore = calculateQualityScore(analysis);

  return analysis;
}

/**
 * Calculate average score for category results
 */
function calculateAvgScore(categoryResults) {
  const resultsWithScore = categoryResults.filter(r => r.results.length > 0);
  if (resultsWithScore.length === 0) return 0;

  const totalScore = resultsWithScore.reduce((sum, r) => {
    const avgScore = r.results.reduce((s, res) => s + res.score, 0) / r.results.length;
    return sum + avgScore;
  }, 0);

  return Math.round(totalScore / resultsWithScore.length);
}

/**
 * Identify potential issues in search results
 */
function identifyIssues(analysis, allResults) {
  // False positives: invalid terms returning results
  const invalidWithResults = allResults.filter(r => 
    r.category === 'invalidTerms' && r.relevantResults > 0
  );
  
  if (invalidWithResults.length > 0) {
    analysis.issues.push({
      type: 'false_positives',
      severity: 'high',
      count: invalidWithResults.length,
      terms: invalidWithResults.map(r => r.term),
      description: 'Invalid terms returning results (false positives)',
      impact: 'Users may see irrelevant results for nonsense queries'
    });
  }

  // False negatives: valid terms returning no results
  const validWithoutResults = allResults.filter(r => 
    r.category === 'validTerms' && r.relevantResults === 0
  );
  
  if (validWithoutResults.length > 0) {
    analysis.issues.push({
      type: 'false_negatives',
      severity: validWithoutResults.length > 20 ? 'high' : 'medium',
      count: validWithoutResults.length,
      terms: validWithoutResults.slice(0, 10).map(r => r.term), // Show first 10
      description: 'Valid terms returning no results (false negatives)',
      impact: 'Users may not find relevant content for common terms'
    });
  }

  // High error rate
  const errorRate = (analysis.summary.termsWithErrors / analysis.summary.totalTerms) * 100;
  if (errorRate > 5) {
    analysis.issues.push({
      type: 'high_error_rate',
      severity: errorRate > 15 ? 'high' : 'medium',
      count: analysis.summary.termsWithErrors,
      errorRate: Math.round(errorRate),
      description: `High error rate (${Math.round(errorRate)}% of tests)`,
      impact: 'Search functionality may be unstable for edge cases'
    });
  }

  // Low valid term success rate
  const validTermsCategory = analysis.byCategory.validTerms;
  if (validTermsCategory && validTermsCategory.successRate < 50) {
    analysis.issues.push({
      type: 'low_recall',
      severity: 'high',
      successRate: validTermsCategory.successRate,
      description: `Low recall for valid terms (${validTermsCategory.successRate}% success rate)`,
      impact: 'Search may be too restrictive, missing relevant content'
    });
  }

  // Performance issues
  if (analysis.summary.avgExecutionTime > 100) {
    analysis.issues.push({
      type: 'performance',
      severity: analysis.summary.avgExecutionTime > 500 ? 'high' : 'medium',
      avgTime: analysis.summary.avgExecutionTime,
      description: `Slow search performance (${analysis.summary.avgExecutionTime}ms average)`,
      impact: 'Users may experience delays when searching'
    });
  }
}

/**
 * Generate actionable recommendations
 */
function generateRecommendations(analysis) {
  const validCategory = analysis.byCategory.validTerms;
  const invalidCategory = analysis.byCategory.invalidTerms;

  // Recommendations based on false positives
  if (invalidCategory && invalidCategory.termsWithResults > 0) {
    analysis.recommendations.push({
      type: 'precision',
      priority: 'high',
      action: 'Increase search threshold or reduce fuzzy matching distance',
      reason: `${invalidCategory.termsWithResults} invalid terms returning results`,
      expectedImpact: 'Reduce irrelevant results for nonsense queries'
    });
  }

  // Recommendations based on false negatives
  if (validCategory && validCategory.successRate < 70) {
    analysis.recommendations.push({
      type: 'recall',
      priority: 'high',
      action: 'Reduce search threshold or increase fuzzy matching flexibility',
      reason: `Only ${validCategory.successRate}% of valid terms return results`,
      expectedImpact: 'Help users find more relevant content'
    });
  }

  // Balanced recommendation for conflicting issues
  if (invalidCategory?.termsWithResults > 5 && validCategory?.successRate < 60) {
    analysis.recommendations.push({
      type: 'balance',
      priority: 'critical',
      action: 'Review search configuration - may need different thresholds for different content types',
      reason: 'Both precision and recall issues detected',
      expectedImpact: 'Achieve better balance between relevant and irrelevant results'
    });
  }

  // Index quality recommendations
  if (validCategory?.avgResults < 2) {
    analysis.recommendations.push({
      type: 'content',
      priority: 'medium',
      action: 'Review search index content quality and field weighting',
      reason: 'Low average results for valid terms suggests sparse or poorly indexed content',
      expectedImpact: 'Improve content discoverability'
    });
  }

  // Performance recommendations
  if (analysis.summary.avgExecutionTime > 50) {
    analysis.recommendations.push({
      type: 'performance',
      priority: 'medium',
      action: 'Optimize search configuration or consider index size reduction',
      reason: `Average search time is ${analysis.summary.avgExecutionTime}ms`,
      expectedImpact: 'Improve user experience with faster searches'
    });
  }

  // Sort recommendations by priority
  const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
  analysis.recommendations.sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

/**
 * Calculate overall search quality score (0-100)
 */
function calculateQualityScore(analysis) {
  let score = 100;
  
  // Deduct points for issues
  analysis.issues.forEach(issue => {
    switch (issue.severity) {
      case 'high':
        score -= 20;
        break;
      case 'medium':
        score -= 10;
        break;
      case 'low':
        score -= 5;
        break;
    }
  });

  // Bonus points for good performance
  const validCategory = analysis.byCategory.validTerms;
  if (validCategory) {
    if (validCategory.successRate > 80) score += 5;
    if (validCategory.avgScore > 85) score += 5;
  }

  const invalidCategory = analysis.byCategory.invalidTerms;
  if (invalidCategory && invalidCategory.termsWithResults === 0) {
    score += 10; // Perfect precision
  }

  if (analysis.summary.avgExecutionTime < 10) {
    score += 5; // Fast performance
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Get quality grade based on score
 */
export function getQualityGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}