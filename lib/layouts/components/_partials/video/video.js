/**
 * Simple Video Component
 * Three providers (YouTube, Vimeo, Cloudinary) in two modes (inline, modal)
 */

import { createYouTubeModal, createYouTubeInline } from './modules/providers/youtube.js';
import { createVimeoModal, createVimeoInline } from './modules/providers/vimeo.js';
import { createCloudinaryModal, createCloudinaryInline } from './modules/providers/cloudinary.js';
import { createVideoOverlay, closeModal, stopActivePlayer, createVideoObserver, handleModalClick } from './modules/helpers/video-utils.js';

// Simple active player state
let activePlayer = null;

/**
 * Provider factory
 */
const providers = {
  youtube: { modal: createYouTubeModal, inline: createYouTubeInline },
  vimeo: { modal: createVimeoModal, inline: createVimeoInline },
  cloudinary: { modal: createCloudinaryModal, inline: createCloudinaryInline }
};


/**
 * Initialize inline video
 */
const initInline = async (element) => {
  const videoId = element.dataset.videoid;
  const provider = element.dataset.videosrc || 'youtube';
  const cloudName = element.dataset.cloudname;
  const startTime = element.dataset.starttime;
  const endTime = element.dataset.endtime;
  
  if (!element.id) {
    element.id = `inline-${provider}-${Date.now()}`;
  }
  
  const providerFn = providers[provider]?.inline;
  if (!providerFn) {
    console.warn(`Unsupported provider: ${provider}`);
    return;
  }
  
  const options = { startTime, endTime };
  const playerRef = provider === 'cloudinary'
    ? await providerFn(element, videoId, cloudName)
    : await providerFn(element, videoId, options);
    
  // Store reference for stopping
  if (playerRef) {
    element._playerRef = playerRef;
  }
};

/**
 * Initialize component
 */
const init = () => {
  // Global event listeners for provider communication
  document.addEventListener('video-starting', () => {
    stopActivePlayer(activePlayer);
    activePlayer = null;
  });
  
  document.addEventListener('video-ready', (e) => {
    activePlayer = { stop: () => e.detail?.pause?.() || e.detail?.pauseVideo?.() };
  });
  
  document.addEventListener('video-ended', () => {
    closeModal();
    activePlayer = null;
  });
  
  document.addEventListener('modal-opening', () => {
    // Close all playing inline videos when modal opens
    document.querySelectorAll('.video-playing').forEach(container => {
      container.classList.remove('video-playing');
    });
    stopActivePlayer(activePlayer);
    activePlayer = null;
  });
  
  // Modal videos
  document.querySelectorAll('.js-modal-video').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      handleModalClick(trigger, providers, (player) => { activePlayer = player; });
    });
  });
  
  // Inline videos with lazy loading
  const inlineVideos = document.querySelectorAll('.js-inline-video');
  
  const observer = createVideoObserver((target) => {
    initInline(target);
    observer.unobserve(target);
  });
  
  if (observer) {
    inlineVideos.forEach(video => {
      if (video.dataset.lazy !== 'false') {
        observer.observe(video);
      } else {
        initInline(video);
      }
    });
  } else {
    inlineVideos.forEach(initInline);
  }
};

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}