/**
 * Metalsmith Plugin: Generate Maps Icon Registry
 * 
 * Scans all pages for maps sections, extracts icon names from markers,
 * and generates a dynamic icon-loader.js with only the icons actually used.
 */

import * as fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const thisFile = fileURLToPath(import.meta.url);
const thisDirectory = dirname(thisFile);
const projectRoot = path.resolve(thisDirectory, '..');

/**
 * Extract SVG content from Nunjucks icon template
 * @param {string} iconPath - Path to the .njk icon file
 * @returns {string|null} SVG inner content or null if not found
 */
const extractSvgContent = (iconPath) => {
  try {
    const content = fs.readFileSync(iconPath, 'utf8');
    
    // Parse SVG content to extract inner elements (paths, circles, etc.)
    // Remove the outer <svg> wrapper and extract inner content
    const svgMatch = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (svgMatch && svgMatch[1]) {
      return svgMatch[1].trim();
    }

    return null;
  } catch {
    console.warn(`Warning: Could not load icon file: ${iconPath}`);
    return null;
  }
};

/**
 * Scan for maps icons in both frontmatter and metadata
 * @param {Object} files - Metalsmith files object
 * @param {Object} metadata - Metalsmith global metadata
 * @returns {Set<string>} Set of unique icon names
 */
const scanForMapsIcons = (files, metadata) => {
  const iconNames = new Set();
  
  // Scan frontmatter for legacy inline markers
  Object.keys(files).forEach(filename => {
    const file = files[filename];
    
    // Skip non-content files
    if (!file.sections) {return;}
    
    // Look for maps sections with inline markers (legacy)
    file.sections.forEach(section => {
      if (section.sectionType === 'maps' && section.markers) {
        section.markers.forEach(marker => {
          if (marker.icon) {
            iconNames.add(marker.icon);
          }
        });
      }
    });
  });
  
  // Scan JSON data from metadata.data.maps
  if (metadata.data && metadata.data.maps) {
    Object.keys(metadata.data.maps).forEach(mapName => {
      const mapData = metadata.data.maps[mapName];
      if (mapData.markers && Array.isArray(mapData.markers)) {
        mapData.markers.forEach(marker => {
          if (marker.icon) {
            iconNames.add(marker.icon);
          }
        });
      }
    });
  }
  
  return iconNames;
};

/**
 * Generate icon registry JavaScript code
 * @param {Map<string, string>} iconRegistry - Map of icon names to SVG content
 * @returns {string} JavaScript code for icon-loader.js
 */
const generateIconLoaderCode = (iconRegistry) => {
  const registryEntries = Array.from(iconRegistry.entries())
    .map(([name, content]) => {
      // Clean up multiline content and escape quotes properly
      const cleanContent = content
        .replace(/\s+/g, ' ')  // Replace multiple spaces/newlines with single space
        .replace(/'/g, "\\'")  // Escape single quotes
        .trim();
      return `  '${name}': '${cleanContent}'`;
    })
    .join(',\n');
    
  return `/**
 * Icon Registry for Maps Component
 * Auto-generated during build - DO NOT EDIT MANUALLY
 * Generated from icons found in maps sections across the site
 */

/**
 * Built-in icon registry with icons used in maps components
 * These SVG paths are extracted from the project's Feather icon library
 */
const iconRegistry = {
${registryEntries}
};

/**
 * Get icon SVG content by name
 * @param {string} iconName - Name of the icon
 * @returns {string|null} SVG content or null if not found
 */
export const getIcon = (iconName) => {
  if (!iconName || !iconRegistry[iconName]) {
    if (iconName) {
      console.warn(\`Icon "\${iconName}" not found in registry. Available icons:\`, Object.keys(iconRegistry));
    }
    return null;
  }
  return iconRegistry[iconName];
};

/**
 * Create a custom marker icon SVG with specified icon content
 * @param {string} iconContent - SVG path/element content for the icon
 * @param {Object} options - Icon styling options
 * @returns {string} Complete marker SVG with icon
 */
export const createMarkerIcon = (iconContent, options = {}) => {
  const {
    markerColor = '#ff3333',
    iconColor = '#ffffff',
    markerStroke = '#ffffff',
    markerStrokeWidth = 1,
    size = 48
  } = options;
  
  const height = size * 1.33;
  
  return \`<svg width="\${size}" height="\${height}" viewBox="0 0 \${size} \${height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Marker background (map pin shape) -->
  <path d="M\${size/2} \${height-2} C\${size/2} \${height-2} \${size*0.15} \${size*0.6} \${size*0.15} \${size*0.4} C\${size*0.15} \${size*0.18} \${size*0.3} 2 \${size/2} 2 C\${size*0.7} 2 \${size*0.85} \${size*0.18} \${size*0.85} \${size*0.4} C\${size*0.85} \${size*0.6} \${size/2} \${height-2} \${size/2} \${height-2} Z" 
        fill="\${markerColor}" 
        stroke="\${markerStroke}" 
        stroke-width="\${markerStrokeWidth}"/>
  <!-- Icon content centered in upper circle -->
  <g transform="translate(\${size*0.31}, \${size*0.27}) scale(\${size*0.016})" stroke="\${iconColor}" fill="\${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    \${iconContent}
  </g>
</svg>\`;
};
`;
};

/**
 * Metalsmith plugin to generate maps icon registry
 * @returns {Function} Metalsmith plugin function
 */
export default function generateMapsIcons() {
  return function(files, metalsmith, done) {
    
    // Get metadata from metalsmith instance
    const metadata = metalsmith.metadata();
    
    // Scan all files and metadata for maps icons
    const foundIcons = scanForMapsIcons(files, metadata);
    
    if (foundIcons.size === 0) {
    } else {
    }
    
    // Load icon content from .njk files
    const iconRegistry = new Map();
    const iconsDir = path.join(projectRoot, 'lib', 'layouts', 'icons');
    
    foundIcons.forEach(iconName => {
      const iconPath = path.join(iconsDir, `${iconName}.njk`);
      const svgContent = extractSvgContent(iconPath);
      
      if (svgContent) {
        iconRegistry.set(iconName, svgContent);
      } else {
        console.warn(`❌ Failed to load icon: ${iconName} from ${iconPath}`);
      }
    });
    
    // Generate the icon-loader.js file
    const iconLoaderCode = generateIconLoaderCode(iconRegistry);
    const outputPath = path.join(
      projectRoot, 
      'lib', 
      'layouts', 
      'components', 
      'sections', 
      'maps', 
      'modules', 
      'helpers', 
      'icon-loader.js'
    );
    
    try {
      fs.writeFileSync(outputPath, iconLoaderCode, 'utf8');
    } catch (error) {
      console.error('❌ Failed to write icon-loader.js:', error);
      return done(error);
    }
    
    done();
  };
}