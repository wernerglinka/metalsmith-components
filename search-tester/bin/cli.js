#!/usr/bin/env node

/**
 * Universal Search Tester CLI
 * Command-line interface for running search tests
 */

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { SearchTester } from '../index.js';

const program = new Command();

program
  .name('search-test')
  .description('Universal search testing framework for websites')
  .version('1.0.0');

program
  .command('test')
  .description('Run search tests against a search index')
  .argument('<index-path>', 'Path to search index JSON file')
  .option('-c, --config <path>', 'Path to configuration file')
  .option('-o, --output <path>', 'Output file for JSON results', './search-test-results.json')
  .option('-r, --report <path>', 'Output file for HTML report', './search-test-report.html')
  .option('-t, --threshold <number>', 'Relevance threshold (0-100)', '70')
  .option('-m, --max-results <number>', 'Maximum results per query', '20')
  .option('-v, --verbose', 'Verbose output')
  .option('--no-html', 'Skip HTML report generation')
  .option('--categories <items>', 'Test categories to run (comma-separated)', 'validTerms,invalidTerms,edgeCases')
  .action(async (indexPath, options) => {
    try {
      console.log(chalk.blue.bold('🔍 Universal Search Tester'));
      console.log(chalk.gray('Testing search functionality with comprehensive term dataset\n'));

      // Load configuration
      let config = {
        relevanceThreshold: parseInt(options.threshold),
        maxResults: parseInt(options.maxResults),
        outputFile: options.output,
        htmlReport: options.html ? options.report : null
      };

      if (options.config) {
        const configPath = path.resolve(process.cwd(), options.config);
        const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config = { ...config, ...userConfig };
      }

      // Create tester instance
      const tester = new SearchTester(config);

      // Load search index
      if (options.verbose) {
        console.log(chalk.yellow('📋 Loading search index...'));
      }
      await tester.loadSearchIndex(indexPath);

      // Run tests
      const categories = options.categories.split(',').map(c => c.trim());
      const results = await tester.runTests(null, {
        verbose: options.verbose,
        categories,
        saveResults: true
      });

      // Display results
      console.log(chalk.green.bold('\n✅ Testing completed!\n'));
      
      displaySummary(results.analysis);
      
      if (results.analysis.issues.length > 0) {
        displayIssues(results.analysis.issues);
      }
      
      if (results.analysis.recommendations.length > 0) {
        displayRecommendations(results.analysis.recommendations);
      }

      // File output info
      console.log(chalk.blue('\n📄 Output files:'));
      if (config.outputFile) {
        console.log(chalk.gray(`  JSON: ${config.outputFile}`));
      }
      if (config.htmlReport) {
        console.log(chalk.gray(`  HTML: ${config.htmlReport}`));
      }

      // Exit with appropriate code
      const hasHighSeverityIssues = results.analysis.issues.some(
        issue => issue.severity === 'high' || issue.severity === 'critical'
      );
      process.exit(hasHighSeverityIssues ? 1 : 0);

    } catch (error) {
      console.error(chalk.red.bold('❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('config')
  .description('Generate a configuration file template')
  .option('-o, --output <path>', 'Output path for config file', './search-test.config.json')
  .action((options) => {
    const configTemplate = {
      relevanceThreshold: 70,
      maxResults: 20,
      minCharacters: 2,
      outputFile: './search-test-results.json',
      htmlReport: './search-test-report.html',
      fuseOptions: {
        keys: [
          { name: 'title', weight: 10 },
          { name: 'content', weight: 5 },
          { name: 'tags', weight: 8 }
        ],
        threshold: 0.2,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 4,
        ignoreLocation: false,
        distance: 50
      }
    };

    fs.writeFileSync(options.output, JSON.stringify(configTemplate, null, 2));
    console.log(chalk.green(`✅ Configuration template created: ${options.output}`));
    console.log(chalk.gray('Edit the file to customize search testing parameters.'));
  });

program
  .command('terms')
  .description('List available test terms by category')
  .option('-c, --category <name>', 'Show specific category (validTerms, invalidTerms, edgeCases)')
  .option('--count', 'Show term counts only')
  .action((options) => {
    const { testTerms } = SearchTester.getTestTerms();
    
    if (options.count) {
      console.log(chalk.blue.bold('📊 Test Terms Summary:'));
      Object.entries(testTerms).forEach(([category, terms]) => {
        console.log(chalk.yellow(`  ${category}:`), terms.length);
      });
      const total = Object.values(testTerms).reduce((sum, terms) => sum + terms.length, 0);
      console.log(chalk.green.bold(`  Total: ${total}`));
      return;
    }

    if (options.category) {
      if (testTerms[options.category]) {
        console.log(chalk.blue.bold(`📝 ${options.category} (${testTerms[options.category].length} terms):`));
        testTerms[options.category].forEach((term, index) => {
          console.log(chalk.gray(`  ${index + 1}.`), term);
        });
      } else {
        console.error(chalk.red(`Category "${options.category}" not found.`));
        console.log(chalk.yellow('Available categories:'), Object.keys(testTerms).join(', '));
      }
    } else {
      Object.entries(testTerms).forEach(([category, terms]) => {
        console.log(chalk.blue.bold(`📝 ${category} (${terms.length} terms):`));
        terms.slice(0, 10).forEach((term, index) => {
          console.log(chalk.gray(`  ${index + 1}.`), term);
        });
        if (terms.length > 10) {
          console.log(chalk.gray(`  ... and ${terms.length - 10} more`));
        }
        console.log();
      });
    }
  });

// Helper functions for display
function displaySummary(analysis) {
  console.log(chalk.blue.bold('📈 Summary:'));
  console.log(chalk.gray('  Total terms tested:'), analysis.summary.totalTerms);
  console.log(chalk.gray('  Terms with results:'), analysis.summary.termsWithResults);
  console.log(chalk.gray('  Terms with errors:'), analysis.summary.termsWithErrors);
  console.log(chalk.gray('  Average execution time:'), `${analysis.summary.avgExecutionTime}ms`);
  console.log(chalk.gray('  Quality score:'), getScoreColor(analysis.qualityScore));
}

function displayIssues(issues) {
  console.log(chalk.red.bold('\n⚠️ Issues found:'));
  issues.forEach(issue => {
    const severityColor = getSeverityColor(issue.severity);
    console.log(`  ${severityColor(issue.severity.toUpperCase())}: ${issue.description}`);
  });
}

function displayRecommendations(recommendations) {
  console.log(chalk.yellow.bold('\n💡 Recommendations:'));
  recommendations.forEach((rec, index) => {
    const priorityColor = getPriorityColor(rec.priority);
    console.log(`  ${index + 1}. ${priorityColor(`[${rec.priority.toUpperCase()}]`)} ${rec.action}`);
    console.log(chalk.gray(`     ${rec.reason}`));
  });
}

function getScoreColor(score) {
  if (score >= 90) {return chalk.green.bold(`${score}/100 (Grade A)`);}
  if (score >= 80) {return chalk.blue.bold(`${score}/100 (Grade B)`);}
  if (score >= 70) {return chalk.yellow.bold(`${score}/100 (Grade C)`);}
  if (score >= 60) {return chalk.orange.bold(`${score}/100 (Grade D)`);}
  return chalk.red.bold(`${score}/100 (Grade F)`);
}

function getSeverityColor(severity) {
  switch (severity) {
    case 'high': return chalk.red.bold;
    case 'medium': return chalk.yellow.bold;
    case 'low': return chalk.blue.bold;
    default: return chalk.gray;
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case 'critical': return chalk.red.bold;
    case 'high': return chalk.red;
    case 'medium': return chalk.yellow;
    case 'low': return chalk.blue;
    default: return chalk.gray;
  }
}

program.parse();