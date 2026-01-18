/**
 * Metalsmith Component Package Generator Plugin
 *
 * Generates downloadable ZIP packages for components during the build process.
 * Creates individual packages for sections and partials, plus a complete bundle.
 * Includes content-hash tracking for intelligent version management.
 *
 * @module component-package-generator
 */

import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import crypto from 'crypto';
import archiver from 'archiver';
import yaml from 'js-yaml';

/**
 * Default plugin options
 * @typedef {Object} PluginOptions
 * @property {string} componentsPath - Base path to components directory
 * @property {string} examplesPath - Path to examples directory
 * @property {string} outputPath - Output directory for packages
 * @property {boolean} generateBundle - Whether to generate complete bundle
 * @property {boolean} generateChecksums - Whether to generate SHA256 checksums
 */

/**
 * Component metadata structure
 * @typedef {Object} ComponentMetadata
 * @property {string} name - Component name
 * @property {string} type - Component type (section or partial)
 * @property {string} path - Full path to component directory
 * @property {string} version - Component version
 * @property {string} contentHash - SHA256 hash of component content
 * @property {Object} manifest - Component manifest data
 * @property {Object} files - Component files (template, styles, scripts)
 * @property {Array} examples - Configuration examples
 * @property {Array} requires - Required dependencies
 */

/**
 * Metalsmith plugin factory
 * @param {PluginOptions} options - Plugin configuration options
 * @returns {Function} Metalsmith plugin function
 */
