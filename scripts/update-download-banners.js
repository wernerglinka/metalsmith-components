#!/usr/bin/env node

/**
 * Update all download banners to use aside tag and h3 title
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

async function updateFile(filePath) {
  let content = await fs.readFile(filePath, 'utf-8');

  if (!content.includes('download-banner')) {
    return;
  }

  // Replace containerTag: section with containerTag: aside (in banner sections with download-banner class)
  // Match from sectionType: banner to the containerTag line
  content = content.replace(
    /(sectionType:\s*banner[\s\S]{0,100}?containerTag:\s*)section/g,
    '$1aside'
  );

  // Replace titleTag: 'h2' with titleTag: 'h3' (only in download-banner section)
  content = content.replace(
    /(download-banner[\s\S]*?titleTag:\s*)'h2'/,
    "$1'h3'"
  );

  await fs.writeFile(filePath, content, 'utf-8');
}

async function processDirectory(directory) {
  const files = await fs.readdir(directory);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  // console.log(`\n📦 Processing ${type}s (${mdFiles.length} files)...`);

  // Update all files in parallel
  await Promise.all(
    mdFiles.map(file => updateFile(path.join(directory, file)))
  );
}

async function main() {
  // console.log('🔧 Updating download banners...');

  try {
    const sectionsDir = path.join(projectRoot, 'src', 'references', 'sections');
    await processDirectory(sectionsDir, 'section');

    const partialsDir = path.join(projectRoot, 'src', 'references', 'partials');
    await processDirectory(partialsDir, 'partial');

    // console.log('\n✅ All download banners updated!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
