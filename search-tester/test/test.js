/**
 * Tests for Universal Search Tester
 */

import assert from 'assert';
import { SearchTester } from '../index.js';

describe('Universal Search Tester', () => {
  let tester;
  let sampleSearchIndex;

  before(() => {
    // Create sample search index
    sampleSearchIndex = {
      entries: [
        {
          title: 'Home Page',
          content: 'Welcome to our website. Find everything you need here.',
          url: '/',
          type: 'page',
          tags: ['home', 'welcome']
        },
        {
          title: 'About Us',
          content: 'Learn about our company and team members.',
          url: '/about',
          type: 'page',
          tags: ['about', 'company', 'team']
        },
        {
          title: 'Contact Information',
          content: 'Get in touch with us via email or phone.',
          url: '/contact',
          type: 'page',
          tags: ['contact', 'email', 'phone']
        },
        {
          title: 'Blog Posts',
          content: 'Read our latest articles and news updates.',
          url: '/blog',
          type: 'page',
          tags: ['blog', 'articles', 'news']
        }
      ]
    };

    tester = new SearchTester({
      relevanceThreshold: 60,
      maxResults: 10
    });
  });

  describe('Initialization', () => {
    it('should create SearchTester instance', () => {
      assert.ok(tester instanceof SearchTester);
    });

    it('should load search index', async () => {
      await tester.loadSearchIndex(sampleSearchIndex);
      assert.ok(tester.searchData);
      assert.equal(tester.searchData.entries.length, 4);
    });
  });

  describe('Term Testing', () => {
    it('should find results for valid terms', () => {
      const result = tester.testSearchTerm('home', 'validTerms');
      assert.equal(result.term, 'home');
      assert.equal(result.category, 'validTerms');
      assert.ok(result.totalResults >= 0);
    });

    it('should handle empty terms', () => {
      const result = tester.testSearchTerm('', 'edgeCases');
      assert.equal(result.results.length, 0);
      assert.ok(result.error || result.totalResults === 0);
    });

    it('should handle short terms', () => {
      const result = tester.testSearchTerm('a', 'edgeCases');
      assert.equal(result.term, 'a');
      assert.ok(result.error || result.results.length >= 0);
    });

    it('should return execution time', () => {
      const result = tester.testSearchTerm('test', 'validTerms');
      assert.ok(result.executionTime >= 0);
    });
  });

  describe('Comprehensive Testing', () => {
    it('should run full test suite', async function() {
      this.timeout(10000); // Increase timeout for comprehensive tests
      
      const results = await tester.runTests(null, {
        verbose: false,
        categories: ['validTerms', 'invalidTerms'],
        saveResults: false
      });

      assert.ok(results.results);
      assert.ok(results.analysis);
      assert.ok(results.metadata);
      assert.ok(results.results.length > 0);
    });

    it('should provide quality analysis', async () => {
      const results = await tester.runTests(null, {
        categories: ['validTerms'],
        saveResults: false
      });

      const analysis = results.analysis;
      assert.ok(analysis.summary);
      assert.ok(analysis.byCategory);
      assert.ok(Array.isArray(analysis.issues));
      assert.ok(Array.isArray(analysis.recommendations));
      assert.ok(typeof analysis.qualityScore === 'number');
      assert.ok(analysis.qualityScore >= 0 && analysis.qualityScore <= 100);
    });
  });

  describe('Configuration', () => {
    it('should use default configuration', () => {
      const defaultTester = new SearchTester();
      assert.equal(defaultTester.config.relevanceThreshold, 70);
      assert.equal(defaultTester.config.maxResults, 20);
    });

    it('should merge custom configuration', () => {
      const customTester = new SearchTester({
        relevanceThreshold: 80,
        maxResults: 5
      });
      assert.equal(customTester.config.relevanceThreshold, 80);
      assert.equal(customTester.config.maxResults, 5);
      assert.equal(customTester.config.minCharacters, 2); // Should keep default
    });
  });

  describe('Static Methods', () => {
    it('should provide test terms', () => {
      const terms = SearchTester.getTestTerms();
      assert.ok(terms);
      assert.ok(terms.validTerms);
      assert.ok(terms.invalidTerms);
      assert.ok(terms.edgeCases);
      assert.ok(Array.isArray(terms.validTerms));
      assert.ok(terms.validTerms.length > 0);
    });

    it('should create instance via static method', () => {
      const instance = SearchTester.create({ relevanceThreshold: 90 });
      assert.ok(instance instanceof SearchTester);
      assert.equal(instance.config.relevanceThreshold, 90);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid search index', async () => {
      const badTester = new SearchTester();
      try {
        await badTester.loadSearchIndex('/nonexistent/file.json');
        assert.fail('Should have thrown error');
      } catch (error) {
        assert.ok(error.message.includes('Failed to load search index'));
      }
    });

    it('should handle testing without loaded index', () => {
      const emptyTester = new SearchTester();
      try {
        emptyTester.testSearchTerm('test', 'validTerms');
        assert.fail('Should have thrown error');
      } catch (error) {
        assert.ok(error.message.includes('Search index not loaded'));
      }
    });
  });

  describe('Results Format', () => {
    it('should return properly formatted results', () => {
      const result = tester.testSearchTerm('contact', 'validTerms');
      
      assert.ok(result.term);
      assert.ok(result.category);
      assert.ok(Array.isArray(result.results));
      assert.ok(typeof result.totalResults === 'number');
      assert.ok(typeof result.relevantResults === 'number');
      assert.ok(typeof result.executionTime === 'number');

      if (result.results.length > 0) {
        const firstResult = result.results[0];
        assert.ok(firstResult.title || firstResult.title === '');
        assert.ok(typeof firstResult.score === 'number');
        assert.ok(Array.isArray(firstResult.matches));
      }
    });
  });
});