export default function componentPackageGenerator(options = {}) {
  const defaultOptions = {
    componentsPath: 'lib/layouts/components',
    examplesPath: 'lib/layouts/components/examples',
    outputPath: 'downloads',
    generateBundle: true,
    generateChecksums: true
  };

  const config = { ...defaultOptions, ...options };

  return async function (files, metalsmith, done) {
    // console.log('\n📦 Generating component packages...');

    try {
      const projectVersion = await getProjectVersion(metalsmith.directory());
      const outputDir = path.join(metalsmith.destination(), config.outputPath);

      // Create output directories
      await fs.mkdir(path.join(outputDir, 'sections'), { recursive: true });
      await fs.mkdir(path.join(outputDir, 'partials'), { recursive: true });

      // Scan and load components
      const sections = await scanComponents(
        path.join(metalsmith.directory(), config.componentsPath, 'sections'),
        'section',
        metalsmith.directory(),
        config.examplesPath,
        projectVersion
      );

      const partials = await scanComponents(
        path.join(metalsmith.directory(), config.componentsPath, '_partials'),
        'partial',
        metalsmith.directory(),
        config.examplesPath,
        projectVersion
      );

      // console.log(`Found ${sections.length} sections and ${partials.length} partials`);

      // Generate individual packages in parallel
      const sectionPackages = await Promise.all(
        sections.map(section =>
          createComponentPackage(
            section,
            path.join(outputDir, 'sections'),
            config.generateChecksums
          )
        )
      );

      const partialPackages = await Promise.all(
        partials.map(partial =>
          createComponentPackage(
            partial,
            path.join(outputDir, 'partials'),
            config.generateChecksums
          )
        )
      );

      // Generate complete bundle if enabled
      let bundleMetadata = null;
      if (config.generateBundle) {
        bundleMetadata = await createBundle(
          { sections, partials },
          outputDir,
          projectVersion,
          config.generateChecksums
        );
      }

      // Generate manifest
      const manifest = generateManifest(
        { sections: sectionPackages, partials: partialPackages },
        bundleMetadata,
        config.outputPath
      );

      await fs.writeFile(
        path.join(outputDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
      );

      // Add metadata to Metalsmith for template use
      addMetadataToMetalsmith(manifest, metalsmith);

      // console.log(`✓ Generated ${sectionPackages.length + partialPackages.length} packages`);
      if (bundleMetadata) {
        // console.log(`✓ Generated complete bundle: ${bundleMetadata.size}`);
      }
      // console.log(`✓ Package manifest written to ${config.outputPath}/manifest.json\n`);

      done();
    } catch (error) {
      console.error('Error generating component packages:', error);
      done(error);
    }
  };
}

/**
 * Get project version from package.json
 * @param {string} projectRoot - Project root directory
 * @returns {Promise<string>} Project version
 */
async function getProjectVersion(projectRoot) {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  return packageJson.version;
}

/**
 * Scan components directory and load component metadata
 * @param {string} componentsPath - Path to components directory
 * @param {string} type - Component type (section or partial)
 * @param {string} projectRoot - Project root directory
 * @param {string} examplesPath - Path to examples directory
 * @param {string} version - Project version
 * @returns {Promise<Array<ComponentMetadata>>} Array of component metadata objects
 */
async function scanComponents(componentsPath, type, projectRoot, examplesPath, version) {
  const components = [];

  try {
    const entries = await fs.readdir(componentsPath, { withFileTypes: true });

    // Process all components in parallel
    const componentPromises = entries
      .filter(entry => entry.isDirectory())
      .map(async (entry) => {
        const componentPath = path.join(componentsPath, entry.name);
        const manifestPath = path.join(componentPath, 'manifest.json');

        // Check if manifest exists
        try {
          await fs.access(manifestPath);
        } catch {
          console.warn(`⚠ Skipping ${entry.name}: no manifest.json found`);
          return null;
        }

        // Load component data
        return loadComponentData(
          entry.name,
          componentPath,
          type,
          projectRoot,
          examplesPath,
          version
        );
      });

    const results = await Promise.all(componentPromises);
    components.push(...results.filter(component => component !== null));
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  return components;
}

/**
 * Load component files and metadata
 * @param {string} name - Component name
 * @param {string} componentPath - Path to component directory
 * @param {string} type - Component type
 * @param {string} projectRoot - Project root directory
 * @param {string} examplesPath - Path to examples directory
 * @param {string} version - Project version
 * @returns {Promise<ComponentMetadata>} Component metadata object
 */
async function loadComponentData(name, componentPath, type, projectRoot, examplesPath, version) {
  // Load manifest
  const manifestPath = path.join(componentPath, 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));

  // Load component files
  const files = {
    template: await fs.readFile(path.join(componentPath, `${name}.njk`), 'utf-8')
  };

  // Load optional files
  const cssPath = path.join(componentPath, `${name}.css`);
  try {
    files.styles = await fs.readFile(cssPath, 'utf-8');
  } catch {
    // CSS is optional
  }

  const jsPath = path.join(componentPath, `${name}.js`);
  try {
    files.scripts = await fs.readFile(jsPath, 'utf-8');
  } catch {
    // JS is optional
  }

  // Check for modules directory (for components with provider support)
  const modulesPath = path.join(componentPath, 'modules');
  try {
    await fs.access(modulesPath);
    files.modules = await loadModules(modulesPath);
  } catch {
    // Modules are optional
  }

  // Check for custom README.md
  const readmePath = path.join(componentPath, 'README.md');
  try {
    files.readme = await fs.readFile(readmePath, 'utf-8');
  } catch {
    // README is optional - will be generated if not present
  }

  // Generate content hash
  const contentHash = generateContentHash(files);

  // Load examples
  const examples = await loadExamples(name, projectRoot, examplesPath, type);

  // Extract dependencies
  const requires = Array.isArray(manifest.requires)
    ? manifest.requires
    : (manifest.requires ? Object.keys(manifest.requires) : []);

  return {
    name,
    type,
    path: componentPath,
    version,
    contentHash,
    manifest,
    files,
    examples,
    requires
  };
}

/**
 * Load modules directory for components with provider support
 * @param {string} modulesPath - Path to modules directory
 * @returns {Promise<Object>} Modules organized by category
 */
async function loadModules(modulesPath) {
  const modules = {
    providers: [],
    helpers: []
  };

  try {
    // Load providers in parallel
    const providersPath = path.join(modulesPath, 'providers');
    try {
      const providerFiles = await fs.readdir(providersPath);
      const providerPromises = providerFiles
        .filter(file => file.endsWith('.js'))
        .map(async (file) => ({
          name: file,
          content: await fs.readFile(path.join(providersPath, file), 'utf-8')
        }));
      modules.providers = await Promise.all(providerPromises);
    } catch {
      // No providers directory
    }

    // Load helpers in parallel
    const helpersPath = path.join(modulesPath, 'helpers');
    try {
      const helperFiles = await fs.readdir(helpersPath);
      const helperPromises = helperFiles
        .filter(file => file.endsWith('.js'))
        .map(async (file) => ({
          name: file,
          content: await fs.readFile(path.join(helpersPath, file), 'utf-8')
        }));
      modules.helpers = await Promise.all(helperPromises);
    } catch {
      // No helpers directory
    }
  } catch {
    // No modules directory
  }

  return modules;
}

/**
 * Generate SHA256 content hash for component
 * @param {Object} files - Component files object
 * @returns {string} Truncated SHA256 hash (16 characters)
 */
function generateContentHash(files) {
  const hash = crypto.createHash('sha256');

  // Hash template (required)
  hash.update(files.template);

  // Hash optional files if present
  if (files.styles) {hash.update(files.styles);}
  if (files.scripts) {hash.update(files.scripts);}

  // Hash modules if present
  if (files.modules) {
    files.modules.providers.forEach(provider => hash.update(provider.content));
    files.modules.helpers.forEach(helper => hash.update(helper.content));
  }

  return hash.digest('hex').substring(0, 16);
}

/**
 * Load configuration examples for component
 * @param {string} name - Component name
 * @param {string} projectRoot - Project root directory
 * @param {string} examplesPath - Path to examples directory
 * @param {string} type - Component type
 * @returns {Promise<Array>} Array of example configurations
 */
async function loadExamples(name, projectRoot, examplesPath, type) {
  // Try dedicated examples file first (in component directory)
  const componentExamplesFile = path.join(
    projectRoot,
    'lib/layouts/components',
    type === 'section' ? 'sections' : '_partials',
    name,
    `${name}.yml`
  );
  try {
    // Read raw content for direct copy-paste in downloads
    const rawContent = await fs.readFile(componentExamplesFile, 'utf-8');
    const examples = yaml.load(rawContent);
    // Return both raw content and structured examples
    if (Array.isArray(examples) && examples[0]?.sectionType) {
      return {
        raw: rawContent,
        structured: examples.map((config, index) => ({
          name: `Example ${index + 1}`,
          description: 'Configuration from component',
          config
        }))
      };
    }
    return { raw: rawContent, structured: examples };
  } catch {
    // Try legacy examples path
    const examplesFile = path.join(projectRoot, examplesPath, `${name}.yaml`);
    try {
      const rawContent = await fs.readFile(examplesFile, 'utf-8');
      return { raw: rawContent, structured: yaml.load(rawContent) };
    } catch {
      // Fall back to extracting from documentation page
      const docPath =
        type === 'section'
          ? path.join(projectRoot, 'src', 'references', 'sections', `${name}.md`)
          : path.join(projectRoot, 'src', 'references', 'partials', `${name}.md`);

      try {
        const docContent = await fs.readFile(docPath, 'utf-8');
        const structured = extractExamplesFromDocs(docContent, name);
        return { raw: null, structured };
      } catch {
        // Generate minimal example if no examples found
        const structured = generateDefaultExample(name, type);
        return { raw: null, structured };
      }
    }
  }
}

/**
 * Extract examples from documentation page frontmatter
 * @param {string} docContent - Documentation page content
 * @param {string} componentName - Component name
 * @returns {Array} Array of example configurations
 */
function extractExamplesFromDocs(docContent, componentName) {
  const examples = [];

  // Extract frontmatter
  const frontmatterMatch = docContent.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {return [];}

  const frontmatter = yaml.load(frontmatterMatch[1]);

  // Extract sections that match component type
  if (frontmatter.sections) {
    frontmatter.sections.forEach((section, index) => {
      if (section.sectionType === componentName) {
        examples.push({
          name: `Example ${index + 1}`,
          description: `Configuration from documentation`,
          config: section
        });
      }
    });
  }

  return examples;
}

/**
 * Generate default example configuration
 * @param {string} name - Component name
 * @param {string} type - Component type
 * @returns {Array} Array with single default example
 */
function generateDefaultExample(name, type) {
  return [
    {
      name: 'Basic Example',
      description: `Minimal ${name} configuration`,
      config:
        type === 'section'
          ? {
              sectionType: name,
              text: {
                title: 'Example Title',
                prose: 'Example content'
              }
            }
          : {}
    }
  ];
}

/**
 * Generate README documentation for component
 * @param {ComponentMetadata} component - Component metadata
 * @returns {string} README content in Markdown format
 */
// eslint-disable-next-line complexity
function generateReadme(component) {
  const { name, version, contentHash, type, requires, examples, manifest } = component;

  let readme = `# ${name.charAt(0).toUpperCase() + name.slice(1)} ${type === 'section' ? 'Section' : 'Partial'}\n\n`;
  readme += `**Version:** ${version}\n`;
  readme += `**Content Hash:** ${contentHash}\n\n`;

  // Description from manifest if available
  if (manifest.description) {
    readme += `${manifest.description}\n\n`;
  }

  // Dependencies section
  if (requires.length > 0) {
    readme += `## Dependencies\n\n`;
    readme += `This ${type} requires the following partials:\n\n`;
    requires.forEach(dep => {
      readme += `- [${dep}](../partials/${dep}-v${version}.zip)\n`;
    });
    readme += `\n`;
    readme += `**Note:** Dependencies are not included in this package. Download them separately.\n\n`;
  }

  // Features section
  readme += `## Features\n\n`;
  if (component.files.styles) {readme += `- Includes custom styles\n`;}
  if (component.files.scripts) {readme += `- Includes interactive JavaScript\n`;}
  if (component.files.modules) {
    readme += `- Supports multiple providers\n`;
    if (component.files.modules.providers.length > 0) {
      readme += `  - ${component.files.modules.providers.map(p => p.name.replace('.js', '')).join(', ')}\n`;
    }
  }
  readme += `\n`;

  // Installation section
  readme += `## Installation\n\n`;
  readme += `### Automated Installation\n\n`;
  readme += `\`\`\`bash\n`;
  readme += `./install.sh\n`;
  readme += `\`\`\`\n\n`;
  readme += `The install script will:\n`;
  readme += `- Detect your Metalsmith project\n`;
  readme += `- Read paths from \`metalsmith-components.config.json\` (if present)\n`;
  readme += `- Check for existing versions\n`;
  readme += `- Verify dependencies\n`;
  readme += `- Copy files to the correct locations\n\n`;
  readme += `**Note:** Component paths can be customized via \`metalsmith-components.config.json\` in your project root. See the bundle README for details.\n\n`;

  readme += `### Manual Installation\n\n`;
  readme += `Copy the component files to your Metalsmith project:\n\n`;
  readme += `\`\`\`bash\n`;
  readme += `cp ${name}.njk your-project/lib/layouts/components/${type === 'section' ? 'sections' : '_partials'}/${name}/\n`;
  if (component.files.styles) {
    readme += `cp ${name}.css your-project/lib/layouts/components/${type === 'section' ? 'sections' : '_partials'}/${name}/\n`;
  }
  if (component.files.scripts) {
    readme += `cp ${name}.js your-project/lib/layouts/components/${type === 'section' ? 'sections' : '_partials'}/${name}/\n`;
  }
  readme += `cp manifest.json your-project/lib/layouts/components/${type === 'section' ? 'sections' : '_partials'}/${name}/\n`;
  readme += `\`\`\`\n\n`;

  // Usage section
  const structuredExamples = examples.structured || examples;
  if (type === 'section' && structuredExamples.length > 0) {
    readme += `## Usage\n\n`;
    readme += `Add the ${name} section to your page frontmatter:\n\n`;

    structuredExamples.forEach((example, index) => {
      if (index > 0) {readme += `\n---\n\n`;}
      readme += `### ${example.name}\n\n`;
      if (example.description) {
        readme += `${example.description}\n\n`;
      }
      readme += `\`\`\`yaml\n`;
      readme += `sections:\n`;
      readme += `  - ${yaml.dump(example.config).trim().split('\n').join('\n    ')}\n`;
      readme += `\`\`\`\n\n`;
    });
  }

  // More information
  readme += `## More Information\n\n`;
  readme += `For complete documentation and live examples, visit:\n`;
  readme += `https://metalsmith-components.netlify.app/${type === 'section' ? 'library' : 'references/partials'}/${name}/\n\n`;

  return readme;
}

/**
 * Generate package.json for component
 * @param {ComponentMetadata} component - Component metadata
 * @returns {Object} package.json object
 */
function generatePackageJson(component) {
  const { name, version, contentHash, type, requires, manifest } = component;

  const packageJson = {
    name: `@metalsmith-components/${name}`,
    version,
    description: manifest.description || `Metalsmith ${name} ${type}`,
    keywords: ['metalsmith', 'component', type, name],
    'x-metalsmith-component': true, // Unique marker for component packages
    contentHash,
    main: `${name}.njk`,
    files: [`${name}.njk`, 'manifest.json', 'README.md', 'install.sh']
  };

  // Add optional files
  if (component.files.styles) {packageJson.files.push(`${name}.css`);}
  if (component.files.scripts) {packageJson.files.push(`${name}.js`);}
  if (component.files.modules) {packageJson.files.push('modules/');}

  // Add peer dependencies for required partials
  if (requires.length > 0) {
    packageJson.peerDependencies = {};
    requires.forEach(dep => {
      packageJson.peerDependencies[`@metalsmith-components/${dep}`] = `>=${version}`;
    });
  }

  return packageJson;
}

/**
 * Generate installation script for component
 * @param {ComponentMetadata} component - Component metadata
 * @returns {string} Bash installation script
 */
function generateInstallScript(component) {
  const { name, version, contentHash, type, requires } = component;

  let script = `#!/bin/bash\n\n`;
  script += `# Installation script for ${name} v${version}\n`;
  script += `# Content Hash: ${contentHash}\n\n`;

  script += `set -e\n\n`;

  // Base URL for downloading components
  script += `# Base URL for component downloads\n`;
  script += `DOWNLOAD_BASE_URL="https://metalsmith-components.com/downloads"\n\n`;

  script += `echo "🔧 Installing ${name} v${version}..."\n\n`;

  // Detect Metalsmith project and set project root
  script += `# Detect Metalsmith project directory and component source\n`;
  script += `COMPONENT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"\n\n`;
  script += `# Check if PROJECT_ROOT was set by bundle installer\n`;
  script += `if [ -n "$PROJECT_ROOT" ]; then\n`;
  script += `  # Called from bundle installer, PROJECT_ROOT already set\n`;
  script += `  cd "$PROJECT_ROOT"\n`;
  script += `# Check if we're in a component package directory (has x-metalsmith-component marker)\n`;
  script += `elif [ -f "package.json" ] && grep -q "\\"x-metalsmith-component\\"" package.json; then\n`;
  script += `  # In a component directory, look up for project root\n`;
  script += `  if [ -f "../metalsmith.js" ]; then\n`;
  script += `    PROJECT_ROOT="$(cd .. && pwd)"\n`;
  script += `    cd "$PROJECT_ROOT"\n`;
  script += `  elif [ -f "../../metalsmith.js" ]; then\n`;
  script += `    # Two levels up (e.g., bundle/partials/component/)\n`;
  script += `    PROJECT_ROOT="$(cd ../.. && pwd)"\n`;
  script += `    cd "$PROJECT_ROOT"\n`;
  script += `  else\n`;
  script += `    echo "❌ Error: Component directory not in a Metalsmith project"\n`;
  script += `    echo "Please extract components in your Metalsmith project root directory"\n`;
  script += `    exit 1\n`;
  script += `  fi\n`;
  script += `elif [ -f "metalsmith.js" ]; then\n`;
  script += `  # Already in project root\n`;
  script += `  PROJECT_ROOT="$(pwd)"\n`;
  script += `else\n`;
  script += `  echo "❌ Error: Not a Metalsmith project directory"\n`;
  script += `  echo "Please run this script from your Metalsmith project root or from within the extracted component directory"\n`;
  script += `  exit 1\n`;
  script += `fi\n\n`;

  // Load configuration
  script += `# Load component paths from config or use defaults\n`;
  script += `if [ -f "metalsmith-components.config.json" ]; then\n`;
  script += `  COMPONENTS_BASE=$(node -p "try { require('./metalsmith-components.config.json').componentsBasePath } catch(e) { 'lib/layouts/components' }")\n`;
  script += `  SECTIONS_DIR=$(node -p "try { require('./metalsmith-components.config.json').sectionsDir } catch(e) { 'sections' }")\n`;
  script += `  PARTIALS_DIR=$(node -p "try { require('./metalsmith-components.config.json').partialsDir } catch(e) { '_partials' }")\n`;
  script += `else\n`;
  script += `  COMPONENTS_BASE="lib/layouts/components"\n`;
  script += `  SECTIONS_DIR="sections"\n`;
  script += `  PARTIALS_DIR="_partials"\n`;
  script += `fi\n\n`;

  // Initialize tracking for installed dependencies (prevents circular loops)
  script += `# Track installed dependencies to prevent circular loops\n`;
  script += `if [ -z "$INSTALLED_DEPS" ]; then\n`;
  script += `  export INSTALLED_DEPS=""\n`;
  script += `fi\n\n`;

  // Function to download and install a dependency
  script += `# Function to download and install a dependency\n`;
  script += `install_dependency() {\n`;
  script += `  local dep_name="$1"\n`;
  script += `  local dep_type="$2"  # "partial" or "section"\n`;
  script += `  \n`;
  script += `  # Check if already processed in this session (circular dependency protection)\n`;
  script += `  if [[ "$INSTALLED_DEPS" == *":$dep_name:"* ]]; then\n`;
  script += `    return 0\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  # Mark as being processed\n`;
  script += `  export INSTALLED_DEPS="$INSTALLED_DEPS:$dep_name:"\n`;
  script += `  \n`;
  script += `  local dep_dir\n`;
  script += `  local download_url\n`;
  script += `  \n`;
  script += `  if [ "$dep_type" = "section" ]; then\n`;
  script += `    dep_dir="$COMPONENTS_BASE/$SECTIONS_DIR/$dep_name"\n`;
  script += `    download_url="$DOWNLOAD_BASE_URL/sections/$dep_name.zip"\n`;
  script += `  else\n`;
  script += `    dep_dir="$COMPONENTS_BASE/$PARTIALS_DIR/$dep_name"\n`;
  script += `    download_url="$DOWNLOAD_BASE_URL/partials/$dep_name.zip"\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  # Check if already installed\n`;
  script += `  if [ -f "$dep_dir/manifest.json" ]; then\n`;
  script += `    echo "  ✓ $dep_name (already installed)"\n`;
  script += `    return 0\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  echo "  ↓ Installing $dep_name..."\n`;
  script += `  \n`;
  script += `  # Create temp directory for download\n`;
  script += `  local temp_dir=$(mktemp -d)\n`;
  script += `  local zip_file="$temp_dir/$dep_name.zip"\n`;
  script += `  \n`;
  script += `  # Download the component\n`;
  script += `  if ! curl -sL -f "$download_url" -o "$zip_file" 2>/dev/null; then\n`;
  script += `    echo "    ⚠ Failed to download $dep_name from $download_url"\n`;
  script += `    rm -rf "$temp_dir"\n`;
  script += `    return 1\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  # Extract and install\n`;
  script += `  if ! unzip -q "$zip_file" -d "$temp_dir" 2>/dev/null; then\n`;
  script += `    echo "    ⚠ Failed to extract $dep_name"\n`;
  script += `    rm -rf "$temp_dir"\n`;
  script += `    return 1\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  # Run the dependency's install script (handles nested dependencies)\n`;
  script += `  local extracted_dir="$temp_dir/$dep_name"\n`;
  script += `  if [ -f "$extracted_dir/install.sh" ]; then\n`;
  script += `    chmod +x "$extracted_dir/install.sh"\n`;
  script += `    # Run with AUTO_INSTALL to skip prompts\n`;
  script += `    (cd "$extracted_dir" && AUTO_INSTALL=1 ./install.sh) || {\n`;
  script += `      echo "    ⚠ Failed to install $dep_name"\n`;
  script += `      rm -rf "$temp_dir"\n`;
  script += `      return 1\n`;
  script += `    }\n`;
  script += `  fi\n`;
  script += `  \n`;
  script += `  # Cleanup\n`;
  script += `  rm -rf "$temp_dir"\n`;
  script += `  \n`;
  script += `  # Track that this was auto-installed\n`;
  script += `  AUTO_INSTALLED_DEPS="$AUTO_INSTALLED_DEPS $dep_name"\n`;
  script += `  \n`;
  script += `  return 0\n`;
  script += `}\n\n`;

  // Create target directory
  script += `# Create target directory\n`;
  script += `if [ "${type}" = "section" ]; then\n`;
  script += `  TARGET_DIR="$COMPONENTS_BASE/$SECTIONS_DIR/${name}"\n`;
  script += `else\n`;
  script += `  TARGET_DIR="$COMPONENTS_BASE/$PARTIALS_DIR/${name}"\n`;
  script += `fi\n`;
  script += `mkdir -p "$TARGET_DIR"\n\n`;

  // Check for existing installation
  script += `# Check for existing installation\n`;
  script += `if [ -f "$TARGET_DIR/manifest.json" ]; then\n`;
  script += `  EXISTING_HASH=$(grep -o '"contentHash": "[^"]*"' "$TARGET_DIR/manifest.json" | cut -d'"' -f4)\n`;
  script += `  if [ "$EXISTING_HASH" = "${contentHash}" ]; then\n`;
  script += `    echo "✓ ${name} v${version} already installed (no changes)"\n`;
  script += `    exit 0\n`;
  script += `  else\n`;
  script += `    echo "📦 Upgrading ${name} (content changed)"\n`;
  script += `  fi\n`;
  script += `fi\n\n`;

  // Check and auto-install dependencies
  if (requires.length > 0) {
    script += `# Check and auto-install dependencies\n`;
    script += `echo "Checking dependencies..."\n`;
    script += `AUTO_INSTALLED_DEPS=""\n`;
    script += `FAILED_DEPS=""\n\n`;

    requires.forEach(dep => {
      script += `# Check for ${dep}\n`;
      script += `if [ ! -f "$COMPONENTS_BASE/$PARTIALS_DIR/${dep}/manifest.json" ] && [ ! -f "$COMPONENTS_BASE/$SECTIONS_DIR/${dep}/manifest.json" ]; then\n`;
      script += `  # Try to auto-install (most dependencies are partials)\n`;
      script += `  if ! install_dependency "${dep}" "partial"; then\n`;
      script += `    # Try as section if partial fails\n`;
      script += `    if ! install_dependency "${dep}" "section"; then\n`;
      script += `      FAILED_DEPS="$FAILED_DEPS ${dep}"\n`;
      script += `    fi\n`;
      script += `  fi\n`;
      script += `else\n`;
      script += `  echo "  ✓ ${dep} (already installed)"\n`;
      script += `fi\n`;
    });

    script += `\n`;
    script += `# Check if any dependencies failed\n`;
    script += `if [ -n "$FAILED_DEPS" ]; then\n`;
    script += `  echo ""\n`;
    script += `  echo "⚠ Warning: Could not install some dependencies:$FAILED_DEPS"\n`;
    script += `  echo ""\n`;
    script += `  echo "You may need to download them manually from:"\n`;
    script += `  echo "  https://metalsmith-components.com/downloads/"\n`;
    script += `  echo ""\n`;
    script += `  # Skip interactive prompt if called from bundle installer or auto-install mode\n`;
    script += `  if [ -n "$BUNDLE_INSTALL" ] || [ -n "$AUTO_INSTALL" ]; then\n`;
    script += `    echo "  (Auto-continuing)"\n`;
    script += `    echo ""\n`;
    script += `  else\n`;
    script += `    read -p "Continue installation anyway? (y/n) " -n 1 -r\n`;
    script += `    echo\n`;
    script += `    if [[ ! $REPLY =~ ^[Yy]$ ]]; then\n`;
    script += `      exit 1\n`;
    script += `    fi\n`;
    script += `  fi\n`;
    script += `fi\n\n`;
  }

  // Copy files
  script += `# Copy files\n`;
  script += `echo "Copying files..."\n`;
  script += `cp "$COMPONENT_DIR/${name}.njk" "$TARGET_DIR/"\n`;
  if (component.files.styles) {
    script += `cp "$COMPONENT_DIR/${name}.css" "$TARGET_DIR/"\n`;
  }
  if (component.files.scripts) {
    script += `cp "$COMPONENT_DIR/${name}.js" "$TARGET_DIR/"\n`;
  }
  script += `cp "$COMPONENT_DIR/manifest.json" "$TARGET_DIR/"\n`;

  // Copy modules if present
  if (component.files.modules) {
    script += `\n# Copy modules\n`;
    script += `mkdir -p "$TARGET_DIR/modules/providers"\n`;
    script += `mkdir -p "$TARGET_DIR/modules/helpers"\n`;
    script += `cp -r "$COMPONENT_DIR/modules/"* "$TARGET_DIR/modules/"\n`;
  }

  script += `\n`;
  script += `echo ""\n`;
  script += `echo "✓ Installation complete"\n`;
  script += `echo ""\n`;
  script += `echo "Files installed to: $TARGET_DIR"\n`;

  // Report auto-installed dependencies
  if (requires.length > 0) {
    script += `if [ -n "$AUTO_INSTALLED_DEPS" ]; then\n`;
    script += `  echo "Dependencies installed:$AUTO_INSTALLED_DEPS"\n`;
    script += `fi\n`;
  }

  script += `echo ""\n`;

  // Add cleanup logic for individual component installations
  script += `# Cleanup extracted component directory if not called from bundle or auto-install\n`;
  script += `if [ -z "$BUNDLE_INSTALL" ] && [ -z "$AUTO_INSTALL" ] && [ -f "$COMPONENT_DIR/package.json" ] && grep -q "\\"x-metalsmith-component\\"" "$COMPONENT_DIR/package.json" 2>/dev/null; then\n`;
  script += `  # Check if component directory is in project root (not in a bundle structure)\n`;
  script += `  COMPONENT_BASENAME="$(basename "$COMPONENT_DIR")"\n`;
  script += `  if [ "$COMPONENT_DIR" = "$PROJECT_ROOT/$COMPONENT_BASENAME" ]; then\n`;
  script += `    echo ""\n`;
  script += `    read -p "Remove extracted component directory $COMPONENT_BASENAME? (y/n) " -n 1 -r\n`;
  script += `    echo\n`;
  script += `    if [[ $REPLY =~ ^[Yy]$ ]]; then\n`;
  script += `      rm -rf "$COMPONENT_DIR"\n`;
  script += `      echo "✓ Cleaned up $COMPONENT_BASENAME"\n`;
  script += `    fi\n`;
  script += `  fi\n`;
  script += `fi\n\n`;

  script += `echo ""\n`;
  script += `echo "See README.md for usage instructions"\n`;

  return script;
}

/**
 * Create individual component ZIP package
 * @param {ComponentMetadata} component - Component metadata
 * @param {string} outputPath - Output directory path
 * @param {boolean} generateChecksum - Whether to generate SHA256 checksum
 * @returns {Promise<Object>} Package metadata (name, size, checksum, etc.)
 */
async function createComponentPackage(component, outputPath, generateChecksum) {
  const { name, version, type } = component;
  const packageName = `${name}.zip`;
  const packagePath = path.join(outputPath, packageName);

  return new Promise((resolve, reject) => {
    const output = createWriteStream(packagePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    let packageSize = 0;

    output.on('close', async () => {
      packageSize = archive.pointer();
      const formattedSize = formatBytes(packageSize);

      let checksum = null;
      if (generateChecksum) {
        checksum = await generateFileChecksum(packagePath);
      }

      // console.log(`  ✓ ${name} (${formattedSize})`);

      resolve({
        name,
        displayName: name.charAt(0).toUpperCase() + name.slice(1),
        version,
        contentHash: component.contentHash,
        type,
        downloadUrl: `/${path.join('downloads', type === 'section' ? 'sections' : 'partials', packageName)}`,
        size: formattedSize,
        sizeBytes: packageSize,
        checksum: checksum ? `sha256:${checksum}` : null,
        hasStyles: !!component.files.styles,
        hasScripts: !!component.files.scripts,
        hasModules: !!component.files.modules,
        requires: component.requires
      });
    });

    archive.on('error', reject);
    output.on('error', reject);

    archive.pipe(output);

    // Add component files
    archive.append(component.files.template, { name: `${name}/${name}.njk` });

    if (component.files.styles) {
      archive.append(component.files.styles, { name: `${name}/${name}.css` });
    }

    if (component.files.scripts) {
      archive.append(component.files.scripts, { name: `${name}/${name}.js` });
    }

    // Add modules if present
    if (component.files.modules) {
      component.files.modules.providers.forEach(provider => {
        archive.append(provider.content, {
          name: `${name}/modules/providers/${provider.name}`
        });
      });
      component.files.modules.helpers.forEach(helper => {
        archive.append(helper.content, { name: `${name}/modules/helpers/${helper.name}` });
      });
    }

    // Add manifest
    archive.append(JSON.stringify(component.manifest, null, 2), {
      name: `${name}/manifest.json`
    });

    // Add examples if available - use raw content for direct copy-paste
    const examples = component.examples;
    if (examples.raw) {
      archive.append(examples.raw, { name: `${name}/examples.yaml` });
    } else if (examples.structured && examples.structured.length > 0) {
      archive.append(yaml.dump(examples.structured), { name: `${name}/examples.yaml` });
    } else if (Array.isArray(examples) && examples.length > 0) {
      // Legacy format
      archive.append(yaml.dump(examples), { name: `${name}/examples.yaml` });
    }

    // Add README - use custom if exists, otherwise generate
    const readme = component.files.readme || generateReadme(component);
    archive.append(readme, { name: `${name}/README.md` });

    const packageJson = generatePackageJson(component);
    archive.append(JSON.stringify(packageJson, null, 2), { name: `${name}/package.json` });

    const installScript = generateInstallScript(component);
    archive.append(installScript, { name: `${name}/install.sh`, mode: 0o755 });

    archive.finalize();
  });
}

/**
 * Create complete component bundle ZIP
 * @param {Object} components - Object with sections and partials arrays
 * @param {string} outputPath - Output directory path
 * @param {string} version - Project version
 * @param {boolean} generateChecksum - Whether to generate SHA256 checksum
 * @returns {Promise<Object>} Bundle metadata
 */
async function createBundle(components, outputPath, version, generateChecksum) {
  const bundleName = `metalsmith-components.zip`;
  const bundlePath = path.join(outputPath, bundleName);

  return new Promise((resolve, reject) => {
    const output = createWriteStream(bundlePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    let bundleSize = 0;

    output.on('close', async () => {
      bundleSize = archive.pointer();
      const formattedSize = formatBytes(bundleSize);

      let checksum = null;
      if (generateChecksum) {
        checksum = await generateFileChecksum(bundlePath);
      }

      resolve({
        version,
        downloadUrl: `/downloads/${bundleName}`,
        size: formattedSize,
        sizeBytes: bundleSize,
        checksum: checksum ? `sha256:${checksum}` : null
      });
    });

    archive.on('error', reject);
    output.on('error', reject);

    archive.pipe(output);

    const bundleDir = `metalsmith-components`;

    // Add all sections
    components.sections.forEach(section => {
      const sectionDir = `${bundleDir}/sections/${section.name}`;

      archive.append(section.files.template, { name: `${sectionDir}/${section.name}.njk` });

      if (section.files.styles) {
        archive.append(section.files.styles, { name: `${sectionDir}/${section.name}.css` });
      }

      if (section.files.scripts) {
        archive.append(section.files.scripts, { name: `${sectionDir}/${section.name}.js` });
      }

      if (section.files.modules) {
        section.files.modules.providers.forEach(provider => {
          archive.append(provider.content, {
            name: `${sectionDir}/modules/providers/${provider.name}`
          });
        });
        section.files.modules.helpers.forEach(helper => {
          archive.append(helper.content, {
            name: `${sectionDir}/modules/helpers/${helper.name}`
          });
        });
      }

      archive.append(JSON.stringify(section.manifest, null, 2), {
        name: `${sectionDir}/manifest.json`
      });

      // Add examples - use raw content for direct copy-paste
      const sectionExamples = section.examples;
      if (sectionExamples.raw) {
        archive.append(sectionExamples.raw, { name: `${sectionDir}/examples.yaml` });
      } else if (sectionExamples.structured && sectionExamples.structured.length > 0) {
        archive.append(yaml.dump(sectionExamples.structured), { name: `${sectionDir}/examples.yaml` });
      } else if (Array.isArray(sectionExamples) && sectionExamples.length > 0) {
        archive.append(yaml.dump(sectionExamples), { name: `${sectionDir}/examples.yaml` });
      }

      const readme = section.files.readme || generateReadme(section);
      archive.append(readme, { name: `${sectionDir}/README.md` });

      const packageJson = generatePackageJson(section);
      archive.append(JSON.stringify(packageJson, null, 2), {
        name: `${sectionDir}/package.json`
      });

      const installScript = generateInstallScript(section);
      archive.append(installScript, { name: `${sectionDir}/install.sh`, mode: 0o755 });
    });

    // Add all partials
    components.partials.forEach(partial => {
      const partialDir = `${bundleDir}/partials/${partial.name}`;

      archive.append(partial.files.template, { name: `${partialDir}/${partial.name}.njk` });

      if (partial.files.styles) {
        archive.append(partial.files.styles, { name: `${partialDir}/${partial.name}.css` });
      }

      if (partial.files.scripts) {
        archive.append(partial.files.scripts, { name: `${partialDir}/${partial.name}.js` });
      }

      archive.append(JSON.stringify(partial.manifest, null, 2), {
        name: `${partialDir}/manifest.json`
      });

      // Add examples - use raw content for direct copy-paste
      const partialExamples = partial.examples;
      if (partialExamples.raw) {
        archive.append(partialExamples.raw, { name: `${partialDir}/examples.yaml` });
      } else if (partialExamples.structured && partialExamples.structured.length > 0) {
        archive.append(yaml.dump(partialExamples.structured), { name: `${partialDir}/examples.yaml` });
      } else if (Array.isArray(partialExamples) && partialExamples.length > 0) {
        archive.append(yaml.dump(partialExamples), { name: `${partialDir}/examples.yaml` });
      }

      const readme = partial.files.readme || generateReadme(partial);
      archive.append(readme, { name: `${partialDir}/README.md` });

      const packageJson = generatePackageJson(partial);
      archive.append(JSON.stringify(packageJson, null, 2), {
        name: `${partialDir}/package.json`
      });

      const installScript = generateInstallScript(partial);
      archive.append(installScript, { name: `${partialDir}/install.sh`, mode: 0o755 });
    });

    // Add bundle README
    const bundleReadme = generateBundleReadme(version, components);
    archive.append(bundleReadme, { name: `${bundleDir}/README.md` });

    // Add bundle install script
    const bundleInstallScript = generateBundleInstallScript(components);
    archive.append(bundleInstallScript, { name: `${bundleDir}/install-all.sh`, mode: 0o755 });

    archive.finalize();
  });
}

/**
 * Generate README for complete bundle
 * @param {string} version - Bundle version
 * @param {Object} components - Object with sections and partials arrays
 * @returns {string} Bundle README content
 */
function generateBundleReadme(version, components) {
  let readme = `# Metalsmith Components Bundle v${version}\n\n`;
  readme += `Complete collection of Metalsmith components for building modern websites.\n\n`;

  readme += `## Contents\n\n`;
  readme += `This bundle includes:\n\n`;
  readme += `- **${components.sections.length} Section Components:** ${components.sections.map(s => s.name).join(', ')}\n`;
  readme += `- **${components.partials.length} Partial Components:** ${components.partials.map(p => p.name).join(', ')}\n\n`;

  readme += `## Configuration\n\n`;
  readme += `### Customizing Component Paths\n\n`;
  readme += `By default, components install to:\n`;
  readme += `- Sections: \`lib/layouts/components/sections/\`\n`;
  readme += `- Partials: \`lib/layouts/components/_partials/\`\n\n`;
  readme += `To customize these paths, create a \`metalsmith-components.config.json\` file in your project root:\n\n`;
  readme += `\`\`\`json\n`;
  readme += `{\n`;
  readme += `  "componentsBasePath": "lib/layouts/components",\n`;
  readme += `  "sectionsDir": "sections",\n`;
  readme += `  "partialsDir": "_partials"\n`;
  readme += `}\n`;
  readme += `\`\`\`\n\n`;
  readme += `Edit these values to match your project structure. If this file is not present, the defaults shown above will be used.\n\n`;

  readme += `## Installation\n\n`;
  readme += `### Installation Modes\n\n`;
  readme += `The bundle installer supports two modes:\n\n`;
  readme += `**1. Full Install (default)** - Installs all components:\n`;
  readme += `\`\`\`bash\n`;
  readme += `# From your project root:\n`;
  readme += `unzip metalsmith-components.zip\n`;
  readme += `./metalsmith-components/install-all.sh\n`;
  readme += `\`\`\`\n\n`;
  readme += `If you already have components installed, the script will prompt you to choose between:\n`;
  readme += `- Install all components (adds new ones, updates existing)\n`;
  readme += `- Update existing components only (skips new components)\n\n`;

  readme += `**2. Update Mode** - Only updates components you already have:\n`;
  readme += `\`\`\`bash\n`;
  readme += `./metalsmith-components/install-all.sh --update-only\n`;
  readme += `# or use the short form:\n`;
  readme += `./metalsmith-components/install-all.sh -u\n`;
  readme += `\`\`\`\n\n`;
  readme += `This is perfect for:\n`;
  readme += `- Updating a subset of components you're already using\n`;
  readme += `- Getting bug fixes and improvements without adding new components\n`;
  readme += `- Keeping your project lean with only the components you need\n\n`;

  readme += `### Selective Installation\n\n`;
  readme += `To install individual components from the bundle:\n\n`;
  readme += `\`\`\`bash\n`;
  readme += `# From your project root:\n`;
  readme += `./metalsmith-components/sections/hero/install.sh\n`;
  readme += `# or for partials:\n`;
  readme += `./metalsmith-components/partials/text/install.sh\n`;
  readme += `\`\`\`\n\n`;

  readme += `## Documentation\n\n`;
  readme += `For complete documentation and live examples, visit:\n`;
  readme += `https://metalsmith-components.netlify.app/\n\n`;

  readme += `## License\n\n`;
  readme += `MIT License\n`;

  return readme;
}

/**
 * Generate installation script for complete bundle
 * @param {Object} components - Object with sections and partials arrays
 * @returns {string} Bundle installation script
 */
function generateBundleInstallScript(components) {
  let script = `#!/bin/bash\n\n`;
  script += `# Metalsmith Components Bundle Installation Script\n\n`;

  script += `set -e\n\n`;

  script += `echo "🔧 Installing Metalsmith Components Bundle..."\n`;
  script += `echo ""\n\n`;

  // Detect Metalsmith project
  script += `# Check if this is a Metalsmith project\n`;
  script += `if [ ! -f "metalsmith.js" ] && [ ! -f "package.json" ]; then\n`;
  script += `  echo "❌ Error: Not a Metalsmith project directory"\n`;
  script += `  echo "Please run this script from your Metalsmith project root"\n`;
  script += `  exit 1\n`;
  script += `fi\n\n`;

  script += `SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"\n`;
  script += `PROJECT_ROOT="$(pwd)"\n`;
  script += `export PROJECT_ROOT\n`;
  script += `export BUNDLE_INSTALL=1\n\n`;

  // Load configuration
  script += `# Load component paths from config or use defaults\n`;
  script += `if [ -f "metalsmith-components.config.json" ]; then\n`;
  script += `  COMPONENTS_BASE=$(node -p "try { require('./metalsmith-components.config.json').componentsBasePath } catch(e) { 'lib/layouts/components' }")\n`;
  script += `  SECTIONS_DIR=$(node -p "try { require('./metalsmith-components.config.json').sectionsDir } catch(e) { 'sections' }")\n`;
  script += `  PARTIALS_DIR=$(node -p "try { require('./metalsmith-components.config.json').partialsDir } catch(e) { '_partials' }")\n`;
  script += `else\n`;
  script += `  COMPONENTS_BASE="lib/layouts/components"\n`;
  script += `  SECTIONS_DIR="sections"\n`;
  script += `  PARTIALS_DIR="_partials"\n`;
  script += `fi\n\n`;

  // Installation mode selection
  script += `# Check installation mode\n`;
  script += `MODE="all"\n`;
  script += `if [ "$1" = "--update-only" ] || [ "$1" = "-u" ]; then\n`;
  script += `  MODE="update"\n`;
  script += `  echo "📦 Update mode: Only updating existing components"\n`;
  script += `  echo ""\n`;
  script += `elif [ -d "$COMPONENTS_BASE" ]; then\n`;
  script += `  echo "Existing components directory found."\n`;
  script += `  echo ""\n`;
  script += `  echo "Choose installation mode:"\n`;
  script += `  echo "  1) Install all components (default)"\n`;
  script += `  echo "  2) Update existing components only"\n`;
  script += `  echo ""\n`;
  script += `  read -p "Select [1-2]: " -n 1 -r\n`;
  script += `  echo\n`;
  script += `  echo ""\n`;
  script += `  if [[ $REPLY == "2" ]]; then\n`;
  script += `    MODE="update"\n`;
  script += `    echo "📦 Update mode: Only updating existing components"\n`;
  script += `  else\n`;
  script += `    echo "📦 Full install mode: Installing all components"\n`;
  script += `  fi\n`;
  script += `  echo ""\n`;
  script += `fi\n\n`;

  // Install partials first (dependencies)
  script += `# Install partials (dependencies first)\n`;
  script += `echo "📦 Installing partials..."\n`;
  script += `echo ""\n\n`;

  script += `INSTALLED_COUNT=0\n`;
  script += `SKIPPED_COUNT=0\n`;
  script += `REQUIRED_DEPS=()\n\n`;

  // First pass: Build list of components to install and their dependencies
  script += `# Build list of components to install/update\n`;
  script += `COMPONENTS_TO_INSTALL=()\n\n`;

  components.partials.forEach(partial => {
    script += `if [ -f "$SCRIPT_DIR/partials/${partial.name}/install.sh" ]; then\n`;
    script += `  if [ "$MODE" = "update" ] && [ ! -f "$COMPONENTS_BASE/$PARTIALS_DIR/${partial.name}/manifest.json" ]; then\n`;
    script += `    # Component not installed, skip in update mode\n`;
    script += `    true\n`;
    script += `  else\n`;
    script += `    COMPONENTS_TO_INSTALL+=("partial:${partial.name}")\n`;

    // Add dependencies if component has them
    if (partial.manifest && partial.manifest.requires && partial.manifest.requires.length > 0) {
      partial.manifest.requires.forEach(dep => {
        script += `    REQUIRED_DEPS+=("${dep}")\n`;
      });
    }

    script += `  fi\n`;
    script += `fi\n\n`;
  });

  // Install required dependencies first (even if not previously installed)
  script += `# Install required dependencies\n`;
  script += `if [ \${#REQUIRED_DEPS[@]} -gt 0 ]; then\n`;
  script += `  UNIQUE_DEPS=($(printf "%s\\n" "\${REQUIRED_DEPS[@]}" | sort -u))\n`;
  script += `  for dep in "\${UNIQUE_DEPS[@]}"; do\n`;
  script += `    if [ -f "$SCRIPT_DIR/partials/$dep/install.sh" ]; then\n`;
  script += `      if [ ! -f "$COMPONENTS_BASE/$PARTIALS_DIR/$dep/manifest.json" ]; then\n`;
  script += `        echo "Installing required dependency: $dep"\n`;
  script += `        cd "$PROJECT_ROOT"\n`;
  script += `        (cd "$SCRIPT_DIR/partials/$dep" && ./install.sh)\n`;
  script += `        INSTALLED_COUNT=$((INSTALLED_COUNT + 1))\n`;
  script += `        echo ""\n`;
  script += `      fi\n`;
  script += `    fi\n`;
  script += `  done\n`;
  script += `fi\n\n`;

  // Now install partials
  components.partials.forEach(partial => {
    script += `if [ -f "$SCRIPT_DIR/partials/${partial.name}/install.sh" ]; then\n`;
    script += `  if [ "$MODE" = "update" ] && [ ! -f "$COMPONENTS_BASE/$PARTIALS_DIR/${partial.name}/manifest.json" ]; then\n`;
    script += `    echo "⊘ Skipping ${partial.name} (not currently installed)"\n`;
    script += `    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))\n`;
    script += `  else\n`;
    script += `    echo "Installing ${partial.name}..."\n`;
    script += `    cd "$PROJECT_ROOT"\n`;
    script += `    (cd "$SCRIPT_DIR/partials/${partial.name}" && ./install.sh)\n`;
    script += `    INSTALLED_COUNT=$((INSTALLED_COUNT + 1))\n`;
    script += `    echo ""\n`;
    script += `  fi\n`;
    script += `fi\n\n`;
  });

  // Install sections
  script += `# Install sections\n`;
  script += `echo "📦 Installing sections..."\n`;
  script += `echo ""\n\n`;

  // Collect section dependencies
  components.sections.forEach(section => {
    // Only generate dependency installation if section has dependencies
    const hasDependencies = section.manifest && section.manifest.requires && section.manifest.requires.length > 0;

    if (hasDependencies) {
      script += `if [ -f "$SCRIPT_DIR/sections/${section.name}/install.sh" ]; then\n`;
      script += `  if [ "$MODE" = "update" ] && [ ! -f "$COMPONENTS_BASE/$SECTIONS_DIR/${section.name}/manifest.json" ]; then\n`;
      script += `    # Component not installed, skip in update mode\n`;
      script += `    true\n`;
      script += `  else\n`;

      // Add dependencies for sections being installed
      section.manifest.requires.forEach(dep => {
        script += `    # Install dependency if needed: ${dep}\n`;
        script += `    if [ ! -f "$COMPONENTS_BASE/$PARTIALS_DIR/${dep}/manifest.json" ] && [ -f "$SCRIPT_DIR/partials/${dep}/install.sh" ]; then\n`;
        script += `      echo "Installing required dependency: ${dep}"\n`;
        script += `      cd "$PROJECT_ROOT"\n`;
        script += `      (cd "$SCRIPT_DIR/partials/${dep}" && ./install.sh)\n`;
        script += `      INSTALLED_COUNT=$((INSTALLED_COUNT + 1))\n`;
        script += `      echo ""\n`;
        script += `    fi\n`;
      });

      script += `  fi\n`;
      script += `fi\n`;
    }
  });

  script += `\n`;

  // Now install sections
  components.sections.forEach(section => {
    script += `if [ -f "$SCRIPT_DIR/sections/${section.name}/install.sh" ]; then\n`;
    script += `  if [ "$MODE" = "update" ] && [ ! -f "$COMPONENTS_BASE/$SECTIONS_DIR/${section.name}/manifest.json" ]; then\n`;
    script += `    echo "⊘ Skipping ${section.name} (not currently installed)"\n`;
    script += `    SKIPPED_COUNT=$((SKIPPED_COUNT + 1))\n`;
    script += `  else\n`;
    script += `    echo "Installing ${section.name}..."\n`;
    script += `    cd "$PROJECT_ROOT"\n`;
    script += `    (cd "$SCRIPT_DIR/sections/${section.name}" && ./install.sh)\n`;
    script += `    INSTALLED_COUNT=$((INSTALLED_COUNT + 1))\n`;
    script += `    echo ""\n`;
    script += `  fi\n`;
    script += `fi\n\n`;
  });

  script += `echo ""\n`;
  script += `echo "✓ Bundle installation complete"\n`;
  script += `echo ""\n`;
  script += `echo "Installed/Updated: $INSTALLED_COUNT components"\n`;
  script += `if [ "$MODE" = "update" ] && [ $SKIPPED_COUNT -gt 0 ]; then\n`;
  script += `  echo "Skipped: $SKIPPED_COUNT components (not previously installed)"\n`;
  script += `fi\n`;
  script += `echo ""\n`;
  script += `echo "See individual README files for usage instructions."\n`;

  return script;
}

/**
 * Generate manifest with all package metadata
 * @param {Object} packages - Object with sections and partials package arrays
 * @param {Object} bundleMetadata - Bundle metadata object
 * @param {string} basePath - Base path for download URLs
 * @returns {Object} Complete manifest object
 */
function generateManifest(packages, bundleMetadata, basePath) {
  return {
    generated: new Date().toISOString(),
    version: bundleMetadata ? bundleMetadata.version : null,
    basePath,
    sections: packages.sections,
    partials: packages.partials,
    bundle: bundleMetadata
  };
}

/**
 * Add package metadata to Metalsmith metadata
 * @param {Object} manifest - Complete manifest object
 * @param {Object} metalsmith - Metalsmith instance
 */
function addMetadataToMetalsmith(manifest, metalsmith) {
  const metadata = metalsmith.metadata();

  metadata.componentPackages = {
    sections: manifest.sections,
    partials: manifest.partials,
    bundle: manifest.bundle
  };
}

/**
 * Generate SHA256 checksum for file
 * @param {string} filePath - Path to file
 * @returns {Promise<string>} SHA256 checksum
 */
async function generateFileChecksum(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  const hash = crypto.createHash('sha256');
  hash.update(fileBuffer);
  return hash.digest('hex');
}

/**
 * Format bytes to human-readable string
 * @param {number} bytes - Number of bytes
 * @returns {string} Formatted size string
 */
function formatBytes(bytes) {
  if (bytes === 0) {return '0 B';}
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}${sizes[i]}`;
}
