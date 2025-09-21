import * as marked from 'marked';

/**
 * Filters to extend Nunjucks environment
 */

/**
 * Converts a string to lowercase
 * @param {string} string - The input string to convert
 * @returns {string} The lowercase string
 */
const toLower = ( string ) => string.toLowerCase();
/**
 * Converts a string to uppercase
 * @param {string} string - The input string to convert
 * @returns {string} The uppercase string
 */
const toUpper = ( string ) => string.toUpperCase();
/**
 * Replaces spaces in a string with dashes
 * @param {string} string - The input string to convert
 * @returns {string} The string with spaces replaced by dashes
 */
const spaceToDash = ( string ) => string.replace( /\s+/g, '-' );
/**
 * Condenses a title by removing spaces and converting to lowercase
 * @param {string} string - The input string to condense
 * @returns {string} The condensed string
 */
const condenseTitle = ( string ) => string.toLowerCase().replace( /\s+/g, '' );

/**
 * Removes leading and trailing slashes from a string
 * @param {string} string - The input string to trim
 * @returns {string} The string with leading and trailing slashes removed
 */
const trimSlashes = ( string ) => string.replace( /(^\/)|(\/$)/g, '' );

/**
 * Converts markdown string to HTML
 * @param {string} mdString - The markdown string to convert
 * @returns {string} The HTML output
 */
const mdToHTML = ( mdString ) => {
  try {
    return marked.parse( mdString, {
      mangle: false,
      headerIds: false
    } );
  } catch ( e ) {
    console.error( 'Error parsing markdown:', e );
    return mdString;
  }
};

/**
 * Filters a list based on selected titles
 * @param {Array} list - The full list of items with title property
 * @param {Array} selections - The selected item titles
 * @returns {Array} The filtered list containing only selected items
 */
const getSelections = ( list, selections ) => {
  const filterredList = [];
  for ( let i = 0; i < list.length; i++ ) {
    for ( let j = 0; j < selections.length; j++ ) {
      // covert all to lower case to be insensitive to case
      if ( list[ i ].title.toLowerCase() === selections[ j ].toLowerCase() ) {
        filterredList.push( list[ i ] );
      }
    }
  }
  return filterredList;
};

/**
 * Converts a space-separated string into a unique sorted array of words
 * @param {string} string - The input string to convert
 * @returns {Array} A unique sorted array of words
 * @example
 * // Returns ['category1', 'category2']
 * toArray('category1 category2 category1')
 */
const toArray = ( string ) => {
  return [ ...new Set( string.trim().split( ' ' ) ) ].sort();
};

/**
 * Converts a JavaScript object to a JSON string
 * @param {Object} obj - The object to stringify
 * @returns {string} The JSON string representation of the object
 */
const objToString = ( obj ) => {
  return JSON.stringify( obj );
};

/**
 * Creates a formatted JSON string representation of an object, handling circular references
 * @param {Object} obj - The object to stringify
 * @returns {string} The formatted JSON string with 4-space indentation
 */
const myDump = ( obj ) => {
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    // The key parameter is required by JSON.stringify but not used in this function

    return ( key, value ) => {
      if ( typeof value === 'object' && value !== null ) {
        if ( seen.has( value ) ) {
          return;
        }
        seen.add( value );
      }
      return value;
    };
  };

  return JSON.stringify( obj, getCircularReplacer(), 4 );
};

/**
 * Safe version of dump that handles circular references
 * This overrides the default Nunjucks dump filter
 * @param {Object} obj - The object to stringify
 * @returns {string} The formatted JSON string with 4-space indentation
 */
const safeDump = ( obj ) => {
  try {
    const seen = [];
    return JSON.stringify( obj, ( key, val ) => {
      if ( val != null && typeof val === 'object' ) {
        if ( seen.indexOf( val ) >= 0 ) {
          return '[Circular Reference]';
        }
        seen.push( val );
      }
      return val;
    }, 4 );
  } catch ( error ) {
    return `[Error: ${ error.message }]`;
  }
};

/**
 * Debug collections by extracting only essential metadata
 * @param {Object} collections - The collections object from Metalsmith
 * @returns {string} A JSON string of just the essential collection metadata
 */
