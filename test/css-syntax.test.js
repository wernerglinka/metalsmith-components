/**
 * @fileoverview CSS Syntax Validation Tests
 *
 * This test suite validates CSS syntax in component stylesheets to catch
 * issues like unbalanced braces that can cause cascading failures in the
 * bundled CSS output.
 *
 * Why this matters:
 * - Unbalanced braces in one CSS file can break parsing of ALL subsequent
 *   CSS rules in the bundled output
 * - Browsers silently skip malformed CSS rather than throwing errors
 * - These issues are difficult to detect visually in minified CSS
 *
 * @author Werner Glinka <werner@glinka.co>
 * @since 1.0.0
 */

import { strict as assert } from 'node:assert';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

/**
 * Current directory path for test file location
 * @type {string}
 */
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Project root directory path
 * @type {string}
 */
const projectRoot = join(__dirname, '..');

/**
 * CSS Syntax Validation Test Suite
 *
 * Validates CSS files for syntax errors, with special focus on
 * brace balancing which is a common source of hard-to-debug issues.
 */
describe('CSS Syntax Validation', () => {
  /**
   * Components directory path
   * @type {string}
   */
  const componentsDir = join(projectRoot, 'lib/layouts/components');

  /**
   * Get all component directories from a base directory
   *
   * @param {string} baseDir - The base directory to scan for components
   * @returns {string[]} Array of full paths to component directories
   */
  function getComponentDirs(baseDir) {
    const dirs = [];
    const items = readdirSync(baseDir);

    for (const item of items) {
      const fullPath = join(baseDir, item);
      if (statSync(fullPath).isDirectory() && !item.startsWith('_')) {
        dirs.push(fullPath);
      }
    }
    return dirs;
  }

  /**
   * Get all CSS files from component directories
   *
   * @returns {Array<{path: string, name: string}>} Array of CSS file info
   */
  function getAllComponentCSSFiles() {
    const cssFiles = [];
    const allDirs = [
      ...getComponentDirs(join(componentsDir, '_partials')),
      ...getComponentDirs(join(componentsDir, 'sections'))
    ];

    for (const dir of allDirs) {
      const componentName = basename(dir);
      const cssPath = join(dir, `${componentName}.css`);

      if (existsSync(cssPath)) {
        cssFiles.push({ path: cssPath, name: componentName });
      }
    }

    return cssFiles;
  }

  /**
   * Count braces in CSS content, accounting for braces in strings and comments
   *
   * @param {string} css - CSS content to analyze
   * @returns {{open: number, close: number}} Brace counts
   */
  function countBraces(css) {
    // Remove comments
    let cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove strings (single and double quoted)
    cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, '');
    cleaned = cleaned.replace(/'(?:[^'\\]|\\.)*'/g, '');

    const open = (cleaned.match(/{/g) || []).length;
    const close = (cleaned.match(/}/g) || []).length;

    return { open, close };
  }

  /**
   * Brace Balance Test Suite
   *
   * Tests that all CSS files have balanced opening and closing braces.
   * Unbalanced braces cause the browser to skip parsing subsequent rules.
   */
  describe('Brace Balance', () => {
    it('should have balanced braces in all component CSS files', () => {
      const cssFiles = getAllComponentCSSFiles();
      const errors = [];

      for (const { path, name } of cssFiles) {
        try {
          const css = readFileSync(path, 'utf8');
          const { open, close } = countBraces(css);

          if (open !== close) {
            errors.push(
              `${name}.css: Unbalanced braces - ${open} opening '{' vs ${close} closing '}'`
            );
          }
        } catch (error) {
          errors.push(`${name}.css: Error reading file - ${error.message}`);
        }
      }

      if (errors.length > 0) {
        assert.fail(`CSS brace balance errors:\n${errors.join('\n')}`);
      }
    });
  });

  /**
   * PostCSS Syntax Validation Test Suite
   *
   * Uses PostCSS to parse CSS files and catch syntax errors that
   * simple brace counting might miss.
   */
  describe('PostCSS Syntax Validation', () => {
    it('should parse all component CSS files without syntax errors', async () => {
      const cssFiles = getAllComponentCSSFiles();
      const errors = [];

      for (const { path, name } of cssFiles) {
        try {
          const css = readFileSync(path, 'utf8');

          // PostCSS will throw on syntax errors
          await postcss([]).process(css, { from: path });
        } catch (error) {
          // Extract useful error info
          const line = error.line || 'unknown';
          const column = error.column || 'unknown';
          const reason = error.reason || error.message;

          errors.push(`${name}.css (line ${line}, col ${column}): ${reason}`);
        }
      }

      if (errors.length > 0) {
        assert.fail(`CSS syntax errors:\n${errors.join('\n')}`);
      }
    });

    it('should parse the bundled main.css without syntax errors', async () => {
      const mainCssPath = join(projectRoot, 'build/assets/main.css');

      // Skip if build hasn't been run
      if (!existsSync(mainCssPath)) {
        console.log('  (skipped - run npm run build first)');
        return;
      }

      try {
        const css = readFileSync(mainCssPath, 'utf8');
        await postcss([]).process(css, { from: mainCssPath });
      } catch (error) {
        const line = error.line || 'unknown';
        const column = error.column || 'unknown';
        const reason = error.reason || error.message;

        assert.fail(
          `Bundled main.css has syntax error at line ${line}, col ${column}: ${reason}`
        );
      }
    });
  });

  /**
   * Specific Pattern Detection
   *
   * Tests for common CSS mistakes that can cause subtle bugs.
   */
  describe('Common CSS Mistakes', () => {
    it('should not have consecutive closing braces without content', () => {
      const cssFiles = getAllComponentCSSFiles();
      const errors = [];

      // Pattern: }}\s* or }\s*} at end of rules (potential sign of copy-paste errors)
      // This is a heuristic - two closing braces with only whitespace between
      // at the end of a file often indicates an extra brace
      const suspiciousPattern = /}\s*}\s*$/;

      for (const { path, name } of cssFiles) {
        try {
          const css = readFileSync(path, 'utf8');

          // Check if file ends with suspicious double-close pattern
          // while also having unbalanced braces
          const { open, close } = countBraces(css);

          if (close > open && suspiciousPattern.test(css)) {
            errors.push(
              `${name}.css: Suspicious extra closing brace at end of file`
            );
          }
        } catch (error) {
          // Skip read errors - handled by other tests
        }
      }

      if (errors.length > 0) {
        assert.fail(`Suspicious CSS patterns found:\n${errors.join('\n')}`);
      }
    });
  });
});
