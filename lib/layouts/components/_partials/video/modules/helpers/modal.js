/**
 * Modal Helper Functions
 */

import { fadeOutElement } from './dom.js';

/**
 * Close the video modal overlay
 */
export const closeModal = () => {
  const videoOverlay = document.getElementById('video-overlay');
  if (!videoOverlay) return;

  fadeOutElement(videoOverlay, 'is-open', () => {
    // Allow scrolling again
    document.body.classList.remove('modal-active');
    
    // Clear the video container
    const videoContainer = videoOverlay.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.innerHTML = '';
    }
  });
};

/**
 * Handle modal close with volume fade for video players
 * @param {Object} player - The video player instance
 * @param {Function} getVolume - Function to get current volume
 * @param {Function} setVolume - Function to set volume
 * @param {Function} pauseVideo - Function to pause video
 */
export const closeModalWithVolumeFade = (player, getVolume, setVolume, pauseVideo) => {
  const videoOverlay = document.getElementById('video-overlay');
  if (!videoOverlay) return;

  // Fadeout sound as we close the overlay
  let currentVolume = getVolume();
  const fadeout = setInterval(() => {
    if (currentVolume <= 0) {
      pauseVideo();
      clearInterval(fadeout);
    }
    currentVolume -= 10;
    setVolume(currentVolume);
  }, 50);

  closeModal();
};