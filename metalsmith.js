/**
 * Metalsmith Build Configuration
 *
 * This file configures how Metalsmith builds your site. Each section is documented
 * to help beginners understand what's happening at each step.
 */

// Apply File API polyfill if needed (for GitHub Actions compatibility)
import './file-polyfill.js';

// These are built-in Node.js modules needed for file paths and operations
import { fileURLToPath } from 'node:url'; // Converts file:// URLs to file paths
import path, { dirname } from 'node:path'; // Handles file paths across different OS
import * as fs from 'node:fs'; // File system operations (read/write files)

// The main Metalsmith library and plugins that transform your content
import Metalsmith from 'metalsmith'; // The core static site generator
import drafts from '@metalsmith/drafts'; // Excludes draft content from builds
import generateMapsIcons from './plugins/generate-maps-icons.js'; // Generates maps icon registry
import generateLibrarySearchIndex from './plugins/generate-library-search-index.js'; // Generates library search index
import collections from '@metalsmith/collections';
import paginatePages from 'metalsmith-sectioned-blog-pagination';
import search from 'metalsmith-search'; // Adds search functionality
import permalinks from '@metalsmith/permalinks'; // Creates clean URLs
import menus from 'metalsmith-menu-plus'; // Generates navigation menus
import layouts from '@metalsmith/layouts'; // Applies templates to content
import safeLinks from 'metalsmith-safe-links';
import prism from 'metalsmith-prism';

import componentDependencyBundler from 'metalsmith-bundled-components';

import assets from 'metalsmith-static-files'; // Copies static assets to build
import optimizeImages from 'metalsmith-optimize-images'; // Optimizes images for web
import htmlMinifier from 'metalsmith-optimize-html'; // Minifies HTML in production

import seo from 'metalsmith-seo'; // Adds SEO metadata to pages

import postcssImport from 'postcss-import'; // Processes @import statements
import autoprefixer from 'autoprefixer'; // Adds browser prefixes to CSS
import cssnano from 'cssnano'; // Minifies CSS
import stylelint from 'stylelint'; // CSS linting
import { performance } from 'perf_hooks'; // Measures build performance
import browserSync from 'browser-sync'; // Live-reload development server

// These variables help determine the current directory and file paths
const thisFile = fileURLToPath( import.meta.url ); // Gets the actual file path of this script
const thisDirectory = dirname( thisFile ); // Gets the directory containing this script
const mainFile = process.argv[ 1 ]; // Gets the file that was executed by Node.js

/**
 * ESM (ECMAScript Modules) doesn't support importing JSON directly
 * So we read the package.json file manually to get dependency information
 * @type {Object}
 */
const dependencies = JSON.parse( fs.readFileSync( './package.json' ) ).dependencies;

/**
 * @function getGlobalMetadata
 * @returns {Object} An object containing all JSON data files from lib/data directory
 *
 * This function reads all JSON files from the data directory and adds their data
 * to a metadata object. This object can then be added to the Metalsmith metadata.
 * /lib/data/
 *   - site.json
 *   - social.json
 *   - validate.json
 *
 * becomes
 * {
 *   site: {...},
 *   social: {...},
 *   validate: {...}
 * }
 */
const getGlobalMetadata = () => {
  const dataDir = path.join( thisDirectory, 'lib', 'data' ); // Path to data directory

  const processDirectory = ( dirPath, relativePath = '' ) => {
    const files = fs.readdirSync( dirPath );
    const result = {};

    files.forEach( file => {
      const filePath = path.join( dirPath, file );
      const stat = fs.statSync( filePath );

      if ( stat.isDirectory() ) {
        // Recursively process subdirectories
        result[ file ] = processDirectory( filePath, path.join( relativePath, file ) );
      } else if ( file.endsWith( '.json' ) ) {
        // Process JSON files
        const fileName = file.replace( '.json', '' );
        const fileContents = fs.readFileSync( filePath, 'utf8' );
        result[ fileName ] = JSON.parse( fileContents );
      }
    } );

    return result;
  };

  return processDirectory( dataDir );
};

const globalMetadata = getGlobalMetadata();

// Get the site URL for use in the sitemap plugin
const siteURL = globalMetadata.site;

/**
 * TEMPLATE ENGINE SETUP
 * Import custom Nunjucks filters that extend the template engine
 * These filters provide additional functionality like date formatting,
 * string manipulation, and more.
 */
import * as nunjucksFilters from './nunjucks-filters/index.js';

