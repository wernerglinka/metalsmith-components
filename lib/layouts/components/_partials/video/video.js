/**
 * Video Component
 * Multi-provider video support (YouTube, Vimeo, Cloudinary)
 */

import modalVideo from './modules/modal-video.js';
import inlineVideo from './modules/inline-video.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize modal videos if any exist
  if (document.querySelector('.js-modal-video')) {
    modalVideo().init();
  }

  // Initialize inline videos if any exist
  if (document.querySelector('.js-inline-video')) {
    inlineVideo().init();
  }
});