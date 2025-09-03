/**
 * OpenLayers Map Component
 * Dynamically loads OpenLayers library and initializes interactive maps with markers
 */

const initOpenLayersMaps = () => {
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
   */
  const loadStylesheet = (url) => {
    if (!isStylesheetLoaded(url)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  };

  /**
   * Load the OpenLayers JavaScript library
   * @returns {Promise} - Resolves when the script is loaded
   */
  const loadOpenLayersScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof ol !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://cdn.jsdelivr.net/npm/ol@v10.3.0/dist/ol.js';

      script.onload = function () {
        resolve();
      };

      script.onerror = function () {
        reject(new Error('Failed to load the OpenLayers script.'));
      };

      document.head.appendChild(script);
    });
  };

  /**
   * Creates an OpenLayers map instance
   * @param {HTMLElement} mapContainer - The map container element
   * @returns {Object|null} The map instance or null if creation failed
   */
  const createOpenLayersMap = (mapContainer) => {
    const mapId = mapContainer.getAttribute('id');
    const latitude = parseFloat(mapContainer.dataset.latitude);
    const longitude = parseFloat(mapContainer.dataset.longitude);
    const zoom = parseInt(mapContainer.dataset.zoom) || 10;
    const markers = JSON.parse(mapContainer.dataset.markers || '[]');

    if (!mapId || !latitude || !longitude) {
      console.warn('OpenLayers map missing required data attributes');
      return null;
    }

    // Create the map
    const map = new ol.Map({
      target: mapId,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([longitude, latitude]),
        zoom: zoom
      })
    });

    // Create marker layer
    const markerFeatures = [];
    
    markers.forEach((marker) => {
      const feature = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([marker.longitude, marker.latitude])
        ),
        title: marker.title,
        content: marker.content
      });
      markerFeatures.push(feature);
    });

    // Create vector source and layer for markers
    const vectorSource = new ol.source.Vector({
      features: markerFeatures
    });

    // SVG marker as string
    const svgMarker = `
      <svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12zm0 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#ff3333" stroke="#ffffff" stroke-width="1"/>
      </svg>
    `;

    // Create SVG icon style
    const svgIcon = new ol.style.Icon({
      anchor: [0.5, 1],
      src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarker),
      scale: 1
    });

    const iconStyle = new ol.style.Style({
      image: svgIcon
    });

    const vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle // Use SVG markers
    });

    map.addLayer(vectorLayer);

    // Create popup overlay
    const popupElement = document.createElement('div');
    popupElement.className = 'ol-popup';
    popupElement.innerHTML = `
      <a href="#" class="ol-popup-closer"></a>
      <div class="ol-popup-content"></div>
    `;
    document.body.appendChild(popupElement);

    const popup = new ol.Overlay({
      element: popupElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    map.addOverlay(popup);

    // Close button handler
    const closer = popupElement.querySelector('.ol-popup-closer');
    closer.onclick = function () {
      popup.setPosition(undefined);
      closer.blur();
      return false;
    };

    // Click handler for markers
    map.on('click', function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        const content = feature.get('content');
        const contentElement = popupElement.querySelector('.ol-popup-content');
        
        if (content) {
          let popupHTML = `<h4>${content.title}</h4><p>${content.body}</p>`;
          if (content.link) {
            popupHTML += `<a href="${content.link}" target="_blank" rel="noopener noreferrer">Read more</a>`;
          }
          contentElement.innerHTML = popupHTML;
          popup.setPosition(coordinates);
        }
      } else {
        popup.setPosition(undefined);
      }
    });

    // Change cursor on hover
    map.on('pointermove', function (evt) {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      const target = map.getTargetElement();
      if (target) {
        target.style.cursor = hit ? 'pointer' : '';
      }
    });

    return {
      element: mapContainer,
      map: map,
      markers: markers.length
    };
  };

  /**
   * Initializes all OpenLayers maps on the page
   */
  const initAllMaps = () => {
    loadStylesheet('https://cdn.jsdelivr.net/npm/ol@v10.3.0/ol.css');

    loadOpenLayersScript()
      .then(() => {
        const mapContainers = document.querySelectorAll('.js-openlayers-map > div');
        const instances = [];

        mapContainers.forEach(container => {
          const instance = createOpenLayersMap(container);
          if (instance) {
            instances.push(instance);
          }
        });

        return instances;
      })
      .catch((error) => {
        console.error('Failed to initialize OpenLayers maps:', error);
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
initOpenLayersMaps();