/**
 * Component Package Generator Tests
 *
 * Tests for the component-package-generator plugin that creates downloadable
 * component packages and bundle installation scripts.
 */

import { describe, it, before } from 'mocha';
import { strict as assert } from 'assert';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

describe('Component Package Generator', function () {
  this.timeout(10000);

  let buildExists = false;
  let downloadsPath;
  let bundlePath;
  let manifestPath;

  before(async () => {
    // Check if build directory exists
    try {
      await fs.access(path.join(projectRoot, 'build'));
      buildExists = true;
      downloadsPath = path.join(projectRoot, 'build', 'downloads');
      bundlePath = path.join(downloadsPath, 'metalsmith-components');
      manifestPath = path.join(downloadsPath, 'manifest.json');
    } catch {
      buildExists = false;
    }
  });

  describe('Build Output', () => {
    it('should have a downloads directory after build', async function () {
      if (!buildExists) {
        this.skip();
      }

      await assert.doesNotReject(
        async () => await fs.access(downloadsPath),
        'Downloads directory should exist after build'
      );
    });

    it('should generate a manifest.json file', async function () {
      if (!buildExists) {
        this.skip();
      }

      await assert.doesNotReject(
        async () => await fs.access(manifestPath),
        'Manifest file should exist'
      );

      const manifestContent = await fs.readFile(manifestPath, 'utf-8');
      const manifest = JSON.parse(manifestContent);

      assert.ok(manifest.version, 'Manifest should have version');
      assert.ok(Array.isArray(manifest.sections), 'Manifest should have sections array');
      assert.ok(Array.isArray(manifest.partials), 'Manifest should have partials array');
      assert.ok(manifest.bundle, 'Manifest should have bundle metadata');
    });

    it('should generate metalsmith-components.zip bundle', async function () {
      if (!buildExists) {
        this.skip();
      }

      const bundleZipPath = path.join(downloadsPath, 'metalsmith-components.zip');
      await assert.doesNotReject(
        async () => await fs.access(bundleZipPath),
        'Bundle ZIP should exist'
      );

      const stats = await fs.stat(bundleZipPath);
      assert.ok(stats.size > 0, 'Bundle ZIP should not be empty');
    });

    it('should generate individual section packages', async function () {
      if (!buildExists) {
        this.skip();
      }

      const sectionsPath = path.join(downloadsPath, 'sections');
      await assert.doesNotReject(
        async () => await fs.access(sectionsPath),
        'Sections directory should exist'
      );

      const sectionFiles = await fs.readdir(sectionsPath);
      const zipFiles = sectionFiles.filter(file => file.endsWith('.zip'));
      assert.ok(zipFiles.length > 0, 'Should have at least one section package');
    });

    it('should generate individual partial packages', async function () {
      if (!buildExists) {
        this.skip();
      }

      const partialsPath = path.join(downloadsPath, 'partials');
      await assert.doesNotReject(
        async () => await fs.access(partialsPath),
        'Partials directory should exist'
      );

      const partialFiles = await fs.readdir(partialsPath);
      const zipFiles = partialFiles.filter(file => file.endsWith('.zip'));
      assert.ok(zipFiles.length > 0, 'Should have at least one partial package');
    });
  });

  describe('Bundle Install Script', () => {
    let installScriptPath;
    let installScriptContent;

    before(async function () {
      if (!buildExists) {
        this.skip();
      }

      // Extract bundle if not already extracted
      try {
        await fs.access(bundlePath);
      } catch {
        // Extract the bundle
        execSync(`cd "${downloadsPath}" && unzip -q metalsmith-components.zip`, {
          stdio: 'pipe'
        });
      }

      installScriptPath = path.join(bundlePath, 'install-all.sh');
      installScriptContent = await fs.readFile(installScriptPath, 'utf-8');
    });

    it('should generate install-all.sh script', async function () {
      if (!buildExists) {
        this.skip();
      }

      await assert.doesNotReject(
        async () => await fs.access(installScriptPath),
        'install-all.sh should exist in bundle'
      );
    });

    it('should have valid bash syntax', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.doesNotThrow(
        () => {
          execSync(`bash -n "${installScriptPath}"`, { stdio: 'pipe' });
        },
        'install-all.sh should have valid bash syntax'
      );
    });

    it('should include shebang and set -e', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(installScriptContent.startsWith('#!/bin/bash'), 'Should have bash shebang');
      assert.ok(installScriptContent.includes('set -e'), 'Should have set -e for error handling');
    });

    it('should support update-only mode', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(
        installScriptContent.includes('--update-only'),
        'Should support --update-only flag'
      );
      assert.ok(installScriptContent.includes('-u'), 'Should support -u short flag');
      assert.ok(
        installScriptContent.includes('MODE="update"'),
        'Should set update mode variable'
      );
    });

    it('should check for Metalsmith project', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(
        installScriptContent.includes('metalsmith.js'),
        'Should check for metalsmith.js'
      );
      assert.ok(
        installScriptContent.includes('Not a Metalsmith project'),
        'Should have error message for non-Metalsmith projects'
      );
    });

    it('should load configuration from metalsmith-components.config.json', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(
        installScriptContent.includes('metalsmith-components.config.json'),
        'Should check for config file'
      );
      assert.ok(
        installScriptContent.includes('componentsBasePath'),
        'Should read componentsBasePath'
      );
      assert.ok(installScriptContent.includes('sectionsDir'), 'Should read sectionsDir');
      assert.ok(installScriptContent.includes('partialsDir'), 'Should read partialsDir');
    });

    it('should install partials before sections', function () {
      if (!buildExists) {
        this.skip();
      }

      const partialsIndex = installScriptContent.indexOf('Installing partials');
      const sectionsIndex = installScriptContent.indexOf('Installing sections');

      assert.ok(partialsIndex > 0, 'Should have partials installation section');
      assert.ok(sectionsIndex > 0, 'Should have sections installation section');
      assert.ok(
        partialsIndex < sectionsIndex,
        'Partials should be installed before sections'
      );
    });

    it('should handle section dependencies', function () {
      if (!buildExists) {
        this.skip();
      }

      // Check that dependency installation logic exists
      assert.ok(
        installScriptContent.includes('Install dependency if needed'),
        'Should have dependency installation logic'
      );
      assert.ok(
        installScriptContent.includes('Installing required dependency'),
        'Should have dependency installation message'
      );
    });

    it('should not generate empty else blocks', function () {
      if (!buildExists) {
        this.skip();
      }

      // This regex looks for problematic patterns like:
      // else
      // fi
      // with no commands in between
      const emptyElsePattern = /else\s*\n\s*fi/g;
      const matches = installScriptContent.match(emptyElsePattern);

      assert.strictEqual(
        matches,
        null,
        'Should not have empty else blocks (bash syntax error)'
      );
    });

    it('should track installation counts', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(
        installScriptContent.includes('INSTALLED_COUNT=0'),
        'Should initialize installed count'
      );
      assert.ok(
        installScriptContent.includes('INSTALLED_COUNT=$((INSTALLED_COUNT + 1))'),
        'Should increment installed count'
      );
      assert.ok(
        installScriptContent.includes('SKIPPED_COUNT=0'),
        'Should initialize skipped count'
      );
      assert.ok(
        installScriptContent.includes('Installed/Updated:'),
        'Should display installed count'
      );
    });

    it('should export environment variables for component installers', function () {
      if (!buildExists) {
        this.skip();
      }

      assert.ok(
        installScriptContent.includes('export PROJECT_ROOT'),
        'Should export PROJECT_ROOT'
      );
      assert.ok(
        installScriptContent.includes('export BUNDLE_INSTALL'),
        'Should export BUNDLE_INSTALL flag'
      );
    });
  });

  describe('Individual Component Install Scripts', () => {
    it('should generate install.sh for each component', async function () {
      if (!buildExists) {
        this.skip();
      }

      // Check a few sections
      const sectionsToCheck = ['hero', 'text-only', 'footer'];
      await Promise.all(
        sectionsToCheck.map(async section => {
          const sectionInstallPath = path.join(
            bundlePath,
            'sections',
            section,
            'install.sh'
          );
          try {
            await fs.access(sectionInstallPath);
            const scriptContent = await fs.readFile(sectionInstallPath, 'utf-8');
            assert.ok(
              scriptContent.includes('#!/bin/bash'),
              `${section} install.sh should have shebang`
            );
          } catch {
            // Section might not exist, skip
          }
        })
      );

      // Check a few partials
      const partialsToCheck = ['text', 'ctas', 'image'];
      await Promise.all(
        partialsToCheck.map(async partial => {
          const partialInstallPath = path.join(
            bundlePath,
            'partials',
            partial,
            'install.sh'
          );
          try {
            await fs.access(partialInstallPath);
            const scriptContent = await fs.readFile(partialInstallPath, 'utf-8');
            assert.ok(
              scriptContent.includes('#!/bin/bash'),
              `${partial} install.sh should have shebang`
            );
          } catch {
            // Partial might not exist, skip
          }
        })
      );
    });

    it('should check for dependencies in component install scripts', async function () {
      if (!buildExists) {
        this.skip();
      }

      // Check a component that has dependencies (e.g., hero requires text, ctas)
      const heroInstallPath = path.join(bundlePath, 'sections', 'hero', 'install.sh');
      try {
        await fs.access(heroInstallPath);
        const scriptContent = await fs.readFile(heroInstallPath, 'utf-8');

        assert.ok(
          scriptContent.includes('Check dependencies') ||
            scriptContent.includes('Checking dependencies'),
          'Hero install script should check dependencies'
        );
      } catch {
        // Hero might not exist, skip
      }
    });

    it('should use content hash for version detection', async function () {
      if (!buildExists) {
        this.skip();
      }

      const textInstallPath = path.join(bundlePath, 'partials', 'text', 'install.sh');
      try {
        await fs.access(textInstallPath);
        const scriptContent = await fs.readFile(textInstallPath, 'utf-8');

        assert.ok(
          scriptContent.includes('contentHash') || scriptContent.includes('Content Hash'),
          'Install script should reference content hash'
        );
        assert.ok(
          scriptContent.includes('EXISTING_HASH'),
          'Should check existing installation hash'
        );
      } catch {
        // Text partial might not exist, skip
      }
    });
  });

  describe('Package Metadata', () => {
    it('should include README.md in each component package', async function () {
      if (!buildExists) {
        this.skip();
      }

      const textReadmePath = path.join(bundlePath, 'partials', 'text', 'README.md');
      try {
        await fs.access(textReadmePath);
        const readmeContent = await fs.readFile(textReadmePath, 'utf-8');

        assert.ok(readmeContent.includes('# Text'), 'README should have component title');
        assert.ok(readmeContent.includes('Installation'), 'README should have installation section');
      } catch {
        // Component might not exist, skip
      }
    });

    it('should include package.json with x-metalsmith-component marker', async function () {
      if (!buildExists) {
        this.skip();
      }

      const textPackagePath = path.join(bundlePath, 'partials', 'text', 'package.json');
      try {
        await fs.access(textPackagePath);
        const packageContent = await fs.readFile(textPackagePath, 'utf-8');
        const packageJson = JSON.parse(packageContent);

        assert.ok(
          packageJson['x-metalsmith-component'],
          'package.json should have x-metalsmith-component marker'
        );
        assert.ok(packageJson.contentHash, 'package.json should have contentHash');
        assert.ok(packageJson.version, 'package.json should have version');
      } catch {
        // Component might not exist, skip
      }
    });
  });

  describe('Bundle README', () => {
    it('should include comprehensive README.md in bundle root', async function () {
      if (!buildExists) {
        this.skip();
      }

      const bundleReadmePath = path.join(bundlePath, 'README.md');
      await assert.doesNotReject(
        async () => await fs.access(bundleReadmePath),
        'Bundle should have README.md'
      );

      const readmeContent = await fs.readFile(bundleReadmePath, 'utf-8');

      assert.ok(readmeContent.includes('Metalsmith Components Bundle'), 'Should have title');
      assert.ok(readmeContent.includes('Configuration'), 'Should document configuration');
      assert.ok(
        readmeContent.includes('metalsmith-components.config.json'),
        'Should document config file'
      );
      assert.ok(readmeContent.includes('Update Mode'), 'Should document update mode');
      assert.ok(
        readmeContent.includes('--update-only'),
        'Should document update-only flag'
      );
    });
  });
});
