/**
 * Spotify Provider
 */

/**
 * Spotify Modal Player
 */
export const createSpotifyModal = (spotifyUrl, targetId) => {
  const embedUrl = convertToEmbedUrl(spotifyUrl);
  if (!embedUrl) {
    throw new Error('Invalid Spotify URL');
  }

  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.width = '100%';
  iframe.height = '352';
  iframe.frameBorder = '0';
  iframe.allowtransparency = 'true';
  iframe.allow = 'encrypted-media';
  iframe.style.borderRadius = '12px';

  const target = document.getElementById(targetId);
  if (target) {
    target.appendChild(iframe);
  }

  return iframe;
};

/**
 * Convert Spotify URL to embed URL
 */
function convertToEmbedUrl(url) {
  // Convert open.spotify.com URLs to embed format
  if (url.includes('open.spotify.com/')) {
    return url.replace('open.spotify.com', 'open.spotify.com/embed');
  }
  
  // Handle spotify: URIs
  if (url.startsWith('spotify:')) {
    const parts = url.replace('spotify:', '').split(':');
    if (parts.length >= 2) {
      const type = parts[0]; // track, album, playlist, show, episode
      const id = parts[1];
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
  }
  
  return null;
}