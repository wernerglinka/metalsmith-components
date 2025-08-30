/**
 * Video Component Utilities
 */

/**
 * Create video overlay using modern DOM APIs
 */
export const createVideoOverlay = () => {
  const overlay = document.createElement('div');
  overlay.id = 'video-overlay';
  overlay.className = 'js-video-overlay';
  
  const closeButton = document.createElement('span');
  closeButton.className = 'close';
  closeButton.textContent = '[Close]';
  
  const wrapper = document.createElement('div');
  wrapper.className = 'responsive-wrapper';
  
  const container = document.createElement('div');
  container.className = 'video-container';
  
  wrapper.appendChild(container);
  overlay.appendChild(closeButton);
  overlay.appendChild(wrapper);
  document.body.appendChild(overlay);
  
  return { overlay, container, closeButton };
};

/**
 * Close video modal
 */
export const closeModal = () => {
  const overlay = document.getElementById('video-overlay');
  if (!overlay) return;
  
  overlay.remove();
  document.body.classList.remove('modal-active');
};

/**
 * Stop active player
 */
export const stopActivePlayer = (activePlayer) => {
  if (!activePlayer?.stop) return;
  
  try {
    activePlayer.stop();
  } catch (error) {
    console.warn('Error stopping player:', error);
  }
};

/**
 * Create lazy loading observer for video elements
 */
export const createVideoObserver = (callback, rootMargin = '100px') => {
  if (!('IntersectionObserver' in window)) {
    return null;
  }
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, { rootMargin });
};

/**
 * Handle modal video clicks
 */
export const handleModalClick = async (trigger, providers, setActivePlayer) => {
  const videoId = trigger.dataset.videoid;
  const provider = trigger.dataset.videosrc || 'youtube';
  const cloudName = trigger.dataset.cloudname;
  const startTime = trigger.dataset.starttime;
  const endTime = trigger.dataset.endtime;
  
  const providerFn = providers[provider]?.modal;
  if (!providerFn) {
    console.warn(`Unsupported provider: ${provider}`);
    return;
  }
  
  // Close any playing inline videos before opening modal
  document.dispatchEvent(new CustomEvent('modal-opening'));
  
  const { overlay, container, closeButton } = createVideoOverlay();
  closeButton.onclick = () => {
    closeModal();
    setActivePlayer(null);
  };
  
  const targetId = `${provider}-target`;
  const target = document.createElement('div');
  target.id = targetId;
  container.appendChild(target);
  
  // Show modal
  overlay.classList.add('is-open');
  document.body.classList.add('modal-active');
  
  try {
    const options = { startTime, endTime };
    const player = provider === 'cloudinary' 
      ? await providerFn(videoId, targetId, cloudName)
      : await providerFn(videoId, targetId, options);
      
    setActivePlayer({ stop: () => {} }); // Modal players auto-stop
  } catch (error) {
    console.error('Error creating player:', error);
    closeModal();
    setActivePlayer(null);
  }
};