/* global Vimeo */

import loadScript from '../helpers/load-script';
import { closeModal } from '../helpers/modal';

const vimeoPlayer = ( index, videoId ) => {
  loadScript( 'https://player.vimeo.com/api/player.js' )
    .then( () => {
      const player = new Vimeo.Player( `vimeo-video-target-${ index }`, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false,
      } );

      // Start playing the video manually! If the video is set to autoplay
      // the video will start playing automatically but none of the event
      // will work!
      player.play();

      player.on( 'ended', closeModal );
    } )
    .catch( ( error ) => {
      console.error( `Error loading script: ${ error }` );
    } );
};
export default vimeoPlayer;
