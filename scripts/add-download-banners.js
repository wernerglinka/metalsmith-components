#!/usr/bin/env node

/**
 * Add download banners to all component reference pages
 * This script appends a download banner section to each component reference page
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

/**
 * Generate download banner YAML for a component
 * @param {string} componentName - Component name (from filename)
 * @param {string} componentType - 'section' or 'partial'
 * @returns {string} YAML banner configuration
 */
function generateBannerYaml(componentName, componentType) {
  const displayName = componentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const typeLabel = componentType === 'section' ? 'Section' : 'Partial';

  return `
  - sectionType: banner
    containerTag: section
    classes: 'download-banner'
    id: ''
    isDisabled: false
    isReverse: false
    isAnimated: false
    componentDownload: '${componentName}'
    containerFields:
      inContainer: true
      noMargin:
        top: true
        bottom: true
      noPadding:
        top: false
        bottom: false
      background:
        isDark: false
        color: 'var(--color-background-light)'
        image: ''
        imageScreen: 'none'
    text:
      leadIn: ''
      title: 'Download ${displayName} ${typeLabel}'
      titleTag: 'h2'
      subTitle: ''
      prose: 'Get the complete ${componentName} component package including template, styles, manifest, examples, and installation script.'
    ctas:
      - url: '/downloads/${componentType}s/${componentName}.zip'
        label: 'Download ${displayName} ${typeLabel}'
        isButton: true
        buttonStyle: 'primary'
    image:
      src: ''
      alt: ''
      caption: ''`;
}

/**
 * Check if file already has a download banner
 * @param {string} content - File content
 * @returns {boolean} True if banner exists
 */
function hasDownloadBanner(content) {
  return content.includes('download-banner');
}

/**
 * Find the frontmatter boundaries
 * @param {string} content - File content
 * @returns {Object|null} Object with start and end positions
 */
function findFrontmatterBoundaries(content) {
  // Frontmatter must start at beginning of file
  if (!content.startsWith('---\n') && !content.startsWith('---\r\n')) {
    return null;
  }

  // Find the second --- that closes the frontmatter (on its own line)
  const lines = content.split('\n');
  let closingLineIndex = -1;

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      closingLineIndex = i;
      break;
    }
  }

  if (closingLineIndex === -1) {
    return null;
  }

  return {
    start: 0,
    closingLine: closingLineIndex
  };
}

/**
 * Add banner to a component file
 * @param {string} filePath - Path to component file
 * @param {string} componentType - 'section' or 'partial'
 */
async function addBannerToFile(filePath, componentType) {
  const componentName = path.basename(filePath, '.md');
  const content = await fs.readFile(filePath, 'utf-8');

  // Skip if already has download banner
  if (hasDownloadBanner(content)) {
    console.log(`  ⊘ ${componentName} - already has download banner`);
    return;
  }

  // Find frontmatter boundaries
  const boundaries = findFrontmatterBoundaries(content);
  if (!boundaries) {
    console.log(`  ✗ ${componentName} - invalid frontmatter structure`);
    return;
  }

  const lines = content.split('\n');
  const banner = generateBannerYaml(componentName, componentType);

  // Insert banner before the closing ---
  lines.splice(boundaries.closingLine, 0, banner);

  const newContent = lines.join('\n');

  await fs.writeFile(filePath, newContent, 'utf-8');
  console.log(`  ✓ ${componentName} - banner added`);
}

/**
 * Process all files in a directory
 * @param {string} directory - Directory path
 * @param {string} componentType - 'section' or 'partial'
 */
async function processDirectory(directory, componentType) {
  const files = await fs.readdir(directory);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  console.log(`\n📦 Processing ${componentType}s (${mdFiles.length} files)...`);

  for (const file of mdFiles) {
    const filePath = path.join(directory, file);
    await addBannerToFile(filePath, componentType);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Adding download banners to component reference pages...');

  try {
    // Process sections
    const sectionsDir = path.join(projectRoot, 'src', 'references', 'sections');
    await processDirectory(sectionsDir, 'section');

    // Process partials
    const partialsDir = path.join(projectRoot, 'src', 'references', 'partials');
    await processDirectory(partialsDir, 'partial');

    console.log('\n✅ Download banners added successfully!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
