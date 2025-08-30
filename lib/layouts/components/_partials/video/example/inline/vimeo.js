/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global Vimeo */
import loadScript from '../helpers/load-script';
import loadStyles from '../helpers/load-styles';
import { createElementWithId } from '../helpers/dom';

const inlineVimeoVideo = ( videoInstance, index ) => {
  const videoId = videoInstance.dataset.videoid;
  const containerId = `vimeo-video-player-${ index }`;
  const playerId = `demo-player-${ index }`;

  // Create the container element for the video player
  const videoTarget = createElementWithId( 'div', containerId );
  videoInstance.appendChild( videoTarget );

  // Load the vimeo video player API and styles
  Promise.all( [
    loadScript( 'https://player.vimeo.com/api/player.js', 'vimeo' )
  ] )
    .then( () => {
      const vimeoPlayer = new Vimeo.Player( containerId, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false,
      } );

      // clicking on the thumbnail will fadeout the thumbnail and start the video
      videoInstance.parentNode.querySelector( '.video-trigger' ).addEventListener( 'click', ( e ) => {
        vimeoPlayer.play();
        videoInstance.parentNode.classList.add( 'video-playing' );
      } );

      // Add event listener for end of playback
      vimeoPlayer.on( 'ended', ( event ) => {
        videoInstance.parentNode.classList.remove( 'video-playing' );
      } );

      // Add event listener for closing the video
      videoInstance.querySelector( '.close' ).addEventListener( 'click', () => {
        vimeoPlayer.pause();
        videoInstance.parentNode.classList.remove( 'video-playing' );
      } );
    } )
    .catch( ( error ) => {
      console.error( `Error loading script: ${ error }` );
    } );
};

export default inlineVimeoVideo;
