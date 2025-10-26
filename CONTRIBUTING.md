# Contributing to Metalsmith Components

Thank you for your interest in contributing to the Metalsmith Components library! This document provides guidelines for contributing new components, improving existing ones, and enhancing documentation.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Make your changes
5. Run tests: `npm test`
6. Format code: `npm run format`
7. Commit and push your changes

## Code Formatting

We use Prettier for code formatting. Run `npm run format` before committing changes.

### Nunjucks Template Files

**All Nunjucks template files (`.njk`) are excluded from Prettier formatting** due to widespread compatibility issues between Prettier and Nunjucks syntax.

**Why this happens:** Prettier's Nunjucks parser has multiple limitations:
- Cannot parse dynamic HTML tag expressions like `<{{ variable }}>`
- Mangles complex Nunjucks conditionals by breaking them across lines incorrectly  
- Creates invalid syntax when reformatting template blocks and expressions
- Breaks multi-line template logic within HTML attributes
- Cannot handle nested template expressions properly

**Common problematic patterns:**
- Dynamic HTML tags: `<{{ titleTag }}>content</{{ titleTag }}>`
- Multi-line conditionals in attributes: `{% if condition %}attribute="value"{% endif %}`
- Complex nested template logic and macros
- Template expressions within HTML attribute values

**What to do:** When editing `.njk` files, format them manually using consistent indentation and spacing to match the project's style. The `npm run format` command will automatically skip all `.njk` files to prevent syntax corruption.

## Testing

The project includes comprehensive tests:

- **Build Integration Tests**: Validate the Metalsmith build pipeline
- **Component Manifest Tests**: Ensure all components have valid manifests
- **Content Structure Tests**: Verify frontmatter and data file structure
- **Component Dependency Tests**: Test the bundling system
- **Component Rendering Tests**: Verify components render correctly
- **Documentation Tests**: Ensure all components have proper documentation

Run tests with `npm test`. All tests must pass before submitting a pull request.

### Testing New Components

When adding a new component:
1. Add test cases for the component's manifest
2. Test with various configuration options
3. Verify the component renders without errors
4. Test responsive behavior
5. Check accessibility with screen readers
6. Validate against the Metalsmith2025 Starter structure

## Validation System

The project includes a validation system for catching configuration errors in frontmatter. When adding new components:

1. Add validation rules to the component's `manifest.json`
2. Base enum validations on actual CSS classes (not hardcoded values)
3. Focus on catching "silent failures" (wrong data types, invalid enums)
4. Test validation with both valid and invalid configurations

## Component Development

### Adding New Components

When creating new components for the library:

1. **Component Structure**: Follow the existing component structure in `lib/layouts/components/sections/`
2. **Include Required Files**:
   - `component-name.njk` - The Nunjucks template
   - `component-name.css` - Component styles (if needed)
   - `component-name.js` - Component JavaScript (if needed)
   - `manifest.json` - Dependencies and validation rules
   - `README.md` - Component documentation
3. **Create Reference Page**: Add a showcase page in `src/references/sections/` (for sections) or `src/references/partials/` (for partials) with:
   - Live examples of the component
   - Configuration options
   - Usage patterns
   - Code snippets
4. **Use Semantic HTML**: Ensure accessible markup and proper ARIA attributes
5. **Add JSDoc Comments**: Explain the component's purpose and parameters
6. **Update Tests**: Include the new component in the test suite

### Component Compatibility

Ensure components are compatible with the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter):

- Follow the same frontmatter structure patterns
- Use consistent property naming conventions
- Maintain the same dependency bundling approach
- Test component portability to starter projects

## Documentation

When adding or updating components:

1. **Component Documentation**: Each component should have clear documentation in `src/references/sections/component-name.md` or `src/references/partials/component-name.md`
2. **Code Examples**: Provide complete YAML configuration examples
3. **Property Descriptions**: Document all component properties and their effects
4. **Visual Examples**: Include working examples that render on the page
5. **Best Practices**: Include usage guidelines and common patterns

## Commit Messages

Use conventional commit format:
- `feat:` for new components or features
- `fix:` for bug fixes  
- `docs:` for documentation updates
- `style:` for CSS/styling changes
- `chore:` for maintenance tasks
- `refactor:` for code improvements

Examples:
- `feat: add accordion component with collapsible sections`
- `docs: update hero component examples`
- `fix: correct flip-card animation on mobile`

## Pull Requests

1. **Title**: Use a descriptive title following commit conventions
2. **Description**: Include:
   - What component was added/changed
   - Why the change was needed
   - Screenshots for visual changes
   - Link to live example (if applicable)
3. **Testing**: Ensure all tests pass
4. **Documentation**: Update relevant documentation
5. **Compatibility**: Verify compatibility with Metalsmith2025 Starter
6. **Review**: Request review from maintainers

## Contributing Examples

### Example: Adding a New Component

If you want to add a "Timeline" component:

1. Create component files in `lib/layouts/components/sections/timeline/`:
   - `timeline.njk` - Template structure
   - `timeline.css` - Styling
   - `timeline.js` - Interactive behavior (if needed)
   - `manifest.json` - Dependencies and configuration
   - `README.md` - Component documentation

2. Create reference page at `src/references/sections/timeline.md`:
   - Multiple examples showing different configurations
   - Property documentation
   - Usage guidelines

3. Test the component with the Metalsmith2025 Starter to ensure compatibility

4. Submit PR with title: `feat: add timeline component for chronological content`

## Questions?

- Open an issue for questions about contributing
- Join the [Metalsmith community on Gitter](https://gitter.im/metalsmith/community)
- Check existing components for implementation patterns
- Review the [Metalsmith2025 Structured Content Starter](https://github.com/wernerglinka/metalsmith2025-structured-content-starter) for compatibility requirements