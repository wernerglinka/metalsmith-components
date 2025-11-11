# Troubleshooting Guide

This guide covers common issues you might encounter when developing with the Metalsmith Components library and their solutions.

## Component Development Issues

### Component Not Rendering

**Problem:** Component appears in frontmatter but doesn't render on the page.

**Solutions:**
1. Check `manifest.json` exists and has correct `type` field ("section" or "partial")
2. Verify `sectionType` in frontmatter matches component name exactly
3. Check template syntax in `.njk` file for errors
4. Run `npm run build:debug` to see detailed plugin output
5. Verify component is in correct directory (`sections/` or `_partials/`)

### Styles Not Applied

**Problem:** Component renders but CSS styles are missing.

**Solutions:**
1. Check `manifest.json` has `styles` array with correct CSS filename
2. Verify CSS file exists in component directory
3. Clear build directory: `rm -rf build && npm run build`
4. Check browser console for 404 errors on CSS files
5. Verify PostCSS syntax is valid (no CSS-in-JS syntax)

### JavaScript Not Executing

**Problem:** Interactive features don't work.

**Solutions:**
1. Check `manifest.json` has `scripts` array with correct JS filename
2. Verify JavaScript file exists in component directory
3. Check browser console for JavaScript errors
4. Ensure component has unique selectors (avoid generic class names)
5. Verify ES module syntax is correct (`export default function`)

### Missing Dependencies

**Problem:** Component needs partials but they don't render.

