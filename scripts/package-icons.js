#!/usr/bin/env node

/**
 * Package Feather Icons Script
 *
 * Creates a downloadable ZIP archive containing all Feather icon templates (.njk files)
 * from lib/layouts/icons/ for easy distribution to users working with different starters.
 *
 * Output: build/downloads/feather-icons.zip
 */

import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const iconsSourcePath = path.join(projectRoot, 'lib/layouts/icons');
const outputDir = path.join(projectRoot, 'build/downloads');
const outputFile = path.join(outputDir, 'feather-icons.zip');

async function packageIcons() {
  try {
    // console.log('📦 Packaging Feather icons...');

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Create write stream for ZIP
    const output = createWriteStream(outputFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    // Handle stream events
    output.on('close', () => {
      // Icon package created successfully
      // console.log(`✓ Created feather-icons.zip`);
      // console.log(`  Location: build/downloads/feather-icons.zip`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    // Pipe archive to output file
    archive.pipe(output);

    // Add README to the ZIP
    const readme = `# Feather Icons for Metalsmith

This archive contains ${await countIcons()} Feather icon templates in Nunjucks format.

## Installation

1. Extract this archive to your Metalsmith project root
2. Copy the \`icons\` directory to \`lib/layouts/icons/\`:

\`\`\`bash
cp -r icons/ /path/to/your-project/lib/layouts/icons/
\`\`\`

## Usage

These icons are used by the \`icon\` partial component. Once installed, you can reference them in your templates:

\`\`\`njk
{% from "components/_partials/icon/icon.njk" import icon %}
{{ icon('moon', 'Moon Icon') }}
{{ icon('sun', 'Sun Icon') }}
\`\`\`

## Icon List

This archive includes all Feather icons. Some commonly used ones:
- moon.njk, sun.njk (for theme switchers)
- menu.njk, x.njk (for navigation)
- arrow-left.njk, arrow-right.njk (for pagination)
- check.njk, x-circle.njk (for status indicators)
- and ${await countIcons() - 4} more...

## About Feather Icons

Feather is a collection of simply beautiful open source icons. Each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency, and flexibility.

Website: https://feathericons.com/
License: MIT

## Integration with Metalsmith Components

These icons are designed to work with the Metalsmith Components library icon partial. The icon partial component must be installed separately from:
https://metalsmith-components.netlify.app/references/partials/icon
`;

    archive.append(readme, { name: 'README.md' });

    // Add all icon files to the archive under 'icons/' directory
    const iconFiles = await fs.readdir(iconsSourcePath);

    for (const file of iconFiles) {
      if (file.endsWith('.njk')) {
        const filePath = path.join(iconsSourcePath, file);
        archive.file(filePath, { name: `icons/${file}` });
      }
    }

    // Icon files added to archive

    // Finalize the archive
    await archive.finalize();

  } catch (error) {
    console.error('❌ Error packaging icons:', error);
    process.exit(1);
  }
}

async function countIcons() {
  const iconFiles = await fs.readdir(iconsSourcePath);
  return iconFiles.filter(file => file.endsWith('.njk')).length;
}

// Run the script
packageIcons();
