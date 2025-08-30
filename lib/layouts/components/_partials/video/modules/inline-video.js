/**
 * Inline Video Module
 * Handles inline video players with multiple provider support
 */

import { youtubeInlinePlayer } from './providers/youtube.js';
import { vimeoInlinePlayer } from './providers/vimeo.js';
import { cloudinaryInlinePlayer } from './providers/cloudinary.js';

const inlineVideo = () => {
  const videoProviderMap = {
    youtube: youtubeInlinePlayer,
    vimeo: vimeoInlinePlayer,
    cloudinary: cloudinaryInlinePlayer,
  };

  const init = () => {
    const allVideos = document.querySelectorAll('.js-inline-video');

    allVideos.forEach((element, index) => {
      // Add unique id to each video element
      element.id = `inline-video-${index}`;

      // Get provider and video details
      const providerId = element.dataset.videosrc || 'youtube'; // Default to YouTube for backward compatibility
      const cloudName = element.dataset.cloudname;
      const provider = videoProviderMap[providerId];

      // Initialize the appropriate provider
      if (provider) {
        provider(element, index, cloudName);
      } else {
        console.warn(`Unsupported video provider: ${providerId}`);
      }
    });
  };

  return {
    init,
  };
};

export default inlineVideo;