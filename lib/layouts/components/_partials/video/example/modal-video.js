/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
import youtubePlayer from './modal/youtube';
import vimeoPlayer from './modal/vimeo';
import cloudinaryPlayer from './modal/cloudinary';
import { createElementWithId, fadeInElement, attachEventOnce } from './helpers/dom';
import { closeModal } from './helpers/modal';

const modalVideos = ( () => {
  const videoProviderMap = {
    cloudinary: cloudinaryPlayer,
    youtube: youtubePlayer,
    vimeo: vimeoPlayer,
  };

  function ModalVideoObj( element, index, options ) {
    const defaults = {
      // Default options
    };

    const settings = { ...defaults, ...options };

    const loadVideoPlayer = () => {
      // get the video provider id and cloud name
      const providerId = element.dataset.videosrc;
      const videoId = element.dataset.videoid;
      const cloudName = element.dataset.cloudname;
      const videoProvider = videoProviderMap[ providerId ];

      // and call the video provider function
      if ( videoProvider ) {
        videoProvider( index, videoId, cloudName );
      } else {
        console.warn( `Unsupported video provider: ${ providerId }` );
      }
    };

    const handleTriggerClick = ( e ) => {
      e.preventDefault();
      e.stopPropagation();

      if ( e.target.matches( `.js-modal-video, .js-modal-video *` ) ) {
        const videoSource = element.dataset.videosrc;
        const videoTarget = createElementWithId( 'div', `${ videoSource }-video-target-${ index }` );
        document.querySelector( '#video-overlay .video-container' ).appendChild( videoTarget );

        const videoOverlay = document.getElementById( 'video-overlay' );
        fadeInElement( videoOverlay, 'is-open', () => {
          document.body.classList.add( 'modal-active' );
        } );

        loadVideoPlayer();
      }
    };

    element.addEventListener( 'click', handleTriggerClick );

    return {
      element,
      settings,
    };
  }

  const initModalVideos = () => {
    // add a video overlay to the DOM
    const newVideoOverlay = `
      <div id="video-overlay" class="js-video-overlay">
        <span class="close">[Close]</span>
        <div class="responsive-wrapper">
          <div class="video-container"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML( 'beforeend', newVideoOverlay );

    // get all modal video triggers
    const modalVideoTriggers = document.querySelectorAll( '.js-modal-video' );
    // create a new ModalVideoObj for each trigger
    modalVideoTriggers.forEach( ( trigger, index ) => {
      const options = {
        // Parse options from data attributes or other sources
      };

      return new ModalVideoObj( trigger, index, options );
    } );

    // add an event listener to the close button
    const closeVideoOverlay = document.getElementById( 'video-overlay' ).querySelector( '.close' );
    closeVideoOverlay.addEventListener( 'click', closeModal );
  };

  return {
    init: initModalVideos,
  };
} )();

export default modalVideos;
