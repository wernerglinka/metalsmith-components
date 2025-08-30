/* eslint-disable space-unary-ops */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* global YT */
// inline-youtube-video.js
import loadYouTubeAPI from '../helpers/load-youtube-api';
import { createElementWithId } from '../helpers/dom';

const inlineYoutubeVideo = ( videoInstance, index ) => {
  let player;

  /**
   * -1 – UNDSTARTED
   * 0 – ENDED
   * 1 – PLAYING
   * 2 – PAUSED
   * 3 – BUFFERING
   * 5 – VIDEO CUED 
   */
  const handlePlayerStateChange = ( event ) => {
    if ( event.data === YT.PlayerState.ENDED ) {
      videoInstance.parentNode.classList.remove( 'video-playing' );
    }
  };

  const createPlayer = ( videoId, containerId, playerOptions ) => {
    player = new YT.Player( containerId, {
      videoId,
      host: 'https://www.youtube.com',
      ...playerOptions,
      events: {
        onStateChange: handlePlayerStateChange,
      },
    } );
  };

  const videoId = videoInstance.dataset.videoid;
  const startTime = videoInstance.dataset.starttime || null;
  const endTime = videoInstance.dataset.endtime || null;

  const containerId = `ytvideo-inline-${ index }`;
  const videoTarget = createElementWithId( 'div', containerId );
  videoInstance.appendChild( videoTarget );

  loadYouTubeAPI()
    .then( () => {
      const playerOptions = {
        autoplay: 0,
        start: startTime,
        end: endTime,
        controls: 1,
        enablejsapi: 1,
        wmode: 'opaque',
        origin: window.location.origin,
        rel: 0,
      };

      createPlayer( videoId, containerId, playerOptions );

      // clicking on the thumbnail will fadeout the thumbnail and start the video
      videoInstance.parentNode.querySelector( '.video-trigger' ).addEventListener( 'click', ( e ) => {
        player.playVideo();
        videoInstance.parentNode.classList.add( 'video-playing' );
      } );

      videoInstance.querySelector( '.close' ).addEventListener( 'click', () => {
        player.stopVideo();
        videoInstance.parentNode.classList.remove( 'video-playing' );
      } );
    } )
    .catch( ( error ) => {
      console.error( `Error loading YouTube API: ${ error }` );
    } );
};

export default inlineYoutubeVideo;