const debugCollections = ( collections ) => {
  try {
    const safeCollections = {};

    Object.keys( collections ).forEach( name => {
      // If it's an array (a collection), extract metadata from each item
      if ( Array.isArray( collections[ name ] ) ) {
        safeCollections[ name ] = collections[ name ].map( item => ( {
          title: item.card?.title || item.title || 'No title',
          path: item.path,
          permalink: item.permalink,
          date: item.card?.date,
          excerpt: item.card?.excerpt
        } ) );
      } else {
        // If it's not an array, just note its type
        safeCollections[ name ] = `[${ typeof collections[ name ] }]`;
      }
    } );

    return JSON.stringify( safeCollections, null, 2 );
  } catch ( error ) {
    return `[Error extracting collections: ${ error.message }]`;
  }
};

/**
 * Checks if a post is related to a selection of items
 * @param {Object} post - The post to check
 * @param {Array} selections - The array of selected items
 * @returns {boolean} True if the post is related to any of the selections
 */
const isRelated = ( post, selections ) => {
  const simpleArray = selections.map( ( obj ) => obj.item );
  if ( simpleArray.includes( post.item ) ) {
    return true;
  }
  return false;
};

/**
 * Trims a string to a specified length and adds ellipsis if needed
 * @param {string} string - The string to trim
 * @param {number} length - The maximum length
 * @returns {string} The trimmed string with ellipsis if it was longer than the specified length
 */
const trimString = ( string, length ) => {
  if ( string.length > length ) {
    return `${ string.substring( 0, length ) }...`;
  }
  return string;
};

/**
 * Gets the current year - useful for copyright notices
 * @returns {number} The current year
 */
const currentYear = () => {
  return new Date().getFullYear();
};

/**
 * Formats a date in UTC format
 * @param {Date|string} date - The date to format (can be Date object or string)
 * @returns {string} The formatted UTC date string
 */
const UTCdate = ( date ) => {
  // Convert to Date object if it's a string
  const dateObj = date instanceof Date ? date : new Date( date );
  return dateObj.toUTCString();
};

/**
 * Formats a date string into a readable blog date format (Month Day, Year)
 * @param {string} string - The date string to format
 * @returns {string} The formatted date string
 */
const blogDate = ( string ) =>
  new Date( string ).toLocaleString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } );

/**
 * Formats a date as dd/mm/yyyy
 * @param {string|Date} dateString - The date to format (defaults to current date if not provided)
 * @returns {string} The formatted date string in dd/mm/yyyy format
 */
const getDate = ( dateString ) => {
  const date = new Date( dateString || Date.now() );
  const day = date.getDate().toString().padStart( 2, '0' );
  const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
  const year = date.getFullYear();

  return `${ day }/${ month }/${ year }`;
};

/**
 * Formats a date as 'Month Year' (e.g., 'January 2023')
 * @param {string|Date} dateString - The date to format (defaults to current date if not provided)
 * @returns {string} The formatted date string in 'Month Year' format
 */
const getMonthYear = ( dateString ) => {
  const date = new Date( dateString || Date.now() );
  const month = date.toLocaleString( 'en-US', { month: 'long' } );
  const year = date.getFullYear();

  return `${ month } ${ year }`;
};

/**
 * Checks if a URL is external (starts with http://, https://, or //)
 * @param {string} url - The URL to check
 * @returns {boolean} True if the URL is external, false otherwise
 */
const isExternal = ( url ) => {
  if ( !url || typeof url !== 'string' ) {
    return false;
  }
  return url.startsWith( 'https://' ) || url.startsWith( 'http://' ) || url.startsWith( '//' );
};

/**
 * getArrayLength
 * @param {Array} array - The array to check
 * @returns {number} The length of the array
 */
const getArrayLength = ( array ) => {
  return array.length;
};

/**
 * Checks if a value is an array
 * @param {any} value - The value to check
 * @returns {boolean} True if the value is an array, false otherwise
 */
const isArray = ( value ) => {
  return Array.isArray( value );
};

/**
 * Checks if an image object has a valid src property
 * @param {Object} imageObj - The image object to check
 * @returns {boolean} True if the image has a valid src, false otherwise
 */
const hasImage = ( imageObj ) => {
  return imageObj && imageObj.src && imageObj.src.trim() !== '';
};

/**
 * Checks if there are any valid CTAs in the CTAs array
 * A valid CTA must have both url and label properties that are non-empty strings
 * @param {Array} ctasArray - The array of CTA objects to check
 * @returns {boolean} True if there is at least one valid CTA, false otherwise
 */
