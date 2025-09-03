/**
 * Leaflet Map Provider
 */

import { loadScript } from '../helpers/load-script.js';
import { loadStylesheet } from '../helpers/load-styles.js';
import { svgMarker, validateMapData, createPopupContent } from '../helpers/mapping-utils.js';

/**
 * Initialize Leaflet library
 * @returns {Promise} Resolves when Leaflet is loaded
 */
const loadLeaflet = () => {
  loadStylesheet('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
  
  return loadScript(
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'L'
  );
};

/**
 * Create Leaflet map instance
 * @param {HTMLElement} mapContainer - Map container element
 * @returns {Object|null} Map instance or null if creation failed
 */
export const createLeafletMap = async (mapContainer) => {
  const mapData = validateMapData(mapContainer);
  if (!mapData) {
    return null;
  }

  const { mapId, latitude, longitude, zoom, markers } = mapData;

  // Load Leaflet if not already loaded
  await loadLeaflet();

  // Create the map
  const leafletMap = new L.map(mapId, {
    center: [latitude, longitude],
    zoom: zoom
  });

  // Add tile layer
  const layer = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  leafletMap.addLayer(layer);

  // Create custom SVG icon
  const customIcon = L.divIcon({
    html: svgMarker,
    className: 'custom-div-icon',
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -32]
  });

  // Add markers
  markers.forEach((marker) => {
    const markerContent = createPopupContent(marker.content);

    L.marker([marker.latitude, marker.longitude], {
      icon: customIcon,
      title: marker.title
    })
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
 * Initialize all Leaflet maps
 * @returns {Promise<Array>} Array of map instances
 */
export const initLeafletMaps = async () => {
  const mapContainers = document.querySelectorAll('.js-leaflet-map');
  const instances = [];

  for (const container of mapContainers) {
    const instance = await createLeafletMap(container);
    if (instance) {
      instances.push(instance);
    }
  }

  return instances;
};