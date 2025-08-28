/* global window, document, YT */

// function to play inline youTube videos

const inlineVideos = (function() {
  // allVideos is initially a placeholder div and will be replaced with the
  // actual video element when the video is loaded
  const allVideos = document.querySelectorAll(".js-inline-video");
  const allVideoWrappers = document.querySelectorAll(".js-inline-video-wrapper");
  const allPlayers = [];

  // initialize all video trigger links when the player is ready
  const initVideoLinks = function() {
    allVideoWrappers.forEach(function(thisTrigger, i) {
      // find the trigger in the video wrapper
      thisTrigger.nextElementSibling.addEventListener("click", e => {
        // start playing the video
        allPlayers[i].playVideo();
        // ...and fadeout the thumbnail
        e.target.parentNode.parentNode.classList.add("video-playing");
      });
    });
  };

  const onPlayerStateChange = function(event) {
    // player states
    // "unstarted"               = -1
    // YT.PlayerState.ENDED      =  0
    // YT.PlayerState.PLAYING    =  1
    // YT.PlayerState.PAUSED     =  2
    // YT.PlayerState.BUFFERING  =  3
    // YT.PlayerState.CUED       =  5

    switch (event.data) {
      case YT.PlayerState.PAUSED:
        event.target.h.parentElement.parentElement.classList.remove("video-playing");
        break;

      case YT.PlayerState.PLAYING:
        event.target.h.parentElement.parentElement.classList.add("video-playing");
        break;

      case YT.PlayerState.ENDED:
        event.target.h.parentElement.parentElement.classList.remove("video-playing");
        break;

      case YT.PlayerState.CUED:
        break;

      default:
    }
  };

  const init = function() {
    // add unique id to each video trigger
    allVideos.forEach(function(thisVideo, thisVideoIndex) {
      thisVideo.id = `inline-video-${thisVideoIndex}`;
    });

    // initialize all video players on a page
    // videoAPIReady is a custom event triggered when the Youtube API has been loaded
    window.videoAPIReady.then(() => {
      allVideos.forEach((thisVideo, i) => {
        const videoID = thisVideo.dataset.videoid;
        const startTime = thisVideo.dataset.starttime;
        const endTime = thisVideo.dataset.endtime;

        // reference https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        const playerVars = {
          autoplay: 0, // start/stop via js commands
          start: startTime || null, // if no start or end time is specified go trom 0 to end
          end: endTime || null,
          controls: 1, // show video controls
          enablejsapi: 1, // enable the js api so we can control then player with js
          wmode: "opaque", // allow other elements to cover video, e.g. dropdowns or pop-ups
          origin: window.location.origin, // prevent "Failed to execute 'postMessage' on 'DOMWindow'" error
          rel: 0, // disable other video suggestions after video end
        };

        // create the video player object
        allPlayers[i] = new YT.Player(thisVideo.id, {
          videoId: videoID,
          playerVars,
          events: {
            onReady: initVideoLinks,
            onStateChange: onPlayerStateChange,
          },
        });
      });
    });
  };

  return {
    init,
  };
})();

export default inlineVideos;