const hasCtas = ( ctasArray ) => {
  if ( !Array.isArray( ctasArray ) || ctasArray.length === 0 ) {
    return false;
  }

  return ctasArray.some( cta =>
    cta &&
    cta.url &&
    cta.url.trim() !== '' &&
    cta.label &&
    cta.label.trim() !== ''
  );
};

/**
 * Checks if a text object has any meaningful content
 * @param {Object} textObj - The text object to check
 * @returns {boolean} True if the text has meaningful content, false otherwise
 */
const hasText = ( textObj ) => {
  if ( !textObj || typeof textObj !== 'object' ) {
    return false;
  }

  const { leadIn, title, subTitle, prose } = textObj;

  return (
    ( leadIn && leadIn.trim() !== '' ) ||
    ( title && title.trim() !== '' ) ||
    ( subTitle && subTitle.trim() !== '' ) ||
    ( prose && prose.trim() !== '' )
  );
};

/**
 * Checks if an author value exists and has meaningful content
 * Handles both single author strings and arrays of authors
 * @param {string|Array} author - The author value to check (string or array)
 * @returns {boolean} True if there is at least one non-empty author, false otherwise
 */
const hasAuthor = ( author ) => {
  if ( !author ) {
    return false;
  }

  // If it's an array, check if it has length and at least one non-empty item
  if ( Array.isArray( author ) ) {
    return author.length > 0 && author.some( a => a && a.trim && a.trim() !== '' );
  }

  // If it's a string, check if it's not empty
  if ( typeof author === 'string' ) {
    return author.trim() !== '';
  }

  return false;
};

/**
 * Checks if a URL value exists and has meaningful content
 * @param {string} url - The URL value to check
 * @returns {boolean} True if the URL exists and is not empty, false otherwise
 */
const hasUrl = ( url ) => {
  if ( !url || typeof url !== 'string' ) {
    return false;
  }

  return url.trim() !== '';
};

/**
 * Checks if an array or object has items/properties
 * @param {Array|Object} items - The array or object to check
 * @returns {boolean} True if there are items/properties, false otherwise
 */
const hasItems = ( items ) => {
  if ( !items ) {
    return false;
  }

  // If it's an array, check if it has length
  if ( Array.isArray( items ) ) {
    return items.length > 0;
  }

  // If it's an object, check if it has keys
  if ( typeof items === 'object' ) {
    return Object.keys( items ).length > 0;
  }

  return false;
};

/**
 * Checks if an object has an icon property with meaningful content
 * @param {Object} obj - The object to check for an icon property
 * @returns {boolean} True if the object has a non-empty icon property, false otherwise
 */
const hasIcon = ( obj ) => {
  if ( !obj || typeof obj !== 'object' ) {
    return false;
  }

  return obj.icon && typeof obj.icon === 'string' && obj.icon.trim() !== '';
};

/**
 * Merges properties into each object in an array
 * If a property exists, it will be updated; if not, it will be added
 * @param {Array} items - The array of objects to transform
 * @param {Object} propsToMerge - Object containing properties to merge into each item
 * @returns {Array} The transformed array with merged properties
 * @example
 * // Returns [{name: 'Item 1', isHorizontal: true}, {name: 'Item 2', isHorizontal: true}]
 * mergeProps([{name: 'Item 1'}, {name: 'Item 2'}], {isHorizontal: true})
 */
const mergeProps = ( items, propsToMerge ) => {
  if ( !Array.isArray( items ) || !propsToMerge || typeof propsToMerge !== 'object' ) {
    return items;
  }

  return items.map( item => ( {
    ...item,
    ...propsToMerge
  } ) );
};

export {
  toLower,
  toUpper,
  spaceToDash,
  condenseTitle,
  UTCdate,
  blogDate,
  trimSlashes,
  mdToHTML,
  getSelections,
  toArray,
  myDump,
  safeDump,
  debugCollections,
  isRelated,
  objToString,
  currentYear,
  getDate,
  getMonthYear,
  trimString,
  isExternal,
  getArrayLength,
  isArray,
  hasImage,
  hasCtas,
  hasText,
  hasAuthor,
  hasUrl,
  hasItems,
  hasIcon,
  mergeProps
};
