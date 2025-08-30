/**
 * Modal Video Module
 * Handles modal video overlay with multiple provider support
 */

import { youtubeModalPlayer } from './providers/youtube.js';
import { vimeoModalPlayer } from './providers/vimeo.js';
import { cloudinaryModalPlayer } from './providers/cloudinary.js';
import { createElementWithId, fadeInElement } from './helpers/dom.js';
import { closeModal } from './helpers/modal.js';

const modalVideo = () => {
  const videoProviderMap = {
    youtube: youtubeModalPlayer,
    vimeo: vimeoModalPlayer,
    cloudinary: cloudinaryModalPlayer,
  };

  // Handle modal trigger clicks
  const handleTriggerClick = (e, element, index) => {
    e.preventDefault();
    e.stopPropagation();

    const providerId = element.dataset.videosrc || 'youtube'; // Default to YouTube for backward compatibility
    const videoId = element.dataset.videoid;
    const cloudName = element.dataset.cloudname;
    const startTime = element.dataset.starttime;
    const endTime = element.dataset.endtime;

    // Create video target element
    const videoTarget = createElementWithId('div', `${providerId}-video-target-${index}`);
    document.querySelector('#video-overlay .video-container').appendChild(videoTarget);

    // Show the overlay
    const videoOverlay = document.getElementById('video-overlay');
    fadeInElement(videoOverlay, 'is-open', () => {
      document.body.classList.add('modal-active');
    });

    // Initialize the appropriate provider
    const provider = videoProviderMap[providerId];
    if (provider) {
      const options = {
        startTime: startTime,
        endTime: endTime
      };
      provider(index, videoId, cloudName, options);
    } else {
      console.warn(`Unsupported video provider: ${providerId}`);
    }
  };

  const init = () => {
    const modalVideoTriggers = document.querySelectorAll('.js-modal-video');
    
    // If no video trigger links on page, return
    if (modalVideoTriggers.length < 1) {
      return;
    }

    // Create a video overlay and add to DOM if it doesn't already exist
    if (!document.querySelector('#video-overlay')) {
      const newVideoOverlay = `
        <div id="video-overlay" class="js-video-overlay">
          <span class="close">[Close]</span>
          <div class="responsive-wrapper">
            <div class="video-container"></div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', newVideoOverlay);
    }

    // Set up event listeners for modal triggers
    modalVideoTriggers.forEach((trigger, index) => {
      trigger.addEventListener('click', (e) => {
        handleTriggerClick(e, trigger, index);
      });
    });

    // Add event listener to the close button
    const closeVideoOverlay = document.getElementById('video-overlay').querySelector('.close');
    closeVideoOverlay.addEventListener('click', closeModal);
  };

  return {
    init,
  };
};

export default modalVideo;