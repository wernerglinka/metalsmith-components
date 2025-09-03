/**
 * Leaflet Map Component
 * Dynamically loads Leaflet library and initializes interactive maps with markers
 */

const initLeafletMaps = () => {
  /**
   * Check if a stylesheet is already loaded
   * @param {string} url - The URL of the stylesheet
   * @returns {boolean} - True if the stylesheet is loaded
   */
  const isStylesheetLoaded = (url) => {
    return Array.from(document.styleSheets).some((styleSheet) => {
      if (styleSheet.href) {
        return styleSheet.href === url;
      }
      return false;
    });
  };

  /**
   * Load a stylesheet dynamically
   * @param {string} url - The URL of the stylesheet
   * @param {string} integrity - The integrity hash for the stylesheet
   * @param {string} crossOrigin - The crossOrigin attribute value
   */
  const loadStylesheet = (url, integrity, crossOrigin) => {
    if (!isStylesheetLoaded(url)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      link.integrity = integrity;
      link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    }
  };

  /**
   * Load the Leaflet JavaScript library
   * @returns {Promise} - Resolves when the script is loaded
   */
  const loadLeafletScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof L !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';

      script.onload = function () {
        resolve();
      };

      script.onerror = function () {
        reject(new Error('Failed to load the Leaflet script.'));
      };

      document.head.appendChild(script);
    });
  };

  /**
   * Creates a leaflet map instance
   * @param {HTMLElement} mapContainer - The map container element
   * @returns {Object|null} The map instance or null if creation failed
   */
  const createLeafletMap = (mapContainer) => {
    const mapId = mapContainer.getAttribute('id');
    const latitute = mapContainer.dataset.latitute;
    const longitude = mapContainer.dataset.longitude;
    const zoom = mapContainer.dataset.zoom;
    const markers = JSON.parse(mapContainer.dataset.markers || '[]');

    if (!mapId || !latitute || !longitude) {
      console.warn('Leaflet map missing required data attributes');
      return null;
    }

    const mapOptions = {
      center: [latitute, longitude],
      zoom: parseInt(zoom) || 10
    };

    const leafletMap = new L.map(mapId, mapOptions);
    const layer = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    leafletMap.addLayer(layer);

    // Add markers
    markers.forEach((marker) => {
      const markerTitle = marker.title;
      const markerContent = `
        <h4>${marker.content.title}</h4>
        <p>${marker.content.body}</p>
        ${marker.content.link ? `<a href="${marker.content.link}" target="_blank" rel="noopener noreferrer">Read more</a>` : ''}
      `;
      const thisLatitute = marker.latitute;
      const thisLongitude = marker.longitude;
      
      L.marker([thisLatitute, thisLongitude], { title: markerTitle })
        .addTo(leafletMap)
        .bindPopup(markerContent);
    });

    return {
      element: mapContainer,
      map: leafletMap,
      markers: markers.length
    };
  };

  /**
   * Initializes all leaflet maps on the page
   */
  const initAllMaps = () => {
    loadStylesheet(
      'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
      ''
    );

    loadLeafletScript()
      .then(() => {
        const mapContainers = document.querySelectorAll('.js-leaflet-map > div');
        const instances = [];

        mapContainers.forEach(container => {
          const instance = createLeafletMap(container);
          if (instance) {
            instances.push(instance);
          }
        });

        return instances;
      })
      .catch((error) => {
        console.error('Failed to initialize Leaflet maps:', error);
      });
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllMaps);
  } else {
    initAllMaps();
  }
};

// Auto-initialize
initLeafletMaps();