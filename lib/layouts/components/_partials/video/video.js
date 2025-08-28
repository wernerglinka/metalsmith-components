/**
 * Video Component
 */

// TODO: Extract to modules when bundler supports ES6 imports
// import modalVideo from "./modules/modal-video";
// import inlineVideo from "./modules/inline-video";

document.addEventListener('DOMContentLoaded', () => {
  // Load the YouTube video JS API
  // https://developers.google.com/youtube/iframe_api_reference
  // This code loads the IFrame Player API code asynchronously
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Use a promise to manage the async onYouTubeIframeAPIReady function
  window.videoAPIReady = new Promise((resolve) => {
    // Upon YouTube API Ready we resolve the promise
    // We can then initialize video players in other modules
    // e.g. videoAPIReady.then(() => {})
    window.onYouTubeIframeAPIReady = () => resolve();
  });

  const inlineVideo = () => {
    // allVideos is initially a placeholder div and will be replaced with the
    // actual video element when the video is loaded
    const allVideos = document.querySelectorAll('.js-inline-video');
    const allVideoWrappers = document.querySelectorAll('.js-inline-video-wrapper');
    const allPlayers = [];

    // Initialize all video trigger links when the player is ready
    const initVideoLinks = () => {
      allVideoWrappers.forEach((thisWrapper, i) => {
        // Find the trigger button that's a sibling of the wrapper
        const triggerButton = thisWrapper.nextElementSibling;
        if (triggerButton) {
          triggerButton.addEventListener('click', (e) => {
            // Start playing the video
            allPlayers[i].playVideo();
            // The state change handler will add the class
          });
        }
      });
    };

    const onPlayerStateChange = (event) => {
      // Player states
      // "unstarted"               = -1
      // YT.PlayerState.ENDED      =  0
      // YT.PlayerState.PLAYING    =  1
      // YT.PlayerState.PAUSED     =  2
      // YT.PlayerState.BUFFERING  =  3
      // YT.PlayerState.CUED       =  5

      // Get the iframe element from the player
      const iframe = event.target.getIframe();
      // Get the parent .video.media.inline container
      const videoContainer = iframe.closest('.video.media.inline');

      if (!videoContainer) return;

      switch (event.data) {
        case YT.PlayerState.PAUSED:
          videoContainer.classList.remove('video-playing');
          break;

        case YT.PlayerState.PLAYING:
          videoContainer.classList.add('video-playing');
          break;

        case YT.PlayerState.ENDED:
          videoContainer.classList.remove('video-playing');
          break;

        case YT.PlayerState.CUED:
          break;

        default:
      }
    };

    const init = () => {
      // Add unique id to each video trigger
      allVideos.forEach((thisVideo, thisVideoIndex) => {
        thisVideo.id = `inline-video-${thisVideoIndex}`;
      });

      // Initialize all video players on a page
      // videoAPIReady is a custom event triggered when the YouTube API has been loaded
      window.videoAPIReady.then(() => {
        allVideos.forEach((thisVideo, i) => {
          const videoID = thisVideo.dataset.videoid;
          const startTime = thisVideo.dataset.starttime;
          const endTime = thisVideo.dataset.endtime;

          // Reference https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
          const playerVars = {
            autoplay: 0, // Start/stop via js commands
            start: startTime || null, // If no start or end time is specified go from 0 to end
            end: endTime || null,
            controls: 1, // Show video controls
            enablejsapi: 1, // Enable the js api so we can control then player with js
            wmode: 'opaque', // Allow other elements to cover video, e.g. dropdowns or pop-ups
            origin: window.location.origin, // Prevent "Failed to execute 'postMessage' on 'DOMWindow'" error
            rel: 0, // Disable other video suggestions after video end
          };

          // Create the video player object
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
  };

  const modalVideo = () => {
    let player;

    // Initialize all video links
    const initVideoLinks = () => {
      const videoOverlay = document.getElementById('video-overlay');
      const closeVideoOverlay = videoOverlay.querySelector('.close');

      // Delegate click event listeners for modal videos to the document
      document.addEventListener('click', (e) => {
        if (e.target.matches('.js-modal-video, .js-modal-video * ')) {
          const thisTrigger = e.target.closest('.js-modal-video');
          const requestedVideoID = thisTrigger.dataset.videoid;
          const startTime = thisTrigger.dataset.startTime;
          const endTime = thisTrigger.dataset.endTime;

          console.log('requestedVideoID', requestedVideoID);

          e.preventDefault();
          e.stopPropagation();

          // Clear any previous animation classes and inline styles
          videoOverlay.classList.remove('fadeout');
          videoOverlay.style.removeProperty('display');

          // Fade in the overlay
          videoOverlay.classList.add('fadein');
          videoOverlay.classList.add('is-open');

          // Remove fadein class after animation completes
          videoOverlay.addEventListener(
            'animationend',
            () => {
              videoOverlay.classList.remove('fadein');
            },
            { once: true }
          );

          // Prevent scrolling under the overlay
          document.body.classList.add('modal-active');

          // We are using the same player for all videos
          // Load the appropriate video ID
          // Check whether the requested videoId is equal to what the player has already loaded
          // If not load new video, otherwise play existing video
          if (requestedVideoID === player.getVideoEmbedCode()) {
            player.playVideo();
          } else {
            player.loadVideoById({
              videoId: requestedVideoID,
              startSeconds: startTime || null,
              endSeconds: endTime || null,
            });
          }
          // We might have muted a previous video, set the default level
          player.setVolume(50);
        }
      });

      // The video overlay is outside the content area, thus is permanent for all pages
      // Ergo we can attach the event handler directly to the element

      // Close video overlay when close link is clicked
      closeVideoOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Fadeout sound as we close the overlay
        let currentVolume = player.getVolume();
        const fadeout = setInterval(() => {
          if (currentVolume <= 0) {
            player.pauseVideo();
            clearInterval(fadeout);
          }
          currentVolume -= 10;
          player.setVolume(currentVolume);
        }, 50);

        // Clear fadein and add fadeout
        videoOverlay.classList.remove('fadein');
        videoOverlay.classList.remove('is-open');
        videoOverlay.classList.add('fadeout');

        // After animation completes, hide completely
        let animationCompleted = false;
        const hideOverlay = () => {
          if (animationCompleted) return;
          animationCompleted = true;
          videoOverlay.classList.remove('fadeout');
          videoOverlay.style.display = 'none';
        };

        // Listen for animation end
        videoOverlay.addEventListener('animationend', hideOverlay, { once: true });

        // Fallback in case animation doesn't fire
        setTimeout(hideOverlay, 600);

        // Allow scrolling again
        document.body.classList.remove('modal-active');
      });
    };

    // Control player by events like end of play
    const onPlayerStateChange = (event) => {
      const videoOverlay = document.getElementById('video-overlay');

      // Player states
      // "unstarted"               = -1
      // YT.PlayerState.ENDED      =  0
      // YT.PlayerState.PLAYING    =  1
      // YT.PlayerState.PAUSED     =  2
      // YT.PlayerState.BUFFERING  =  3
      // YT.PlayerState.CUED       =  5

      switch (event.data) {
        case YT.PlayerState.PAUSED:
          break;

        case YT.PlayerState.PLAYING:
          break;

        case YT.PlayerState.ENDED:
          // Fadeout the overlay when video ends
          videoOverlay.classList.remove('fadein');
          videoOverlay.classList.remove('is-open');
          videoOverlay.classList.add('fadeout');

          const hideOverlay = () => {
            videoOverlay.classList.remove('fadeout');
            videoOverlay.style.display = 'none';
          };

          videoOverlay.addEventListener('animationend', hideOverlay, { once: true });

          document.body.classList.remove('modal-active');
          break;

        case YT.PlayerState.CUED:
          break;

        default:
      }
    };

    const init = () => {
      const modalVideoTriggers = document.querySelectorAll('.js-modal-video');
      // If no video trigger links on page return
      if (modalVideoTriggers.length < 1) {
        return;
      }

      // Initialize all video players on a page
      // videoAPIReady is a deferred javascript object for when the YouTube API has been loaded
      window.videoAPIReady.then(() => {
        // Create a video overlay and add to DOM if it doesn't already exist
        if (!document.querySelector('#video-overlay')) {
          const newVideoOverlay = `
          <div id="video-overlay" class="js-video-overlay">
              <span class="close">[Close]</span>
              <div class="responsive-wrapper">
                  <div class="video-container">
                      <div id="ytvideo"></div>
                  </div>
              </div>
          </div>
        `;
          document.body.insertAdjacentHTML('beforeend', newVideoOverlay);
        }

        const videoId = modalVideoTriggers[0].dataset.videoid;
        const startTime = modalVideoTriggers[0].dataset.startTime;
        const endTime = modalVideoTriggers[0].dataset.endTime;

        // Reference https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        const playerVars = {
          autoplay: 0,
          start: startTime || null, // If no start or end time is specified go from 0 to end
          end: endTime || null, // Start/stop via js commands
          controls: 1, // Show video controls
          enablejsapi: 1, // Enable the js api so we can control then player with js
          wmode: 'opaque', // Allow other elements to cover video, e.g. dropdowns or pop-ups
          origin: window.location.origin, // Prevent "Failed to execute 'postMessage' on 'DOMWindow'" error
          rel: 0, // Disable other video suggestions after video end
        };

        // Create the video player object
        player = new YT.Player('ytvideo', {
          videoId,
          playerVars,
          events: {
            onReady: initVideoLinks,
            onStateChange: onPlayerStateChange,
          },
        });
      });
    };

    return {
      init,
    };
  };

  if (document.querySelector('.js-modal-video')) {
    modalVideo().init();
  }
  if (document.querySelector('.js-inline-video')) {
    inlineVideo().init();
  }
});