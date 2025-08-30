/**
 * Cloudinary Video Provider
 */

/* global cloudinary */

import loadScript from '../helpers/load-script.js';
import loadStyles from '../helpers/load-styles.js';
import { closeModal } from '../helpers/modal.js';

/**
 * Create Cloudinary modal player
 * @param {number} index - The player index
 * @param {string} videoId - The Cloudinary video public ID
 * @param {string} cloudName - The Cloudinary cloud name
 * @param {Object} options - Additional options
 */
export const cloudinaryModalPlayer = (index, videoId, cloudName, options = {}) => {
  loadStyles('https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css');
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js')
    .then(() => {
      const videoElementId = `cloudinary-modal-video-${index}`;
      const videoTag = `
        <video
          id="${videoElementId}"
          controls
          autoplay
          class="cld-video-player"
          data-cld-public-id="${videoId}"
        ></video>`;

      // Add video tag to the container
      const container = document.getElementById(`cloudinary-video-target-${index}`);
      if (container) {
        container.innerHTML = videoTag;
      }

      // Instantiate the Cloudinary video player
      const player = cloudinary.videoPlayer(videoElementId, {
        cloudName,
        playedEventPercents: [100],
        ...options
      });

      // Add event listener for end of playback
      player.on('percentsplayed', () => {
        closeModal();
      });
    })
    .catch((error) => {
      console.error(`Error loading Cloudinary player: ${error}`);
    });
};

/**
 * Create Cloudinary inline player
 * @param {HTMLElement} element - The container element
 * @param {number} index - The player index
 * @param {string} cloudName - The Cloudinary cloud name
 * @param {Object} options - Additional options
 */
export const cloudinaryInlinePlayer = (element, index, cloudName, options = {}) => {
  const videoId = element.dataset.videoid;
  
  // Find and store references BEFORE any DOM modifications
  const videoContainer = element.closest('.video.media.inline') || element.closest('.video');
  const triggerButton = videoContainer?.querySelector('.video-trigger');
  
  console.log('Cloudinary inline setup - videoContainer:', videoContainer);
  console.log('Cloudinary inline setup - triggerButton:', triggerButton);
  
  // Set up close button click handler
  const closeButton = videoContainer?.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('Cloudinary close button clicked');
      if (videoContainer) {
        videoContainer.classList.remove('video-playing');
      }
    });
  }
  
  loadStyles('https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.css');
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/cloudinary-video-player/2.0.1/cld-video-player.min.js')
    .then(() => {
      const videoTag = `
        <video
          id="cloudinary-inline-${index}"
          controls
          class="cld-video-player"
          data-cld-public-id="${videoId}"
        ></video>`;

      // Add video tag to the container
      element.innerHTML = videoTag;

      // Instantiate the Cloudinary video player
      const player = cloudinary.videoPlayer(`cloudinary-inline-${index}`, {
        cloudName,
        autoplay: false,
        ...options
      });

      // Set up trigger button click handler
      if (triggerButton) {
        triggerButton.addEventListener('click', (e) => {
          console.log('Cloudinary inline button clicked!', e);
          player.play();
          // Show the video player
          if (videoContainer) {
            videoContainer.classList.add('video-playing');
          }
        });
      }

      // Handle play/pause states (improved UX)
      if (videoContainer) {
        player.on('play', () => {
          videoContainer.classList.add('video-playing');
        });

        player.on('pause', () => {
          // Don't auto-hide on pause - user might want to resume
          console.log('Cloudinary paused - keeping video visible');
        });

        player.on('ended', () => {
          // Only hide when video actually ends
          videoContainer.classList.remove('video-playing');
        });
      }
    })
    .catch((error) => {
      console.error(`Error loading Cloudinary player: ${error}`);
    });
};