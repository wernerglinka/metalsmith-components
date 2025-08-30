/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import inlineCloudinaryVideo from './inline/cloudinary';
import inlineYoutubeVideo from './inline/youtube';
import inlineVimeoVideo from './inline/vimeo';

const inlineVideos = ( () => {
  const videoProviderMap = {
    cloudinary: inlineCloudinaryVideo,
    youtube: inlineYoutubeVideo,
    vimeo: inlineVimeoVideo,
  };

  function InlineVideoObj( element, index, options ) {
    const defaults = {
      // Default options
    };

    const settings = { ...defaults, ...options };

    // add id to element obj
    element.id = `inline-video-${ index }`;

    // get the video provider id and cloud name
    const providerId = element.dataset.videosrc;
    const cloudName = element.dataset.cloudname;
    const videoProvider = videoProviderMap[ providerId ];

    // and call the video provider function
    if ( videoProvider ) {
      videoProvider( element, index, cloudName );
    } else {
      console.warn( `Unsupported video provider: ${ providerId }` );
    }

    return {
      element,
      settings,
    };
  }

  const initInlineVideos = () => {
    // get all inline video elements
    const elements = document.querySelectorAll( '.js-inline-video' );

    // loop through each element and create a new InlineVideoObj
    elements.forEach( ( element, index ) => {
      const options = {
        // Parse options from data attributes or other sources
      };

      return new InlineVideoObj( element, index, options );
    } );
  };

  return {
    init: initInlineVideos,
  };
} )();

export default inlineVideos;