/**
 * Configuration options for the Nunjucks template engine
 * @type {Object}
 */
const engineOptions = {
  path: [ 'lib/layouts' ], // Where to find template files
  filters: nunjucksFilters // Custom filters for templates
};

/**
 * ENVIRONMENT SETUP
 * Determine if we're in production mode based on NODE_ENV environment variable
 * @type {boolean}
 */
const isProduction = process.env.NODE_ENV !== 'development';

/**
 * Base path for serving the site in a subdirectory
 * e.g., https://example.com/subdirectory/
 * or https://wernerglinka.github.io/metalsmith2025-structured-content-starter/
 */
const basePath = process.env.BASE_PATH || '';

// Variable to hold the development server instance
let devServer = null;

/**
 * Create a new Metalsmith instance
 * This is the core object that will build our site
 * @type {Metalsmith}
 */
const metalsmith = Metalsmith( thisDirectory );

// Pass DEBUG environment variable if it exists
if ( process.env.DEBUG ) {
  metalsmith.env( 'DEBUG', process.env.DEBUG );
}

/**
 * Configure the basic Metalsmith settings
 * These determine how Metalsmith will process our files
 */
metalsmith
  // Clean the destination directory before building
  .clean( true )
  // Ignore macOS system files
  .ignore( [ '**/.DS_Store' ] )
  .watch( isProduction ? false : [
    'src/**/*',
    'lib/layouts/**/*',
    'lib/assets/**/*',
    '!lib/layouts/components/sections/maps/modules/helpers/icon-loader.js' // Exclude generated file to prevent rebuild loops
  ] )
  // Pass NODE_ENV to plugins
  .env( 'NODE_ENV', process.env.NODE_ENV )
  // Where to find source files
  .source( './src' )
  // Where to output the built site
  .destination( './build' )
  .metadata( {
    msVersion: dependencies.metalsmith,
    nodeVersion: process.version,
    data: globalMetadata
  } )

  // Exclude draft content in production mode
  .use( drafts( !isProduction ) )

  // Generate mapping icon registry from used icons
  .use( generateMapsIcons() )

  /**
   * Create a collection of blog posts
   * Learn more: https://github.com/metalsmith/collections
   */
  .use(
    collections( {
      blog: {
        pattern: 'blog/*.md',
        sortBy: 'card.date',
        reverse: false
      },
      library: {
        pattern: 'library/*.md',
        sortBy: 'seo.title',
        reverse: false
      }
    } )
  )

  // Generate search index for library components (after collections)
  .use( generateLibrarySearchIndex() )

  /*
    .use( ( files, metalsmithInstance, done ) => {
      // show the collections object for debug purposes
      const metadata = metalsmithInstance.metadata();
      console.log( 'Collections metadata:', metadata.collections );
  
      done();
    } )
  */


  /**
   * Create metadata for blog pagination as pages are built
   * with individual page components so we can't use the
   * pagination plugin to do this.
   * Learn more: https://github.com/wernerglinka/metalsmith-sectioned-blog-pagination
   */
  .use(
    paginatePages( {
      pagesPerPage: 3,
      blogDirectory: 'blog/'
    } )
  )

  .use(
    paginatePages( {
      pagesPerPage: 8,
      blogDirectory: 'library/',
      mainTemplate: 'library.md'
    } )
  )

  /**
   * Add search functionality
   * Learn more: https://github.com/wernerglinka/metalsmith-search
   */
  .use(
    search( {
      ignore: [
        '**/search.md',
        '**/search-index.json',
        '**/library-search-index.json'
      ]
    } )
  )

  /**
   * We are not using any markdown contents, only frontmatter
   * to define structured pages. Markdown content of section
   * properties will be done with a Nunjucks filter
   * Learn more: https://github.com/metalsmith/permalinks
   */
  .use(
    permalinks( {
      match: '**/*.md'
    } )
  )

  /**
   * Generate navigation menus
   * Learn more: https://github.com/wernerglinka/metalsmith-menu-plus
   */
  .use(
    menus( {
      metadataKey: 'mainMenu', // Where to store menu data
      usePermalinks: true, // Use clean URLs in menu
      navExcludePatterns: [ '404.html', 'robots.txt', 'search-index.json', 'library-search-index.json' ] // Files to exclude from menu
    } )
  )

  /**
   * Apply templates to content
   * Learn more: https://github.com/metalsmith/layouts
   */
  .use(
    layouts( {
      directory: 'lib/layouts', // Where to find templates
      transform: 'nunjucks', // Template engine to use
      pattern: [ '**/*.html' ], // Files to apply templates to
      engineOptions // Options for the template engine
    } )
  )

  /**
   * Process all links so external links have
   * target="_blank" and rel="noopener noreferrer"
   * attributes and internal links are relative
   * This plugin also supports a basePath option which is necessary
   * when deploying a site to a subdirectory. In this case 'basePath'
   * is set above from the BASE_PATH environment variable.
   * Learn more: https://github.com/wernerglinka/metalsmith-safe-links
   */
  .use(
    safeLinks( {
      hostnames: [ 'http://localhost:3000/', 'wernerglinka.github.io' ],
      basePath: basePath
    } )
  )

  /**
   * Syntax highlight code blocks using Prism.js
   * Learn more: https://github.com/wernerglinka/metalsmith-prism
   */
  .use(
    prism( {
      decode: true
    } )
  )

  /**
   * Bundle main entries and component dependencies using esbuild
   * Learn more: https://github.com/wernerglinka/metalsmith-bundled-components
   */
  .use(
    componentDependencyBundler( {
      basePath: 'lib/layouts/components/_partials',
      sectionsPath: 'lib/layouts/components/sections',
      mainCSSEntry: 'lib/assets/main.css',
      mainJSEntry: 'lib/assets/main.js',
      cssDest: 'assets/main.css',
      jsDest: 'assets/main.js',
      minifyOutput: isProduction,
      postcss: {
        enabled: true,
        plugins: [
          stylelint(), // CSS linting - run first to catch syntax errors
          postcssImport( {
            path: [ 'lib/assets', 'lib/assets/styles' ]
          } ),
          autoprefixer(),
          cssnano( { preset: 'default' } )
        ],
        options: {
          // Additional PostCSS options if needed
        }
      }
    } )
  )

  /**
   * Copy static assets to the build directory
   * Learn more: https://github.com/wernerglinka/metalsmith-static-files
   */
  .use(
    assets( {
      source: 'lib/assets/', // Where to find assets
      destination: 'assets/', // Where to copy assets
      ignore: [ 'main.css', 'main.js', 'styles/' ] // Exclude files handled by bundled-components
    } )
  );

