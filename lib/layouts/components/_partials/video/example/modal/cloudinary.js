/* global cloudinary */

import loadScript from '../helpers/load-script';
import loadStyles from '../helpers/load-styles';
import { closeModal } from '../helpers/modal';

const cloudinaryPlayer = ( index, videoId, cloudName ) => {
  loadStyles( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css' );
  loadScript( 'https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js' )
    .then( () => {
      const videoTag = `
          <video
            id=cloudinary-video-target-${ index }
            controls
            autoplay
            class="cld-video-player"
            data-cld-public-id=${ videoId }
          ></video>`;

      // add this video tag to the video target
      document.querySelector( '#video-overlay .video-container' ).innerHTML = videoTag;

      // instantiate the cloudinary video player
      const player = cloudinary.videoPlayer( `cloudinary-video-target-${ index }`, {
        cloudName,
        playedEventPercents: [ 100 ]
      } );

      // add event listener for end of playback
      player.on( 'percentsplayed', ( event ) => {
        closeModal();
      } );
    } )
    .catch( ( error ) => {
      console.error( `Error loading script: ${ error }` );
    } );
};

export default cloudinaryPlayer;
