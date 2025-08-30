/**
 * Vimeo Video Provider
 */

/* global Vimeo */

import loadScript from '../helpers/load-script.js';
import { closeModal } from '../helpers/modal.js';

/**
 * Create Vimeo modal player
 * @param {number} index - The player index
 * @param {string} videoId - The Vimeo video ID
 * @param {Object} options - Additional options
 */
export const vimeoModalPlayer = (index, videoId, options = {}) => {
  loadScript('https://player.vimeo.com/api/player.js')
    .then(() => {
      // Use WordPress example configuration - this works reliably
      const player = new Vimeo.Player(`vimeo-video-target-${index}`, {
        id: videoId,
        width: 640,
        height: 360,
        autoplay: false,
        muted: false,
      });

      // Start playing the video manually (matching WordPress example)
      player.play();

      // Close modal when video ends
      player.on('ended', closeModal);
    })
    .catch((error) => {
      console.error(`Error loading Vimeo player: ${error}`);
    });
};

/**
 * Create Vimeo inline player
 * @param {HTMLElement} element - The container element
 * @param {number} index - The player index
 * @param {Object} options - Additional options
 */
export const vimeoInlinePlayer = (element, index, options = {}) => {
  const videoId = element.dataset.videoid;
  let player;
  
  // Find and store references BEFORE any DOM modifications
  const videoContainer = element.closest('.video.media.inline') || element.closest('.video');
  const triggerButton = videoContainer?.querySelector('.video-trigger');
  
  console.log('Vimeo inline setup - videoContainer:', videoContainer);
  console.log('Vimeo inline setup - triggerButton:', triggerButton);
  
  // Set up close button click handler
  const closeButton = videoContainer?.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (videoContainer) {
        videoContainer.classList.remove('video-playing');
      }
      if (player && player.pause) {
        player.pause();
      }
    });
  }

  // Set up button click handler
  if (triggerButton) {
    triggerButton.addEventListener('click', (e) => {
      console.log('Vimeo inline button clicked!', e);
      if (videoContainer) {
        videoContainer.classList.add('video-playing');
      }
      
      // Initialize and play the video when button is clicked
      if (!player) {
        loadScript('https://player.vimeo.com/api/player.js')
          .then(() => {
            const containerId = `vimeo-inline-${index}`;
            element.id = containerId;
            
            player = new Vimeo.Player(containerId, {
              id: videoId,
              width: '100%',
              height: '100%',
              autoplay: false,
              muted: false,
            });

            // Start playing immediately after initialization
            player.ready().then(() => {
              player.play();
            });

            // Handle video end
            player.on('ended', () => {
              if (videoContainer) {
                videoContainer.classList.remove('video-playing');
              }
            });
          })
          .catch((error) => {
            console.error(`Error loading Vimeo player: ${error}`);
          });
      } else {
        // Player already exists, just play it
        player.play();
      }
    });
  }
};