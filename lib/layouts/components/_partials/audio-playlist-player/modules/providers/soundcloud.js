/**
 * SoundCloud Provider
 */

/**
 * SoundCloud Modal Player
 */
export const createSoundCloudModal = (soundcloudUrl, targetId) => {
  const embedUrl = convertToEmbedUrl(soundcloudUrl);
  if (!embedUrl) {
    throw new Error('Invalid SoundCloud URL');
  }

  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.width = '100%';
  iframe.height = '400';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay';
  iframe.style.borderRadius = '12px';

  const target = document.getElementById(targetId);
  if (target) {
    target.appendChild(iframe);
  }

  return iframe;
};

/**
 * Convert SoundCloud URL to embed URL
 */
function convertToEmbedUrl(url) {
  if (!url.includes('soundcloud.com/')) {
    return null;
  }
  
  // SoundCloud embed format
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  
  return embedUrl;
}