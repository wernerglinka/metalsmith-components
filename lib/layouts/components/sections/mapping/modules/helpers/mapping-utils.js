/**
 * Mapping Component Utilities
 */

/**
 * SVG marker for both providers
 */
export const svgMarker = `
  <svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#ff3333" stroke="#ffffff" stroke-width="1"/>
  </svg>
`;

/**
 * Validate map container data
 * @param {HTMLElement} mapContainer - Map container element
 * @returns {Object|null} Validated map data or null if invalid
 */
export const validateMapData = (mapContainer) => {
  const mapId = mapContainer.querySelector('div')?.getAttribute('id');
  const latitude = parseFloat(mapContainer.dataset.latitude);
  const longitude = parseFloat(mapContainer.dataset.longitude);
  const zoom = parseInt(mapContainer.dataset.zoom) || 10;
  const markers = JSON.parse(mapContainer.dataset.markers || '[]');

  if (!mapId || isNaN(latitude) || isNaN(longitude)) {
    console.warn('Map missing required data attributes');
    return null;
  }

  return { mapId, latitude, longitude, zoom, markers };
};

/**
 * Create popup content HTML
 * @param {Object} content - Content object with title, body, and optional link
 * @returns {string} HTML string for popup content
 */
export const createPopupContent = (content) => {
  let popupHTML = `<h4>${content.title}</h4><p>${content.body}</p>`;
  if (content.link) {
    popupHTML += `<a href="${content.link}" target="_blank" rel="noopener noreferrer">Read more</a>`;
  }
  return popupHTML;
};