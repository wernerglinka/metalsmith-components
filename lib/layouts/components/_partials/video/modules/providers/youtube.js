/**
 * YouTube Video Provider
 */

import loadYouTubeAPI from '../helpers/load-youtube-api.js';
import { closeModal, closeModalWithVolumeFade } from '../helpers/modal.js';

/**
 * Create YouTube modal player
 * @param {number} index - The player index
 * @param {string} videoId - The YouTube video ID
 * @param {Object} options - Additional options
 */
export const youtubeModalPlayer = (index, videoId, options = {}) => {
  let player;
  
  loadYouTubeAPI().then(() => {
    const playerVars = {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      wmode: 'opaque',
      origin: window.location.origin,
      rel: 0,
      start: options.startTime || null,
      end: options.endTime || null,
    };

    player = new YT.Player(`youtube-video-target-${index}`, {
      videoId,
      host: 'https://www.youtube.com',
      playerVars,
      events: {
        onReady: () => player.playVideo(),
        onStateChange: (event) => {
          // Close the overlay when the video ends
          if (event.data === YT.PlayerState.ENDED) {
            closeModal();
          }
        }
      },
    });
  });

  return player;
};

/**
 * Create YouTube inline player
 * @param {HTMLElement} element - The container element
 * @param {number} index - The player index
 * @param {Object} options - Additional options
 */
export const youtubeInlinePlayer = (element, index, options = {}) => {
  let player;
  const videoId = element.dataset.videoid;
  const startTime = element.dataset.starttime;
  const endTime = element.dataset.endtime;

  // Find and store button reference BEFORE YouTube replaces the element
  const videoContainer = element.closest('.video.media.inline') || element.closest('.video');
  const triggerButton = videoContainer?.querySelector('.video-trigger');
  
  console.log('YouTube inline setup - videoContainer:', videoContainer);
  console.log('YouTube inline setup - triggerButton:', triggerButton);

  // Set up close button click handler
  const closeButton = videoContainer?.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('YouTube close button clicked');
      if (videoContainer) {
        videoContainer.classList.remove('video-playing');
      }
      if (player && player.pauseVideo) {
        player.pauseVideo();
      }
    });
  }

  // Set up play button click handler
  if (triggerButton) {
    triggerButton.addEventListener('click', (e) => {
      console.log('YouTube inline button clicked!', e);
      if (player && player.playVideo) {
        player.playVideo();
      }
      // Show the video player
      if (videoContainer) {
        videoContainer.classList.add('video-playing');
      }
    });
  }

  loadYouTubeAPI().then(() => {
    const playerVars = {
      autoplay: 0,
      controls: 1,
      enablejsapi: 1,
      wmode: 'opaque',
      origin: window.location.origin,
      rel: 0,
      start: startTime || null,
      end: endTime || null,
    };

    player = new YT.Player(element.id, {
      videoId,
      playerVars,
      events: {
        onReady: () => {
          console.log('YouTube player ready');
        },
        onStateChange: (event) => {
          // Find the iframe and get container for state changes
          const iframe = event.target.getIframe();
          const container = iframe.closest('.video');
          
          if (!container) return;

          switch (event.data) {
            case YT.PlayerState.PAUSED:
              // Don't auto-hide on pause - user might want to resume
              console.log('YouTube paused - keeping video visible');
              break;
            case YT.PlayerState.PLAYING:
              container.classList.add('video-playing');
              break;
            case YT.PlayerState.ENDED:
              // Only hide when video actually ends
              container.classList.remove('video-playing');
              break;
          }
        }
      },
    });
  });

  return player;
};