// These plugins only run in production mode to optimize the site
if ( isProduction ) {
  metalsmith
    /**
     * Optimize images for faster loading
     * Learn more: https://github.com/wernerglinka/metalsmith-optimize-images
     */
    .use(
      optimizeImages( {
        // Enable progressive loading
        isProgressive: false,
      } )
    )
    /**
     * Intelligent metadata generation, social media tags, and structured data including Open Graph tags,
     * Twitter Cards, JSON-LD structured data object, a sitemap and a robots.txt file
     * Learn more: https://github.com/wernerglinka/metalsmith-seo
     */
    .use(
      seo( {
        metadataPath: 'data.site'  // Object in metadata points to where to find site metadata
      } )
    )
    /**
     * Optimize HTML by Minify HTML to reduce file size
     * Learn more: https://github.com/wernerglinka/metalsmith-optimize-html
     */
    .use( htmlMinifier() );
}

/**
 * BUILD EXECUTION
 * This section handles the actual build process and development server
 * It only runs when this file is executed directly (not when imported)
 */
if ( mainFile === thisFile ) {
  // Start timing the build for performance measurement
  let t1 = performance.now();

  // Execute the Metalsmith build
  metalsmith.build( ( err ) => {
    // Handle any build errors
    if ( err ) {
      throw err;
    }

    // Log build success and time taken
    /* eslint-disable no-console */
    console.log( `Build success in ${ ( ( performance.now() - t1 ) / 1000 ).toFixed( 1 ) }s` );

    // If watch mode is enabled, set up the development server
    if ( metalsmith.watch() ) {
      if ( devServer ) {
        t1 = performance.now();
        devServer.reload();
      } else {
        devServer = browserSync.create();

        const config = {
          host: 'localhost',
          port: 3000,
          injectChanges: false,
          reloadThrottle: 0
        };

        if ( basePath ) {
          // Serve with subdirectory simulation
          config.server = {
            baseDir: './build',
            routes: {
              [ `/${ basePath }` ]: './build'
            }
          };
          config.startPath = `/${ basePath }/`;
        } else {
          // Normal serving
          config.server = './build';
        }

        devServer.init( config );
      }
    }
  } );
}

// Export the Metalsmith instance for use in other files
export default metalsmith;