**Solutions:**
1. Add required partials to `requires` array in `manifest.json`
2. Verify partial names match exactly (case-sensitive)
3. Check that required partials exist in `_partials/` directory
4. Run `npm test` to validate manifest structure
5. See [Component Structure](../CLAUDE.md#component-structure) for manifest format

### Build Errors

**Problem:** Build fails with errors.

**Solutions:**
1. Run `npm test` first to catch manifest/content issues early
2. Check for invalid YAML in `.yml` example files
3. Verify all required files exist (`.njk`, `manifest.json`)
4. Look for Nunjucks syntax errors in templates
5. Check the [Common Issues](../CLAUDE.md#6-testing) list in scaffolding section

### Module Pattern Issues (Maps, Podcast)

**Problem:** Multi-provider component not loading correct library.

**Solutions:**
1. Verify `modules` field in `manifest.json` has correct structure
2. Check provider files exist in `modules/providers/` directory
3. Ensure helper files are in `modules/helpers/` directory
4. Verify main component file loads correct provider based on data
5. Check browser console for CDN loading errors
6. See [Advanced: Multi-Provider Components](../CLAUDE.md#2-required-files) section

### Watch Mode Issues

**Problem:** Changes not triggering rebuild in development.

**Solutions:**
1. Restart development server: `npm start`
2. Check if file is excluded from watch (like auto-generated files)
3. Verify file is inside `src/`, `lib/layouts/`, or `lib/assets/`
4. Clear build directory and restart: `rm -rf build && npm start`
5. See [Watch Mode Exclusions](../CLAUDE.md#watch-mode-exclusions) section

### Search Not Finding Content

**Problem:** Component documentation doesn't appear in search results.

**Solutions:**
1. Add `tags` array to frontmatter `card` object
2. Ensure `seo.title` and `card.description` are descriptive
3. Rebuild to regenerate search index: `npm run build`
4. Verify page is in correct collection (sections/partials)
5. See [Site-Wide Search System](../CLAUDE.md#site-wide-search-system) section

### Collection Not Updating

**Problem:** New blog post or reference page not appearing in collection.

**Solutions:**
1. Verify file is in correct directory (`src/blog/`, `src/references/sections/`, etc.)
2. Check frontmatter has required fields (`card.date` for blog, `seo.title` for refs)
3. Ensure file extension is `.md`
4. Rebuild to regenerate collections: `npm run build`
5. See [Collections](../CLAUDE.md#collections) section for collection patterns

### Validation Errors

**Problem:** Content validation fails during build.

**Solutions:**
1. Check `manifest.json` validation schema matches your content structure
2. Verify all `required` fields are present in frontmatter
3. Check property types match schema (`string`, `object`, `array`, etc.)
4. Run `npm test` to see specific validation errors
5. Review example `.yml` file for correct structure

## Build and Environment Issues

### Build Fails Unexpectedly

**Problem:** Build worked before but now fails.

**Solutions:**
1. Clear build directory: `rm -rf build`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check Node.js version (requires >=18.0.0): `node --version`
4. Review recent changes to frontmatter or templates
5. Run with debug output: `npm run build:debug`

### Watch Mode Infinite Loops

**Problem:** Development server keeps rebuilding continuously.

**Solutions:**
1. Check if you're editing auto-generated files (like `icon-loader.js` in maps)
2. Verify file exclusions in metalsmith.js watch configuration
3. Look for circular dependencies in component requirements
4. Clear build directory and restart: `rm -rf build && npm start`

### Port Already in Use

**Problem:** Development server can't start because port 3000 is taken.

**Solutions:**
1. Kill existing process: `lsof -ti:3000 | xargs kill -9`
2. Or use a different port by modifying the browsersync configuration
3. Check for orphaned node processes: `ps aux | grep node`

## Content and Data Issues

### Data Not Loading

**Problem:** Component can't access data from `lib/data/`.

**Solutions:**
1. Verify JSON file is valid (use `npx jsonlint lib/data/yourfile.json`)
2. Check file is in `lib/data/` directory
3. Verify frontmatter references correct data source name
4. Ensure data file name matches reference (case-sensitive)
5. Rebuild to reload data files

### Images Not Displaying

**Problem:** Images referenced in frontmatter don't show.

**Solutions:**
1. Verify image path is correct (relative to `src/` or absolute from root)
2. Check image file exists in `lib/assets/images/`
3. Ensure image path starts with `/assets/images/` for build output
4. Check browser console for 404 errors
5. Verify image extensions match actual files

### Frontmatter Validation Fails

**Problem:** Valid-looking frontmatter causes validation errors.

**Solutions:**
1. Check YAML syntax (proper indentation, no tabs)
2. Verify required fields are present for section type
3. Check for special characters that need quoting
4. Review component's `manifest.json` validation schema
5. Compare with working example in component's `.yml` file

## Testing Issues

### Tests Failing After Changes

**Problem:** Tests pass on main branch but fail after component changes.

**Solutions:**
1. Read test error messages carefully for specific failures
2. Check if new component has proper manifest.json
3. Verify manifest structure matches expected format
4. Ensure all referenced files actually exist
5. Run specific test file: `npx mocha test/component-manifests.test.js`

### Test Coverage Gaps

**Problem:** New feature not covered by tests.

**Solutions:**
1. Add test cases to appropriate test file
2. For new components, update `test/component-manifests.test.js`
3. For content changes, update `test/content-structure.test.js`
4. For build pipeline, update `test/build-integration.test.js`
5. Run tests in watch mode during development: `npm run test:watch`

## Performance Issues

### Slow Build Times

**Problem:** Build takes longer than expected.

**Solutions:**
1. Check number of files being processed
2. Look for large images that need optimization
3. Review component dependencies for circular references
4. Consider splitting large data files
5. Use development mode for faster iteration: `NODE_ENV=development npm start`

### Large Bundle Sizes

**Problem:** Generated CSS/JS files are too large.

**Solutions:**
1. Verify component bundler is tree-shaking unused code
2. Check for duplicate dependencies in manifests
3. Review CSS for unused rules
4. Consider lazy-loading for heavy components
5. Run production build to see minified sizes: `npm run build`

## Integration Issues

### Component Not Working in Starter

**Problem:** Component works in library but fails in Metalsmith2025 Starter.

**Solutions:**
1. Verify starter has same plugin versions
2. Check for missing dependencies in starter's package.json
3. Ensure component follows portable patterns (no library-specific paths)
4. Review component for hardcoded assumptions
5. Test component in isolation first

### Plugin Conflicts

**Problem:** Multiple Metalsmith plugins interfering.

**Solutions:**
1. Check plugin order in metalsmith.js
2. Review plugin documentation for known conflicts
3. Test with plugins disabled one at a time
4. Check for plugins modifying same metadata
5. Use debug mode to see plugin execution order

## Getting Help

If you encounter issues not covered here:

1. Check the main [CLAUDE.md](../CLAUDE.md) for general documentation
2. Review [COMPONENT-GUIDE.md](COMPONENT-GUIDE.md) for detailed component patterns
3. Run tests for specific error messages: `npm test`
4. Enable debug output: `npm run build:debug` or `npm run start:debug`
5. Review component examples in `src/references/` for working patterns
6. Compare your component structure to working components like `text-only` or `hero`
7. Check the [DEVELOPER-GUIDE.md](../../DEVELOPER-GUIDE.md) for lessons learned

## Common Debug Commands

Quick reference for debugging commands:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Build with debug output
npm run build:debug

# Start dev server with debug output
npm run start:debug

# Check for unused dependencies
npm run depcheck

# Validate specific JSON file
npx jsonlint lib/data/yourfile.json

# Find process using port 3000
lsof -ti:3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Clear build and rebuild
rm -rf build && npm run build

# Clear everything and reinstall
rm -rf build node_modules && npm install && npm run build
```
