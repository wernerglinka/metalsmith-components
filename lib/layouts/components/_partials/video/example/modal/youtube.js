import loadYouTubeAPI from '../helpers/load-youtube-api';

const youtubePlayer = ( index, videoId ) => {
  /**
 * @info Player states
 * -1 – UNDSTARTED
 * 0 – ENDED
 * 1 – PLAYING
 * 2 – PAUSED
 * 3 – BUFFERING
 * 5 – VIDEO CUED 
 */
  let player;
  // Load the video player
  loadYouTubeAPI().then( () => {
    const playerOptions = {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      wmode: 'opaque',
      origin: window.location.origin,
      rel: 0,
    };

    player = new YT.Player( `youtube-video-target-${ index }`, {
      videoId,
      host: 'https://www.youtube.com',
      ...playerOptions,
      events: {
        onReady: () => player.playVideo(),
        onStateChange: ( event ) => {
          // close the overlay when the video ends
          if ( event.data === YT.PlayerState.ENDED ) {
            closeModal();
          }
        }
      },
    } );
  } );
};

export default youtubePlayer;