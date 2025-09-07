/**
 * Apple Podcasts Provider
 */

/**
 * Apple Podcasts Modal Player - Uses Apple's official embed iframe
 */
export const createApplePodcastModal = (podcastUrl, targetId) => {
  const embedUrl = convertToEmbedUrl(podcastUrl);
  
  if (!embedUrl) {
    throw new Error('Invalid Apple Podcasts URL');
  }

  const target = document.getElementById(targetId);
  if (!target) {
    throw new Error('Target element not found');
  }

  // Create iframe using Apple's official embed format
  const iframe = document.createElement('iframe');
  iframe.allow = 'autoplay *; encrypted-media *; fullscreen *; clipboard-write';
  iframe.frameBorder = '0';
  iframe.height = '175';
  iframe.style.width = '100%';
  iframe.style.overflow = 'hidden';
  iframe.style.borderRadius = '10px';
  iframe.sandbox = 'allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation';
  iframe.src = embedUrl;

  target.appendChild(iframe);
  return iframe;
};

/**
 * Convert Apple Podcasts URL to embed URL
 */
function convertToEmbedUrl(url) {
  // Convert podcasts.apple.com URLs to embed.podcasts.apple.com
  return url.replace('podcasts.apple.com', 'embed.podcasts.apple.com');
}